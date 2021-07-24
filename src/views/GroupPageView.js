import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../views/style.css";
import { Snackbar } from "@material-ui/core";
import { Chat } from "../components/Chat";
import { TagComponent } from "../components/TagComponent";
import {
  joinGroupRequest,
  leaveGroupRequest,
  fetchGroup,
  deleteGroupRequest,
} from "../services/GroupService";
import { io } from "../services/SocketService";
import { getFileUrl } from "../services/FileService";
import Grid from "@material-ui/core/Grid";
import GroupInformationComponent from "../components/GroupInformationComponent";
import { Alert } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  pageContent: {
    marginTop: "30px",
    display: "flex",
  },
  image: {
    borderRadius: "10px",
    objectFit: "contain",
    maxWidth: "100%",
    marginBottom: "10px",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
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
    wordBreak: "break-all",
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

const initialState = {
  _id: "",
  groupName: "",
  groupOwner: "",
  groupMembers: [],
  city: "",
  onOffline: "both",
  tags: [],
  pic: "",
  maxMembers: "",
  date: null,
  location: undefined,
  description: "",
};

const initialSnackbar = {
  open: false,
  message: "",
};

export function GroupPageView(props) {
  const classes = useStyles();
  const groupId = props.match.params.id;
  const [joined, setJoined] = useState(false);
  const [group, setGroup] = useState(initialState);
  const [chatLoaded, setChatLoaded] = useState(false);
  const [snackbar, setSnackbar] = React.useState(initialSnackbar);
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const user = useSelector(
      (state) => {return state.user;}
  );

  useEffect(() => {
    try {
      if(user.isLoggedIn) {
        const thisGroup = fetchGroup(groupId);
        thisGroup.then((response) => {
          setPageLoaded(true);
          setGroup(response.data);
          if (response.data.chat) {
            setJoined(true);
          }
        });
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  }, [user.user, joined]);

  //connect socket
  useEffect(async () => {
    io.on("return message", async (data) => {
      const thisGroup = await fetchGroup(groupId);
      setGroup(thisGroup.data);
    });
    return () => io.destroy();
  }, []);

  //dynamically adjust chat height to group info height
  //TODO: make this less hacky, if possible. Otherwise make comment
  useEffect(() => {
    setTimeout(() => {
      setChatLoaded(true);
      const scroller = document.getElementsByClassName("scroller");
      if (scroller.length !== 0) {
        scroller[0].style.height =
          document.getElementById("group-info-div").offsetHeight - 72 + "px";
      }
    }, 100);
  }, [group]);

  async function handleJoin() {
    console.log("Joining Group");
    try {
      const result = await joinGroupRequest(groupId);
      console.log(result.data.message);
      console.log("test");
      setJoined(true);
      io.emit("system update message", {
        groupId: groupId,
      });
    } catch (e) {
      console.log("Failed to join group");
      handleError(e.response.data.message);
    }
  }

  async function handleLeave() {
    console.log("Leaving Group");
    try {
      const result = await leaveGroupRequest(groupId);
      console.log(result.data);
      setJoined(false);
      io.emit("system update message", {
        groupId: groupId,
      });
    } catch (e) {
      console.log("Failed to leave group");
      handleError(e.response.data.message);
    }
  }

  async function handleDelete() {
    console.log("Deleting Group");
    try {
      await deleteGroupRequest(groupId);
      setGroup((group) => {
        return { ...group, deleted: true };
      });
      io.emit("system update message", {
        groupId: groupId,
      });
    } catch (e) {
      console.log("Failed to delete group");
      handleError(e.response.data.message);
    }
  }

  const handleError = (error) => {
    if (error === "Failed to authenticate token") {
      setSnackbar({
        open: true,
        message: "You need to be logged in for this action.",
      });
    } else {
      setSnackbar({ open: true, message: error });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ open: false, message: "" });
  };

  const onClose = () => {
    props.history.replace(props.location.pathname);
  };

  if (!pageLoaded) {
    return (<div/>);
  } else {
    if (group.deleted) {
      return (
        <div>
          <Typography
            variant="h4"
            align={"center"}
            style={{ marginTop: "40px" }}
          >
            This group has been deleted.
          </Typography>
        </div>
      );
    }
    if (group.groupName !== "") {
      return (
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item id="group-info-div" xs={12}>
                  <img
                    src={getFileUrl(group.pic)}
                    className={classes.image}
                    alt={"GroupPic"}
                  />
                  {joined ? (
                    <GroupInformationComponent
                      group={group}
                      setGroup={setGroup}
                      joined={joined}
                      setJoined={setJoined}
                      handleJoin={handleJoin}
                      handleLeave={handleLeave}
                      handleDelete={handleDelete}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} id="chat-div">
              {chatLoaded ? (
                joined ? (
                  <Chat groupID={groupId} />
                ) : (
                  <GroupInformationComponent
                    group={group}
                    setGroup={setGroup}
                    joined={joined}
                    setJoined={setJoined}
                    handleJoin={handleJoin}
                    handleLeave={handleLeave}
                    handleDelete={handleDelete}
                  />
                )
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex" }}>
                {group.tags.map((x) => {
                  return (
                    <div style={{ marginRight: "10px" }}>
                      <TagComponent id={x} key={x} />
                    </div>
                  );
                })}
              </div>
            </Grid>
            <Grid item xs={12}>
              {group.description}
            </Grid>
          </Grid>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert variant="filled" onClose={handleClose} severity="error">
              {snackbar.message}
            </Alert>
          </Snackbar>

          <Snackbar
            open={props.location.hash === "#new"}
            autoHideDuration={3000}
            onClose={(_event, reason) => {
              // Only close after autoHideDuration expired
              if (reason === "timeout") {
                onClose();
              }
            }}
          >
            <Alert variant="filled" onClose={onClose} severity="success">
              Group created!
            </Alert>
          </Snackbar>
        </div>
      );
    } else {
      return (
        <div>
          <Typography
            variant="h4"
            align={"center"}
            style={{ marginTop: "40px" }}
          >
            This group doesn't exist.
          </Typography>
        </div>
      );
    }
  }
}
