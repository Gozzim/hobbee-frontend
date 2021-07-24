import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Menu } from "@material-ui/core";
import { connect } from "react-redux";
import Picker from "emoji-picker-react";

function EmojiMenu(props) {

  return (
    <Menu
      open={props.open}
      anchorEl={props.anchor}
      onClose={props.onClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Picker
        disableSkinTonePicker
        native
        preload
        onEmojiClick={props.onEmojiClick}
      />
    </Menu>
  );
}

EmojiMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onEmojiClick: PropTypes.func.isRequired,
};

export default connect()(withRouter(EmojiMenu));
