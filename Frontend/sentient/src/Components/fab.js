import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { makeStyles } from "@mui/styles";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddIcon from "@mui/icons-material/Add";
import { setQueryFiltersView, setView } from "../Redux/actions/sentientActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  fab: {
    "& .MuiSpeedDial-fab": {
      backgroundImage: "linear-gradient(45deg, #6A70FF, #FF8AFA)",
    },
    "& .MuiSpeedDialAction-fab": {
      backgroundColor: "#6A70FF",
      color: "white",
    },
    "& .MuiSpeedDialAction-fab:hover": {
      backgroundColor: "#6A70FF",
    },
  },
}));

const setHome = (dispatch) => {
  dispatch(
    setView({
      homeState: true,
      trendDashboard: false,
      sentimentDashboard: false,
    })
  );
};

const editQuery = (dispatch) => {
  dispatch(
    setView({
      homeState: true,
      trendDashboard: false,
      sentimentDashboard: false,
    })
  );
  dispatch(setQueryFiltersView(true));
};

export default function NewQueryButton() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "fixed", bottom: "3vh", right: "3vw" }}
      icon={<SpeedDialIcon />}
      className={classes.fab}
    >
      <SpeedDialAction
        key="Edit Search Filters"
        icon={<EditRoundedIcon />}
        tooltipTitle="Edit Search Filters"
        onClick={() => editQuery(dispatch)}
      />
      <SpeedDialAction
        key="Start New Search"
        icon={<AddIcon />}
        tooltipTitle="Start New Search"
        onClick={() => setHome(dispatch)}
      />
    </SpeedDial>
  );
}
