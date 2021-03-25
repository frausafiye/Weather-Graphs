const cities=require('../model/cities')
const averages=require('../model/averages')

exports.getCityInfo = async(req,res,next)=>{
  try{
  let {cityname}=req.params;
  let cityFromcities=await cities.get("cities").filter(obj=>obj.city==cityname).value()
  if(cityFromcities){
    res.send({success:true,city:cityFromcities[0]})
  }else{
    res.status(404).send({success:false,message:"no matching city found in Germany"})
  }
  }catch(err){next(err)}
}

exports.getCityNames = async(req,res,next)=>{
  try{
    let cityArr=[];
    let citiesFromcities=cities.get("cities").value()
    citiesFromcities.map(cityObj=>{cityArr.push({cityname:cityObj.city,state:cityObj.admin_name})})
    res.send({success:true,cities:cityArr})
  }catch(err){next(err)}
}

exports.averageTemps = async(req,res,next)=>{
  try{
    const {id}=req.params;
    let objsOf61= await averages.get("61-90").filter(obj=>obj.Stations_id==id).value()
    let objsOf71= await averages.get("71-00").filter(obj=>obj.Stations_id==id).value()
    let objsOf81= await averages.get("81-10").filter(obj=>obj.Stations_id==id).value()
      let averageTemps={
      'from61to90':objsOf61[0] ? objsOf61[0].Jahr :"0",
      'from71to00':objsOf71[0] ? objsOf71[0].Jahr :"0",
      'from81to10':objsOf81[0] ? objsOf81[0].Jahr :"0"
    }
    res.send({success:true,averages:averageTemps})
  }catch(err){
    console.log(err)
    next(err)}
}

