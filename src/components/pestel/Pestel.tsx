import React from "react";

import useStyles from "./pestel.styles";
import useGetPestel from "../../hooks/apiHooks/useGetPestel";
import { IEntityFieldValue } from "../../globalTypes/IEntity";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import Loading from "react-loading";

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
  theme?: IPestelTheme;
  data?: IPestelScore[];
  maxScore?: number;
  title?: string;
  downloadReportButtonText?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  productText?: string;
  countryText?: string;
  entityFieldValues?: IEntityFieldValue[];
  language?: string;
}

const defaultProps: IPestel = {
  theme: {
    borderColor: "#000000",
    cancelButtonColor: "#FFFFFF",
    cancelButtonTextColor: "#2C2B30",
    confirmButtonLeftColor: "#2DB39E",
    confirmButtonRightColor: "#4BE3AE",
    confirmButtonTextColor: "#FFFFFF",
    dotColor: "#3BCBB2",
    downloadReportButtonColor: "#E59010",
    downloadReportTextColor: "#FFFFFF",
    textColor: "#2C2B30",
    titleTextColor: "#2C2B30",
    buttonBoxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
  },
  cancelButtonText: "Back",
  confirmButtonText: "Confirm",
  title: "PESTEL Analysis",
  data: [
    { score: 8, text: "Political" },
    { score: 4, text: "Economic" },
    { score: 10, text: "Social" },
    { score: 6, text: "Technological" },
    { score: 9, text: "Environmental" },
    { score: 2, text: "Legal" },
  ],
  downloadReportButtonText: "Download Report",
  maxScore: 10,
  onCancel: () => {},
  onConfirm: () => {},
  productText: "Product Name: Product A",
  countryText: "Country: France",
};

const Pestel: React.FunctionComponent<IPestel> = (passedProps: IPestel) => {
  const props: IPestel = { ...defaultProps, ...passedProps };

  const [data, setData] = React.useState<IPestelScore[]>(props.data || []);
  const [maxScore, setMaxScore] = React.useState<number>(props.maxScore || 10);

  const styles = useStyles({ theme: props.theme });
  const { getPestel, loading: getPestelLoading } = useGetPestel();
  const getTranslatedText = useGetTranslatedText(props.language || "fr");

  React.useEffect(() => {
    const country: string =
      getTranslatedText(
        props.entityFieldValues?.find(
          (el) =>
            getTranslatedText(el.field.name).toLowerCase() === "country" ||
            getTranslatedText(el.field.name).toLowerCase() === "pays"
        )?.value
      ) || "France";

    getPestel(country).then((pestelData) => {
      const newData: IPestelScore[] = [];
      Object.keys(pestelData).forEach((key) => {
        //@ts-ignore
        if (parseInt(pestelData[key] > 10)) {
          setMaxScore(100);
        }
        const newPestelScore: IPestelScore = {
          //@ts-ignore
          score: pestelData[key],
          text: key,
        };
        newData.push(newPestelScore);
      });

      setData(newData);
    });
  }, [props.entityFieldValues]);

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

      {getPestelLoading && <Loading color={props.theme?.dotColor} />}

      {!getPestelLoading && (
        <div className={styles.scoresContainer}>
          {data?.map((score, scoreIndex) => {
            return (
              <div className={styles.scoreRow} key={scoreIndex}>
                <span className={styles.text}>{score.text}</span>
                <div className={styles.dotsContainer}>
                  {Array.from(Array(maxScore)).map((_, dotIndex) => {
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
      )}

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
