import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import GroupIcon from "@material-ui/icons/Group";
import ExploreIcon from "@material-ui/icons/Explore";
import EventIcon from "@material-ui/icons/Event";
import { Link, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PropTypes from "prop-types";
import { getFileUrl } from "../services/FileService";

const useStyles = makeStyles((theme) => ({
  icons: {
    display: "flex",
    align: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: "#32210B",
    width: "280px",
    height: "422px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      color: "#32210B",
    },
  },
  listItem: {
    paddingTop: "4px !important",
    paddingBottom: "4px !important",
  },
  listItemIcon: {
    color: "#000000 !important",
    minWidth: "38px !important",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    width: 200,
    height: 150,
    marginTop: "8px",
    marginBottom: "8px",
    textAlign: "center",
  },
}));

export function GroupComponent(props) {
  const classes = useStyles();

  const currentMembers = props.group.groupMembers.length;
  const maxMembers = props.group.maxMembers;

  return (
    <Link href={"/group/"+props.group._id}>
    <Paper className={classes.paper}>
      <h3>{props.group.groupName}</h3>
      <img className={classes.img} src={getFileUrl(props.group.pic)} />
      <List>
        <ListItem disableGutters className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary={props.group.city} />
        </ListItem>
        {props.group.date ? (
          <>
            <ListItem disableGutters className={classes.listItem}>
              <ListItemIcon className={classes.listItemIcon}>
                <EventIcon />
              </ListItemIcon>
              <ListItemText
                primary={new Date(props.group.date).toLocaleDateString()}
              />
            </ListItem>
            <ListItem disableGutters className={classes.listItem}>
              <ListItemIcon className={classes.listItemIcon}>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText
                primary={new Date(props.group.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
            </ListItem>
          </>
        ) : null}
        <ListItem disableGutters className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText
            primary={currentMembers + (maxMembers ? "/" + maxMembers : "")}
          />
        </ListItem>
      </List>
    </Paper>
    </Link>
  );
}

GroupComponent.propTypes = {
  group: PropTypes.object.isRequired,
};
