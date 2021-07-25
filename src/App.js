import React, { useEffect, useLayoutEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ContentContainer } from "./components/ContentContainer";
import { routes } from "./routes";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import { getToken, setToken } from "./services/HttpService";
import { authReady, authUser } from "./redux/reducers/userReducer";
import DynamicBreadcrumbs from "./components/DynamicBreadcrumbs";
import { ASCII_BEE } from "./shared/Constants";
import { fetchHobbyTags } from "./redux/reducers/tagsReducer";
import { RequireLoggedIn } from "./components/RequireLoggedIn";
import { NotFoundView } from "./views/NotFoundView";

const useStyles = makeStyles(() => ({
  appRoot: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f4f4f4",
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const token = getToken();
    if (token) {
      setToken(token);
      dispatch(authUser());
    } else {
      dispatch(authReady());
    }
    dispatch(fetchHobbyTags());
  }, [dispatch]);

  useEffect(() => {
    console.log(ASCII_BEE);
  });

  return (
    <div className={classes.appRoot}>
      <CssBaseline />
      <Header />
      <ContentContainer footer={<Footer />}>
        <Switch>
          {routes.map(({ path, Component, label, loginOnly }, i) => (
            <Route
              exact
              key={i}
              path={path}
              render={(routeProps) => {
                document.title = "Hobb.ee | " + label;
                const crumbs = routes.filter(({ path }) =>
                  typeof path === "object"
                    ? path.some((subPath) =>
                        routeProps.match.path.includes(subPath)
                      )
                    : routeProps.match.path.includes(path)
                );
                return (
                  loginOnly ? (
                    <RequireLoggedIn>
                      <DynamicBreadcrumbs crumbs={crumbs} />
                      <Component {...routeProps} />
                    </RequireLoggedIn>
                  ) : (
                    <div>
                      <DynamicBreadcrumbs crumbs={crumbs} />
                      <Component {...routeProps} />
                    </div>
                    )
                );
              }}
            />
          ))
          }
          <Route
            key={404}
            path={"/"}
            render={(routeProps) => {
              document.title = "Hobb.ee | 404 - NOT FOUND ";

             return(
               <NotFoundView {...routeProps} />
             )
            }}
            />
        </Switch>
      </ContentContainer>
    </div>
  );
}

export default connect()(App);
