import { useEffect,useState } from "react";
import { useParams ,Link} from "react-router-dom";
import { protectedApi } from "../config/axios";
import DisplayResult from "../component/DisplayResult";

const HistoryDetail = () => {
  const [data, setData] = useState(null);
  const { dataId } = useParams();
 // console.log(dataId)
  useEffect(() => {
    const call = async () => {
      try {
        const response = await protectedApi.get(
          `/analysis/singleAnalysisResult/${dataId}`
        );
       // console.log(response)
        if(response.data.success ===true){
            setData({
              result: response.data.data,
              title: response.data.title,
              min_support: response.data.min_support,
              min_confidence: response.data.min_confidence,
            });
            //console.log(data)
        }
      } catch (err) {
        console.log(err);
      }
    };
    call();
  }, []);


  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h2>Detail Result </h2>
        <Link style={{ color: "red" }} to="/home/history">
          Go back
        </Link>
      </div>
      {data && (
        <>
          <p style={{ color: "#6c5ce7" ,fontWeight :"bolder" }}>Dataset title : {data.title}</p>
          <p>Min Confidence : {data.min_confidence}</p>
          <p>Min Support : {data.min_support}</p>
          <DisplayResult data={data.result} />
        </>
      )}
    </>
  );
};
export default HistoryDetail;
