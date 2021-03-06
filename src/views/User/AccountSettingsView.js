import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText, Snackbar,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import Tooltip from "@material-ui/core/Tooltip";
import { CancelPremiumDialog } from "../../components/UserProfile/CancelPremiumDialog";
import { ChangePasswordDialog } from "../../components/UserProfile/ChangePasswordDialog";
import { useSelector } from "react-redux";
import { RADIO_BUTTON_BLUE, SUBSCRIPTION_PLAN } from "../../shared/Constants";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  deactivatedCancelSubscriptionButton: {
    width: "182px",
    padding: "8px 10px",
    backgroundColor: "#cccccc",
    color: "black",
    "&:hover": {
      backgroundColor: "#cccccc",
    },
  },
  leftMargin: {
    fontWeight: "bold",
  },
}));

const getPlanFromId = (planId) => {
  switch (planId) {
    case SUBSCRIPTION_PLAN.elite:
      return "Elite (12 Months)";
    case SUBSCRIPTION_PLAN.advanced:
      return "Advanced (3 Months)";
    case SUBSCRIPTION_PLAN.standard:
      return "Standard (1 Month)";
    default:
      return "None";
  }
};

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: 0,
  },
}))(Tooltip);

export function AccountSettingsView(props) {
  const classes = useStyles();
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [cancelled, setCancelled] = React.useState(false);
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    if (user.isLoggedIn) {
      setPageLoaded(true);
      setCancelled(user.user.premium.cancelled);
    }
  }, [user]);

  if (!pageLoaded) {
    return <div />;
  } else {
    return (
      <div>
        <Typography
          variant={"h3"}
          align="center"
          style={{ fontWeight: "bold", marginBottom: "40px" }}
        >
          ACCOUNT SETTINGS
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Account Information
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" className={classes.leftMargin}>Email Address</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6" style={{ fontWeight: "normal" }}>
              {user.user.email}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" className={classes.leftMargin}>Password</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" style={{ fontWeight: "normal" }}>
              ***************
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <ChangePasswordDialog />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              My Premium
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" className={classes.leftMargin}>Product</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6" style={{ fontWeight: "normal" }}>
              {user.user.premium.active
                ? getPlanFromId(user.user.premium.subscription.plan)
                : "None"}
            </Typography>
          </Grid>
          {user.user.premium.active ? (
            <Grid item xs={3}>
              <Typography variant="h6" className={classes.leftMargin}>Payment Period</Typography>
            </Grid>
          ) : null}
          {user.user.premium.active ? (
            <Grid item xs={4}>
              <Typography variant="h6" style={{ fontWeight: "normal" }}>
                {new Date(
                  user.user.premium.subscription.expiration
                ).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </Typography>
              {cancelled ? (
                <Typography style={{ fontWeight: "normal" }}>
                  The subscription has been cancelled and will terminate at the
                  end of the payment period.
                </Typography>
              ) : (
                <Typography style={{ fontWeight: "normal" }}>
                  The subscription renews automatically at the end of the
                  payment period.
                </Typography>
              )}
            </Grid>
          ) : null}
          {user.user.premium.active ? <Grid item xs={1}></Grid> : null}
          {user.user.premium.active ? (
            <Grid item xs={4}>
              {cancelled ? (
                <CustomTooltip
                  title={"Your subscription has already been cancelled."}
                >
                  <div style={{ width: "182px" }}>
                    <Button
                      className={classes.deactivatedCancelSubscriptionButton}
                      disabled={true}
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                </CustomTooltip>
              ) : (
                <CancelPremiumDialog
                  cancelled={cancelled}
                  setCancelled={setCancelled}
                />
              )}
            </Grid>
          ) : null}
          {user.user.premium.active ? (
            <Grid item xs={3}>
              <Typography variant="h6" className={classes.leftMargin} style={{ marginTop: "20px" }}>
                Your Perks
              </Typography>
            </Grid>
          ) : null}
          {user.user.premium.active ? (
            <Grid item xs={9}>
              <div style={{ position: "relative", height: "233px" }}>
                <div
                  style={{
                    position: "absolute",
                    transform: "translateX(-15px)",
                  }}
                >
                  <List dense={false}>
                    <ListItem>
                      <ListItemIcon>
                        <NotInterestedIcon style={{ fill: RADIO_BUTTON_BLUE }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Zero Adds"
                        secondary="Enjoy a completely advertisement-free experience"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AllInclusiveIcon style={{ fill: RADIO_BUTTON_BLUE }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Unlimited Groups"
                        secondary="Meet infinite people by joining as many groups as you like (instead of 5)"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUpIcon style={{ fill: RADIO_BUTTON_BLUE }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Boost Your Groups"
                        secondary="Have all groups that you are the owner of displayed at the top of other users' search results"
                      />
                    </ListItem>
                  </List>
                </div>
              </div>
            </Grid>
          ) : null}
        </Grid>

        <Snackbar
            open={props.location.hash === "#redirect"}
            autoHideDuration={3000}
            onClose={(_event, reason) => {
              // Only close after autoHideDuration expired
              if (reason === "timeout") {
                props.history.replace(props.location.pathname);
              }
            }}
        >
          <Alert variant="filled" onClose={() => {
            props.history.replace(props.location.pathname);
          }} severity="info">
            You already have HOBB.EE Premium!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
