import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';  // Importa el contexto
import "../../styles/home.css";  // Aquí puedes agregar tus estilos adicionales si los necesitas

const ActorForm = () => {
    const [actor, setActor] = useState('');
    const [country, setCountry] = useState('');
    const [age, setAge] = useState('');
    const [message, setMessage] = useState('');

    const { actions, store } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!actor || !country || !age) {
            setMessage('All fields are required!');
            return;
        }
    
        // Verifica la URL antes de hacer la solicitud
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/user`;
        console.log('Making request to:', url);
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    actor,
                    country,
                    age,
                }),
            });
    
            const data = await response.json();
    
            if (data.message && data.message.includes('created successfully')) {
                setActor('');
                setCountry('');
                setAge('');
            }
    
            setMessage(data.message);
        } catch (error) {
            setMessage('Error creating actor.');
            console.error('Error making POST request:', error);
        }
    };
    

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Create Actor</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="actor" className="form-label">Actor:</label>
                    <input
                        type="text"
                        id="actor"
                        className="form-control"
                        value={actor}
                        onChange={(e) => setActor(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country:</label>
                    <input
                        type="text"
                        id="country"
                        className="form-control"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age:</label>
                    <input
                        type="number"
                        id="age"
                        className="form-control"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">Create Actor</button>
            </form>

            {message && <p className="mt-3 text-center text-danger">{message}</p>}
        </div>
    );
};

export default ActorForm;
