const express = require('express');
const template = require('../templates/template.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ template: template.generate() });
});

module.exports = router;
