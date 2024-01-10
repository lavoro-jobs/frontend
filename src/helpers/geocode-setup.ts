import {OutputFormat, setDefaults} from "react-geocode";

export const setupGeocode = () => {
  setDefaults({
    outputFormat: OutputFormat.JSON,
    key: "AIzaSyAtsz7x4K2drD2GXQONUiEobhjHeCuSAZE",
    language: "en",
    region: "hr"
  });
};