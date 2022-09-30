const express = require('express')
const { createUser, findUsers, updateUser } = require('../controlers/user')

const router = express.Router();
router.post('/user', createUser);
router.get('/user', findUsers);
router.post('/user/update', updateUser)

module.exports = router;