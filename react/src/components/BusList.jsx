
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/busList.css';
import { FiClock, FiMapPin, FiDollarSign, FiUser, FiArrowRight } from 'react-icons/fi';
import { FaWifi, FaSnowflake, FaPlug, FaTv, FaWater } from 'react-icons/fa';

const BusList = ({ token, handleLogout }) => {
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useState({
        origin: '',
        destination: '',
        date: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/buses/');
                setBuses(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching buses', error);
                setLoading(false);
            }
        };
        fetchBuses();
    }, []);

    const handleViewSeats = (id) => {
        navigate(`/bus/${id}`);
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredBuses = buses.filter(bus => {
        return (
            bus.origin.toLowerCase().includes(searchParams.origin.toLowerCase()) &&
            bus.destination.toLowerCase().includes(searchParams.destination.toLowerCase())
        );
    });

    const getFeatureIcon = (feature) => {
        switch(feature.trim().toLowerCase()) {
            case 'wifi': return <FaWifi />;
            case 'ac': return <FaSnowflake />;
            case 'charging': return <FaPlug />;
            case 'tv': return <FaTv />;
            case 'water': return <FaWater />;
            default: return null;
        }
    };

    return (
        <div className="modern-app">
            
            <div className="modern-hero">
                <div className="modern-hero-content">
                    <h1>Book Your Next Journey</h1>
                    <p>Comfortable, affordable, and reliable bus travel</p>
                </div>
            </div>

            <div className="modern-search-container">
                <div className="modern-search-card">
                    <div className="modern-search-inputs">
                        <div className="modern-input-group">
                            <label>From</label>
                            <div className="modern-input-with-icon">
                                <FiMapPin className="input-icon" />
                                <input
                                    type="text"
                                    name="origin"
                                    placeholder="Departure city"
                                    value={searchParams.origin}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        
                        <div className="modern-input-group">
                            <label>To</label>
                            <div className="modern-input-with-icon">
                                <FiMapPin className="input-icon" />
                                <input
                                    type="text"
                                    name="destination"
                                    placeholder="Destination city"
                                    value={searchParams.destination}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        
                        <div className="modern-input-group">
                            <label>Date</label>
                            <div className="modern-input-with-icon">
                                <FiClock className="input-icon" />
                                <input
                                    type="date"
                                    name="date"
                                    value={searchParams.date}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        
                        <button className="modern-search-btn">
                            Search Buses
                        </button>
                    </div>
                </div>
            </div>

            <div className="modern-buslist-container">
                {loading ? (
                    <div className="modern-loading">
                        <div className="modern-spinner"></div>
                        <p>Loading available buses...</p>
                    </div>
                ) : filteredBuses.length === 0 ? (
                    <div className="modern-no-results">
                        <h3>No buses found for your search</h3>
                        <p>Try adjusting your filters or search for different routes</p>
                    </div>
                ) : (
                    <div className="modern-bus-grid">
                        {filteredBuses.map((item) => (
                            <div className="modern-bus-card" key={item.id}>
                                <div className="modern-bus-header">
                                    <div className="modern-bus-operator">
                                        <div className="modern-bus-logo">
                                            {item.bus_name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3>{item.bus_name}</h3>
                                            <span className="modern-bus-type">AC Sleeper</span>
                                        </div>
                                    </div>
                                    <div className="modern-bus-rating">
                                        <span className="modern-rating-badge">4.5 ★</span>
                                    </div>
                                </div>
                                
                                <div className="modern-route-info">
                                    <div className="modern-route-time">
                                        <span className="modern-time">{item.start_time}</span>
                                        <span className="modern-city">{item.origin}</span>
                                    </div>
                                    
                                    <div className="modern-route-separator">
                                        <div className="modern-route-line"></div>
                                        <div className="modern-route-duration">4h 30m</div>
                                    </div>
                                    
                                    <div className="modern-route-time">
                                        <span className="modern-time">{item.reach_time}</span>
                                        <span className="modern-city">{item.destination}</span>
                                    </div>
                                </div>
                                
                                <div className="modern-bus-features">
                                    {item.features.split(',').map((feature, index) => (
                                        <div key={index} className="modern-feature-item">
                                            {getFeatureIcon(feature)}
                                            <span>{feature.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="modern-bus-footer">
                                    <div className="modern-price-info">
                                        <span className="modern-price-label">Starting from</span>
                                        <span className="modern-price">₹{item.price}</span>
                                        <span className="modern-seats-available">{item.no_of_seats} seats left</span>
                                    </div>
                                    
                                    <button 
                                        className="modern-book-btn"
                                        onClick={() => handleViewSeats(item.id)}
                                    >
                                        <span>View Seats</span>
                                        <FiArrowRight className="btn-icon" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusList;



