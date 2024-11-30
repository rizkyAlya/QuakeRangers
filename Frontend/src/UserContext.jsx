import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUserID = localStorage.getItem('userID'); 
        if (storedUserID) {
            setUser(storedUserID);
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('userID', user);  
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