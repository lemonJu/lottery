var express = require('express');
var router = express.Router();
var User = require('../model/user')

/* GET users listing. */
router.get('/create', function(req, res, next) {
  const { content } = req.query
  const { Notice } = req.model

  req.sequelize.sync()
    .then(() => Notice.create({content}))
    .then(() => {
      res.json({
        success: true
      })
    });
});

router.get('/getList', async function(req, res, next) {
  const { pageSize, pageIndex } = req.query
  const { Notice } = req.model

  const result = await Notice.findAndCountAll({
    offset: (parseInt(pageIndex) - 1) * parseInt(pageSize),
    limit:  parseInt(pageIndex),
    where: {}
  })

  res.json({
    success: true,
    data: {
      data: result.rows,
      pageSize, pageIndex,
      total: result.count
    }
  })
});

module.exports = router;