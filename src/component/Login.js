import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setLoginDetails } from "./redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../services/authServices";

const Login = () => {
  const login = useSelector((state) => state.authorisation.loginDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedLogin = {
      ...login,
      [name]: value,
    };
    dispatch(setLoginDetails(updatedLogin));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const isAuthenticated = await signIn(login.username, login.password);

      if (isAuthenticated) {
        navigate("/dashboard");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
