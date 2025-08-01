
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/BusSeats.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BusSeats = ({ token }) => {
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const { busId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/buses/${busId}`);
        setBus(response.data);
        setSeats(response.data.seats || []);
      } catch (error) {
        toast.error('Error fetching bus details');
      }
    };
    fetchBusDetails();
  }, [busId]);

  const handleSeatClick = (seat) => {
    if (!seat.is_booked) {
      setSelectedSeat(seat);
    }
  };

  const handleConfirmBooking = async () => {
    if (!token) {
      toast.warning('Please login to book a seat.', {
        position: 'top-center',
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    if (!selectedSeat) {
      toast.warning('Please select a seat to book.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/booking/',
        { seat: selectedSeat.id },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      toast.success('Booking successful!', {
        position: 'top-center',
        autoClose: 2000,
      });

      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === selectedSeat.id ? { ...seat, is_booked: true } : seat
        )
      );
      setSelectedSeat(null);

      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Booking failed', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="bus-seats-page">
      <ToastContainer />
      {bus && (
  <div className="bus-details-card modern-ui">
    <div className="bus-header">
      <div className="bus-name">
        <h2>{bus.bus_name}</h2>
        <span className="bus-number">Bus No: {bus.number}</span>
      </div>
      <div className="bus-meta">
        <span className="tag">🚌 {bus.bus_type || 'Standard'}</span>
        <span className="tag">💺 {bus.seats?.length || 0} Seats</span>
      </div>
    </div>

    <div className="route-info">
      <div className="route-point">
        <strong>{bus.origin}</strong>
        <span className="time-label">{bus.start_time}</span>
      </div>
      <div className="route-divider">➔</div>
      <div className="route-point">
        <strong>{bus.destination}</strong>
        <span className="time-label">{bus.reach_time}</span>
      </div>
    </div>
  </div>
)}


      <h3 className="seats-heading">Select Your Seat</h3>
      <div className="seats-grid">
        {seats.map((seat) => (
          <button
            key={seat.id}
            className={`seat-button 
              ${seat.is_booked ? 'booked' : 
                selectedSeat?.id === seat.id ? 'selected' : 'available'
              }`}
            onClick={() => handleSeatClick(seat)}
            disabled={seat.is_booked}
          >
            {seat.seat_number}
          </button>
        ))}
      </div>

      <div className="legend">
        <span><span className="box" style={{ backgroundColor: '#14e745ff' }}></span>Available</span>
        <span><span className="box" style={{ backgroundColor: '#ec7882ff' }}></span>Booked</span>
        <span><span className="box" style={{ backgroundColor: '#2983e4ff' }}></span>Selected</span>
      </div>

      {selectedSeat && (
        <div className='selected-seat'>
          <p><strong>Selected Seat:</strong> {selectedSeat.seat_number}</p>
          <button className="confirm-btn" onClick={handleConfirmBooking}>
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default BusSeats;

