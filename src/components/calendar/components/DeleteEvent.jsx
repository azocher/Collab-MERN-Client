import React, { useState } from 'react'
import axios from 'axios'
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

export default function DeleteEvent({ eventId, refreshEvents}) {
    const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState("idle");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setStatus("loading");
   console.log(eventId)
        async function deleteEvent() {
            try{
                await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/calendar/deleteevent/${eventId}`)
                // refreshEvents()
                setStatus("deleted")
            } catch(error) {
                console.log(error)
            }
        }
  }
    
    return(
        <div>
            <DeleteButton onClick={handleClickOpen}>
                🗑
            </DeleteButton>
            <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >

      
      <DialogTitle id="alert-dialog-slide-title">Remove event</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this event?
        </DialogContent>
        {status === "loading" ? "🌀" : null}
        {status === "deleted" ? (
          <ConfirmationBox>
            ✅ Event deleted.
          </ConfirmationBox>
        ) : null}
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            YES
          </Button>
          <Button
            onClick={() => {
              handleClose();
              //refreshEvents();
            }}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
        </Dialog>
        </div>
    )
}
const DeleteButton = styled.button`
  border: none;
  font-size: 1.3rem;
`;
const ConfirmationBox = styled.div`
  margin: 20px;
  border: 1px solid #00cc63;
  border-radius: 4px;
  background-color: #e6fff2;
  padding: 5px 20px;
`;