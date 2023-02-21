import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Avatar, CardHeader } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  commentCard: {
    backgroundColor: "#ceecfd !important",
    "& .MuiCardHeader-title": {
      fontSize: "1rem !important",
    },
  },
  commentTitle: {
    backgroundColor: "transparent",
    color: "rgba(63,61,86,0.9)",
  },
}));

export default function CommentCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.commentCard}>
      <CardHeader
        title="@elonmusk"
        avatar={
          <Avatar
            alt="Remy Sharp"
            src="https://twitter.com/elonmusk/profile_image?size=original"
          />
        }
      />
      <CardContent>
        <Typography variant="h3" style={{ color: "rgba(63,61,86,0.9)" }}>
          44
        </Typography>
        <Typography>Comments</Typography>
      </CardContent>
    </Card>
  );
}
