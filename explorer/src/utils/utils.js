import configData from "./config.json";
import { read_cookie } from 'sfcookies';


export const getProviderURL = () => {
    const networkProvider = read_cookie("blockExplorerNetwork")
    switch (networkProvider) {
        case "Mainnet":
           return configData.MAINNET_URL
        case "Gorli":
           return configData.GORLI
        default:
           return configData.MAINNET_URL
    }
    
};