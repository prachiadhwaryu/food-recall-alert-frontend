import { use, useState, useEffect} from 'react';
import axios from 'axios';
import { US_STATES } from '../constants/usStates';
import '../css/Subscribe.css';

function Subscribe() {
    const [email, setEmail] = useState('');
    const [state, setState] = useState('');
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            setMessage("Please enter a valid email address (e.g. user@example.com)");
            setMessageType("error");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8081/api/subscriptions", {
            email,
            state
            });

            setMessage("Subscription successful!");
            setMessageType("success");
            setEmail("");
            setState("");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message); // Validation error
            } else {
                setMessage("Something went wrong. Please try again.");
            }
            setMessageType("error");
        }
    };

  return (
    <div className="subscribe-container">
        <h2>Subscribe for Food Recall Alerts</h2>
        <form onSubmit={handleSubmit} className="subscribe-form">
        
        <div>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                title="Please enter a valid email address (e.g. user@example.com)"
            />
        </div>

        <div>
            <label>State:</label>
            <select value={state} onChange={(e) => setState(e.target.value)} required>
            <option value="">Select a state</option>
            {US_STATES.map((state) => (
                    <option key={state.code} value={state.code}>
                        {state.name}
                    </option>
            ))}
            </select>
        </div>

        <button type="submit">Subscribe</button>
    </form>
    {message && (
        <div className={`feedback-message ${messageType}`}>
            {message}
        </div>
    )}
</div>

  );
};

export default Subscribe;
