import React from "react";
import AvatarEditor from "react-avatar-editor";
import ImageIcon from "@material-ui/icons/Image";
import PublishIcon from "@material-ui/icons/Publish";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent, DialogContentText,
  IconButton,
  Slider,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { getFileUrl, uploadRequest } from "../services/FileService";
import {withStyles} from "@material-ui/core/styles";



const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: 0,
  },
}))(Tooltip);

export function AvatarUploadComponent(props) {
  const fileInput = React.useRef();
  const [temporaryImage, setTemporaryImage] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  const avatarEditor = React.useRef();

  const handleClose = () => {
    setTemporaryImage(null);
  };

  const handleSave = () => {
    if (avatarEditor.current) {
      const image = avatarEditor.current.getImage();
      image.toBlob(async (blob) => {
        const response = await uploadRequest(blob);

        props.setUserForm((userForm) => {
          console.log(userForm);
          return { ...userForm, avatar: response.data.id };
        });
        setTemporaryImage(null);
      }, "image/png");
    }
  };

  return (
    <div>
      <Dialog open={temporaryImage !== null} onClose={handleClose}>
        <DialogContent>
          <AvatarEditor
            image={temporaryImage}
            scale={scale}
            width={300}
            height={300}
            border={50}
            color={[0, 0, 0, 0.6]}
            rotate={0}
            ref={avatarEditor}
          />
          <Slider
            min={0.1}
            max={5}
            step={0.1}
            value={scale}
            onChange={(_event, value) => {
              setScale(value);
            }}
            aria-labelledby="continuous-slider"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {props.userForm.avatar ? (
        <Button
          onClick={() => {
            fileInput.current.click();
          }}
        >
          <img alt="group-image" width={200} height={200} src={getFileUrl(props.userForm.avatar)} />
        </Button>
      ) : (
        <Button
          className={"customizegroup-ButtonCard"}
          onClick={() => {
            fileInput.current.click();
          }}
        >
          <div>
            {props.userForm.avatar ? null : (
              <>
                <div className={"imageIcon"}>
                  <ImageIcon color={"disabled"} fontSize={"inherit"} />
                </div>
                <Typography
                  className={"selectImageText"}
                  color={"textSecondary"}
                  align={"center"}
                  variant={"h6"}
                >
                  Upload image
                </Typography>
              </>
            )}
          </div>
        </Button>
      )}
      <input
        type={"file"}
        className={"customizegroup-file"}
        ref={fileInput}
        onChange={async (event) => {
          props.setTouched((touched) => {
            return { ...touched, avatar: true };
          });

          const file = event.target.files[0];
          const reader = new FileReader();

          reader.addEventListener(
            "load",
            function () {
              // convert image file to base64 string
              setTemporaryImage(reader.result);
            },
            false
          );

          if (file) {
            reader.readAsDataURL(file);
          }
        }}
        accept={".jpg, .jpeg, .png"}
      />


      <DialogContentText className={"imageupload-description"}>
        Choose or upload an image:
      </DialogContentText>
      <div className={"imageupload-avatare"}>
        {/*{examplePics.map((id) => {
          return (
            <div key={id}>
              <Button
                onClick={() => {
                  props.setTouched((touched) => {
                    return { ...touched, avatar: true };
                  });
                  props.setUserForm((userForm) => {
                    return { ...userForm, avatar: id };
                  });
                  fileInput.current.value = "";
                }}
              >
                <img alt="example-image" width={130} height={95} src={getFileUrl(id)} />
              </Button>
            </div>
          );
        })}*/}
        <CustomTooltip title="Upload Image">
          <IconButton
            onClick={() => {
              fileInput.current.click();
            }}
            className={"imageupload-button"}
            fontSize="large"
          >
            <PublishIcon />
          </IconButton>
        </CustomTooltip>
      </div>
    </div>
  );
}
