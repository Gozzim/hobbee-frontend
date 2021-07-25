import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { TagComponent } from "../components/TagComponent";
import { connect, useSelector } from "react-redux";
import { MyGroupsResultsComponent } from "../components/MyGroupsResultsComponent";
import { fetchUser } from "../services/UserService";
import UserIcon from "@material-ui/icons/AccountCircle";
import { HOBBEE_BROWN } from "../shared/Constants";
import Tooltip from "@material-ui/core/Tooltip";
import CakeIcon from '@material-ui/icons/Cake';
import Typography from "@material-ui/core/Typography";
import TagIcon from '@material-ui/icons/LocalOffer';
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { EditUserDialogComponent } from "../components/EditUserDialogComponent";
import { getFileUrl } from "../services/FileService";
import ExploreIcon from "@material-ui/icons/Explore";
import { withRouter } from "react-router-dom"
import { ReportUserDialog } from "../components/ReportUserDialog";
import  PlaceHolderAvatar from "../assets/bee_white.png"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "Center",
    color: "#32210B",
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
    marginLeft: "20px",
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
  console.log(props);
  const classes = useStyles();
  const usernameInURL = props.match.params.username;

  const [formData, setFormData] = React.useState(null);
  const user = useSelector((state) => state.user);

  React.useEffect(async () => {
    if (user.authReady) {
      try {
        if (user.isLoggedIn && (user.user.username === usernameInURL || !usernameInURL)) {
          setFormData(user.user);
        } else {
          const profileData = await fetchUser(usernameInURL);
          setFormData(profileData.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [user.authReady, props.location]);


  if (!formData) return (<div className={classes.root}> <h1>User Does Not Exist</h1> </div>) //TODO

  return (
    <div className={classes.root}>
        <h1>
          Profile of {formData.username}
        </h1>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>

            {!formData.avatar ?
              (
                <img className={classes.img} src={PlaceHolderAvatar} alt={"Profile"}/>
            )
            :
              (
                <img className={classes.img} src={getFileUrl(formData.avatar)} alt={"Profile"}/>
              )
            }

          </Grid>

          <Grid item xs={8}>
            <Grid>{/**/}
              <Grid container spacing={2}>

                <Grid item xs={2}>
                  <div className={classes.detailsItem}>
                    <CustomTooltip title="Username">
                      <UserIcon style={{fill: HOBBEE_BROWN}}/>
                    </CustomTooltip>
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className={classes.detailsItem}>
                    <Typography variant="h6">
                      {formData.username} {formData.premium.active
                      ? (
                        <CustomTooltip
                          title={
                            formData.username + " is supporting hobb.ee ❤"
                          }
                        >
                          <TrendingUpIcon
                            style={{
                              fill: "#17C2BC",
                              marginTop: "4px",
                              marginLeft: "8px",
                            }}
                          />
                        </CustomTooltip>
                      ) : null
                    }
                    </Typography>


                  </div>
                </Grid>

                <Grid item xs={2}>
                  <div className={classes.detailsItem}>
                    <Typography variant="h6">
                      {(formData.username === usernameInURL || !usernameInURL) &&
                      <EditUserDialogComponent user={formData} setUser={setFormData}/>}
                    </Typography>
                  </div>
                </Grid>


                <Grid item xs={2}>
                  <div className={classes.detailsItem}>
                    <Typography variant="h6">
                      {(formData.username !== usernameInURL && usernameInURL) &&
                        <ReportUserDialog/>}
                    </Typography>
                  </div>
                </Grid>


                {(formData.username === usernameInURL || !usernameInURL) && [
                <Grid item xs={2}>
                  <div className={classes.detailsItem}>
                    <CustomTooltip title="Birthday">
                      <CakeIcon style={{fill: HOBBEE_BROWN}}/>
                    </CustomTooltip>
                  </div>
                </Grid>,

                  <Grid item xs={10}>
                  <div className={classes.detailsItem}>
                  <Typography variant="h6">
                {new Date(formData.dateOfBirth).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
                  </Typography>
                  </div>
                  </Grid>
                ]}

                <Grid item xs={2}>
                  <div className={classes.detailsItem}>
                    <CustomTooltip title="City">
                      <ExploreIcon style={{fill: HOBBEE_BROWN}}/>
                    </CustomTooltip>
                  </div>
                </Grid>

                <Grid item xs={10}>
                  <div className={classes.detailsItem}>
                    <Typography variant="h6">
                      {formData.city}
                    </Typography>
                  </div>
                </Grid>

                <Grid item xs={2}>
                  <div className={classes.detailsItem}>
                    <CustomTooltip title="Hobbies">
                      <TagIcon style={{fill: HOBBEE_BROWN}}/>
                    </CustomTooltip>
                  </div>
                </Grid>

                <Grid item xs={10}>
                  <div className={classes.detailsItem}>
                    <Grid container spacing={2}>
                      <div style={{display: "flex", flexWrap: "wrap"}}>
                        {formData.hobbies.map((x) => {
                          return (
                            <div style={{marginRight: "10px", marginBottom: "5px"}}>
                              <TagComponent
                                id={x}
                                key={x}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </Grid>
                  </div>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </Grid>


      {(formData.username === usernameInURL || !usernameInURL) && [
        <MyGroupsResultsComponent/>
      ]
      }

    </div>
  )
}

export default connect()(withRouter(ProfileView))