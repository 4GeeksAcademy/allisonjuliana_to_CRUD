const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            // Agregar una nueva propiedad para almacenar usuarios
            users: []
        },
        actions: {
            // Función para obtener el mensaje de la API
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                setStore({ demo: demo });
            },

            // Nueva acción para crear un actor
            createActor: async (actorData) => {
                try {
                    // Realiza una solicitud POST al backend para agregar un nuevo actor
                    const response = await fetch(process.env.BACKEND_URL + '/api/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(actorData),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        // Actualiza el estado con el nuevo actor si se crea correctamente
                        setStore({
                            message: `Actor ${actorData.actor} has been created successfully.`,
                            users: [...getStore().users, data.user], // Añade el nuevo usuario a la lista
                        });
                    } else {
                        setStore({ message: data.msg || 'Failed to create actor.' });
                    }
                } catch (error) {
                    setStore({ message: 'Error creating actor. Please try again.' });
                    console.error("Error:", error);
                }
            }
        }
    };
};

export default getState;
