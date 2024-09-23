import { useState } from "react";
import "../styles/dataupload.css";
import { SlEnergy } from "react-icons/sl";
import { useStateContext } from "../context/ContextProvider";
import { protectedApi } from "../config/axios.js";
import { handleError } from "../utils/toast.js";
import { useNavigate } from 'react-router-dom';

const DataUpload = () => {
  const { user ,energyCount,settingEnergyCount,settingCurrentResult,settingToastMessage} = useStateContext();
  const [loading,setLoading] = useState(false);
  const [formData, setFormData] = useState({
    min_support: null,
    min_confidence: null,
    title: "",
  });
  const [dfile, setDfile] = useState(null);
  const navigate = useNavigate();

  const handleInputChnage = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (energyCount < 1) {
      handleError("You don't have enough energy! Please purchase some");
      return;
    }
    try {
      //console.log(formData, user.id);
      const res1 = await protectedApi.post("/energy/check-energy", {
        userId: user.id,
      });
      if (res1.data.success !== true) {
        handleError(res1.data.message);
        return;
      }
      const response = await protectedApi.post(
        "/analysis/upload",
        { userId: user.id, dfile, ...formData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success === true) {
        e.target.reset();
        settingToastMessage(response.data.message);
        settingEnergyCount(response.data.energy_count);
        settingCurrentResult(response.data.result);
        navigate("/home/result")
      }
      if (response.data.success === false) {
        
        handleError(response.data.message);
      }
      console.log(response.data.error[0].message);
    } catch (err) {
      
      console.log(err);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="form-container-dataupload">
      <h2>Perform Market Basket Analysis</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Give a title to Dataset/Transaction</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="i.e Dataset 1 (must be unique)"
            value={formData.title}
            onChange={handleInputChnage}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file-upload" className="file-upload-label">
            Select the transactions file (csv file)
          </label>
          <input
            id="file-upload"
            name="dfile"
            type="file"
            onChange={(e) => setDfile(e.target.files[0])}
            accept=".csv"
          />
        </div>
        <div className="form-group">
          <label htmlFor="min-confidence">Minimum Confidence</label>
          <input
            id="min-confidence"
            type="number"
            name="min_confidence"
            placeholder="recommended 0.8 i.e 80% (0.0 to 1.0)"
            min="0"
            max="1.0"
            step="0.01"
            value={formData.min_confidence}
            onChange={handleInputChnage}
          />
        </div>
        <div className="form-group">
          <label htmlFor="support">Minimum Support</label>
          <input
            id="support"
            type="number"
            min="0"
            placeholder="decimal value"
            name="min_support"
            value={formData.min_support}
            onChange={handleInputChnage}
          />
        </div>

        <button type="submit">
        {loading ? "Performing analysis... ": ( <>
          Perform Analysis <SlEnergy color="yellow" fontSize={20} />
        </>)}
         
        </button>
      </form>
    </div>
  );
};
export default DataUpload;
