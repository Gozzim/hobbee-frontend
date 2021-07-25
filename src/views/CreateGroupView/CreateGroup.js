import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";

import { TagComponent } from "../../components/TagComponent";
import { TagAutocomplete } from "../../components/TagAutocomplete";
import { isValidGroupname } from "../../validators/GroupDataValidator";
import { RADIO_BUTTON_BLUE } from "../../shared/Constants";

export function CreateGroup(props) {
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const onChangeTagInput = (event, hobbyTag) => {
    props.setTouched((touched) => {
      return { ...touched, tags: true };
    });
    if (hobbyTag && !props.groupForm.tags.includes(hobbyTag)) {
      props.setGroupForm((groupForm) => {
        return { ...groupForm, tags: [...groupForm.tags, hobbyTag] };
      });
    }
    setInputValue("");
    setSelectedHobby(null);
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
        variant="h3"
        align="center"
        style={{ fontWeight: "bold", marginBottom: "40px" }}
      >
        CREATE GROUP
      </Typography>

      <Typography
        className="creategroup-padding"
        variant="h6"
        style={{ fontWeight: "bold" }}
      >
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

      <Typography
        className="creategroup-padding"
        variant="h6"
        style={{ fontWeight: "bold" }}
      >
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

      <Typography
        className="creategroup-padding"
        variant="h6"
        style={{ fontWeight: "bold" }}
      >
        Do you want to meet online or in real life?
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          className="creategroup-radios"
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

      <Typography
        className="creategroup-padding"
        variant="h6"
        style={{ fontWeight: "bold" }}
      >
        Choose some tags!
        <Typography>This way, other users can find your group.</Typography>
      </Typography>

      <TagAutocomplete
        inputValue={inputValue}
        onInputChange={(e, v) => {
          setInputValue(v);
        }}
        style={{ width: 300 }}
        filterOptions={(options) => {
          return options.filter(
            (option) => !props.groupForm.tags.includes(option)
          );
        }}
        onChange={onChangeTagInput}
        value={selectedHobby}
        error={props.touched.tags && props.groupForm.tags.length === 0}
        helperText={
          props.touched.tags && props.groupForm.tags.length === 0
            ? "Empty entry"
            : ""
        }
      />

      <div className="creategroup-tags">
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
