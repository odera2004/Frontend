import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        "Authorization": `Bearer ${authToken}` 
      },
      body: JSON.stringify({ email, password })
    })
    .then((resp) => resp.json())
    .then((response) => {
      if (response.access_token) {
        toast.dismiss();
        sessionStorage.setItem("token", response.access_token);
        setAuthToken(response.access_token);

        fetch("http://127.0.0.1:5000/current_user", {
          method: "GET",
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${response.access_token}`
          }
        })
        .then((response) => response.json())
        .then((response) => {
          if (response.email) {
            setCurrentUser(response);
            // Store user role in sessionStorage
            const role = response.role ? response.role.toLowerCase() : "user";
            sessionStorage.setItem("userRole", role);
            
            // Redirect based on user role
            redirectBasedOnRole(role);
          }
        });

        toast.success("Successfully Logged in");
      } else if (response.error) {
        toast.dismiss();
        toast.error(response.error);
      } else {
        toast.dismiss();
        toast.error("Failed to login");
      }
    })
    .catch((error) => {
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
      if (response.access_token) {
        toast.dismiss();
        sessionStorage.setItem("token", response.access_token);
        setAuthToken(response.access_token);

        fetch("http://127.0.0.1:5000/current_user", {
          method: "GET",
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${response.access_token}`
          }
        })
        .then((response) => response.json())
        .then((response) => {
          if (response.email) {
            setCurrentUser(response);
            // Store user role in sessionStorage
            const role = response.role ? response.role.toLowerCase() : "user";
            sessionStorage.setItem("userRole", role);
            
            // Redirect based on user role
            redirectBasedOnRole(role);
          }
        });

        toast.success("Successfully Logged in");
      } else if (response.error) {
        toast.dismiss();
        toast.error(response.error);
      } else {
        toast.dismiss();
        toast.error("Failed to login");
      }
    })
    .catch((error) => {
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
      sessionStorage.removeItem("userRole");
      setAuthToken(null);
      setCurrentUser(null);
      navigate("/login");
    })
    .catch((error) => {
      toast.dismiss();
      toast.error("Network error. Please try again.");
    });
  };

  // FETCH CURRENT USER
  useEffect(() => {
    if (authToken) {
      fetchCurrentUser();
    }
  }, [authToken]);

  const fetchCurrentUser = () => {
    fetch("http://127.0.0.1:5000/current_user", {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.email) {
        setCurrentUser(response);
        // Store user role in sessionStorage
        const role = response.role ? response.role.toLowerCase() : "user";
        sessionStorage.setItem("userRole", role);
      }
    })
    .catch((error) => {
      console.error("Failed to fetch current user", error);
      logout();
    });
  };

  // ADD USER
  const addUser = (first_name, last_name, email, password) => {
    console.log("Registering user with:", { first_name, last_name, email }); 
    toast.loading("Registering...");
    fetch("http://127.0.0.1:5000/user", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${authToken}` 
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
      if (response.msg) {  
        toast.dismiss();
        toast.success(response.msg);  
        navigate("/login");
      } else if (response.error) {
        toast.dismiss();
        toast.error(response.error);
      } else {
        toast.dismiss();
        toast.error("Failed to register");
      }
    })
    .catch((error) => {
      console.error("Registration error:", error);  
      toast.dismiss();
      toast.error("Network error. Please try again.");
    });
  };

  // Helper function to redirect based on role
  const redirectBasedOnRole = (role) => {
    switch(role) {
      case "admin":
        navigate("/dashboard");
        break;
      case "technician":
      case "guard":
        navigate("/task");
        break;
      case "user":
      default:
        navigate("/home");
        break;
    }
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