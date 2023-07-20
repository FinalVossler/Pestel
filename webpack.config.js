const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => {
  const isDevelopment = argv.mode === "development";
  if (isDevelopment) {
    require("dotenv").config({ path: `./.env.development` });
  } else {
    require("dotenv").config();
  }

  return {
    entry: {
      app: "./src/index.ts",
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
      publicPath: argv.mode === "development" ? "http://localhost:3001/" : "/",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 3001,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "pestel",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./Pestel": "./src/components/pestel",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
