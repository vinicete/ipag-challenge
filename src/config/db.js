const { Pool } = require('pg');
require('dotenv').config();

class Database {
    constructor() {
        if (!Database.instance) {
            this.pool = new Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: parseInt(process.env.DB_PORT, 10),
            }); 
            Database.instance = this;
        }

        return Database.instance;
    }

    async query(text, params) {
        const client = await this.pool.connect();
        try {
            const res = await client.query(text, params);
            return res;
        } finally {
            client.release();
        }
    }

    async connect() {
        return await this.pool.connect();
    }
}

module.exports = new Database();