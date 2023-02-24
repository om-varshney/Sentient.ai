import React, { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import { HomePage } from "./Components/home";
import { BasicDashboard } from "./Components/application/basicDashboard/dashboard";
import { SentimentDashboard } from "./Components/application/SentimentDashboard/dashboard";
import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "./Components/application/sideNav";
import Filters from "./Components/application/filters";
import { setTrendData, setTrendMessage } from "./Redux/actions/sentientActions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const appState = useSelector((state) => state);
  const dispatch = useDispatch();

  const [showNotification, setShowNotification] = useState(false);

  const closeNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowNotification(false);
  };
  useEffect(
    () => setShowNotification(!!appState.notification.msg),
    [appState.notification.id, appState.notification.msg]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (appState.query !== "") {
        fetch(`/message`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => dispatch(setTrendMessage(data.message)))
          .catch((error) => console.log(error));
      }
    }, 1000);
    fetch(`/trends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appState.query),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTrendData(data));
        clearInterval(interval);
      });
    // .catch((error) => console.log(error));
  }, [appState.query, dispatch]);

  return (
    <>
      {appState.view.homeState ? (
        <HomePage />
      ) : appState.view.trendDashboard ? (
        <BasicDashboard
          handle={appState.query}
          data={appState.trendData}
          message={appState.trendMessage}
        />
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
