import React,{useState,useEffect} from 'react'
import axios from "axios";
import {calcCrow} from "./logic/calcDistance"
import stationsData from "./stations.json"

export default function Form() {
  const [cities,setCities]=useState([])
  const [selectedCity,setSelectedCity]=useState(null)
  const [stations,setStations]=useState([])
  const [averages,setAverages]=useState(null)

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

  useEffect(() => {
    if(averages){
    console.log(averages)
    //createChart(averages)
    // averages={
          //'61-90':"6",
          //'71-00':"7",
          //'81-10':"8"
    // }
    }
  }, [averages])


  const getAverage=async(id)=>{
    try{
      const response = await axios({
        method: "GET",
        url: `http://localhost:4000/city/average/${id}`,
        headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json",
      }});
      if (response.data.success) {
        await setAverages( response.data.averages)
      }else if(response.status===404){
        //create something!
        console.log("no matching temp found")
      }
      return false;
    }catch (err) {
      console.error(err)
      return false;
    } 
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
    console.log(nearestID)
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
          console.log(response.data.city)
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
    const {lat,lng}= await getCityLocation();
    console.log(lat,lng)
    let id = compareDistances(lat,lng)
    //according to id of the nearest station, get average temp. of 3x10 years of the station: 
    await getAverage(id)
  }


  return (
    <>
    <form onSubmit={(e)=>submitHandler(e)}>
      <label htmlFor="cities">Choose a city:</label>
      <select onChange={(e) => setSelectedCity(e.target.value)} name="cities" id="cities">
        {cities && cities.map((city,i)=> <option key={i} value={city.cityname}>{city.cityname},{city.state}</option>)}
      </select>
      <input type="submit" value="GO"/>
    </form>
    {averages&& <div>{<p>{averages[61-90]}</p>}</div>}
    </>

  )
}