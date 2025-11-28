const { Pool } = require ('pg')

const ISProduction = process.env.NODE_ENV === 'production'

let pool = null;
if(ISProduction) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL, ssl:{
            rejectUnauthorized: false,
        }
    })
}else{
    pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'bd_marcenaria',
        password: 'postgres',
        port: 5432
    })
}

module.exports = {pool}