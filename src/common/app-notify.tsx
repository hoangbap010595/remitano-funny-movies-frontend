import { ToastContent, TypeOptions, toast } from "react-toastify";
const { v4: uuidv4 } = require("uuid");

class AppNotify {
  notify(message: string, type?: TypeOptions) {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      type: type,
      closeOnClick: true,
      pauseOnHover: true,
      toastId: uuidv4().toString(),
    });
  }

  notifyCustom(content: ToastContent) {
    toast(content, {
      closeOnClick: false,
      pauseOnHover: true,
      toastId: uuidv4().toString(),
    });
  }
}

let appNotify = new AppNotify();
export default appNotify;
