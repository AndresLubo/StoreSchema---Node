const express = require('express');
const routerApi = require('./routes/router');
const config = require('./config');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const cors = require('cors')

const app = express();

app.use(express.json());

const whiteList = ['http://localhost:8080', 'https://myapp.co']
const options = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true)
        }
        callback(new Error('no permitido'))
    }
}
app.use(cors(options));

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
