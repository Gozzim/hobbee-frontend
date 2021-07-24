import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import GroupIcon from "@material-ui/icons/Group";
import ExploreIcon from "@material-ui/icons/Explore";
import EventIcon from "@material-ui/icons/Event";
import { Link, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PropTypes from "prop-types";
import { getFileUrl } from "../services/FileService";
import Tooltip from "@material-ui/core/Tooltip";

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


const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: 0,
  },
}))(Tooltip);

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
            <CustomTooltip title={"City"}>
            <ExploreIcon />
            </CustomTooltip>
          </ListItemIcon>
          <ListItemText primary={props.group.city} />
        </ListItem>
        {props.group.date ? (
          <>
            <ListItem disableGutters className={classes.listItem}>
              <ListItemIcon className={classes.listItemIcon}>
                <CustomTooltip title={"Date"}>
                <EventIcon />
                </CustomTooltip>
              </ListItemIcon>
              <ListItemText
                primary={new Date(props.group.date).toLocaleDateString()}
              />
            </ListItem>
            <ListItem disableGutters className={classes.listItem}>
              <ListItemIcon className={classes.listItemIcon}>
                <CustomTooltip title={"Time"}>
                <AccessTimeIcon />
                </CustomTooltip>
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
           <CustomTooltip title={"Participants"}>
            <GroupIcon />
          </CustomTooltip>
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
