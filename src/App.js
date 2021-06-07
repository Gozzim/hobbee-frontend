import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { MuiThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ContentContainer } from "./components/ContentContainer";
import reducers from "./redux/reducers";
import { routes } from "./routes";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppTheme } from "./theming/themetypes";
import { AppThemeOptions } from "./theming/themes";

const useStyles = makeStyles((theme) => ({
    appRoot: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
}));

export function App() {
    const classes = useStyles();

    // set document title
    useEffect(() => {
        document.title = "Movie Database App";
    }, []);

    // create store for redux
    const store = createStore(reducers, applyMiddleware(thunkMiddleware));

    // theme for app
    const [theme, setTheme] = React.useState(AppTheme.LIGHT);

    // toggle theme
    const toggleTheme = () => {
        setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
    };

    return (
        //<Layout>
        <div className={classes.appRoot}>
            <MuiThemeProvider theme={createMuiTheme(AppThemeOptions[theme])}>
                <Provider store={store}>
                    <CssBaseline />
                    <React.Fragment>
                        <Header
                            darkmode={theme === AppTheme.DARK}
                            toggletheme={toggleTheme}
                        />
                        <ContentContainer>
                            <Switch>
                                {routes.map((route, i) => (
                                    <Route key={i} {...route} />
                                ))}
                            </Switch>
                        </ContentContainer>
                        <Footer />
                    </React.Fragment>
                </Provider>
            </MuiThemeProvider>
        </div>
        //</Layout>
    );
}

