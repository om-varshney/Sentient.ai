import React, { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import { HomePage } from "./Components/home";
import { BasicDashboard } from "./Components/application/basicDashboard/dashboard";
import { SentimentDashboard } from "./Components/application/SentimentDashboard/dashboard";
import { Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import SideNav from "./Components/application/sideNav";
import Filters from "./Components/application/filters";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const appState = useSelector((state) => state);

  const [showNotification, setShowNotification] = useState(false);
  const closeNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowNotification(false);
  };
  useEffect(
    () => setShowNotification(!!appState.notification.msg),
    [appState.notification.id]
  );

  return (
    <>
      {appState.view.homeState ? (
        <HomePage />
      ) : appState.view.trendDashboard ? (
        <BasicDashboard />
      ) : (
        <SentimentDashboard />
      )}
      {appState.view.homeState || <SideNav />}
      <Filters open={appState.queryFilterView} />
      <Snackbar
        open={showNotification}
        autoHideDuration={2500}
        onClose={closeNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeNotification}
          severity={appState.notification.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {appState.notification.msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
