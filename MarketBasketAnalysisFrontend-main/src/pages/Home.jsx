// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { protectedApi } from "../config/axios";
import "../styles/dashboard.css";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

const Home = () => {
  const { user, energyCount } = useStateContext();
  const [dashboardData, setDashboardData] = useState({
    totalAmount: null,
    totalAnalysisPerformed: null,
    totalUser: null,
    totalQuantity: null,
  });
  const [totalAnalysisUser,setTotalAnalysisUser] = useState(null);

  // const navigate = useNavigate();

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
          {/* <div
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
          </div> */}
          <Box height={70}>
              <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
        <Grid item xs={8}>
        <Stack
        direction="row"
        spacing={2}
      >
        <Card sx={{ minWidth: 70 + "%", height:150 }} className="gradient_card" style={{ background: "linear-gradient(158deg, rgba(40, 34, 70, 1) 0%, rgba(30, 47, 141, 1) 100%)" }}>
     
      <CardContent>
     <div className="iconstyle"> <ShoppingCartIcon /></div>
        <Typography variant="h5" gutterBottom sx={{ color: "#ffffff" }}>
        {energyCount}
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ color: "#ffffff" }} >
        Total Enerygy
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{ minWidth: 70 + "%", height:150 }} className="gradient_card" style={{  marginLeft: '90px', background: "linear-gradient(158deg, rgba(53, 138, 148, 1) 0%, rgba(91, 180, 96, 1) 100%)" }}>
     
     <CardContent>
     <div className="iconstyle"> <SignalCellularAltIcon /></div>

     <Typography variant="h5" gutterBottom sx={{ color: "#ffffff" }}>
        {totalAnalysisUser ?? '0'}
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ color: "#ffffff" }}>
        Total Analysis Done
        </Typography>
     </CardContent>
   </Card>
  
   </Stack>
        </Grid>
    

      </Grid>

      </Box>
      </Box>
        </>
      )}
    </>
  );
};

export default Home;
