function routes(app){
    app.use('/',require('./routes/index.js'));
    app.use('/library',require('./routes/books.js'));
    return
}

module.exports = routes;