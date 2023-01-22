import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AlertType } from '../interface';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type CustomizedSnackbarProps = {
  openAlert: {open: boolean, type: AlertType, msg: string},
  handleAlert: (open: boolean, type: AlertType, msg: string) => void
}

const CustomizedSnackbar = ({ openAlert, handleAlert } : CustomizedSnackbarProps) => {

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    handleAlert(false, "error", "");
  };

  return (
    <Snackbar open={openAlert.open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={openAlert.type} sx={{ width: '100%' }}>
        {openAlert.msg}
      </Alert>
    </Snackbar>
  );
}

export default CustomizedSnackbar