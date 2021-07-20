import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import GroupIcon from "@material-ui/icons/Group";
import ExploreIcon from "@material-ui/icons/Explore";
import EventIcon from "@material-ui/icons/Event";
import { ButtonBase, Grid, Typography } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  icons: {
    display: "flex",
    align: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: "#32210B",
    width: 280,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      color: "#32210B",
    },
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    width: 128,
    height: 128,
    textAlign: "center",
  },
}));

export function GroupComponent(props) {
  const classes = useStyles();

  console.log(props.group);

  const currentMembers = props.group.groupMembers.length;
  const maxMembers = props.group.participants;
  const groupImage = props.group.image;

  return (
    <Paper className={classes.paper}>
      <h3> {props.group.groupName} </h3>
      <Grid justify="center" alignItems="center">
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} src={groupImage} />
          </ButtonBase>
        </Grid>
        <Grid item>
          <Typography>
            <p>
              <ExploreIcon /> {props.group.city}{" "}
            </p>
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            {/*<p>*/}
            {/*  <EventIcon /> {props.group.date.toLocaleDateString()}*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*  <AccessTimeIcon />{" "}*/}
            {/*  {props.group.date.toLocaleTimeString([], {*/}
            {/*    hour: "2-digit",*/}
            {/*    minute: "2-digit",*/}
            {/*  })}*/}
            {/*</p>*/}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            <GroupIcon fontSize={"medium"} /> {currentMembers}/{maxMembers}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

GroupComponent.propTypes = {
  group: PropTypes.object.isRequired,
};
