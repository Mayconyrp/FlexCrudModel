const { Sequelize } = require("sequelize");

const DB_NAME = 'nome_do_seu_banco';
const DB_USER = 'nome_do_seu_user'; //em alguns bancos o padrão é root
const DB_PASSWORD = 'digite_sua_senha';

const conexaodb = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = conexaodb;
