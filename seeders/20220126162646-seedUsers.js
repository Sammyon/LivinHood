'use strict';
const fs = require('fs')
const bcrypt = require('bcryptjs')
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    let data = JSON.parse(fs.readFileSync('./data/users.json'))
    const salt = bcrypt.genSaltSync(10)
    data.forEach(el => {
      const hash = bcrypt.hashSync(el.password, salt)
      el.password = hash
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })

    return queryInterface.bulkInsert("Users", data)
  },
  
  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null)
  }
};
