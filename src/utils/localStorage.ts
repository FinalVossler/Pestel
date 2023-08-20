export const setLocalStorage = ({
  data,
  dataKey,
  expiration,
}: {
  data: any;
  dataKey: string;
  expiration: number;
}) => {
  if (data) {
    localStorage.setItem(dataKey, JSON.stringify(data));
    if (expiration) {
      const expirationTime = new Date().getTime() + expiration;
      localStorage.setItem(`${dataKey}_expiration`, expirationTime.toString());
    }
  }
};

export const getLocalStorage = ({ dataKey }: { dataKey: string }) => {
  const expirationTime = localStorage.getItem(`${dataKey}_expiration`);
  if (expirationTime && new Date().getTime() > parseInt(expirationTime)) {
    localStorage.removeItem(dataKey);
    localStorage.removeItem(`${dataKey}_expiration`);
  }
  try {
    const data = localStorage.getItem(dataKey);

    if (typeof data === "string") {
      return JSON.parse(data);
    }
    return null;
  } catch {
    return null;
  }
};
