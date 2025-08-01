import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/AdminSubscribers.css';
import { US_STATES } from '../../constants/usStates';


const ViewSubscribers = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Calculate indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSubscribers = subscribers.slice(indexOfFirstItem, indexOfLastItem);

    // Total pages
    const totalPages = Math.ceil(subscribers.length / itemsPerPage);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/subscriptions');
                setSubscribers(response.data);
            }
            catch (error) {
                setError('Failed to fetch subscribers.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchSubscribers();
    }, [])

    return (
        <div className='subscribers-container'>
            <h2 className='subscribers-title'>Subscribed Users</h2>

            {loading && <p>Loading...</p>}
            {error && <p className='subscribers-error'>{error}</p>}

            {!loading && subscribers.length === 0 && (
                <p className='subscribers-empty'>No subscribes found.</p>
            )}

            {!loading && subscribers.length > 0 && (
                <>
                    <table className="subscribers-table">
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Id.</th>
                                <th>Email</th>
                                <th>State</th>
                                <th>Subscribed On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSubscribers.map((sub, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{sub.id}</td>
                                    <td>{sub.email}</td>
                                    <td>{US_STATES.find(state => state.code === sub.state)?.name || sub.state}</td>
                                    <td>{sub.subscribedAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination-controls">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>

                        <span>Page {currentPage} of {totalPages}</span>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewSubscribers