import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import styled from "styled-components";
import EventForm from "./EventForm"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function NewEvent({currentUser, refreshEvents}) {
const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return(
        <Wrapper>
             <NewEventIcon style= {{padding: "10px"}} onClick={handleClickOpen}>➕</NewEventIcon>
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >

          <EventForm closeDialog={handleClose} refreshEvents={refreshEvents} currentUser={currentUser}/>

          

          </Dialog>
        </Wrapper>
    )
}

const Wrapper = styled.div`

`

const NewEventIcon = styled.button` 
  font-size: 3rem;
  line-height: 1rem;
  width: 67px;
  height: 67px;
  border-radius: 50px;
  border: none;
  // color: white;
  background-color: white;
  position: fixed;
  top: 10px;
  right: 10px;
  &:focus {
    outline: none;
  }
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;