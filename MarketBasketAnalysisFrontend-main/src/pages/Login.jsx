import { useState, useEffect } from "react";
import "../styles/Login.css";
import { api as apiCall } from "../config/axios.js";
import LoginImage from "../assets/image/hsss-removebg-preview.png";
import { ToastContainer } from "react-toastify";
import { useStateContext } from "../context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/toast.js";

const Login = () => {
  const {
    user,
    settingUser,
    settingToken,
    toastMessage,
    settingToastMessage,
    settingEnergyCount,
  } = useStateContext();

  const [loginCred, setLoginCred] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setLoginCred({
      ...loginCred,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await apiCall.post("/auth/login", loginCred);
      if (response.data.success === true) {
        const { accessToken, authUser } = response.data;
        settingUser(authUser);
        settingToken(accessToken);
        settingEnergyCount(authUser.Energy.energy_count);
        settingToastMessage("Login Successfull");
        navigate("/home/dashboard");
      } else {
        // console.log(response.data)
        handleError(response.data.message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <>
      <div className="container-signin">
        <div className="form-container">
          {/* <div className="left-container-signin">
            <img src={LoginImage} alt="" />
          </div> */}
          <div className="wrapper">
            <h3 className="title">Member Login</h3>
            <form onSubmit={handleLogin}>
              <div className="field">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="form-input"
                  value={loginCred.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                {" "}
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input"
                  name="password"
                  id="password"
                  onChange={handleInputChange}
                />
              </div>
              {/* <div className="checkbox">
                  <input type="checkbox" id="remember-me" />
                  <label for="remember-me" className="rememberme">Remember me</label>
               </div> */}
              <div className="field">
                <input  type="submit" value="login" />
                  
              </div>
             
              <div className="signup-link">
                Not a member? 
                  <Link to="/guest/register" ><a href="#">
                  Signup now</a></Link>
              </div>
            </form>
          </div>{" "}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default Login;
