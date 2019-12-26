const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')
const session = require('koa-generic-session')
const config = require('./config')
const userRouter = require('./routes/users');
const monitorRouter = require('./routes/monitor')
const routes = require('./routes')
const { SESSION_KEY, JWT_KEY } = require('./config/secretKeys');
const { REDIS_CONF } = require('./config/db')
const redisStore = require('koa-redis')
const jwt_koa = require('koa-jwt');
const port = process.env.PORT || config.port

// error handler
onerror(app)
/**
 * 跨域
 */

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});


// 错误处理
// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  })
})






// session 配置
app.keys = [SESSION_KEY];
app.use(session({
  key: 'longchat.sid',// cookie name
  prefix: 'longchat:sess', //redis key 的前戳
  cookie: { // cookie 配置
    path: '/',
    httpOnly: true, // 是否能修改cookie
    maxAge: 24 * 60 * 60 * 1000  // 一天
  },
  store: redisStore({  // 存储到redis 里面
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}` // redis 地址
  })
}))

// 使用jwt 
app.use(jwt_koa({
  secret: JWT_KEY
}).unless({
  path: [/\/login/, /\/register/]
})
)


// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: { settings: { views: path.join(__dirname, 'views') } },
    map: { 'hjs': 'hogan' },
    extension: 'hjs'
  }))
  .use(router.routes())
  .use(router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

router.get('/', async (ctx, next) => {
  // ctx.body = 'Hello World'
  ctx.state = {
    title: 'Koa2'
  }
  await ctx.render('index', ctx.state)
})

routes(router)
userRouter(router)
monitorRouter(router)

app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
