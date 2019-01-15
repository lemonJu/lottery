var express = require('express');
var router = express.Router();
var User = require('../model/user')

/* GET users listing. */
router.get('/register', function(req, res, next) {
  const { username, password, phone, email, amount = 0 } = req.query
  const params = { username, password, phone, email, amount }
  const { User } = req.model

  req.sequelize.sync()
    .then(() => User.create(params))
    .then(() => {
      res.json({
        success: true
      })
    });
});

router.get('/login', function(req, res, next) {
  const { username, password } = req.query
  const { User } = req.model

  User.findOne({
    where: {
      password, username
    }
  }).then(user =>{
    if (user) {
      res.session.user = user
      res.json({
        success: true
      })
    } else {
      res.json({
        success: false,
        errorMessage: '用户名或密码错误'
      })
    }
    //res.end(user)
  }).catch(e =>{
    res.end(JSON.stringify(e))
  })
});

router.get('/logout', function(req, res){
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;