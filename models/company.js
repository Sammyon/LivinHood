'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasOne(models.Stock, {foreignKey: "CompanyId"})
    }
  }
  Company.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'name cannot be empty!'
        }
      }
    },
    companyLogo: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'companyLogo cannot be empty!'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'location cannot be empty!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'email cannot be empty!'
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
    }
  }, {
    hooks: {

    },
    sequelize,
    modelName: 'Company',
  });
  return Company;
};