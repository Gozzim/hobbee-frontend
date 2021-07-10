import React from "react";
import { TagComponent } from "../../components/TagComponent";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { TagAutocomplete } from "../../components/TagAutocomplete";

export function CreateGroup(props) {
  return (
    <>
      <Typography variant="h3" component={"h1"} align={"center"} className={""}>
        Create Group
      </Typography>
      <Typography className={"creategroup-padding"}>
        What do you want to call your group?
      </Typography>
      <TextField
        label="e.g. Table Tennis at TUM"
        required
        fullWidth
        variant="outlined"
        size="small"
        onChange={(event) => {
          props.setTouched((touched) => {
            return { ...touched, groupName: true };
          });
          props.setGroupForm((groupForm) => {
            return { ...groupForm, groupName: event.target.value };
          });
        }}
        value={props.groupForm.groupName}
        error={props.touched.groupName && props.groupForm.groupName === ""}
        helperText={
          props.touched.groupName && props.groupForm.groupName === ""
            ? "Empty entry"
            : ""
        }
      />

      <Typography className={"creategroup-padding"}>
        In what city will your activity take place?
      </Typography>

      <TextField
        label="e.g. Munich, Germany"
        className=""
        required
        fullWidth
        variant="outlined"
        size="small"
        onChange={(event) => {
          props.setTouched((touched) => {
            return { ...touched, city: true };
          });
          props.setGroupForm((groupForm) => {
            return { ...groupForm, city: event.target.value };
          });
        }}
        value={props.groupForm.city}
        error={props.touched.city && props.groupForm.city === ""}
        helperText={
          props.touched.city && props.groupForm.city === "" ? "Empty entry" : ""
        }
      />

      <Typography className={"creategroup-padding"}>
        Do you want to meet online or in real life?
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          className={"creategroup-radios"}
          onChange={(event) => {
            props.setGroupForm((groupForm) => {
              return { ...groupForm, onOffline: event.target.value };
            });
          }}
          value={props.groupForm.onOffline}
        >
          <FormControlLabel value="online" control={<Radio />} label="Online" />
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

      <TagAutocomplete
        onChange={(tags) => {
          props.setTouched((touched) => {
            return { ...touched, tags: true };
          });
          props.setGroupForm((groupForm) => {
            return { ...groupForm, tags };
          });
        }}
        value={props.groupForm.tags}
        error={props.touched.tags && props.groupForm.tags.length === 0}
        helperText={
          props.touched.tags && props.groupForm.tags.length === 0
            ? "Empty entry"
            : ""
        }
      />

      <div className={"creategroup-tags"}>
        {props.groupForm.tags.map((x) => {
          return (
            <TagComponent
              id={x}
              key={x}
              onDelete={() => {
                props.setTouched((touched) => {
                  return { ...touched, tags: true };
                });
                props.setGroupForm((groupForm) => {
                  return {
                    ...groupForm,
                    tags: groupForm.tags.filter((tag) => {
                      return x !== tag;
                    }),
                  };
                });
              }}
            />
          );
        })}
      </div>
    </>
  );
}
