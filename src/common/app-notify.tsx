import { toast } from "react-toastify";
const { v4: uuidv4 } = require("uuid");

class AppNotify {
  notifyError(message: string) {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: 0,
      toastId: "toast_id",
    });
  }

  notifySuccess(message: string) {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: 0,
      toastId: "toast_id",
    });
  }
}

let appNotify = new AppNotify();
export default appNotify;