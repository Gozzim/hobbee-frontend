import React, { useState } from "react";
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
import { isValidGroupname } from "../../validators/GroupDataValidator";
import { withStyles } from "@material-ui/core/styles";
import { RADIO_BUTTON_BLUE } from "../../shared/Constants";

export function CreateGroup(props) {
  const [selectedHobby, setSelectedHobby] = useState(null);

  const onChangeTagInput = (event, hobbyTag) => {
    props.setTouched((touched) => {
      return { ...touched, tags: true };
    });
    if (!props.groupForm.tags.includes(hobbyTag)) {
      try {
        props.setGroupForm((groupForm) => {
          return { ...groupForm, tags: [...groupForm.tags, hobbyTag] };
        });
        setSelectedHobby(null);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const BlueRadio = withStyles({
    root: {
      color: "grey",
      "&$checked": {
        color: RADIO_BUTTON_BLUE,
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  return (
    <>
      <Typography
        variant={"h3"}
        align="center"
        style={{ fontWeight: "bold", marginBottom: "40px" }}
      >
        CREATE GROUP
      </Typography>
      <Typography className={"creategroup-padding"} variant={"h6"}>
        What do you want to call your group?
      </Typography>
      <TextField
        label="e.g. Table Tennis at TUM"
        required
        fullWidth
        variant="outlined"
        onChange={(event) => {
          props.setTouched((touched) => {
            return { ...touched, groupName: true };
          });
          props.setGroupForm((groupForm) => {
            return { ...groupForm, groupName: event.target.value };
          });
        }}
        value={props.groupForm.groupName}
        error={
          props.touched.groupName &&
          !isValidGroupname(props.groupForm.groupName)
        }
        helperText={
          props.touched.groupName &&
          !isValidGroupname(props.groupForm.groupName)
            ? "Invalid entry"
            : ""
        }
      />

      <Typography className={"creategroup-padding"} variant={"h6"}>
        In what city will your activity take place?
      </Typography>

      <TextField
        label="e.g. Munich"
        className=""
        required
        fullWidth
        variant="outlined"
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

      <Typography className={"creategroup-padding"} variant={"h6"}>
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
          <FormControlLabel
            value="online"
            control={<BlueRadio />}
            label="Online"
          />
          <FormControlLabel
            value="offline"
            control={<BlueRadio />}
            label="Offline"
          />
          <FormControlLabel
            value="both"
            control={<BlueRadio />}
            label="Both work for me"
          />
        </RadioGroup>
      </FormControl>

      <Typography className={"creategroup-padding"} variant={"h6"}>
        Choose some tags!
        <Typography>This way, other users can find your group.</Typography>
      </Typography>

      <TagAutocomplete
        style={{ width: 300 }}
        onChange={onChangeTagInput}
        value={selectedHobby}
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
            <div style={{ marginRight: "10px", marginBottom: "10px" }}>
              <TagComponent
                id={x._id}
                key={x._id}
                onDelete={() => {
                  props.setTouched((touched) => {
                    return { ...touched, tags: true };
                  });
                  props.setGroupForm((groupForm) => {
                    return {
                      ...groupForm,
                      tags: groupForm.tags.filter((tag) => x._id !== tag._id),
                    };
                  });
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
