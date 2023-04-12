"use strict";

const { readdirSync } = require("fs");
const { basename: _basename, join } = require("path");
const { Sequelize, DataTypes } = require("sequelize");

const { env: _env } = require("process");
const basename = _basename(__filename);
const env = _env.NODE_ENV || "development";
const config = require(join(__dirname, "/../config/config.js"))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.url, config);
}

readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
