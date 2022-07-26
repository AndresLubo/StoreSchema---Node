const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    post: 5432,
    user: 'andres',
    password: '1234',
    database: 'my_store'
})


module.exports = pool;
