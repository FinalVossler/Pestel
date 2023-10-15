import React from "react";
import { AxiosInstance, AxiosResponse } from "axios";

import { toast } from "react-toastify";

export type EntitiesSetCustomDataKeyValueCommand = {
  entityId: string;
  key: string;
  value: boolean;
};

const useSetEntityCustomDataKeyValue = () => {
  const [loading, setLoading] = React.useState(false);

  const setEntityCustomDataKeyValue = (
    command: EntitiesSetCustomDataKeyValueCommand,
    authorizedAxios?: AxiosInstance
  ) =>
    new Promise<void>(async (resolve, reject) => {
      if (!authorizedAxios) {
        return reject();
      }
      setLoading(true);

      authorizedAxios
        .request<AxiosResponse<void>>({
          url: "/entities/setCustomDataKeyValue",
          method: "POST",
          data: command,
        })
        .then((res) => {
          resolve();
          toast.success("👌");
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((e) => reject(e));
    });

  return { setEntityCustomDataKeyValue, loading };
};

export default useSetEntityCustomDataKeyValue;
