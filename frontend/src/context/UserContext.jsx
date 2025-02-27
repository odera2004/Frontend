import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
    const [current_user, setCurrentUser] = useState(null);

    // LOGIN
    const login = (email, password) => {
        toast.loading("Logging you in...");
        fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        .then((resp) => resp.json())
        .then((response) => {
            toast.dismiss();
            if (response.access_token) {
                sessionStorage.setItem("token", response.access_token);
                setAuthToken(response.access_token);
                fetchCurrentUser(response.access_token);
                toast.success("Successfully Logged in");
                navigate("/");
            } else {
                toast.error(response.error || "Failed to login");
            }
        })
        .catch(() => {
            toast.dismiss();
            toast.error("Network error. Please try again.");
        });
    };

    // LOGIN WITH GOOGLE
    const login_with_google = (email) => {
        toast.loading("Logging you in...");
        fetch("http://127.0.0.1:5000/login_with_google", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email })
        })
        .then((resp) => resp.json())
        .then((response) => {
            toast.dismiss();
            if (response.access_token) {
                sessionStorage.setItem("token", response.access_token);
                setAuthToken(response.access_token);
                fetchCurrentUser(response.access_token);
                toast.success("Successfully Logged in");
                navigate("/");
            } else {
                toast.error(response.error || "Failed to login");
            }
        })
        .catch(() => {
            toast.dismiss();
            toast.error("Network error. Please try again.");
        });
    };

    // LOGOUT
    const logout = async () => {
        toast.loading("Logging out...");
        fetch("http://127.0.0.1:5000/logout", {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.json())
        .then((response) => {
            toast.dismiss();
            if (response.success) {
                toast.success(response.success);
            } else {
                toast.error(response.error || "Logout failed");
            }
            sessionStorage.removeItem("token");
            setAuthToken(null);
            setCurrentUser(null);
            navigate("/login");
        })
        .catch(() => {
            toast.dismiss();
            toast.error("Network error. Please try again.");
        });
    };

    // FETCH CURRENT USER
    const fetchCurrentUser = (token = authToken) => {
        if (!token) return;

        fetch("http://127.0.0.1:5000/current_user", {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.email) {
                setCurrentUser(response);
            }
        })
        .catch(() => {
            toast.error("Session expired, logging out...");
            logout();
        });
    };

    useEffect(() => {
        if (authToken) {
            fetchCurrentUser();
        }
    }, [authToken]);

    // ADD USER
    const addUser = (first_name, last_name, email, password) => {
        toast.loading("Registering...");
        fetch("http://127.0.0.1:5000/user", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                first_name, 
                last_name, 
                email, 
                password
            })
        })
        .then((resp) => resp.json())
        .then((response) => {
            toast.dismiss();
            if (response.msg) {  
                toast.success(response.msg);  
                navigate("/login");
            } else {
                toast.error(response.error || "Failed to register");
            }
        })
        .catch(() => {
            toast.dismiss();
            toast.error("Network error. Please try again.");
        });
    };

    const data = {
        authToken,
        login,
        login_with_google,
        current_user,
        logout,
        addUser,
        fetchCurrentUser
    };

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
};
