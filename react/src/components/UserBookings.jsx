

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/userBookings.css';

const UserBookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([]);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token || !userId) return;
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${userId}/bookings/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        setBookingError(error.response?.data?.message || 'Failed to load bookings');
      }
    };
    fetchBookings();
  }, [userId, token]);

  return (
    <section className="booking-section">
      <div className="container">
        <h2 className="section-heading">My Bookings</h2>

        {bookingError && <p className="error-msg">{bookingError}</p>}
        {bookings.length === 0 && !bookingError && (
          <p className="no-bookings-msg">You have no bookings yet.</p>
        )}

        <div className="booking-grid">
          {bookings.map((item) => (
            <div key={item.id} className="booking-card">
              <h3 className="booking-bus-name">Bus #{item.bus}</h3>
              <p><strong>Seat No:</strong> {item.seat}</p>
              <p><strong>Booking Time:</strong> {new Date(item.booking_time).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserBookings;
