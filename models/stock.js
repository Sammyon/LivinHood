'use strict';
const stockPrice = require ('yahoo-stock-prices')
const {Company} = require ('./index')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Stock.hasMany(models.Portofolio, {foreignKey: "StockId"})
       Stock.belongsTo(models.Company, {foreignKey: "CompanyId"})
    }

    price() {
      return new Promise ((resolve, reject) => {
        stockPrice.getCurrentPrice(this.stockCode)
          .then(data => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      }) 
    }

    static company (id) {
      return new Promise((resolve, reject) => {
        Stock.findOne({
          include: {
            model: Company
          },
          where: {
            id: id
          }
        })
          .then(data => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
  Stock.init({
    stockCode: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'stockCode cannot be empty!'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'description cannot be empty!'
        }
      }
    },
    CompanyId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'CompanyId cannot be empty!'
        }
      }
    },
  }, {
    hooks: {
      
    },
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};