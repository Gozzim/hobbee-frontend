import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    IconButton,
    InputAdornment,
    Typography,
} from "@material-ui/core";
import {
    getPasswordStrength,
    isValidPassword,
} from "../validators/UserDataValidator";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { SignInUpInput } from "./SignInUpInput";
import { PasswordStrengthBar } from "./PasswordStrengthBar";
import { HOBBEE_ORANGE, HOBBEE_YELLOW } from "../shared/Constants";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/reducers/userReducer";

const useStyles = makeStyles((theme) => ({
    resetPassRoot: {
        margin: "auto",
        width: "60%",
    },
    heading: {
        paddingBottom: theme.spacing(5),
    },
    caption: {
        paddingBottom: theme.spacing(2),
    },
    resetPassRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        "&:last-child": {
            paddingBottom: theme.spacing(0),
        },
        "&:first-child": {
            paddingTop: theme.spacing(0),
        },
    },
    submitRow: {
        "& button": {
            backgroundColor: HOBBEE_ORANGE,
            "&:hover": {
                backgroundColor: HOBBEE_YELLOW,
            },
        },
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
}));

/**
 * Reset Pass
 * @param {props} props
 */
export function ResetPasswordComponent(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [passError, setPassError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const [error, setError] = useState("");

    const passEye = {
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                    tabIndex={"-1"}
                    aria-label="toggle password visibility"
                    onClick={() => {
                        setShowPassword(!showPassword);
                    }}
                    edge="end"
                >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        ),
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (passError !== "") {
            return;
        }
        try {
            dispatch(resetPassword(props.match.params.user, props.match.params.token, password)); // TODO: Server answer handling
            props.history.push("/"); // TODO: Only if successful
        } catch (e) {
            console.log(e.message);
        }
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        // TODO: Fix ugly if statements
        if (e.target.value === "") {
            setPassError("");
        } else if (!isValidPassword(e.target.value)) {
            setPassError("Invalid Password");
        } else if (password2 !== "" && password2 !== e.target.value) {
            setPassError("Passwords do not match.");
        } else {
            setPassError("");
        }
        setPasswordStrength(getPasswordStrength(e.target.value));
    };

    const onChangePassword2 = (e) => {
        setPassword2(e.target.value);
        // TODO: Fix ugly if statements
        if (password !== "") {
            if (password !== e.target.value && e.target.value !== "") {
                setPassError("Passwords do not match.");
            } else if (!isValidPassword(password)) {
                setPassError("Invalid Password");
            } else {
                setPassError("");
            }
        }
    };

    return (
        <div className={classes.resetPassRoot}>
            <div>
                <Typography className={classes.heading} variant="h4" align="center">
                    Account recovery
                </Typography>
                <Typography className={classes.caption} align="center">
                    Choose a new password to recover your Hobb.ee account
                </Typography>
            </div>
            <form onSubmit={onSubmit}>
                <div className={classes.resetPassRow}>
                    <SignInUpInput
                        id={"password"}
                        label={"New Password"}
                        fieldValue={password}
                        changeFunc={onChangePassword}
                        fieldType={showPassword ? "text" : "password"}
                        inputProps={passEye}
                        inputError={passError !== ""}
                        autoComplete={"new-password"}
                    />
                </div>
                <div className={classes.resetPassRow}>
                    <SignInUpInput
                        id={"password2"}
                        label={"Repeat Password"}
                        fieldValue={password2}
                        changeFunc={onChangePassword2}
                        fieldType={showPassword ? "text" : "password"}
                        inputProps={passEye}
                        inputError={passError !== "" && password2 !== ""}
                        autoComplete={"new-password"}
                    />
                </div>
                {passwordStrength > 0 && (
                    <PasswordStrengthBar passStrength={passwordStrength} />
                )}
                {error ? (
                    <div>
                        <Typography color="error">{error}</Typography>
                    </div>
                ) : null}
                <div className={classes.submitRow}>
                    <Button
                        fullWidth
                        size={"large"}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Change password
                    </Button>
                </div>
            </form>
        </div>
    );
}
