const Pool = require("pg").Pool;


const pool= new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

pool.on('connect', ()=>console.log('conntected to db'))
pool.on('error', () => console.log('Lost PG connection'))


const createUserTable = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
      (user_id SERIAL PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL UNIQUE,
        user_password VARCHAR(255) NOT NULL)`;
  
    pool.query(userCreateQuery)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  };
  
  createUserTable()

module.exports = pool ;
