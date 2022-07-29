const express = require('express');
const routerApi = require('./routes/router');
const config = require('./config');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const cors = require('cors')
const { checkApiKey } = require('./middlewares/auth.handler');

const app = express();

app.use(express.json());

const whiteList = ['http://localhost:3000', 'https://myapp.co']

const options = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('no permitido'))
        }
    }
}

app.use(cors(options));
require('./utils/auth/');



// Este endpoint es de prueba para la apiKey
app.get('/nueva-ruta', checkApiKey, (req, res) => {
    res.send('Hola, soy una nueva ruta')
})

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler)
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});