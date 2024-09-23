import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//toast
export const handleSuccess = (msg) => {
  // API call is successful
  toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const handleError = (errorData) => {
  // API call resulted in an error
  // let errorMessage = "";
  // for (const key in errorData) {
  //   if (errorData.hasOwnProperty(key)) {
  //     const values = errorData[key].join(", ");
  //     errorMessage += `${values}\n`;
  //   }
  // }
  toast.error(errorData, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
