import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import HobbeeIcon from "../assets/bee_cream.png";
import TextField from "@material-ui/core/TextField";
import {TagComponent} from "../components/TagComponent";
import {TagAutocomplete} from "../components/TagAutocomplete";
import {GroupResultsComponentDemo} from "../components/GroupResultsComponentDemo"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "Left",
    color: "#32210B",
  },
  image: {
    width: 256,
    height: 256,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export function ProfileView(props) {
  const classes = useStyles();

  const name = "Jaina Jainason";
  const city = "Munich";
  const birthday = new Date("July 19, 1998 13:37").toLocaleDateString();
  const mail = "jaina@gmail.com";

  const [tags, setTags] = React.useState([]);

  return (
    <div className={classes.root}>
      <h1>Welcome to your profile, Jaina. Thanks for using Hobb.ee!</h1>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={1} sm={3}>
          <Paper className={classes.paper} elevation={1}>
            <Link className={"linkDefault"} to={"/profile"}>
              <img src={HobbeeIcon} height={200} alt={"Profile"}/>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={9}>
          <Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  My name is:
                  <form className={classes.root} autoComplete="off">
                    <TextField id="outlined-required" label={name}/>
                  </form>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  My mail is:
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label={mail}/>
                  </form>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  My birthday is:
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label={birthday}/>
                  </form>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  Default Location:
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label={city}/>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <h3> These are your interests: </h3>

      <Grid container spacing={2}>
        {tags.map((x) => {
          return <TagComponent id={x} key={x}/>;
        })}

        <Grid item>
          <TagAutocomplete
            onChange={(tags) => {
              setTags(tags);
            }}
            value={tags}
          />
        </Grid>
      </Grid>

      <h3> These are your groups: </h3>

      <GroupResultsComponentDemo/>
    </div>
  );
}
