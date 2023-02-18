import React, { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import { HomePage } from "./Components/home";
import { BasicDashboard } from "./Components/application/basicDashboard/dashboard";
import { SentimentDashboard } from "./Components/application/SentimentDashboard/dashboard";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  return (
    <React.Fragment>
      {/*<HomePage />*/}
      <BasicDashboard />
      {/*<SentimentDashboard />*/}
    </React.Fragment>
  );
}

export default App;
