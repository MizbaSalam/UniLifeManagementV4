import React, { useEffect, useState, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import { auth } from './firebase-config'; // Make sure this import matches your file structure
// Inside firebase-config.js or immediately after importing auth in another file
console.log(auth);

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attach the listener directly to the auth object, not invoking it as a function
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe; // Corrected to return the unsubscribe function directly
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
          {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
