import { createContext, useContext, useState } from 'react';

// Kontext erstellen
const RoleContext = createContext();

// Custom Hook
export const useRole = () => useContext(RoleContext);

// Provider-Component
export const RoleProvider = ({ children }) => {
    const [rolle, setRolle] = useState('besucher'); // besucher | benutzer | admin
    const [nutzername, setNutzername] = useState('');

    return (
        <RoleContext.Provider value={{ rolle, setRolle, nutzername, setNutzername }}>
            {children}
        </RoleContext.Provider>
    );
};