import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { makeStyles } from "@mui/styles";

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

const MainInput = ({ placeHolderText, width, filterFunction }) => {
  const classes = useStyles();

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
      />
      <IconButton
        type="button"
        aria-label="search"
        size="large"
        className={classes.searchButton}
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
        onClick={() => filterFunction(true)}
      >
        <TuneIcon className={classes.filtersIcon} />
      </IconButton>
    </Paper>
  );
};
export default MainInput;
