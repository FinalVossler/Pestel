import React from "react";

import useStyles from "./pestel.styles";

interface IPestelScore {
  score: number;
  text: string;
}

export interface IPestelTheme {
  confirmButtonRightColor: string;
  confirmButtonLeftColor: string;
  confirmButtonTextColor: string;
  cancelButtonColor: string;
  cancelButtonTextColor: string;
  downloadReportButtonColor: string;
  downloadReportTextColor: string;
  titleTextColor: string;
  textColor: string;
  dotColor: string;
  borderColor: string;
  buttonBoxShadow: string;
}

export interface IPestel {
  theme: IPestelTheme;
  data: IPestelScore[];
  maxScore: number;
  title: string;
  downloadReportButtonText: string;
  cancelButtonText: string;
  confirmButtonText: string;
  onCancel: () => void;
  onConfirm: () => void;
  productText: string;
  countryText: string;
}

const Pestel: React.FunctionComponent<IPestel> = (props: IPestel) => {
  const styles = useStyles({ theme: props.theme });

  return (
    <div className={styles.pestelContainer}>
      <div className={styles.pestelHeader}>
        <button
          style={{ opacity: 0 }}
          disabled
          className={styles.downloadReportButton}
        >
          {props.downloadReportButtonText}
        </button>
        <div className={styles.pestelTitle}>{props.title}</div>
        <button className={styles.downloadReportButton}>
          {props.downloadReportButtonText}
        </button>
      </div>

      <div className={styles.productAndCountryContainer}>
        <span className={styles.text}>{props.productText}</span>
        <span className={styles.text}>{props.countryText}</span>
      </div>

      <div className={styles.scoresContainer}>
        {props.data.map((score, scoreIndex) => {
          return (
            <div className={styles.scoreRow} key={scoreIndex}>
              <span className={styles.text}>{score.text}</span>
              <div className={styles.dotsContainer}>
                {Array.from(Array(10)).map((_, dotIndex) => {
                  return (
                    <div
                      key={dotIndex}
                      className={
                        dotIndex + 1 <= score.score
                          ? styles.selectedDot
                          : styles.dot
                      }
                    ></div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.bottomButtonsContainer}>
        <button className={styles.cancelButton} onClick={props.onCancel}>
          {props.cancelButtonText}
        </button>
        <button className={styles.confirmButton} onClick={props.onConfirm}>
          {props.confirmButtonText}
        </button>
      </div>
    </div>
  );
};

export default Pestel;
