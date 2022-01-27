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

    localeDate () {
      const option = {weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'}
      return new Date (this.createdAt).toLocaleDateString('en', option) 
    }

    static countUser () {
      return new Promise((resolve, reject) => {
        User.findAll({
          attributes: 
            [
              [sequelize.fn('COUNT', sequelize.col('id')), 'TotalUser'],
              [sequelize.fn('MAX', sequelize.col('credit')), 'MaxCredit'],
            ],
        })
          .then(data => {
            resolve(data[0])
          })
          .catch(err => {
            reject(err)
          })
        })
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
        },
        isEmail: {
          msg: `email must be in proper format!`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'password cannot be empty!'
        },
        isAlphanumeric: {
          msg: 'password may only be numbers and letters!'
        }
      },
      
    },
    credit: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'credit cannot be empty!'
        },
        min: 1
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
      },
      beforeBulkUpdate: (instance, options) => {
        console.log(instance, `DATA USER BEFORE UPDATE`);
        // if (data.) {
          
        // }
      }
    },
    validate: {
      minCredit(){
        if (this.credit <= 0) {
          throw new Error("Please Top Up your credits!") 
        }
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};