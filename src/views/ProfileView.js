import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import HobbeeIcon from "../assets/bee_cream.png";
import TextField from "@material-ui/core/TextField";
import { GroupComponent } from "../components/GroupComponent";
import { TagComponent } from "../components/TagComponent";
import { TagAutocomplete } from "../components/TagAutocomplete";
import { Editable } from "../components/Editable";
import { useSelector } from "react-redux";
import { MyGroupsResultsComponent } from "../components/MyGroupsResultsComponent";

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
  const user = useSelector((state) => state.user.user);
  const [formData, setFormData] = React.useState(user);

  React.useEffect(() => {
    setFormData(user);
  }, [user]);

  return (
    <Editable
      render={(editing) => {
        if (!formData) return null;

        console.log(formData);

        return (
          <div className={classes.root}>
            <h1>
              Welcome to your profile, {formData.username}. Thanks for using
              Hobb.ee!
            </h1>

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={1} sm={3}>
                <Paper className={classes.paper} elevation={1}>
                  <Link className={"linkDefault"} to={"/profile"}>
                    <img src={HobbeeIcon} height={200} alt={"Profile"} />
                  </Link>
                </Paper>
              </Grid>

              <Grid item xs={9}>
                <Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        My name is:
                        <TextField
                          id="outlined-required"
                          value={formData.username}
                          onChange={(event) => {
                            setFormData((formData) => {
                              return {
                                ...formData,
                                username: event.target.value,
                              };
                            });
                          }}
                          disabled={!editing}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        My mail is:
                        <form
                          className={classes.root}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            id="standard-basic"
                            value={formData.email}
                            disabled={!editing}
                            onChange={(event) => {
                              setFormData((formData) => {
                                return {
                                  ...formData,
                                  email: event.target.value,
                                };
                              });
                            }}
                          />
                        </form>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        My birthday is:
                        <form
                          className={classes.root}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            id="standard-basic"
                            value={formData.dateOfBirth}
                            disabled={!editing}
                            onChange={(event) => {
                              setFormData((formData) => {
                                return {
                                  ...formData,
                                  dateOfBirth: event.target.value,
                                };
                              });
                            }}
                          />
                        </form>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <h3> These are your interests: </h3>

            <Grid container spacing={2}>
              {formData.hobbies.map((x) => {
                return (
                  <TagComponent
                    id={x}
                    key={x}
                    onDelete={
                      editing
                        ? () => {
                            setFormData((formData) => {
                              return {
                                ...formData,
                                hobbies: formData.hobbies.filter((hobby) => {
                                  return x !== hobby;
                                }),
                              };
                            });
                          }
                        : undefined
                    }
                  />
                );
              })}

              <Grid item>
                {editing ? (
                  <TagAutocomplete
                    onChange={(hobbies) => {
                      setFormData((formData) => {
                        return { ...formData, hobbies };
                      });
                    }}
                    value={formData.hobbies}
                  />
                ) : null}
              </Grid>
            </Grid>

            <MyGroupsResultsComponent />
          </div>
        );
      }}
    />
  );
}
