'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portofolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Portofolio.belongsTo(models.User, {foreignKey: "UserId"})
      Portofolio.belongsTo(models.Stock, {foreignKey: "StockId"})
    }
  }
  Portofolio.init({
    
    amount: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'amount cannot be empty!'
        }
      }
    },
    investmentType: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'investmentType cannot be empty!'
        }
      }
    },
    priceBought: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'priceBought cannot be empty!'
        }
      }
    },
    StockId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'priceBought cannot be empty!'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'UserId cannot be empty!'
        }
      }
    }
  }, {
    hooks: {
      
    },
    sequelize,
    modelName: 'Portofolio',
  });
  return Portofolio;
};