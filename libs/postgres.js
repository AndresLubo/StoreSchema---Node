const { Client } = require('pg')

const getConnection = async() => {
    const client = new Client({
        host: 'localhost',
        post: 5432,
        user: 'andres',
        password: '1234',
        database: 'my_store'
    })

    await client.connect();
    return client;
}

module.exports = getConnection;
