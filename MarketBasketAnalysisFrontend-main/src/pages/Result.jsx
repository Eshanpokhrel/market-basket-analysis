import DisplayResult from "../component/DisplayResult.jsx";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useEffect } from "react";
import { handleSuccess } from "../utils/toast.js";
const Result = () => {
  const { currentResult,toastMessage,settingToastMessage } = useStateContext();
  useEffect(()=>{
     if (toastMessage !== null) {
      handleSuccess(toastMessage);
      settingToastMessage(null);
    }
  },[])
  
  const styles = {
    color : 'red',
    maxWidth : "300px",
    padding : "5px"
  }
  return (
    <>
    <div className="current_analysis_heading" style={styles}>
      <h2 >Current Result analysis</h2>
    </div>
    
    {currentResult ? ( <DisplayResult data={currentResult}/>):(<p>No current analysis to display result</p>)}
     
    </>
  )
}
export default Result;
