require("dotenv").config();
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "mysql://uvishk39v777wrsn:emas2u011sne3jtk@ysp9sse09kl0tzxj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/mkwnwpn45readqtp",
    "dialect": "mysql",
    "username": process.env.username,
    "password": process.env.password,
    "database": "mkwnwpn45readqtp",
    "host": "ysp9sse09kl0tzxj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  }

}
