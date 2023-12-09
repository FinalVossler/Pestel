import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Loading from "react-loading";
import { AxiosInstance } from "axios";

import useStyles from "./pestel.styles";
import useGetPestel from "../../hooks/apiHooks/useGetPestel";
import { IEntity, IEntityFieldValue } from "../../globalTypes/IEntity";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import PestelPdf from "./PestelPdf";
import useSetEntityCustomDataKeyValue from "../../hooks/apiHooks/useSetEntityCustomDataKeyValue";
import { Theme } from "../../globalTypes/theme";

interface IPestelScore {
  score: number;
  text: string;
}

export interface IPestel {
  theme?: Theme;
  data?: IPestelScore[];
  title?: string;
  generatePdfButtonText?: string;
  hidePdfButtonText?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  productText?: string;
  countryText?: string;
  entityFieldValues?: IEntityFieldValue[];
  language?: string;
  authorizedAxios?: AxiosInstance;
  entity?: IEntity;
  buttonFieldId?: string;
}

const defaultProps: IPestel = {
  theme: {
    darkTextColor: "#4c4c4d",
    lightTextColor: "#FFFFFF",

    primary: "#4BE3AE",
    darkerPrimary: "#2DB39E",
    lighterPrimary: "#ecf2f0",
    secondary: "#7aeaaf",
    errorColor: "red",
    borderColor: "#9f9f9f",
    formMaxWidth: "470px",
    transparentBackground: "#FFFFFF",
    backgroundColor: "#F5FDFB",
    contentBackgroundColor: "#d3f8eb",
    subContentBackgroundColor: "#FFFFFF",
    boxColor: "#FFFFFF",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
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
  generatePdfButtonText: "Generate PDF",
  hidePdfButtonText: "Hide PDF",
  onCancel: () => {},
  onConfirm: () => {},
  productText: "Product Name: Product A",
  countryText: "Country: France",
};

const Pestel: React.FunctionComponent<IPestel> = (passedProps: IPestel) => {
  const props: IPestel = { ...defaultProps, ...passedProps };

  //#region local state
  const [data, setData] = React.useState<IPestelScore[]>(props.data || []);
  const [generatePDFClicked, setGeneratePDFClicked] = React.useState(false);
  //#endregion local state

  //#region hooks
  const styles = useStyles({ theme: props.theme });
  const { getPestel, loading: getPestelLoading } = useGetPestel();
  const getTranslatedText = useGetTranslatedText(props.language || "fr");
  const { loading: confirmationLoading, setEntityCustomDataKeyValue } =
    useSetEntityCustomDataKeyValue();
  //#endregion hooks

  //#region effects
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
  //#endregion effects

  //#region event listeners
  const handleConfirm = () => {
    if (props.onConfirm) {
      props.onConfirm;
    }
    if (props.authorizedAxios && props.entity && props.buttonFieldId) {
      setEntityCustomDataKeyValue(
        {
          entityId: props.entity?._id,
          key: props.buttonFieldId,
          value: true,
        },
        props.authorizedAxios
      );
    }
  };
  //#endregion event listeners

  //#region view
  const memoizedCountryText = React.useMemo(() => {
    return (
      getTranslatedText(
        props.entityFieldValues?.find(
          (el) =>
            getTranslatedText(el.field.name).toLowerCase() === "country" ||
            getTranslatedText(el.field.name).toLowerCase() === "pays"
        )?.value
      ) || props.countryText
    );
  }, [props.entityFieldValues, props.countryText]);

  const memoizedProductText = React.useMemo(() => {
    return (
      getTranslatedText(
        props.entityFieldValues?.find(
          (el) =>
            getTranslatedText(el.field.name).toLowerCase().indexOf("name") !==
            -1
        )?.value
      ) || props.productText
    );
  }, [props.entityFieldValues, props.countryText]);

  const loading = React.useMemo(
    () => confirmationLoading || getPestelLoading,
    [getPestelLoading, confirmationLoading]
  );

  return (
    <React.Fragment>
      <div className={styles.pestelContainer}>
        <div className={styles.pestelHeader}>
          {!loading && (
            <button
              style={{ opacity: 0 }}
              disabled
              className={styles.generatePdfButton}
            >
              {props.generatePdfButtonText}
            </button>
          )}
          <div className={styles.pestelTitle}>{props.title}</div>
          {!loading && (
            <button
              className={styles.generatePdfButton}
              onClick={() => setGeneratePDFClicked(!generatePDFClicked)}
            >
              {generatePDFClicked
                ? props.hidePdfButtonText
                : props.generatePdfButtonText}
            </button>
          )}
        </div>

        {!loading && data.some((el) => el.score > 0) && generatePDFClicked && (
          <PDFViewer
            height={700}
            width={1000}
            style={{ marginTop: 20, maxWidth: "100%" }}
          >
            <PestelPdf
              theme={{
                borderColor: props.theme?.borderColor || "#000000",
                primary: props.theme?.primary || "#3BCBB2",
                textColor: props.theme?.darkTextColor || "#2C2B30",
                titleTextColor: props.theme?.darkTextColor || "#2C2B30",
              }}
              title={props.title}
              data={data}
              productText={memoizedProductText}
              countryText={memoizedCountryText}
            />
          </PDFViewer>
        )}

        <div className={styles.productAndCountryContainer}>
          <span className={styles.text}>{memoizedProductText}</span>
          <span className={styles.text}>{memoizedCountryText}</span>
        </div>

        {loading && <Loading color={props.theme?.primary} />}

        {!getPestelLoading && (
          <div className={styles.scoresContainer}>
            {data?.map((score, scoreIndex) => {
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
        )}

        {!loading && (
          <div className={styles.bottomButtonsContainer}>
            <button className={styles.cancelButton} onClick={props.onCancel}>
              {props.cancelButtonText}
            </button>
            <button className={styles.confirmButton} onClick={handleConfirm}>
              {props.confirmButtonText}
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
//#endregion view

export default Pestel;
