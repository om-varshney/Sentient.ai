import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { makeStyles } from "@mui/styles";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddIcon from "@mui/icons-material/Add";

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

const actions = [
  { icon: <EditRoundedIcon />, name: "Edit Search Filters" },
  { icon: <AddIcon />, name: "Start New Search" },
];

export default function NewQueryButton() {
  const classes = useStyles();
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: "3vh", right: "3vw" }}
      icon={<SpeedDialIcon />}
      className={classes.fab}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}
