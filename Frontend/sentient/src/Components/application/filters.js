import * as React from "react";
import Button from "@mui/material/Button";
import { makeStyles, styled } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useEffect, useState } from "react";
import { Stack, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";

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
    backgroundColor: "#FF8AFA !important",
    borderRadius: "500px !important",
  },
  secondaryButton: {
    color: "#fff !important",
    backgroundColor: "#3F3D56 !important",
    borderRadius: "500px !important",
  },
}));

const FilterTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "#3F3D56",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6A70FF",
    },
  },
});

const FilterDatePicker = styled(DesktopDatePicker)({
  "& label.Mui-focused": {
    color: "#6A70FF",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#6A70FF",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "#3F3D56",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6A70FF",
    },
  },
});

const PickDate = ({ label }) => {
  const [startDate, setStartDate] = useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FilterDatePicker
        label={label}
        inputFormat="MM/DD/YYYY"
        value={startDate}
        onChange={(newDate) => setStartDate(newDate)}
        renderInput={(params) => <TextField {...params} />}
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
        maxWidth={"xs"}
        fullWidth
        scroll="paper"
      >
        <DialogTitle className={classes.filterTitle}>
          Refine Tweet Search
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
            }}
            className={classes.secondaryButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          className={`customNav ${classes.filterContent}`}
        >
          <Stack spacing={3}>
            <FilterTextField
              label="Minimum Replies"
              variant="outlined"
              fullWidth
            />
            <FilterTextField
              label="Minimum Likes"
              variant="outlined"
              fullWidth
            />
            <FilterTextField
              label="Minimum Retweets"
              variant="outlined"
              fullWidth
            />
            <PickDate label="from" />
            <PickDate label="to" />
          </Stack>
        </DialogContent>
        <DialogActions className={classes.filterActions}>
          <Button
            autoFocus
            variant="contained"
            className={classes.primaryButton}
            size="large"
            endIcon={<SearchIcon />}
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
