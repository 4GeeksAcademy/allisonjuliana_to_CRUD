import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';  // Importa el contexto
import "../../styles/actor.css";  // Aquí puedes agregar tus estilos adicionales si los necesitas

const ActorForm = () => {
    const [actor, setActor] = useState('');
    const [country, setCountry] = useState('');
    const [age, setAge] = useState('');
    const [message, setMessage] = useState('');
    const [actorsList, setActorsList] = useState([]);  // Estado para almacenar los actores
    const [editMode, setEditMode] = useState(false); // Estado para saber si estamos editando
    const [selectedActorId, setSelectedActorId] = useState(null); // Para saber cuál actor estamos editando

    const { actions, store } = useContext(Context);

    // Utiliza la variable de entorno REACT_APP_BACKEND_URL si está disponible
    const backendUrl = process.env.REACT_APP_BACKEND_URL || process.env.BACKEND_URL;

    useEffect(() => {
        // Obtiene todos los actores cuando el componente se monta
        fetchActors();
    }, []);

    // Función para obtener todos los actores
    const fetchActors = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/user`);
            const data = await response.json();
            if (response.ok) {
                setActorsList(data.users);  // Asumiendo que el backend devuelve los actores en data.users
            } else {
                setMessage('Failed to load actors.');
            }
        } catch (error) {
            setMessage('Error fetching actors.');
            console.error('Error fetching actors:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!actor || !country || !age) {
            setMessage('All fields are required!');
            return;
        }

        // Aquí verificamos si estamos en modo edición
        const url = editMode 
            ? `${backendUrl}/api/user/${selectedActorId}`  // Para PUT, usamos el ID del actor
            : `${backendUrl}/api/user`;  // Para POST, no necesitamos ID

        const method = editMode ? 'PUT' : 'POST';  // Si estamos en modo editar, usamos PUT
        const body = JSON.stringify({
            actor,
            country,
            age,
        });

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            const data = await response.json();

            if (response.ok) {
                // Limpiamos el formulario y desactivamos el modo edición
                setActor('');
                setCountry('');
                setAge('');
                setEditMode(false);  // Desactivamos el modo edición
                setSelectedActorId(null);  // Reseteamos el actor seleccionado
                fetchActors();  // Vuelve a cargar la lista de actores
            }

            setMessage(data.message);
        } catch (error) {
            setMessage('Error creating or updating actor.');
            console.error('Error making request:', error);
        }
    };

    // Función para eliminar un actor
    const handleDelete = async (actorId) => {
        const url = `${backendUrl}/api/user/${actorId}`;
        try {
            const response = await fetch(url, { method: 'DELETE' });
            const data = await response.json();
    
            if (response.ok) {
                // Actualiza la lista de actores localmente después de eliminar uno
                setActorsList((prevActorsList) => {
                    const newActorsList = prevActorsList.filter(actor => actor.id !== actorId);
                    // Si la lista está vacía, también establece un mensaje vacío o similar
                    if (newActorsList.length === 0) {
                        setMessage("No actors available.");
                    }
                    return newActorsList;
                });
                setMessage(data.message || 'Actor deleted successfully.');
            } else {
                setMessage('Failed to delete actor.');
            }
        } catch (error) {
            setMessage('Error deleting actor.');
            console.error('Error deleting actor:', error);
        }
    };

    // Función para manejar el clic en el botón "Editar"
    const handleEdit = (actorId) => {
        const actorToEdit = actorsList.find((actor) => actor.id === actorId);
        if (actorToEdit) {
            setActor(actorToEdit.actor);
            setCountry(actorToEdit.country);
            setAge(actorToEdit.age);
            setSelectedActorId(actorId); // Establecemos el actor seleccionado
            setEditMode(true); // Activamos el modo de edición
        }
    };

    return (
        <div className="container mt-5 mb-5 container-dark">
            <h2 className="text-center mb-4">{editMode ? 'Edit Actor' : 'Create Actor'}</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
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
                        <button type="submit" className="btn btn-success w-100">
                            {editMode ? 'Save Changes' : 'Create Actor'}
                        </button>
                    </form>
                </div>
            </div>

            {message && <p className="mt-3 text-center text-dark">{message}</p>}

            <h3 className="text-center mt-5">Actors List</h3>
            <div className="mt-4 col-md-6 mx-auto">
                <ul className="list-group">
                    {actorsList.length > 0 ? (
                        actorsList.map((actor) => (
                            <li key={actor.id} className="list-group-item d-flex justify-content-between align-items-center">
                                {actor.actor} ({actor.country}, {actor.age} years)
                                <div>
                                    <button
                                        className="btn btn-warning mr-2"
                                        onClick={() => handleEdit(actor.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(actor.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="mt-3 text-center text-dark">No actors available.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ActorForm;
