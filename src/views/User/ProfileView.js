import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import UserIcon from "@material-ui/icons/AccountCircle";
import Tooltip from "@material-ui/core/Tooltip";
import CakeIcon from "@material-ui/icons/Cake";
import Typography from "@material-ui/core/Typography";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import ExploreIcon from "@material-ui/icons/Explore";
import LabelIcon from "@material-ui/icons/Label";

import { TagComponent } from "../../components/Tag/TagComponent";
import { fetchUser } from "../../services/UserService";
import { EditUserDialogComponent } from "../../components/UserProfile/EditUserDialogComponent";
import { getFileUrl } from "../../services/FileService";
import { ReportUserDialog } from "../../components/UserProfile/ReportUserDialog";
import PlaceHolderAvatar from "../../assets/bee_white.png";
import { RADIO_BUTTON_BLUE } from "../../shared/Constants";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  img: {
    borderRadius: "10px",
    objectFit: "contain",
    minWidth: "100%",
    maxWidth: "100%",
    marginBottom: "10px",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
  },
  detailsItem: {
    alignItems: "center",
    marginTop: "5px",
    marginLeft: "35px",
  },
}));

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: 0,
  },
}))(Tooltip);

function ProfileView(props) {
  const classes = useStyles();
  const usernameInURL = props.match.params.username;

  const [formData, setFormData] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.authReady) {
      async function populateData() {
        try {
          if (
              user.isLoggedIn &&
              (user.user.username === usernameInURL || !usernameInURL)
          ) {
            setFormData(user.user);
          } else {
            const profileData = await fetchUser(usernameInURL);
            setFormData(profileData.data);
          }
        } catch (e) {
          console.log(e);
        }
      }
      populateData();
    }
  }, [user.authReady, props.location, usernameInURL]); // eslint-disable-line -- react-hooks/exhaustive-deps
  // Only initialized once on render with finished auth state

  if (!formData)
    return (
      <div className={classes.root}>
        <h1>User Does Not Exist</h1>
      </div>
    );

  return (
    <div className={classes.root}>
      <Typography
        variant={"h3"}
        align="center"
        style={{ fontWeight: "bold", marginBottom: "40px" }}
      >
        {formData.username === user.user.username || !usernameInURL
          ? "YOUR PROFILE"
          : "PROFILE OF   " + formData.username.toUpperCase()}
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          {!formData.avatar ? (
            <img
              className={classes.img}
              src={PlaceHolderAvatar}
              alt={"Profile"}
            />
          ) : (
            <img
              className={classes.img}
              src={getFileUrl(formData.avatar)}
              alt={"Profile"}
            />
          )}
        </Grid>

        <Grid item xs={9}>
            <Grid container spacing={2}>

              <Grid item xs={2}>
                <div className={classes.detailsItem}>
                  <CustomTooltip key={"username"} title="Username">
                    <UserIcon style={{ fill: "black" }} />
                  </CustomTooltip>
                </div>
              </Grid>
              <Grid item xs={8}>
                <div style={{ display: "flex" }}>
                  <Typography variant="h6">{formData.username}</Typography>
                  {formData.premium.active ? (
                    <CustomTooltip
                      key={"vip"}
                      title={formData.username + " is supporting Hobb.ee ❤"}
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
                  {(formData.username === user.user.username ||
                    !usernameInURL) ? (
                    <EditUserDialogComponent
                      user={formData}
                      setUser={setFormData}
                    />
                  ) : (
                      <ReportUserDialog username={usernameInURL} />
                  )}
                </div>
              </Grid>

              {(formData.username === user.user.username || !usernameInURL) && [
                <Grid key={"bday"} item xs={2}>
                  <div className={classes.detailsItem}>
                    <CustomTooltip title="Birthday">
                      <CakeIcon style={{ fill: "black" }} />
                    </CustomTooltip>
                  </div>
                </Grid>,
                <Grid key={"bdayLabel"} item xs={10}>
                  <Typography variant="h6">
                    {new Date(formData.dateOfBirth).toLocaleString("en-GB", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </Typography>
                </Grid>,
              ]}

              <Grid item xs={2}>
                <div className={classes.detailsItem}>
                  <CustomTooltip key={"city"} title="City">
                    <ExploreIcon style={{ fill: "black" }} />
                  </CustomTooltip>
                </div>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h6">{formData.city}</Typography>
              </Grid>

              <Grid item xs={2}>
                <div className={classes.detailsItem}>
                  <CustomTooltip key={"hobbies"} title="Hobbies">
                    <LabelIcon style={{ fill: "black" }} />
                  </CustomTooltip>
                </div>
              </Grid>

              <Grid item xs={10}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {formData.hobbies.map((x, i) => {
                    return (
                      <div
                        style={{ marginRight: "10px", marginBottom: "5px" }}
                        key={i}
                      >
                        <TagComponent id={x} key={x} />
                      </div>
                    );
                  })}
                </div>
              </Grid>
            </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect()(withRouter(ProfileView));
