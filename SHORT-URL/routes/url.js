const express = require('express')
const {handleGenerateNewShortURL} = require("../controllers/url.js")
const router = express.Router();

router.post('/',handleGenerateNewShortURL)
router.get('/analytics/:shortId')

module.exports = router;