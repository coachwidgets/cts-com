let express = require('express'),
    ejs = require('ejs'),
    path = require('path'),
    root = path.join(__dirname, 'build/unbundled'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    ghost = require('ghost'),
    app = express();

ghost({
  config: path.join(__dirname, 'ghost_config.js')
}).then((ghostServer) => {
    console.log('ghostServer.config.paths.subdir, ghostServer.rootApp', ghostServer.config.paths.subdir, ghostServer.rootApp)
    app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    ghostServer.start(app);
    console.log('After Ghost then', process.env.port)

    // view engine setup
    app.set('views', root)
        .engine('html', ejs.renderFile)

        // uncomment after placing your favicon in /public
        //.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        .use(logger('dev'))
        .use(express.static(root))
        .get('/', (req, res) => {
            res.render('index.html');
        })
        .listen(process.env.PORT || 5000);

})
    .catch((err) => {
        console.log('Ghost failed', err)
    })
