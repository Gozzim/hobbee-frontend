import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../views/style.css";
import { Snackbar } from "@material-ui/core";
import { Chat } from "../components/Chat/Chat";
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
  image: {
    borderRadius: "10px",
    objectFit: "contain",
    maxWidth: "100%",
    marginBottom: "10px",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
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
  const [snackbar, setSnackbar] = useState(initialSnackbar);
  const [pageLoaded, setPageLoaded] = useState(false);
  const user = useSelector(
      (state) => {return state.user;}
  );

  useEffect(() => {
    try {
      if(user.authReady) {
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
  }, [user.authReady, joined]);

  //connect socket
  useEffect(() => {
    io.on("return message", async () => {
      const thisGroup = await fetchGroup(groupId);
      setGroup(thisGroup.data);
    });
    return () => {
      io.close();
    };
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
    try {
      const result = await joinGroupRequest(groupId); //TODO handling
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
    try {
      const result = await leaveGroupRequest(groupId); //TODO handling
      setJoined(false);
      io.emit("system update message", {
        groupId: groupId,
      });
    } catch (e) {
      handleError(e.response.data.message);
    }
  }

  async function handleDelete() {
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
    return <div/>;
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
