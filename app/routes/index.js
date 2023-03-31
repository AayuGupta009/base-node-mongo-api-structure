const app = require('express')();

app.use('/student', require('./student.routes'));
app.use('/tutorial', require('./tutorial.routes'));

module.exports = app;