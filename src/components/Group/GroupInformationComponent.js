import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { Button, IconButton } from "@material-ui/core";
import ExitIcon from "@material-ui/icons/ExitToApp";
import UserIcon from "@material-ui/icons/AccountCircle";
import {
  BUTTON_BLUE,
  BUTTON_BLUE_HOVER, RADIO_BUTTON_BLUE,
} from "../../shared/Constants";
import EventIcon from "@material-ui/icons/Event";
import LocationIcon from "@material-ui/icons/LocationOn";
import GroupIcon from "@material-ui/icons/PeopleAlt";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { EditGroupDialog } from "./EditGroupDialog";
import { useSelector, connect } from "react-redux";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import ErrorIcon from "@material-ui/icons/Error";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  detailsItem: {
    alignItems: "center",
    marginTop: "5px",
    marginLeft: "20px",
  },
  joinButton: {
    width: "182px",
    backgroundColor: BUTTON_BLUE,
    padding: "8px 10px",
    color: "black",
    "&:hover": {
      backgroundColor: BUTTON_BLUE_HOVER,
    },
  },
  expiredIcon: {
    marginTop: "9px",
    marginLeft: "9px",
    fill: "tomato",
  },
}));

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: 0,
  },
}))(Tooltip);

function GroupInformationComponent(props) {
  const classes = useStyles();
  const user = useSelector((state) => {
    return state.user;
  });

  if (props.group.groupName === "") {
    return <div />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography
            variant="h4"
            color="inherit"
            style={{
              wordWrap: "break-word",
              fontWeight: "bold",
              marginBottom: "-5px",
            }}
          >
            {props.group.groupName}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          {props.joined ? (
            !(
              props.group.date && props.group.date < new Date().toISOString()
            ) ? (
              <CustomTooltip title="Leave Group">
                <IconButton onClick={() => props.handleLeave()}>
                  <ExitIcon />
                </IconButton>
              </CustomTooltip>
            ) : (
              <CustomTooltip title="This group has expired. Leaving or editing is not possible anymore.">
                <ErrorIcon className={classes.expiredIcon} />
              </CustomTooltip>
            )
          ) : null}
        </Grid>
        <Grid item xs={2}>
          <div className={classes.detailsItem}>
            <CustomTooltip title="Group Owner">
              <UserIcon style={{ fill: "black" }} />
            </CustomTooltip>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div style={{ display: "flex" }}>
            <Typography variant="h6">
              {props.group.groupOwner.username}
            </Typography>
            {props.group.groupOwner.premium.active ? (
              <CustomTooltip
                title={
                  props.group.groupOwner.username + " is boosting this group."
                }
              >
                <TrendingUpIcon
                  style={{
                    fill: RADIO_BUTTON_BLUE,
                    marginTop: "4px",
                    marginLeft: "8px",
                  }}
                />
              </CustomTooltip>
            ) : null}
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.detailsItem}>
            <CustomTooltip title="Date">
              <EventIcon style={{ fill: "black" }} />
            </CustomTooltip>
          </div>
        </Grid>
        <Grid item xs={10}>
          {props.group.date ? (
            <Typography variant="h6">
              {new Date(props.group.date).toLocaleString("en-GB", {
                weekday: "short",
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          ) : (
            <Typography variant="h6">to be determined</Typography>
          )}
        </Grid>
        <Grid item xs={2}>
          <div className={classes.detailsItem}>
            <CustomTooltip title="Location">
              <LocationIcon style={{ fill: "black" }} />
            </CustomTooltip>
          </div>
        </Grid>
        <Grid item xs={10}>
          {props.joined && props.group.location !== "" ? (
            <div>
              <Typography variant="h6" style={{ wordWrap: "break-word" }}>
                {props.group.location}
              </Typography>
              <Typography variant="h6" style={{ wordWrap: "break-word" }}>
                {props.group.city}
              </Typography>
            </div>
          ) : (
            <Typography variant="h6" style={{ wordWrap: "break-word" }}>
              {props.group.city}
            </Typography>
          )}
          {props.group.onOffline === "online" ? (
            <Typography variant="h6">(online)</Typography>
          ) : null}
        </Grid>
        <Grid item xs={2}>
          <div className={classes.detailsItem}>
            {props.joined ? (
              <PopupState variant="popover" popupId="groupmembers-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <CustomTooltip title="Group Members">
                      <GroupIcon
                        style={{ fill: "black", cursor: "pointer" }}
                        {...bindTrigger(popupState)}
                      />
                    </CustomTooltip>
                    <Menu
                      {...bindMenu(popupState)}
                      getContentAnchorEl={null}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      {props.group.groupMembers.map((member) => {
                        return (
                          <MenuItem
                            key={member._id}
                            onClick={() =>
                              props.history.push("/user/" + member.username)
                            }
                          >
                            {member.username}
                          </MenuItem>
                        );
                      })}
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            ) : (
              <CustomTooltip title="Group Members">
                <GroupIcon style={{ fill: "black" }} />
              </CustomTooltip>
            )}
          </div>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6">
            {props.group.maxMembers !== 0
              ? props.group.groupMembers.length + "/" + props.group.maxMembers
              : props.group.groupMembers.length}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          {props.joined &&
          user.user &&
          props.group.groupOwner._id === user.user._id &&
          (props.group.date === null ||
            props.group.date > new Date().toISOString()) ? (
            <EditGroupDialog
              group={props.group}
              setGroup={props.setGroup}
              handleDelete={props.handleDelete}
            />
          ) : null}
        </Grid>
        {!props.joined ? (
          !(props.group.date && props.group.date < new Date().toISOString()) ? (
            <Grid item xs={12}>
              <Button
                className={classes.joinButton}
                type="button"
                onClick={() => props.handleJoin()}
              >
                JOIN GROUP
              </Button>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <div style={{ display: "flex" }}>
                <div className={classes.detailsItem}>
                  <ErrorIcon style={{ fill: "tomato" }} />
                </div>
                <div style={{ marginTop: "8px", marginLeft: "15px" }}>
                  <Typography
                    style={{ color: "tomato", fontWeight: 800 }}
                  >
                    This group has expired and can't be joined.
                  </Typography>
                </div>
              </div>
            </Grid>
          )
        ) : null}
      </Grid>
    </div>
  );
}

export default connect()(withRouter(GroupInformationComponent));
