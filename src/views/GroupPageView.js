import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GroupImage from "../assets/test.png";
import "../views/style.css";
import UserIcon from "@material-ui/icons/AccountCircle";
import EventIcon from "@material-ui/icons/Event";
import LocationIcon from "@material-ui/icons/LocationOn";
import GroupIcon from "@material-ui/icons/PeopleAlt";
import { Button, IconButton } from "@material-ui/core";
import { Chat } from "../components/Chat";
import { TagComponent } from "../components/TagComponent";
import {
  joinGroupRequest,
  leaveGroupRequest,
  fetchGroup,
} from "../services/GroupService";
import { io } from "../services/SocketService";
import Tooltip from "@material-ui/core/Tooltip";
import { useSelector } from "react-redux";
import { getFileUrl } from "../services/FileService";
import Grid from "@material-ui/core/Grid";
import { GroupInformationComponent } from "../components/GroupInformationComponent";

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
  const classes = useStyles();
  const groupId = props.match.params.id;
  const [joined, setJoined] = useState(false);
  const [group, setGroup] = useState(initialState);
  const [chatLoaded, setChatLoaded] = useState(false);
  const user = useSelector((state) => {
    return state.user;
  });

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

  //dynamically adjust chat height to group info height
  //TODO: make this less hacky, if possible. Otherwise make comment
  useEffect( () => {
    setTimeout(() => {
      setChatLoaded(true);
      const scroller = document.getElementsByClassName("scroller");
      if(scroller.length !== 0) {
        scroller[0].style.height =
            document.getElementById("group-info-div").offsetHeight - 72 + "px";
      }
    }, 100);
  }, [group]);

  async function handleJoin() {
    console.log("Joining Group");
    const result = await joinGroupRequest(groupId);
    console.log(result.data);
    setJoined(true);
    io.emit("new system message", {
      groupId: groupId,
    });
  }

  async function handleLeave() {
    console.log("Leaving Group");
    const result = await leaveGroupRequest(groupId);
    console.log(result.data);
    setJoined(false);
    io.emit("new system message", {
      groupId: groupId,
    });
  }

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
                />
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} id="chat-div">
          {chatLoaded ? (joined ? (
            <Chat groupID={groupId} />
          ) : (
            <GroupInformationComponent
              group={group}
              setGroup={setGroup}
              joined={joined}
              setJoined={setJoined}
              handleJoin={handleJoin}
              handleLeave={handleLeave}
            />
          )) : null}
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
    </div>
  );
}
