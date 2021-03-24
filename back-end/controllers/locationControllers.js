const db=require('../model/db')

exports.getCityInfo = async(req,res,next)=>{
  try{
  let {city,datum}=req.body;
  console.log(city,datum)
  let cityFromDB=db.get("cities").find({city:city}).value()
  console.log(cityFromDB)
    if(cityFromDB){
      res.send({success:true,city:cityFromDB})
    }else{
      res.status(404).send({success:false,message:"no matching city found in Germany"})
    }
  }catch(err){next(err)}
}

exports.getCityNames = async(req,res,next)=>{
  try{
    let cities=[];
    let citiesFromDB=db.get("cities").value()//how to get all city names?
    citiesFromDB.map(cityObj=>{cities.push({cityname:cityObj.city,state:cityObj.admin_name})})
    res.send({success:true,cities:cities})
  }catch(err){next(err)}
}