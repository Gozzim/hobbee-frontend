import React from "react";
import PropTypes from "prop-types";
import { SvgIcon } from "@material-ui/core";
import { ReactComponent as BeeIcon } from "../../assets/bee_cream.svg";
import { Rating } from "@material-ui/lab";

export function HobbeeRating(props) {
    return (
        <Rating
            name={props.name}
            value={Number(props.value)}
            onChange={props.onChange}
            precision={0.5}
            icon={<SvgIcon component={BeeIcon} viewBox="0 0 640 640"/>}
            emptyIcon={<SvgIcon component={BeeIcon} viewBox="0 0 640 640" style={{filter: "grayscale(1)"}}/>}
        />
    );
}

// attributes of props and their type
HobbeeRating.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
