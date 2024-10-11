import React, { useState } from "react";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface InfoButtonProps {
    label: string;
    dialogue: {
        heading: string;
        textValue: string;
    }
}

const InfoButton = (props: InfoButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Click to learn more">
        <IconButton color="primary" onClick={handleClickOpen} sx={{
            "fontSize": "20px",
            "width": "20px"
        }}>
          {props.label}  <InfoIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.dialogue.heading}</DialogTitle>
        <DialogContent>
          <Typography>
            {props.dialogue.textValue}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InfoButton;
