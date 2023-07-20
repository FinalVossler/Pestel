import React from "react";

import useStyles from "./pestel.styles";

interface IPestel {}

const Pestel: React.FunctionComponent = (props: IPestel) => {
  const styles = useStyles();
  return <div className={styles.pestelContainer}>Pestel Component</div>;
};

export default Pestel;
