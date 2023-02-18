import { Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import StackedBarChartRoundedIcon from "@mui/icons-material/StackedBarChartRounded";
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignContent: "space-evenly",
    justifyContent: "space-evenly",
    position: "fixed",
    height: "50vh",
    left: "3vw",
    top: "25vh",
    padding: "0 0.5vw",
    backgroundColor: "#94D6FF",
    borderRadius: "500px",
  },
  homeIcon: {
    color: "rgba(63,61,86,0.8)",
    fontSize: "3.5rem !important",
  },
  barIcon: {
    color: "rgba(63,61,86,0.8)",
    fontSize: "3.5rem !important",
  },
}));

const selectStyle = (index) => {
  const elems = Array.from(document.querySelectorAll(".sideNavButton"));
  elems.forEach((elem) => elem.classList.remove("selectedSideNavButton"));
  const clicked = document.getElementById(`sideNavButton_${index}`);
  clicked.classList.add("selectedSideNavButton");
};

export default function SideNav() {
  const classes = useStyles();
  return (
    <Stack className={classes.container}>
      <IconButton onClick={() => selectStyle(1)}>
        <HomeRoundedIcon
          id="sideNavButton_1"
          className={`${classes.homeIcon} selectedSideNavButton sideNavButton`}
        />
      </IconButton>
      <IconButton onClick={() => selectStyle(2)}>
        <BarChartRoundedIcon
          id="sideNavButton_2"
          className={`${classes.homeIcon} sideNavButton`}
        />
      </IconButton>
    </Stack>
  );
}
