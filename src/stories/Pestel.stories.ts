import type { Meta, StoryObj } from "@storybook/react";

import Pestel from "../components/pestel";

const meta: Meta<typeof Pestel> = {
  title: "Pestel",
  component: Pestel,
  argTypes: {},
};

type Story = StoryObj<typeof Pestel>;

export const Default: Story = {
  args: {
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
  },
};

export default meta;
