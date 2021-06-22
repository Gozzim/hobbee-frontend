import React from "react";
import { TagComponent } from "../components/TagComponent";
import {
  Paper,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormControl,
  RadioGroup,
  Radio,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export function CreateGroupView(props) {
  return (
    <div>
      <Typography variant="h3" component={"h1"} align={"center"} className={""}>
        {/* component (the semantic): how the heading is rendered; variant: how the heading looks */}
        Create Group
      </Typography>
      <div className={"creategroup-grid"}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography className={"creategroup-padding"}>
              What do you want to call your group?
            </Typography>
            <TextField
              label="e.g. Table Tennis at TUM"
              className=""
              required={true}
              fullWidth
              variant="outlined"
              size="small"
            />

            <Typography className={"creategroup-padding"}>
              In what city will your activity take place?
            </Typography>

            <TextField
              label="e.g. Munich, Germany"
              className=""
              required={true}
              fullWidth
              variant="outlined"
              size="small"
            />

            <Typography className={"creategroup-padding"}>
              Do you want to meet online or in real life?
            </Typography>

            <FormControl component="fieldset">
              <RadioGroup className={"creategroup-radios"}>
                <FormControlLabel
                  value="online"
                  control={<Radio />}
                  label="Online"
                />
                <FormControlLabel
                  value="offline"
                  control={<Radio />}
                  label="Offline"
                />
                <FormControlLabel
                  value="both"
                  control={<Radio />}
                  label="Both work for me"
                />
              </RadioGroup>
            </FormControl>

            <Typography className={"creategroup-padding"}>
              Choose some tags, so that other users can find your group:
            </Typography>

            <TagComponent />

            <div>
              <Link className={""} to={"/create-group/customize-group"}>
                <Button type="button">CONTINUE</Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
