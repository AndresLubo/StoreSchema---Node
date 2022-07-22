const express = require('express');
const routerApi = require('./routes/router');
const config = require('./config');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
