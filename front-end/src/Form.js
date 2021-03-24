import React,{useState,useEffect} from 'react'
import axios from "axios";

export default function Form() {
  const [cities,setCities]=useState([])
  const [selectedCity,setSelectedCity]=useState(null)
  const [selectedDay,setSelectedDay]=useState(null)


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
          console.log(response.data);
          setCities(response.data.cities)
        } else {
          console.log(response);
        }
      })
      .catch(err => console.log(err)); 
  }, [])

  const submitHandler=(e)=>{
    e.preventDefault()
    axios({
      method: "POST",
      url: `http://localhost:4000/city/citylocation`,
      headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json",
      },
      data:{city:selectedCity,datum:selectedDay}
    })
      .then(response => {
        if (response.data.success) {
          let lat=response.data.city.lat;
          let lng=response.data.city.lng;
          console.log(lat,lng);//50.1136 8.6797
          //http://ftp-cdc.dwd.de/climate_environment/CDC/observations_germany/climate/daily/more_precip/historical/RR_Tageswerte_Beschreibung_Stationen.txt
        } else {
          console.log(response);
        }
      })
      .catch(err => console.log(err)); 
  }


  return (
    <form onSubmit={(e)=>submitHandler(e)}>
      <label htmlFor="cities">Choose a city:</label>
      <select onChange={(e) => setSelectedCity(e.target.value)} name="cities" id="cities">
        {cities && cities.map((city,i)=> <option key={i} value={city.cityname}>{city.cityname},{city.state}</option>)}
      </select>
      <input type="date" name="datum" id="datum" onChange={(e)=>setSelectedDay(e.target.value)}/>
      <input type="submit" value="Submit"/>
    </form>
  )
}

  