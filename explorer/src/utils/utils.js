import { read_cookie } from "sfcookies";
import { MAINNET_URL, GORLI } from "./config.js";

export const getProviderURL = () => {
  const networkProvider = read_cookie("blockExplorerNetwork");
  switch (networkProvider) {
    case "Mainnet":
      return MAINNET_URL;
    case "Gorli":
      return GORLI;
    default:
      return MAINNET_URL;
  }
};
