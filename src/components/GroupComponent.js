import * as React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import GroupIcon from "@material-ui/icons/Group";
import ExploreIcon from "@material-ui/icons/Explore";
import EventIcon from "@material-ui/icons/Event";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { getFileUrl } from "../services/FileService";
import Tooltip from "@material-ui/core/Tooltip";
import LabelRoundedIcon from "@material-ui/icons/LabelRounded";
import { Link, withRouter } from "react-router-dom";
import { TagComponent } from "./TagComponent";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useSelector } from "react-redux";
import { PAPER_CREAM } from "../shared/Constants";

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
    height: "432px",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.1)",
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
  titleContainer: {
    height: "64px",
    flexWrap: "wrap",
    wordWrap: "break-word",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  truncate: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  popover: {
    pointerEvents: "none",
  },
  popoverPaper: {
    padding: theme.spacing(1),
  },
}));

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: 0,
  },
}))(Tooltip);

function GroupComponent(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const path = () => {
    switch (props.location.pathname) {
      case "/my-groups":
      case "/recommended":
      case "/in-my-area":
        return props.location.pathname + "/";
      default:
        return "/group/"
    }
  }

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const currentMembers = props.group.groupMembers.length;
  const maxMembers = props.group.maxMembers;

  return (
    <Link to={path() + props.group._id} className={"linkDefault"}>
      <Paper
        className={classes.paper}
        elevation={0}
        style={{
          backgroundColor: props.group.groupOwner.premium.active
            ? PAPER_CREAM
            : "white",
        }}
      >
        <div className={classes.titleContainer}>
          <Typography variant={"h6"} align="center" style={{ minWidth: "40%" }}>
            {props.group.groupName}
          </Typography>
        </div>
        <img className={classes.img} src={getFileUrl(props.group.pic)} />
        <List>
          <ListItem disableGutters className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <CustomTooltip title={"Tags"}>
                <LabelRoundedIcon />
              </CustomTooltip>
            </ListItemIcon>
            <ListItemText>
              <div style={{ display: "flex" }}>
                <TagComponent id={props.group.tags[0]} />
                {props.group.tags.length > 1 ? (
                  <div
                    aria-owns={open ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    <MoreHorizIcon
                      style={{ marginLeft: "10px", marginTop: "2px" }}
                    />
                  </div>
                ) : null}
              </div>
            </ListItemText>
          </ListItem>
          <ListItem disableGutters className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <CustomTooltip title={"City"}>
                <ExploreIcon />
              </CustomTooltip>
            </ListItemIcon>
            <ListItemText>
              <div className={classes.truncate}>{props.group.city}</div>
            </ListItemText>
          </ListItem>
          <>
            <ListItem disableGutters className={classes.listItem}>
              <ListItemIcon className={classes.listItemIcon}>
                <CustomTooltip title={"Date"}>
                  <EventIcon />
                </CustomTooltip>
              </ListItemIcon>
              {props.group.date ? (
                <ListItemText
                  primary={new Date(props.group.date).toLocaleString("en-GB", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              ) : (
                <ListItemText primary="to be determined" />
              )}
            </ListItem>
          </>
          <ListItem disableGutters className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <CustomTooltip title={"Participants"}>
                <GroupIcon />
              </CustomTooltip>
            </ListItemIcon>
            <ListItemText
              primary={currentMembers + (maxMembers ? "/" + maxMembers : "")}
            />
            <div>
              {user.authReady &&
              user.isLoggedIn &&
              props.group.groupMembers.includes(user.user._id) ? (
                <CustomTooltip title={"Joined"}>
                  <CheckCircleIcon style={{ color: "mediumseagreen" }} />
                </CustomTooltip>
              ) : null}
            </div>
          </ListItem>
        </List>
      </Paper>

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.popoverPaper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div>
          {props.group.tags.slice(1).map((x) => {
            return (
              <div style={{ marginRight: "5px", marginBottom: "5px" }}>
                <TagComponent id={x} />
              </div>
            );
          })}
        </div>
      </Popover>
    </Link>
  );
}

GroupComponent.propTypes = {
  group: PropTypes.object.isRequired,
};

export default connect()(withRouter(GroupComponent))