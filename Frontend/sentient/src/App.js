import React, { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import { HomePage } from "./Components/home";
import { BasicDashboard } from "./Components/application/basicDashboard/dashboard";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  return (
    <React.Fragment>
      <HomePage />
      <BasicDashboard />
    </React.Fragment>
  );
}

export default App;
