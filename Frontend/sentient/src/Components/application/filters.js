import * as React from "react";
import Button from "@mui/material/Button";
import { makeStyles, styled } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useEffect, useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import leaves_1 from "../../Assets/Leaves_1.png";
import leaves_2 from "../../Assets/Leaves_2.png";

const useStyles = makeStyles((theme) => ({
  filterTitle: {
    backgroundColor: "#6A70FF",
    color: "#fff",
  },
  filterContent: {
    backgroundColor: "#B5E3FF",
    color: "#000",
  },
  filterActions: {
    backgroundColor: "#6A70FF",
    color: "#fff",
  },
  primaryButton: {
    backgroundColor: "#F476EF !important",
    borderRadius: "500px !important",
    margin: "5px !important",
  },
  secondaryButton: {
    color: "#fff !important",
    backgroundColor: "#3F3D56 !important",
    borderRadius: "500px !important",
  },
  backgroundEffect1: {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 0,
  },
  backgroundEffect2: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 0,
  },
}));

const FilterTextField = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    color: "#000",
    zIndex: 2,
  },
  "& label.Mui-focused": {
    color: "#6A70FF",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#B5E3FF",
      backgroundColor: "#94D6FF",
    },
    "&:hover fieldset": {
      borderColor: "#6A70FF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6A70FF",
    },
  },
});

const FilterDatePicker = styled(DesktopDatePicker)({
  "& .MuiOutlinedInput-input": {
    color: "#000",
    zIndex: 2,
  },
  "& label.Mui-focused": {
    color: "#6A70FF",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#B5E3FF",
      backgroundColor: "#94D6FF",
    },
    "&:hover fieldset": {
      borderColor: "#6A70FF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6A70FF",
    },
  },
  "& .MuiIconButton-edgeEnd": {
    zIndex: 1,
  },
});

const PickDate = ({ label, helperText }) => {
  const [startDate, setStartDate] = useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FilterDatePicker
        label={label}
        inputFormat="MM/DD/YYYY"
        value={startDate}
        onChange={(newDate) => setStartDate(newDate)}
        renderInput={(params) => (
          <TextField {...params} helperText={helperText} />
        )}
        maxDate={new Date()}
        minDate={new Date("2015-01-01")}
      />
    </LocalizationProvider>
  );
};

export default function Filters(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);
  useEffect(() => setOpen(props.open), [props.open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"sm"}
        fullWidth
        scroll="paper"
      >
        <DialogTitle className={classes.filterTitle}>
          <Typography variant="h6">Refine Tweet Search</Typography>
        </DialogTitle>
        <DialogContent
          dividers
          className={`customNav ${classes.filterContent}`}
        >
          <img src={leaves_1} alt="" className={classes.backgroundEffect1} />
          <img src={leaves_2} alt="" className={classes.backgroundEffect2} />
          <Stack spacing={2}>
            <FilterTextField
              label="Minimum Replies"
              variant="outlined"
              helperText="Minimum replies a tweet must have"
              fullWidth
            />
            <FilterTextField
              label="Minimum Likes"
              variant="outlined"
              helperText="Minimum likes a tweet must have"
              fullWidth
            />
            <FilterTextField
              label="Minimum Retweets"
              variant="outlined"
              helperText="Minimum retweets a tweet must have"
              fullWidth
            />
            <PickDate
              label="from"
              helperText="Starting date for tweet search"
            />
            <PickDate label="to" helperText="Ending date for tweet search" />
          </Stack>
        </DialogContent>
        <DialogActions className={classes.filterActions}>
          <Button
            autoFocus
            variant="contained"
            className={classes.secondaryButton}
            size="large"
            // endIcon={<CloseIcon />}
          >
            <span style={{ fontWeight: 550 }}>Cancel</span>
          </Button>
          <Button
            autoFocus
            variant="contained"
            className={classes.primaryButton}
            size="large"
            // endIcon={<ArrowForwardIosIcon />}
          >
            <span style={{ fontWeight: 550 }}>Search</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
