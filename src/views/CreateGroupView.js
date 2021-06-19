import React from "react";
import {
  Paper,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export function CreateGroupView(props) {
  return (
    <div>
      <div>CREATE GROUP</div>
      <form>
        <div>
          What do you want to call your group?
          <br />
          <TextField
            label="e.g. Table Tennis at TUM"
            id="TitleField"
            type="text"
            className=""
            required={true}

            //errorText="Group name is required"
          />
        </div>
        <br />
        <div>
          In what city will your activity take place?
          <br />
          <TextField
            label="e.g. Munich, Germany"
            id="TitleField"
            type="text"
            className=""
            required={true}
          />
        </div>
        <br />
        <div>
          Do you want to meet online or in real life?
          <br />
          <br />
          <input type="radio" name="choice" value="online" /> Online
          <input type="radio" name="choice" value="offline" /> Offline
          <input type="radio" name="choice" value="both" /> Both work for me
        </div>
        <br />
        <div>
          Choose some tags, so that other users can find your group:
          <br />
        </div>
        <br />
        <div>
          <Link className={""} to={"/create-group/customize-group"}>
            <Button type="button">CONTINUE</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
