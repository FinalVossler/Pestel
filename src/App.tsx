import React from "react";
import { createRoot } from "react-dom/client";

import Pestel from "./components/pestel";

import "./index.css";

const App = () => (
  <div className="container">
    <Pestel
      theme={{
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
      downloadReportButtonText="Download Report"
      maxScore={10}
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
