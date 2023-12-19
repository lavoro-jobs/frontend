import {OutputFormat, setDefaults} from "react-geocode";

export const setupGeocode = () => {
  setDefaults({
    outputFormat: OutputFormat.JSON,
    key: "",
    language: "en",
    region: "hr"
  });
};