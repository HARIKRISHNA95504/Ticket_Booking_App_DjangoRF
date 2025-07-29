import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/busList.css'
const BusList = () => {
    const[buses,setBuses]=useState([])

    const navigate = useNavigate()
useEffect(()=>{
    const fetchBuses = async()=>{
       try{
        const response = await axios.get('http://127.0.0.1:8000/api/buses/')
        setBuses(response.data)
       } catch(error){
        console.log('error in fetching buses',error)
       }
    }
    fetchBuses()
},[])

const handleViewSeats = (id)=>{
    navigate(`/bus/${id}`)
}

  return (
    <div className='buslist-container'>
        {buses.map((item)=>{
          return(
            <div key={item.id}>
                <div className="bus-card">
                    <h2>{item.bus_name} ({item.number})</h2>
                    <p><strong>From:</strong> {item.origin}</p>
                    <p><strong>To:</strong> {item.destination}</p>
                    <p><strong>Start Time:</strong> {item.start_time}</p>
                    <p><strong>Reach Time:</strong> {item.reach_time}</p>
                    <p><strong>Features:</strong> {item.features}</p>
                    <p><strong>Seats Available:</strong> {item.no_of_seats}</p>
                    <p><strong>Price:</strong> ₹{item.price}</p>
                    <button className="book-btn" onClick={()=>handleViewSeats(item.id)}>Book Now</button>
                </div>
            </div>
          )  
        })}
    </div>
  )
}

export default BusList