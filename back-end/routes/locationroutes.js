const express=require("express")
const { getCityInfo, getCityNames } = require("../controllers/locationControllers")
const router=express.Router()

router.post("/citylocation",getCityInfo)
router.get("/citynames",getCityNames)

module.exports=router
