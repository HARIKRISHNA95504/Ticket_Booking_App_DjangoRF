

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/busSeats.css';

const BusSeats = ({ token }) => {
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const { busId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/buses/${busId}`);
        setBus(response.data);
        setSeats(response.data.seats || []);
      } catch (error) {
        console.error('Error fetching bus details', error);
      }
    };
    fetchBusDetails();
  }, [busId]);

  const handleBook = async (seatId) => {
    if (!token) {
      alert('Please login to book a seat.');
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/booking/',
        { seat: seatId },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      alert('Booking successful!');
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === seatId ? { ...seat, is_booked: true } : seat
        )
      );
       navigate('/my-bookings')
    } catch (error) {
      alert(error.response?.data?.error || error.message || 'Booking failed');
    }
  };

  return (
    <div className="bus-seats-page">
      {bus && (
        <div className="bus-details-card">
          <h2>{bus.bus_name} ({bus.number})</h2>
          <p><strong>From:</strong> {bus.origin}</p>
          <p><strong>To:</strong> {bus.destination}</p>
          <p><strong>Start:</strong> {bus.start_time}</p>
          <p><strong>Reach:</strong> {bus.reach_time}</p>
        </div>
      )}

      <h3 className="seats-heading">Select Your Seat</h3>
      <div className="seats-grid">
        {seats.map((seat) => (
          <button
            key={seat.id}
            className={`seat-button ${seat.is_booked ? 'booked' : 'available'}`}
            onClick={() => handleBook(seat.id)}
            disabled={seat.is_booked}
          >
            Seat {seat.seat_number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BusSeats;
