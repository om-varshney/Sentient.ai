import { Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import { useDispatch } from "react-redux";
import { setView } from "../../Redux/actions/sentientActions";

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
    backgroundColor: "aliceblue",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    // "&:hover": {
    //   boxShadow: "20px 20px 60px #ccd3d9, -20px -20px 60px #ffffff !important",
    // },
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

const selectStyle = (index, dispatch) => {
  if (index === 1) {
    dispatch(
      setView({
        homeState: false,
        trendDashboard: true,
        sentimentDashboard: false,
      })
    );
  } else {
    dispatch(
      setView({
        homeState: false,
        trendDashboard: false,
        sentimentDashboard: true,
      })
    );
  }
  const elems = Array.from(document.querySelectorAll(".sideNavButton"));
  elems.forEach((elem) => elem.classList.remove("selectedSideNavButton"));
  const clicked = document.getElementById(`sideNavButton_${index}`);
  clicked.classList.add("selectedSideNavButton");
};

export default function SideNav() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Stack className={classes.container}>
      <IconButton onClick={() => selectStyle(1, dispatch)}>
        <HomeRoundedIcon
          id="sideNavButton_1"
          className={`${classes.homeIcon} selectedSideNavButton sideNavButton`}
        />
      </IconButton>
      <IconButton onClick={() => selectStyle(2, dispatch)}>
        <BarChartRoundedIcon
          id="sideNavButton_2"
          className={`${classes.homeIcon} sideNavButton`}
        />
      </IconButton>
    </Stack>
  );
}
