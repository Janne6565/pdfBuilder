
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { downloadJSON } from '../../util/export/ExportUtil';
import { BuilderFormData } from '../../pages/mainPage/MainContentPage';

interface ExportButtonProps {
    data: BuilderFormData
}

const ExportButton = (props: ExportButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Export data
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">Export instructions</DialogTitle>
        <DialogContent>
          <p>Download json Data</p>
          <Button onClick={() => downloadJSON(props.data, 'exported_data')}>Export Json File</Button>
          <p>Import file into Excel (In Progress)</p>
          <Button disabled>Open Excel Sheet</Button>
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

export default ExportButton;
