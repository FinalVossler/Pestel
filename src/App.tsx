import React from "react";
import { createRoot } from "react-dom/client";

import Pestel from "./components/pestel";

import "./index.css";

const App = () => (
  <div className="container">
    <Pestel
      theme={{
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
      }}
      cancelButtonText="Back"
      confirmButtonText="Confirm"
      title="PESTEL Analysis"
      data={[
        { score: 0, text: "Political" },
        { score: 0, text: "Economic" },
        { score: 0, text: "Social" },
        { score: 0, text: "Technological" },
        { score: 0, text: "Environmental" },
        { score: 0, text: "Legal" },
      ]}
      generatePdfButtonText="Generate PDF"
      hidePdfButtonText="Hide PDF"
      onCancel={() => {}}
      onConfirm={() => {}}
      productText="Product Name: Product A"
      countryText="Country: France"
    />
  </div>
);

const container = document.getElementById("app")!;
const root = createRoot(container);

root.render(<App />);
