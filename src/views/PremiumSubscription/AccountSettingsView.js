import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import {HOBBEE_ORANGE, HOBBEE_YELLOW} from "../../shared/Constants";

const useStyles = makeStyles((theme) => ({
  changePasswordButton: {
    width: "182px",
    padding: "8px 10px",
    backgroundColor: "#ffdb4d",
    color: "black",
    "&:hover": {
      backgroundColor: "#fff0b3",
    },
  },
  cancelSubscriptionButton: {
    width: "182px",
    padding: "8px 10px",
    backgroundColor: "#ff7d66",
    color: "black",
    "&:hover": {
      backgroundColor: "#ffd4cc",
    },
  },
}));

export function AccountSettingsView(props) {
  const classes = useStyles();

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
          <Typography variant="h6">Email Address</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h6" style={{ fontWeight: "normal" }}>
            maja.schuknecht@web.de
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Password</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6" style={{ fontWeight: "normal" }}>
            ***************
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button className={classes.changePasswordButton}>
            Change Password
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            My Premium
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Product</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h6" style={{ fontWeight: "normal" }}>
            3-Month Subscription
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Payment Period</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" style={{ fontWeight: "normal" }}>
            22.08.2021
          </Typography>
          <Typography variant="h7" style={{ fontWeight: "normal" }}>
            The subscription renews automatically at the end of the payment period.
          </Typography>
        </Grid>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={4}>
          <Button className={classes.cancelSubscriptionButton}>
            Cancel Subscription
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Your Perks
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <div style={{ position: "relative", height: "233px" }}>
            <div
              style={{ position: "absolute", transform: "translateX(-15px)" }}
            >
              <List dense={false}>
                <ListItem>
                  <ListItemIcon>
                    <NotInterestedIcon style={{ fill: "#17C2BC" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Zero Adds"
                    secondary="Enjoy a completely advertisement-free experience"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AllInclusiveIcon style={{ fill: "#17C2BC" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Unlimited Groups"
                    secondary="Meet infinite people by joining as many groups as you like (instead of 5)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUpIcon style={{ fill: "#17C2BC" }} />
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
      </Grid>
    </div>
  );
}
