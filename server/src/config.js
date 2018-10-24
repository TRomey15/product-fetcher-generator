const env = process.env.NODE_ENV;

const development = {
  db: {
    client: 'mysql',
    connection: {
      user: 'app',
      password: 'app',
      host: 'mysql',
      port: 3306,
      database: 'vim_generator',
    },
  },
};

const config = { development };

module.exports = config[env];
