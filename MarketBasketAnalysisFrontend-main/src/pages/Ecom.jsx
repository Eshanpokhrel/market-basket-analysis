import React, { useState } from "react";
import { protectedApi } from "../config/axios";
import axios from "axios";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";


const Ecom = () => {
      const {
        user,
        energyCount,
        settingEnergyCount,
        settingCurrentResult,
        settingToastMessage,
      } = useStateContext();
    const [apiResult,setApiResult] = useState();
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [title, setTitle] = useState("");
  const [minSupport, setMinSupport] = useState("");
  const [minConfidence, setMinConfidence] = useState("");
    const navigate = useNavigate();


  const handleApiEndpointSubmit =async (e) => {
      
    e.preventDefault();
          const res = await axios.get(apiEndpoint);
          setApiResult(res.data);
          console.log(apiResult)
  };
  //console.log(apiEndpoint)

  const handleAssociationRulesSubmit =async (e) => {
    e.preventDefault();

    const res = await protectedApi.post("/analysis/ecom", {
      title: title,
      min_support: minSupport,
      min_confidence: minConfidence,
      api_result: apiResult,
      userId: user.id,
    });
     if (res.data.success === true) {
       e.target.reset();
       settingToastMessage(res.data.message);
       settingEnergyCount(res.data.energy_count);
       settingCurrentResult(res.data.result);
       navigate("/home/result");
     }
    console.log(res)
  };

  return (
    <div>
      <h2>API Endpoint Form</h2>
      <form onSubmit={handleApiEndpointSubmit}>
        <label>
          API Endpoint:
          <input
            type="text"
            placeholder="Enter API Endpoint"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {apiResult && (
        <>
          <h2>Association Rules Form</h2>
          <form onSubmit={handleAssociationRulesSubmit}>
            <label>
              Title:
              <input
              name="title"
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Min Support:
              <input
              name="min_support"
                type="number"
                placeholder="Enter Min Support"
                value={minSupport}
                onChange={(e) => setMinSupport(e.target.value)}
              />
            </label>
            <label>
              Min Confidence:
              <input
                type="number"
                name="min_confidence"
                placeholder="Enter Min Confidence"
                value={minConfidence}
                onChange={(e) => setMinConfidence(e.target.value)}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Ecom;
