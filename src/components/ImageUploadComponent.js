import React from "react";
import AvatarEditor from "react-avatar-editor";
import ImageIcon from "@material-ui/icons/Image";
import PublishIcon from "@material-ui/icons/Publish";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Slider,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { getFileUrl, uploadRequest } from "../services/FileService";
import { withStyles } from "@material-ui/core/styles";

const examplePics = [
  "60ec51d7e0edf15bb9e1993a",
  "60ec52095fd7f45c7aaf7909",
  "60ec5220db5ec95c854a253d",
];

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: 0,
  },
}))(Tooltip);

export function ImageUploadComponent(props) {
  const fileInput = React.useRef();
  const [temporaryImage, setTemporaryImage] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [scale, setScale] = React.useState(1);
  const [fileUploadError, setFileUploadError] = React.useState("");
  const avatarEditor = React.useRef();

  const resetTemporaryImage = () => {
    fileInput.current.value = null;
    setTemporaryImage(null);
  };

  const handleClose = () => {
    resetTemporaryImage();
  };

  const handleSave = () => {
    if (isUploading || !avatarEditor.current) return;

    setIsUploading(true);
    try {
      const image = avatarEditor.current.getImage();
      image.toBlob(async (blob) => {
        const response = await uploadRequest(blob);

        props.setGroupForm((groupForm) => {
          return { ...groupForm, pic: response.data.id };
        });
        setIsUploading(false);
        resetTemporaryImage();
      }, "image/png");
    } catch (error) {
      setFileUploadError("The file is not supported");
      setIsUploading(false);
      resetTemporaryImage();
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
            height={220}
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
          <Button
            onClick={handleSave}
            color="primary"
            autoFocus
            disabled={isUploading}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {props.groupForm.pic ? (
        <Button
          onClick={() => {
            fileInput.current.click();
          }}
        >
          <img
            alt="group-image"
            width={300}
            height={220}
            src={getFileUrl(props.groupForm.pic)}
          />
        </Button>
      ) : (
        <Button
          className={"customizegroup-ButtonCard"}
          onClick={() => {
            fileInput.current.click();
          }}
        >
          <div>
            {props.groupForm.pic ? null : (
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
            return { ...touched, pic: true };
          });

          const file = event.target.files[0];
          if (file.size > 500 * 1024) {
            setFileUploadError("The file size has to be smaller than 500 KB");
            return;
          }
          const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
          if (!allowedFileTypes.includes(file.type)) {
            setFileUploadError("The file has to be of type jpg, jpeg or png");
            return;
          }
          setFileUploadError("");
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
        {examplePics.map((id) => {
          return (
            <div key={id}>
              <Button
                onClick={() => {
                  props.setTouched((touched) => {
                    return { ...touched, pic: true };
                  });
                  props.setGroupForm((groupForm) => {
                    return { ...groupForm, pic: id };
                  });
                  fileInput.current.value = "";
                }}
              >
                <img
                  alt="example-image"
                  width={130}
                  height={95}
                  src={getFileUrl(id)}
                />
              </Button>
            </div>
          );
        })}
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
