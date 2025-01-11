import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { protectedApi } from "../config/axios";
import "../styles/dashboard.css";


const Home = () => {
  const { user, energyCount } = useStateContext();
  const [dashboardData, setDashboardData] = useState({
    totalAmount: null,
    totalAnalysisPerformed: null,
    totalUser: null,
    totalQuantity: null,
  });
  const [totalAnalysisUser,setTotalAnalysisUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.role === "admin") {
      const populateDash = async () => {
        try {
          const response = await protectedApi.get("/admin/populate-dashboard");
          if (response.data.success === true) {
            setDashboardData({
              totalAmount: response.data.totalAmount,
              totalAnalysisPerformed: response.data.totalAnalysisPerformed,
              totalUser: response.data.userCount,
              totalQuantity: response.data.totalQuantity,
            });
          }
        } catch (err) {
          console.log(err);
        }
      };
      populateDash();
    }else{
      const totalAnalysis = async () =>{
        try{

          const response = await protectedApi.get(`/analysis/totalAnalysis/${user.id}`);
          if(response.data.success == true){
            setTotalAnalysisUser(response.data.count);
          }
        }catch(err){
          console.log(err);
        }
      }
      totalAnalysis();
    }
  }, [user]);

  return (
    <>
      {user.role === "admin" ? (
        <>
          <h1>Admin</h1>
          <div className="dashboard-container">
            <div className="first-row">
              <div className="dashboard-card">
                <h2>Total amount earned from energy purchase</h2>
                <p>Rs : {dashboardData.totalAmount ?? "0"}</p>
              </div>
              <div className="dashboard-card">
                <h2>Total Analysis Done</h2>
                <p>{dashboardData.totalAnalysisPerformed}</p>
              </div>
            </div>
            <div>
              <div className="dashboard-card">
                <h2>Total Users</h2>
                <p>{dashboardData.totalUser ?? "0"}</p>
              </div>
              <div className="dashboard-card">
                <h2>Total Quantity</h2>
                <p>{dashboardData.totalQuantity}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              gap : "30px",
              textTransform : "uppercase",
              alignItems : "center",
              marginTop : "50px",
              justifyContent : "center",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(0, 128, 128, 0.6)",
                fontWeight: "bolder",
                color: "black",
                padding: "70px",
                borderRadius: "100%",
                fontSize: "35px",
                height: "300px",
                width : "600px",
                display : "flex",
                alignItems : "center",
                justifyContent : "center",
                fontFamily: "'Oswald', serif",
              }}
            >
              Total Energy : &nbsp;{energyCount}
            </div>
            <div
              style={{
                backgroundColor: "rgba(0, 128, 128, 0.6)",
                fontWeight: "bolder",
                color: "black",
                padding: "70px",
                borderRadius: "100%",
                fontSize: "35px",
                height: "300px",
                width : "600px",
                display : "flex",
                alignItems : "center",
                justifyContent : "center",
                fontFamily: "'Oswald', serif",
              }}
            >
              Total Analysis Done : &nbsp;{totalAnalysisUser??'0'}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
