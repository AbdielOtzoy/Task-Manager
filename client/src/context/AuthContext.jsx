import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest} from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => { 

    const [user, setuser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const singup = async (user) => { 
        try {
            const res = await registerRequest(user);
            setuser(res.data)
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);

        }
    }

    
    const singin = async (user) => { 
        try {
            const res = await loginRequest(user);
            setIsAuthenticated(true);
            setuser(res.data);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
                console.log(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    const logout = () => { 
        Cookies.remove('token');
        setIsAuthenticated(false);
        setuser(null);
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 4000)
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        const checkLogin = async () => { 
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            if (cookies.token) {
                try {
                    const res = await verifyTokenRequest(cookies.token);
                    if (!res.data) {
                        setIsAuthenticated(false)
                        setLoading(false);
                        return;
                    }
                    

                    setIsAuthenticated(true);
                    setuser(res.data);
                    setLoading(false);
                } catch (error) {
                    setIsAuthenticated(false);
                    setuser(null);
                    setLoading(false);
                }
            }
        }
        checkLogin();
    }, []);
    return (
        <AuthContext.Provider value={{
            singup,
            singin,
            logout,
            loading,
            user,
            isAuthenticated,
            errors,

        }}>
            {children}
        </AuthContext.Provider>
    )
}
