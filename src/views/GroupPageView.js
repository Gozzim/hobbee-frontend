import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import MUILink from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import GroupImage from "../assets/test.png";
import "../views/style.css";
import UserIcon from "@material-ui/icons/AccountCircle";
import EventIcon from "@material-ui/icons/Event";
import LocationIcon from "@material-ui/icons/LocationOn";
import GroupIcon from "@material-ui/icons/PeopleAlt";
import { Button, IconButton } from "@material-ui/core";
import { Chat } from "../components/Chat";
import ExitIcon from "@material-ui/icons/ExitToApp";
import { TagComponent } from "../components/TagComponent";
import { joinGroup, leaveGroup, fetchGroup } from "../services/GroupService";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    marginTop: "20px",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  pageContent: {
    marginTop: "50px",
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
}));

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

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
  const [joined, setJoined] = useState(false);
  const [group, setGroup] = useState(initialState);

  useEffect(async () => {
    const thisGroup = await fetchGroup("60eac733995d842558cf257b");
    setGroup(thisGroup.data);
    //check to see if user is in group
    if(!joined && (typeof thisGroup.data.location !== 'undefined')) {
      setJoined(true);
    }
  }, [joined]);
  console.log(group);


  async function handleJoin() {
    console.log("Joining Group");
    const result = await joinGroup("60eac733995d842558cf257b");
    console.log(result.data);
    setJoined(true);
  }

  async function handleLeave() {
    console.log("Leaving Group");
    const result = await leaveGroup("60eac733995d842558cf257b");
    console.log(result.data);
    setJoined(false);
  }



  if (joined) {
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
              <IconButton
                onClick={() => handleLeave()}
                color="inherit"
                className={classes.leaveButton}
              >
                <ExitIcon />
              </IconButton>
              <div className={classes.detailsItem}>
                <UserIcon style={{ fill: "#32210B" }} />
                <Typography variant="h6" className={classes.detailsItemText}>
                  {group.groupOwner.username}
                </Typography>
              </div>
              <div className={classes.detailsItem}>
                <EventIcon style={{ fill: "#32210B" }} />
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
              </div>
              <div className={classes.detailsItem}>
                <LocationIcon style={{ fill: "#32210B" }} />
                <Typography variant="h6" className={classes.detailsItemText}>
                  {group.location}
                </Typography>
              </div>
              <div className={classes.detailsItem}>
                <GroupIcon style={{ fill: "#32210B" }} />
                <Typography variant="h6" className={classes.detailsItemText}>
                  {group.groupMembers.length}/{group.participants}
                </Typography>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              {group.tags.map((x) => {
                return <TagComponent id={x} />;
              })}
            </div>
          </div>
          <div className={classes.chat}>
            <Chat />
          </div>
        </div>

        <div style={{ fontSize: "17px" }}>
          <p>
            Failure to comply will result in disqualification. Lorem ipsum dolor
            sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
            duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet.
          </p>
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
              <UserIcon style={{ fill: "#32210B" }} />
              <Typography variant="h6" className={classes.detailsItemText}>
                {group.groupOwner.username}
              </Typography>
            </div>
            <div className={classes.detailsItem}>
              <EventIcon style={{ fill: "#32210B" }} />
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
            </div>
            <div className={classes.detailsItem}>
              <LocationIcon style={{ fill: "#32210B" }} />
              <Typography variant="h6" className={classes.detailsItemText}>
                {group.city}
              </Typography>
            </div>
            <div className={classes.detailsItem}>
              <GroupIcon style={{ fill: "#32210B" }} />
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
            return <TagComponent id={x} />;
          })}
        </div>
        <div style={{ fontSize: "17px" }}>
          <p>
            Failure to comply will result in disqualification. Lorem ipsum dolor
            sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
            duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    );
  }
}
