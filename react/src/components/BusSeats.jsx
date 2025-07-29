import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const BusSeats = () => {
    const [bus,setBus] = useState(null)
    const [seats,setSeats]=useState([])

    const {busId} = useParams()

    useEffect(()=>{
        const fetchBusDetails = async()=>{
            try{
                const response = await axios.get(`http://localhost:8000/api/buses/${busId}`)
                setBus(response.data)
                setSeats(response.data.seats || [])
                setBus
            }catch(error){
                console.log('error in fetching details', error)
            }
        }
        fetchBusDetails()
    },[busId])
  return (
    <div>
        {bus&&(
            <div>
                <div>{bus.bus_name}</div>
                <div>{bus.number}</div>
                <div>{bus.origin}</div>
                <div>{bus.destination}</div>
                <div>{bus.start_time}</div>
                <div>{bus.reach_time}</div>
            </div>
        )}
        <div>
            {seats.map((seat)=>{
                return(
                    <button>
                        Seat Number : {seat.seat_number}
                    </button>
                )
            })}
        </div>
    </div>
  )
}

export default BusSeats