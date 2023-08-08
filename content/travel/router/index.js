const express = require('express')
const { verifyToken } = require('../../../middleware/verifyme')
const { positionCheck } = require('../../../middleware/positionCheck')

const travelRouter =express.Router()

travelRouter.get("/",verifyToken, positionCheck("learner"), function(req, res){
    res.send("I like it..")
})
module.exports = travelRouter