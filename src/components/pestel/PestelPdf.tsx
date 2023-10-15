import React from "react";

import { IEntityFieldValue } from "../../globalTypes/IEntity";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface IPestelScore {
  score: number;
  text: string;
}

export interface IPestelTheme {
  borderColor: string;
  primary: string;
  textColor: string;
  titleTextColor: string;
}

export interface IPestel {
  theme?: IPestelTheme;
  data?: IPestelScore[];
  title?: string;
  productText?: string;
  countryText?: string;
  entityFieldValues?: IEntityFieldValue[];
  language?: string;
}

const defaultProps: IPestel = {
  theme: {
    borderColor: "#000000",
    primary: "#3BCBB2",
    textColor: "#2C2B30",
    titleTextColor: "#2C2B30",
  },
  title: "PESTEL Analysis",
  data: [
    { score: 8, text: "Political" },
    { score: 4, text: "Economic" },
    { score: 10, text: "Social" },
    { score: 6, text: "Technological" },
    { score: 9, text: "Environmental" },
    { score: 2, text: "Legal" },
  ],
  productText: "Product Name: Product A",
  countryText: "Country: France",
};

const Pestel: React.FunctionComponent<IPestel> = (passedProps: IPestel) => {
  const props: IPestel = { ...defaultProps, ...passedProps };

  const [data, setData] = React.useState<IPestelScore[]>(props.data || []);

  const styles = StyleSheet.create({
    pestelContainer: {
      display: "flex",
      flexDirection: "column",
      width: 680,
      alignItems: "center",
      paddingTop: 50,
      margin: "auto",
    },
    pestelHeader: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    pestelTitle: {
      fontSize: 18,
      fontWeight: 500,
    },
    productAndCountryContainer: {
      display: "flex",
      flexDirection: "row",
      marginTop: 60,
      marginBottom: 20,
      justifyContent: "space-around",
      width: "100%",
    },
    scoresContainer: {
      border: "1px dotted " + props.theme?.borderColor,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      marginTop: 25,
      width: "100%",
      marginBottom: 35,
    },
    scoreRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    text: {
      fontSize: 16,
      color: props.theme?.textColor,
      fontWeight: 500,
    },
    dotsContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
    },
    dot: {
      width: 8.5,
      height: 14.17,
      borderRadius: "50%",
      backgroundColor: "white",
      border: "2px solid #00000040",
      margin: "0px 17.5px",
    },
    selectedDot: {
      width: 8.5,
      height: 14.17,
      borderRadius: "50%",
      border: "2px solid #00000040",
      margin: "0px 17.5px",
      backgroundColor: props.theme?.primary,
      borderColor: props.theme?.primary,
    },
    bottomButtonsContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.pestelContainer}>
        <View style={styles.productAndCountryContainer}>
          <Text style={styles.text}>{props.productText}</Text>
          <Text style={styles.text}>{props.countryText}</Text>
        </View>

        <View
          //@ts-ignore
          style={{ ...styles.scoresContainer, boxSizing: "border-box" }}
        >
          {data?.map((score, scoreIndex) => {
            return (
              <View style={styles.scoreRow} key={scoreIndex}>
                <Text style={styles.text}>{score.text}</Text>
                <View
                  style={{
                    ...styles.dotsContainer,
                    //@ts-ignore
                    boxSizing: "border-box",
                  }}
                >
                  {Array.from(Array(10)).map((_, dotIndex) => {
                    return (
                      <View
                        key={dotIndex}
                        style={{
                          ...(dotIndex + 1 <= score.score
                            ? styles.selectedDot
                            : styles.dot),
                          //@ts-ignore
                          boxSizing: "border-box",
                        }}
                      ></View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default Pestel;
