const express=require("express")
const { getCityInfo, getCityNames, averageTemps } = require("../controllers/locationControllers")
const router=express.Router()

router.get("/citylocation/:cityname",getCityInfo)
router.get("/citynames",getCityNames)
router.get("/average/:id",averageTemps)


module.exports=router
