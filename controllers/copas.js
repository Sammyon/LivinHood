class Controller {
  //? FIND

  static findAll (req, res) { 
    Model.findAll()
      .then(data => {
        res.render('path ejs', {data})
      })
      .catch(err => {
        res.send(err)
      })
  }

  //? DELETE

  static deleteId (req, res) {//! CHAIN PROMISE DELETE BY ID
    const {id} = req.params //! MUSTI DIGANTI!
    const deleteInfo = []
    Model.findByPk(id)
      .then(data => {
        deleteInfo.push(data)
        return Model.destroy({
          where: {
            id : id
          }
        })
      })
      .then (_=> {
        res.redirect(`/path/${storeId}?query1=${deleteInfo[0].info}&query2=${deleteInfo[0].info}`) //! PATH REDIRECT + QUERY (KALAU MAU NGASIH NOTIF APA YANG TERHAPUS)
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') { //!KALAU ADA ERROR VALIDASI AKAN MASUK SINI
          let errors = []
          err.errors.forEach(e => errors.push(e.message))
          res.send (errors)
        } else {
          res.send (err) //! KALAU TIDAK ADA ERROR VALIDASI
        }
      })
  }

  //? EDIT

  static editPrefilled (req, res) {
    let { id } = req.params //! MUSTI DIGANTI!
    Model.findOne({ //! KALAU ADA YANG MUSTI DICARI!
      where: {
        id: id
      },
      include: {
        model: ModelName
      }
    })
      .then(data => {
        res.render(`editForm`, { data }) //! PATH RENDER FORM EDIT
      })
      .catch(err => {
        res.send(err)
      })
  }

  static updateById (req, res) {
    let { id } = req.params //! MUSTI DIGANTI!
    let { attr1, attr2, attr3, attr4, attr5, attr6 } = req.body;
    Model.update({ attr1, attr2, attr3, attr4, attr5, attr6 }, {
      where: {
        id: id //! SAMAKAN DENGAN NAMA ID DIATAS!
      }
    })
      .then(_=> {
        res.redirect(`/path/${id}`) //! PATH REDIRECT
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') { //!KALAU ADA ERROR VALIDASI AKAN MASUK SINI
          let errors = []
          err.errors.forEach(e => errors.push(e.message))
          res.send (errors)
        } else {
          res.send (err) //! KALAU TIDAK ADA ERROR VALIDASI
        }
      })
  }

  //? ADD

  static add (req, res) {
    let { id } = req.params //! MUSTI DIGANTI!
    let { attr1, attr2, attr3, attr4, attr5, attr6 } = req.body;
    Model.create({ attr1, attr2, attr3, attr4, attr5, attr6 })
      .then(() => {
        res.redirect(`/path/${id}`) //! PATH REDIRECT
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') { //!KALAU ADA ERROR VALIDASI AKAN MASUK SINI
          let errors = []
          err.errors.forEach(e => errors.push(e.message))
          res.send (errors)
        } else {
          res.send (err) //! KALAU TIDAK ADA ERROR VALIDASI
        }
      })
  }
}