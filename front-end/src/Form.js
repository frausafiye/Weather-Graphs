import React,{useState,useEffect} from 'react'
import axios from "axios";
import {calcCrow} from "./logic/calcDistance"
import stationsData from "./stations.json"
import Chart from './Chart';

export default function Form() {
  const [cities,setCities]=useState([])
  const [selectedCity,setSelectedCity]=useState(null)
  const [stations,setStations]=useState([])
  const [propsData,setPropsData]=useState(
    {data:[
      {
        name: '1961-1990',
        uv: "",
        pv: 2400,
        amt: 2400,
      },
      {
        name: '1971-2000',
        uv:"",
        pv: 1398,
        amt: 2210,
      },
      {
        name: '1981-2010',
        uv: "",
        pv: 9800,
        amt: 2290,
      }
    ],cityname:""})
  

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:4000/city/citynames",
      headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (response.data.success) {
          setCities(response.data.cities)
        } else {
          console.log(response);
        }
      })
      .catch(err => console.log(err)); 
      setStations(stationsData.stations)
  }, [])


  const getAverage=(id)=>{
    fetch(`http://localhost:4000/city/average/${id}`,{
        method: "GET",
        headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json",
      }}).then(res=>res.json())
      .then(result=>
        { if (result.success) {
        setPropsData(
          {data:[
            {...propsData.data[0],uv:result.averages.from61to90},
            {...propsData.data[1],uv:result.averages.from71to00},
            {...propsData.data[2],uv:result.averages.from81to10}],cityname:selectedCity})
        }else{
          console.log(result)
        }
    })
  }

  const compareDistances=(lat,lng)=>{//compares distances between stations and given coordinates and returns the nearest station's id
    let distances=[];
    stations.map(station=>{
      let distance=calcCrow(lat,lng,station.GEOGR_BREITE,station.GEOGR_LAENGE).toFixed(1)
      distances.push(distance)
      return distances
    })
    let sortedDistances=[...distances].sort(function(a, b) {
    return a - b;
    });
    let minimum=sortedDistances[0];
    let index=distances.indexOf(minimum)
    let nearestID=stations[index].ID
    return nearestID
  }

  const getCityLocation=async()=>{
    try{
      let response=await axios({
      method: "GET",
      url: `http://localhost:4000/city/citylocation/${selectedCity}`,
      headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json"
      }})
      if(response.data.success) {
          let lat=await response.data.city.lat;
          let lng=await response.data.city.lng;
          return {lat,lng}
      } else {
          console.log(response);
        }
    }catch(err){console.log(err)}
  }

  const submitHandler=async(e)=>{
    e.preventDefault()
    const {lat,lng}=await getCityLocation();
    let id = compareDistances(lat,lng)
    //according to id of the nearest station, get average temp. of 3x10 years of the station:
    getAverage(id)
  }


  return (
    <>
    <form onSubmit={(e)=>submitHandler(e)} style={{display:"flex",flexFlow:"column",margin:"10vw auto", width:"60%"}}>
      <label htmlFor="cities">Choose a city:</label>
      <select style={{padding:"5px", margin:"10px 0"}} 
      onChange={(e) => setSelectedCity(e.target.value)} name="cities" id="cities"
      >
        {cities && cities.map((city,i)=> <option key={i} value={city.cityname}>{city.cityname},{city.state}</option>)}
      </select>
      <input type="submit" value="SHOW" style={{padding:"5px"}}/>
    </form>
    {propsData.cityname.length && <Chart propsData={propsData}/>}
    </>
  )
}