import React from "react";
import useAxios from "../useAxios";
import { AxiosResponse } from "axios";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";

type PestelData = {
  Political: number;
  Economic: number;
  Social: number;
  Technological: number;
  Environmental: number;
  Legal: number;
};

type PestelResponse = {
  contry: string;
  PESTEL: PestelData;
};

const LOCAL_STORAGE_KEY = "pestelData";

const useGetPestel = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAxios();

  const getPestel = (country: string) =>
    new Promise<PestelData>(async (resolve, reject) => {
      const dataInLocalStorage: PestelData = getLocalStorage({
        dataKey: LOCAL_STORAGE_KEY + country,
      });
      if (dataInLocalStorage) {
        resolve(dataInLocalStorage);
        return;
      }

      if (country) {
        setLoading(true);
        axios
          .request<AxiosResponse<PestelResponse>>({
            url: "/chatGPT/",
            params: {
              country,
            },
            method: "GET",
          })
          .then((res) => {
            const pestelData: PestelData =
              res.data.data.PESTEL || res.data.data;
            if (pestelData) {
              resolve(pestelData);
            }
            setLocalStorage({
              data: pestelData,
              dataKey: LOCAL_STORAGE_KEY + country,
              expiration: 3600000,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });

  return { getPestel, loading };
};

export default useGetPestel;
