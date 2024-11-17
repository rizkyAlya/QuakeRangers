import React, { useState, useEffect } from 'react';

// Create the context
const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUserID = localStorage.getItem('userID');  // Mengambil userID saja
        if (storedUserID) {
            setUser(storedUserID);  // Set userID di context
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('userID', user);  // Menyimpan userID di localStorage
        } else {
            localStorage.removeItem('userID');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };