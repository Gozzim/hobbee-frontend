import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import MUILink from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import GroupImage from "../assets/test.png";
import "../views/style.css";
import UserIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import EventIcon from "@material-ui/icons/Event";
import LocationIcon from "@material-ui/icons/LocationOn";
import GroupIcon from "@material-ui/icons/PeopleAlt";
import { Button, IconButton, Snackbar } from "@material-ui/core";
import { Chat } from "../components/Chat";
import ExitIcon from "@material-ui/icons/ExitToApp";
import { TagComponent } from "../components/TagComponent";
import { joinGroup, leaveGroup, fetchGroup } from "../services/GroupService";
import { io } from "../services/SocketService";
import Tooltip from "@material-ui/core/Tooltip";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    marginTop: "0px",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  pageContent: {
    marginTop: "30px",
    display: "flex",
  },
  picture: {
    display: "inline-block",
    height: "300px",
    width: "400px",
    marginRight: "50px",
    marginBottom: "30px",
  },
  chat: {
    fontFamily: "UD Digi KyoKasho NK-R",
    verticalAlign: "top",
    color: "#32210B",
    flex: 2,
  },
  infoNotJoined: {
    fontFamily: "UD Digi KyoKasho NK-R",
    display: "inline-block",
    verticalAlign: "top",
    color: "#32210B",
  },
  infoJoined: {
    fontFamily: "UD Digi KyoKasho NK-R",
    verticalAlign: "top",
    color: "#32210B",
    position: "relative",
  },
  detailsItem: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "20px",
  },
  detailsItemText: {
    color: "#32210B",
    marginLeft: "20px",
  },
  joinButton: {
    width: "200px",
    backgroundColor: "#1CE9E3",
    fontSize: 15,
    padding: "2px",
    "&:hover": {
      backgroundColor: "#FFCC00",
      color: "#32210B",
    },
  },
  leaveButton: {
    position: "absolute",
    right: 50,
    top: -5,
  },
  editButton: {
    position: "absolute",
    right: 50,
    top: 205,
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: 0,
  },
}))(Tooltip);

const initialState = {
  _id: "",
  groupName: "",
  groupOwner: "",
  groupMembers: [],
  city: "",
  onOffline: "both",
  tags: [],
  pic: "",
  participants: "",
  date: null,
  location: undefined,
  description: "",
};

export function GroupPageView(props) {
  const groupId = props.match.params.id;
  const classes = useStyles();
  const [joined, setJoined] = useState(false);
  const [group, setGroup] = useState(initialState);

  useEffect(async () => {
    const thisGroup = await fetchGroup(groupId);
    setGroup(thisGroup.data);
    if (thisGroup.data.chat) {
      setJoined(true);
    }
  }, [joined]);
  console.log(group);

  //connect socket
  useEffect(async () => {
    io.on("return message", async (data) => {
      const thisGroup = await fetchGroup(groupId);
      setGroup(thisGroup.data);
    });
    return () => io.destroy();
  }, []);

  async function handleJoin() {
    console.log("Joining Group");
    const result = await joinGroup(groupId);
    console.log(result.data);
    setJoined(true);
    io.emit("new system message", {
      groupId: groupId,
    });
  }

  async function handleLeave() {
    console.log("Leaving Group");
    const result = await leaveGroup(groupId);
    console.log(result.data);
    setJoined(false);
    io.emit("new system message", {
      groupId: groupId,
    });
  }

  async function editGroup() {}

  const onClose = () => {
    props.history.replace(props.location.pathname);
  };

  if (joined) {
    return (
      <div>
        <Snackbar
          open={props.location.hash === "#new"}
          autoHideDuration={6000}
          onClose={(_event, reason) => {
            // Only close after autoHideDuration expired
            if (reason === "timeout") {
              onClose();
            }
          }}
        >
          <Alert onClose={onClose} severity="success">
            You successfully created the group!
          </Alert>
        </Snackbar>
        <div className={classes.breadcrumbs}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <MUILink color="inherit" href="/" onClick={handleClick}>
              Home
            </MUILink>
            <MUILink
              color="inherit"
              href="/getting-started/installation/"
              onClick={handleClick}
            >
              My Groups
            </MUILink>
            <Typography color="textPrimary">Group Name</Typography>
          </Breadcrumbs>
        </div>
        <div className={classes.pageContent}>
          <div style={{ flex: 1 }}>
            <div className={classes.picture}>
              <img
                src={GroupImage}
                style={{ borderRadius: "5px" }}
                alt={"GroupPic"}
              />
            </div>
            <div className={classes.infoJoined}>
              <Typography variant="h4" color="inherit">
                {group.groupName}
              </Typography>
              <CustomTooltip title="Leave Group">
                <IconButton
                  onClick={() => handleLeave()}
                  color="inherit"
                  className={classes.leaveButton}
                >
                  <ExitIcon />
                </IconButton>
              </CustomTooltip>
              <CustomTooltip title="Edit Group">
                <IconButton
                  onClick={() => editGroup()}
                  color="inherit"
                  className={classes.editButton}
                >
                  <EditIcon />
                </IconButton>
              </CustomTooltip>
              <div className={classes.detailsItem}>
                <CustomTooltip title="Group Owner">
                  <UserIcon style={{ fill: "#32210B" }} />
                </CustomTooltip>
                <Typography variant="h6" className={classes.detailsItemText}>
                  {group.groupOwner.username}
                </Typography>
              </div>
              <div className={classes.detailsItem}>
                <CustomTooltip title="Date">
                  <EventIcon style={{ fill: "#32210B" }} />
                </CustomTooltip>
                {group.date && !group.date.length == 0 ? (
                  <Typography variant="h6" className={classes.detailsItemText}>
                    {new Date(group.date).toLocaleString("en-GB", {
                      weekday: "short",
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                ) : (
                  <Typography variant="h6" className={classes.detailsItemText}>
                    to be determined
                  </Typography>
                )}
              </div>
              <div className={classes.detailsItem}>
                <CustomTooltip title="Location">
                  <LocationIcon style={{ fill: "#32210B" }} />
                </CustomTooltip>
                {!group.location == "" ? (
                  <Typography variant="h6" className={classes.detailsItemText}>
                    {group.location}
                  </Typography>
                ) : (
                  <Typography variant="h6" className={classes.detailsItemText}>
                    {group.city}
                  </Typography>
                )}
              </div>
              <div className={classes.detailsItem}>
                <CustomTooltip title="Group Members">
                  <GroupIcon style={{ fill: "#32210B" }} />
                </CustomTooltip>
                <Typography variant="h6" className={classes.detailsItemText}>
                  {group.groupMembers.length}/{group.participants}
                </Typography>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              {group.tags.map((x) => {
                return (
                  <div style={{ marginRight: "10px" }}>
                    <TagComponent id={x} key={x} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classes.chat}>
            <Chat groupID={groupId} />
          </div>
        </div>
        <div style={{ fontSize: "17px" }}>
          <p>{group.description}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className={classes.breadcrumbs}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <MUILink color="inherit" href="/" onClick={handleClick}>
              Home
            </MUILink>
            <MUILink
              color="inherit"
              href="/getting-started/installation/"
              onClick={handleClick}
            >
              My Groups
            </MUILink>
            <Typography color="textPrimary">Group Name</Typography>
          </Breadcrumbs>
        </div>
        <div className={classes.pageContent}>
          <div className={classes.picture}>
            <img
              src={GroupImage}
              style={{ borderRadius: "5px" }}
              alt={"GroupPic"}
            />
          </div>
          <div className={classes.infoNotJoined}>
            <Typography variant="h4" color="inherit">
              {group.groupName}
            </Typography>
            <div className={classes.detailsItem}>
              <CustomTooltip title="Group Owner">
                <UserIcon style={{ fill: "#32210B" }} />
              </CustomTooltip>
              <Typography variant="h6" className={classes.detailsItemText}>
                {group.groupOwner.username}
              </Typography>
            </div>
            <div className={classes.detailsItem}>
              <CustomTooltip title="Date">
                <EventIcon style={{ fill: "#32210B" }} />
              </CustomTooltip>
              {group.date && !group.date.length == 0 ? (
                <Typography variant="h6" className={classes.detailsItemText}>
                  {new Date(group.date).toLocaleString("en-GB", {
                    weekday: "short",
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              ) : (
                <Typography variant="h6" className={classes.detailsItemText}>
                  to be determined
                </Typography>
              )}
            </div>
            <div className={classes.detailsItem}>
              <CustomTooltip title="City">
                <LocationIcon style={{ fill: "#32210B" }} />
              </CustomTooltip>
              <Typography variant="h6" className={classes.detailsItemText}>
                {group.city}
              </Typography>
            </div>
            <div className={classes.detailsItem}>
              <CustomTooltip title="Group Members">
                <GroupIcon style={{ fill: "#32210B" }} />
              </CustomTooltip>
              <Typography variant="h6" className={classes.detailsItemText}>
                {group.groupMembers.length}/{group.participants}
              </Typography>
            </div>
            <Button
              className={classes.joinButton}
              type="button"
              onClick={() => handleJoin()}
            >
              JOIN GROUP
            </Button>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          {group.tags.map((x) => {
            return (
              <div style={{ marginRight: "10px" }}>
                <TagComponent id={x} key={x} />
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: "17px" }}>
          <p>{group.description}</p>
        </div>
      </div>
    );
  }
}
