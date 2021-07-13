import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import GroupIcon from "@material-ui/icons/Group";
import ExploreIcon from "@material-ui/icons/Explore";
import EventIcon from "@material-ui/icons/Event";
import { ButtonBase, Grid, Icon, Typography } from "@material-ui/core";
import { Image } from "@material-ui/icons";
import DummyGroupImage from "../assets/bee_cream.png";

const useStyles = makeStyles((theme) => ({
  icons: {
    display: "flex",
    align: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#32210B",
    maxWidth: 280,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      color: "#32210B",
    },
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export function GroupComponentVertical(props) {
  const classes = useStyles();

  const title = "This is your Default group";
  const city = "Munich";
  const time = new Date("July 19, 2021 13:37");
  const currentMembers = 5;
  const maxMembers = 7;
  //const groupImage = image

  return (
    <Paper className={classes.paper}>
      <h3> {title} </h3>

      <Grid item>
        <ButtonBase className={classes.image}>
          <img className={classes.img} alt="image" src={DummyGroupImage} />
        </ButtonBase>
      </Grid>

      <Grid>
        <Typography>
          <ExploreIcon /> {city}
        </Typography>
      </Grid>
      <Grid>
        <Typography>
          <EventIcon /> Date: {time.toLocaleDateString()}{" "}
          <p> {time.toLocaleTimeString()}</p>
        </Typography>
      </Grid>
      <Grid>
        <Typography>
          <GroupIcon fontSize={"medium"} /> Members: {currentMembers}/
          {maxMembers}
        </Typography>
      </Grid>
    </Paper>
  );
}