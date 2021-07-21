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
import DynamicBreadcrumbs from "./components/DynamicBreadcrumbs";

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
    document.title = "Hobb.ee";
    const token = getToken();
    if (token) {
      setToken(token);
      dispatch(authUser());
    }
  }, []);

  return (
    <div className={classes.appRoot}>
      <CssBaseline />
      <React.StrictMode>
        <Header />
        <ContentContainer footer={<Footer />}>
          <Switch>
            {routes.map(({ path, Component, label }, i) => (
              <Route
                exact
                key={i}
                path={path}
                render={(routeProps) => {
                  const crumbs = routes.filter(({ path }) =>
                    typeof path === "object"
                      ? path.some((subPath) =>
                          routeProps.match.path.includes(subPath)
                        )
                      : routeProps.match.path.includes(path)
                  );
                  return (
                    <div>
                      <DynamicBreadcrumbs crumbs={crumbs} />
                      <Component {...routeProps} />
                    </div>
                  );
                }}
              />
            ))}
          </Switch>
        </ContentContainer>
      </React.StrictMode>
    </div>
  );
}
