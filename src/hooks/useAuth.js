// src/hooks/useAuth.js
import { useContext } from "react";
import AuthContext from "../context/AuthProvider"; // Ensure AuthProvider exists or create it

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;