import React, { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import { HomePage } from "./Components/home";
import { BasicDashboard } from "./Components/application/basicDashboard/dashboard";
import { SentimentDashboard } from "./Components/application/SentimentDashboard/dashboard";
import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "./Components/application/sideNav";
import Filters from "./Components/application/filters";
import {
  setNotificationContent,
  setSentimentData,
  setSentimentMessage,
  setSentimentTimer,
  setTrendData,
  setTrendMessage,
  setTrendTimer,
} from "./Redux/actions/sentientActions";
import { isEmpty } from "./utils/utils";

// Todo: Create function to clear timeout if user exits before both pages have loaded.

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
    const trendInterval = setInterval(() => {
      if (appState.query !== "") {
        fetch(`/message_trend`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) =>
            dispatch(setTrendMessage({ msg: data.message, value: data.value }))
          )
          .catch((error) => console.log(error));
      }
    }, 1000);
    dispatch(setTrendTimer(trendInterval));

    const sentimentInterval = setInterval(() => {
      if (appState.query !== "") {
        fetch(`/message_sentiment`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) =>
            dispatch(
              setSentimentMessage({ msg: data.message, value: data.value })
            )
          )
          .catch((error) => console.log(error));
      }
    }, 1000);
    dispatch(setSentimentTimer(sentimentInterval));

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
        if (!isEmpty(data) && data["analysis"]) {
          dispatch(
            setNotificationContent({
              type: "success",
              msg: "Analytics Dashboard is Ready!",
              id: Math.random(),
            })
          );
        }
        clearInterval(trendInterval);
      })
      .catch((error) => console.log(error));

    fetch(`/sentiment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appState.query),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setSentimentData(data));
        if (!isEmpty(data) && data["analysis"]) {
          dispatch(
            setNotificationContent({
              type: "success",
              msg: "Sentiment Dashboard is Ready!",
              id: Math.random(),
            })
          );
        }
        clearInterval(sentimentInterval);
      })
      .catch((error) => console.log(error));
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
        <SentimentDashboard
          handle={appState.query}
          data={appState.sentimentData}
          message={appState.sentimentMessage}
        />
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
