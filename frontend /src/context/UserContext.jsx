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
    .then((resp) => {
      if (!resp.ok) {
        return resp.json().then(errorData => {
          throw new Error(errorData.error || "Failed to login ❌");
        });
      }
      return resp.json();
    })
    .then((response) => {
      toast.dismiss();
      if (response.access_token) {
        sessionStorage.setItem("token", response.access_token);
        setAuthToken(response.access_token);
  
        fetch("http://127.0.0.1:5000/current_user", {
          method: "GET",
          headers: {
            'Content-type': 'application/json',
            "Authorization": `Bearer ${response.access_token}`
          }
        })
        .then((response) => response.json())
        .then((response) => {
          if (response.email) {
            setCurrentUser(response);
            const role = response.role ? response.role.toLowerCase() : "user";
            sessionStorage.setItem("userRole", role);
            redirectBasedOnRole(role);
          }
        });
  
        toast.success("Successfully Logged in 🎉");
        console.log("Toast triggered");
        
      } else {
        toast.error(response.error || "Failed to login ❌");
      }
    })
    .catch((error) => {
      toast.dismiss();
      toast.error(error.message || "Network error. Please try again.");
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

        fetch("http://127.0.0.1:5000/current_user", {
          method: "GET",
          headers: {
            'Content-type': 'application/json',
            "Authorization": `Bearer ${response.access_token}`
          }
        })
        .then((response) => response.json())
        .then((response) => {
          if (response.email) {
            setCurrentUser(response);
            const role = response.role ? response.role.toLowerCase() : "user";
            sessionStorage.setItem("userRole", role);
            redirectBasedOnRole(role);
          }
        });

        toast.success("Logged in with Google 🌐");
      } else {
        toast.error(response.error || "Google login failed ❌");
      }
    })
    .catch(() => {
      toast.dismiss();
      toast.error("Network error. Please try again.");
    });
  };

  // LOGOUT
  const logout = () => {
    toast.loading("Logging out...");
    fetch("http://127.0.0.1:5000/logout", {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${authToken}`
      }
    })
    .then((response) => response.json())
    .then((response) => {
      toast.dismiss();
      if (response.success) {
        toast.success("Logged out successfully! 🚀");
      } else {
        toast.error(response.error || "Logout failed ❌");
      }
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userRole");
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
        "Authorization": `Bearer ${authToken}`
      }
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.email) {
        setCurrentUser(response);
        const role = response.role ? response.role.toLowerCase() : "user";
        sessionStorage.setItem("userRole", role);
      }
    })
    .catch(() => {
      console.error("Failed to fetch current user");
      logout();
    });
  };

  // ADD USER (REGISTER)
  const addUser = (first_name, last_name, email, password) => {
    console.log("Registering user with:", { first_name, last_name, email });
    toast.loading("Registering...");
    fetch("http://127.0.0.1:5000/user", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${authToken}` 
      },
      body: JSON.stringify({ first_name, last_name, email, password })
    })
    .then((resp) => {
      if (!resp.ok) {
        // If the response is not ok, parse the error message
        return resp.json().then(errorData => {
          throw new Error(errorData.error || "Email already exists");
        });
      }
      return resp.json();
    })
    .then((response) => {
      toast.dismiss();
      if (response.msg) {
        toast.success("Account created successfully! 🎉");
        navigate("/login");
      } else {
        toast.error(response.error || "Registration failed ❌");
      }
    })
    .catch((error) => {
      toast.dismiss();
      toast.error(error.message || "Network error. Please try again.");
    });
  };
    // UPDATE USER
    const updateUser = (user_id, updatedData) => {
      toast.loading("Updating user...");
      return fetch(`http://127.0.0.1:5000/users/${user_id}`, {
        method: "PUT",
        headers: {
          'Content-type': 'application/json',
          "Authorization": `Bearer ${authToken}` 
        },
        body: JSON.stringify(updatedData)
      })
      .then((resp) => {
        if (!resp.ok) {
          return resp.json().then(errorData => {
            throw new Error(errorData.error || "Failed to update user ❌");
          });
        }
        return resp.json();
      })
      .then((response) => {
        toast.dismiss();
        if (response.msg) {
          toast.success("User updated successfully! 🎉");
          fetchCurrentUser(); // Refresh the current user data
          return response; // Resolve the promise
        } else {
          throw new Error(response.error || "Failed to update user ❌");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message || "Network error. Please try again.");
        throw error; // Re-throw the error to propagate it
      });
    };

  // DELETE USER
  const deleteUser = (user_id) => {
    toast.loading("Deleting user...");
    fetch(`http://127.0.0.1:5000/users/${user_id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${authToken}` 
      }
    })
    .then((resp) => {
      if (!resp.ok) {
        return resp.json().then(errorData => {
          throw new Error(errorData.error || "Failed to delete user ❌");
        });
      }
      return resp.json();
    })
    .then((response) => {
      toast.dismiss();
      if (response.msg) {
        toast.success("User deleted successfully! 🎉");
        logout(); // Log out the user after deletion
      } else {
        toast.error(response.error || "Failed to delete user ❌");
      }
    })
    .catch((error) => {
      toast.dismiss();
      toast.error(error.message || "Network error. Please try again.");
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
    updateUser,
    deleteUser,
    fetchCurrentUser
  };

  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
};