
/*const ErrorComponent = props => {
    return(
        <>
        {props.error && <p>Error</p>}
        </>
    )
}*/

import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
export default function ErrorComponent(props) {
    const [open, setOpen] = React.useState(props.open);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {props.text}
            </Typography>
            {props.retry&&<Button variant="contained" onClick={props.retry}>Retry</Button>}
          </Box>
        </Modal>
      </div>
    );
}
