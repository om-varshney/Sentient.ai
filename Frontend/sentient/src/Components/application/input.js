import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  setNotificationContent,
  setQuery,
  setQueryFiltersView,
  setView,
} from "../../Redux/actions/sentientActions";

const useStyles = makeStyles((theme) => ({
  searchButton: {
    backgroundColor: "#F476EF !important",
  },
  filtersButton: {
    backgroundColor: "rgba(63,61,86,0.6) !important",
  },
  searchIcon: {
    color: "white",
  },
  filtersIcon: {
    color: "White",
  },
  divider: {
    backgroundColor: "#D9D9D9",
  },
}));

const onSearch = (query, dispatch) => {
  if (query) {
    dispatch(setQuery(query));
    dispatch(
      setView({
        homeState: false,
        trendDashboard: true,
        sentimentDashboard: false,
      })
    );
  } else {
    dispatch(
      setNotificationContent({
        type: "warning",
        msg: "Please provide a Twitter handle or Hashtag",
        id: Math.random(),
      })
    );
  }
};

const openFilters = (query, dispatch) => {
  if (query) {
    dispatch(setQuery(query));
    dispatch(setQueryFiltersView(true));
  } else {
    dispatch(
      setNotificationContent({
        type: "warning",
        msg: "Please provide a Twitter handle or Hashtag",
        id: Math.random(),
      })
    );
  }
};

const MainInput = ({ placeHolderText, width }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  return (
    <Paper
      component="form"
      sx={{
        p: "10px 10px 10px 25px",
        display: "flex",
        alignItems: "center",
        width: `${width}%`,
        borderRadius: "500px",
        backgroundColor: "#6A70FF",
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          color: "rgba(255, 255, 255, 1)",
          fontFamily: "Roboto !important",
          fontSize: "18px !important",
        }}
        placeholder={placeHolderText}
        required={true}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSearch(input, dispatch);
          }
        }}
      />
      <IconButton
        type="button"
        aria-label="search"
        size="large"
        className={classes.searchButton}
        onClick={() => {
          onSearch(input, dispatch);
        }}
      >
        <SearchIcon className={classes.searchIcon} />
      </IconButton>
      <Divider
        orientation="vertical"
        className={classes.divider}
        sx={{ m: 1, height: "28px" }}
      />
      <IconButton
        type="button"
        size="large"
        aria-label="close"
        className={classes.filtersButton}
        onClick={() => openFilters(input, dispatch)}
      >
        <TuneIcon className={classes.filtersIcon} />
      </IconButton>
    </Paper>
  );
};
export default MainInput;
