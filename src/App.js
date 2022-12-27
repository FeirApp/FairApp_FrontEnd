import { useLoadScript } from "@react-google-maps/api";
import Map from "./Components/Map";
import "./styles.css";
import React from "react";


export default function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDZMaumquCN-AF_Jx0EIllQPmt58bpECuc" // Add your API key
  });

  return isLoaded ? <Map /> : null;
}
