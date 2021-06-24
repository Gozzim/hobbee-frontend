import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ContentContainer } from "./components/ContentContainer";
import { routes } from "./routes";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { getToken, setToken } from "./services/HttpService";
import { authUser } from "./redux/reducers/userReducer";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  appRoot: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
}));

export function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // set document title
  useEffect(() => {
    document.title = "Movie Database App";
    const token = getToken();
    if (token) {
      setToken(token);
      dispatch(authUser());
    }
  }, []);

  return (
    //<Layout>
    <div className={classes.appRoot}>
      <CssBaseline />
      <React.Fragment>
        <Header />
        <ContentContainer footer={<Footer />}>
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Switch>
        </ContentContainer>
      </React.Fragment>
    </div>
    //</Layout>
  );
}
