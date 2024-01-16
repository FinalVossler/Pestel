import { createUseStyles } from "react-jss";
import { IPestelTheme } from "../../globalTypes/theme";

const useStyles = createUseStyles((theme: IPestelTheme) => ({
  pestelContainer: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Montserrat",
    width: 680,
    alignItems: "center",
    paddingTop: 50,
    margin: "auto",
    marginBottom: 100,
  },
  pestelHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  pestelButton: {
    display: "flex",
    border: "none",
    textAlign: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 5,
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    transition: ".2s all ease-in-out",
    alignItems: "center",
    boxShadow: theme.boxShadow,

    padding: 5,
  },
  pestelTitle: {
    fontSize: 18,
    fontWeight: 500,
  },
  confirmButton: {
    extend: "pestelButton",
    paddingRight: 50,
    paddingLeft: 50,

    color: theme.lightTextColor,
    background:
      "linear-gradient(to right, " +
      theme.primary +
      ", " +
      theme.darkerPrimary +
      ")",
  },
  cancelButton: {
    extend: "pestelButton",

    paddingRight: 50,
    paddingLeft: 50,

    color: theme.darkTextColor,
    backgroundColor: theme.lightTextColor,
  },
  productAndCountryContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 60,
    marginBottom: 20,
    justifyContent: "space-around",
    width: "100%",
  },
  generatePdfButton: {
    extend: "pestelButton",

    color: theme.lightTextColor,
    fontWeight: 700,

    background:
      "linear-gradient(to right, " +
      theme.primary +
      ", " +
      theme.darkerPrimary +
      ")",
  },
  scoresContainer: {
    border: "1px dotted " + theme.borderColor,
    padding: 20,
    paddingTop: "10px 30px",
    display: "flex",
    flexDirection: "column",
    marginTop: 25,
    width: "100%",
    boxSizing: "border-box",
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
    color: theme.darkTextColor,
    fontWeight: 500,
  },
  dotsContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    boxSizing: "border-box",
  },
  dot: {
    width: 13,
    height: 14.17,
    borderRadius: "50%",
    backgroundColor: "white",
    border: "2px solid #00000040",
    margin: "0px 17.5px",
    boxSizing: "border-box",
  },
  selectedDot: {
    extend: "dot",
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  bottomButtonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
}));

export default useStyles;
