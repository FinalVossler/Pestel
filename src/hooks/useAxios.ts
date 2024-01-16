import axios from "axios";
import { toast } from "react-toastify";
import { IErrorResponse } from "roottypes";

const useAxios = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: IErrorResponse) => {
      const message: string = error.response.data.error.message;

      toast.error(message);

      throw new Error(error.response.data.error.message);
    }
  );

  return instance;
};

export default useAxios;
