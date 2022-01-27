'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Portofolio, {foreignKey: "UserId"})
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'name cannot be empty!'
        }
      }
    },
    bankAccountNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'bankAccountNumber cannot be empty!'
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
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'password cannot be empty!'
        }
      }
    },
    credit: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'credit cannot be empty!'
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'isAdmin cannot be empty!'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (data) => {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(data.password, salt)
        data.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};