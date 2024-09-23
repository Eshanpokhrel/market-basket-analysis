import { Outlet, Navigate, NavLink } from "react-router-dom";
import "../styles/defaultlayout.css";
import { SlEnergy } from "react-icons/sl";
import { protectedApi } from "../config/axios.js";
import { useEffect } from "react";
import { handleSuccess } from "../utils/toast.js";
import {
  FaTachometerAlt,
  FaChartBar,
  FaSignOutAlt,
  FaUpload,
  FaRegGem,
  FaHistory,
  FaUser
} from "react-icons/fa";
import { useStateContext } from "../context/ContextProvider";
import { ToastContainer } from "react-toastify";


const UserLayout = () => {
  const {
    user,
    settingUser,
    token,
    settingToken,
    toastMessage,
    settingToastMessage,
    energyCount,
    settingEnergyCount,
    settingCurrentResult
  } = useStateContext();
  // console.log(!token)
  if (!token) {
    return <Navigate to="/guest/login" />;
  }

  // console.log(user)
  useEffect(() => {
    if (toastMessage !== null) {
      handleSuccess(toastMessage);
      settingToastMessage(null);
    }
    const checkToken = async () => {
      try {
        const res = await protectedApi.get("/auth/test");
        if (res.data.status == 401 || res.data.status == 403) {
          settingUser(null);
          settingToken(null);
          settingEnergyCount(null);
          return <Navigate to="/login/guest" />;
        }
        settingEnergyCount(res.data.energyCount);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    checkToken();

    const interval = setInterval(() => {
      protectedApi.get("/auth/refresh").then((res) => {
        const token = res.data.accessToken;
        //console.log(token);
        settingToken(token);
      });
    }, 18000000); //every 5 hrs

    return () => clearInterval(interval);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    protectedApi.post("/auth/logout").then(() => {
      settingEnergyCount(null);
      settingCurrentResult(null);
      settingUser(null);
      settingToken(null);
    });
  };

  const sideBarLinks = [
    {
      id: 1,
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      link: "/home/dashboard",
      role: user.role ?? null,
    },
    // {
    //   id: 2,
    //   name: "Profile",
    //   icon: <FaChartBar />,
    //   link: "/home/profile",
    // },
    {
      id: 3,
      name: "Energy",
      icon: <SlEnergy />,
      link: "/home/energy",
      role: user.role == "user" ? "user" : null,
    },
    {
      id: 4,
      name: "Perform MBA",
      icon: <FaUpload />,
      link: "/home/upload",
      role: user.role == "user" ? "user" : null,
    },
    {
      id: 4,
      name: "Past Analysis Data",
      icon: <FaHistory />,
      link: "/home/history",
      role: user.role == "user" ? "user" : null,
    },
    {
      id: 5,
      name: "Result",
      icon: <FaRegGem />,
      link: "/home/result",
      role: user.role == "user" ? "user" : null,
    },
    {
      id: 6,
      name: "Connect To Ecom",
      icon: <FaRegGem />,
      link: "/home/ecom",
      role: user.role == "user" ? "user" : null,
    },
    {
      id: 7,
      name: "User Management",
      icon: <FaUser />,
      link: "/home/user-manage",
      role: user.role == "admin" ? "admin" : null,
    },
  ];

  return (
    <>
      <>
        <div className="user_dashboard">
          <div className="user_sidebar">
          {
            user.role == "admin" ? (<> <h3>Admin Dashboard</h3></>) : (<><h3>User Dashboard</h3></>)
          }
            <ul>
              {sideBarLinks.map((element) => {
              //  console.log(element.role)
                if(element.role ==="user" || element.role == "admin"){
                      return (
                  <li key={element.id}>
                    <NavLink
                      // key={element.id}
                      to={element.link}
                      className={({ isActive }) =>
                        isActive ? "active_navlink" : ""
                      }
                    >
                      {element.icon}
                      {element.name}
                    </NavLink>
                  </li>
                );
                }
            
              })}
            </ul>
          </div>
          <div className="user_dashboard_content">
            <div className="user_navbar">
              <div className="user_profile">
                <span>Hello {user.username}</span>
              </div>
              {
                user.role === 'user' && (<>
                    <div className="user_profile">
                <span
                  style={{
                    color: energyCount > 0 ? "green" : "red",
                  }}
                >
                  Energy {energyCount}
                </span>
              </div>
                </>)
              }
              <div className="user_handle">
                <button onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
            <div className="user_dashboard_main_content">
              <Outlet user={user} />
            </div>
          </div>
          <ToastContainer />
        </div>
      </>
    </>
  );
};
export default UserLayout;
