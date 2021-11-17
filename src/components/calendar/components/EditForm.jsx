import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { format } from 'date-fns'

import NewEventCalendar from './NewEventCalendar'
import EditTime from './EditTime'
import axios from 'axios';
import DeleteEvent from './DeleteEvent'

export default function EditForm({closeDialog, refreshEvents, currentEvent}) {
    const [form, setForm] = useState(currentEvent);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        if (form.title != null && form.start.date != null) {
          if (form.start.time.allday === true) {
            setButtonDisabled(false);
          } else {
            if (
              form.start.time.hours != null &&
              form.start.time.minutes != null &&
              form.start.time.ap != null &&
              form.end.time.hours != null &&
              form.end.time.minutes != null &&
              form.end.time.ap != null
            ) {
              setButtonDisabled(false);
            } else {
              setButtonDisabled(true);
            }
          }
        } else {
          setButtonDisabled(true);
        }
      }, [form]);
    
      useEffect(() => {
        let startDate = new Date(currentEvent.start.date);
        let formatted = format(startDate, "EEE. MMM. d, y");
        setDisplayStartDate(formatted);
        let endDate = new Date(currentEvent.end.date);
        let formatted2 = format(endDate, "EEE. MMM. d, y");
        setDisplayEndDate(formatted2);
      }, []);
    
      const handleTitle = (value) => setForm({ ...form, title: value });
      const handleDescription = (value) => setForm({ ...form, description: value });
      const handleLocation = (value) => setForm({ ...form, location: value });
    
      const UpdateEvent = async (event) => {
        event.preventDefault();
        setStatus("loading");
        //+++++++++JSON PUT METHOD HERE+++++++++++++++
        try{
          const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/calendar/editevent/${event._id}`)
          console.log(response)
          //THEN REFRESH EVENTS
          refreshEvents()
          // THEN SET STATUS && SET BUTTON DISABLED
          setStatus("updated")
          setButtonDisabled(true)
          //CATCH ERRORS
        } catch(error) {
          console.log("error in edit form!", error)
          setStatus("error")
          setButtonDisabled(true)
        }
      }
      //GRAB THE START AND END DATE FROM THE INPUT FIELDS
        const [displayStartDate, setDisplayStartDate] = useState("");
        const [displayEndDate, setDisplayEndDate] = useState("");

        const startField = () => {
            document.getElementById("CalendarFormStart").style.visibility = "visible";
        };
        const endField = () => {
            document.getElementById("CalendarFormEnd").style.visibility = "visible";
        };
//SAME CALENDAR STATES AND FUNCTIONS 
const [CalendarStartDate, setCalendarStartDate] = useState(new Date());
const [CalendarEndDate, setCalendarEndDate] = useState(new Date());

const onStartCalendarChange = (nextValue) => setCalendarStartDate(nextValue);
const onEndCalendarChange = (nextValue) => setCalendarEndDate(nextValue);

const selectStartDate = (value) => {
  setForm({ ...form, start: { ...form.start, date: value } });
  setCalendarStartDate(value);
};
const selectEndDate = (value) => {
  setForm({ ...form, end: { ...form.end, date: value } });
  setCalendarEndDate(value);
};

// 🆗 OK BUTTON IN CALENDARVIEW.JSX🆗
//🏁 START DATE 
const submitStartDate = (event) => {
  event.preventDefault();
  document.getElementById("CalendarFormStart").style.visibility = "hidden";

  let formatted = format(CalendarStartDate, "EEE. MMM. d, y");
  setDisplayStartDate(formatted);
  if (form.end.date < CalendarStartDate) {
    setForm({ ...form, end: { ...form.end, date: CalendarStartDate } });
    let formatted = format(CalendarStartDate, "EEE. MMM. d, y");
    setDisplayEndDate(formatted);
  }
};

//🎬 END DATE 
const submitEndDate = (event) => {
  event.preventDefault();
  document.getElementById("CalendarFormEnd").style.visibility = "hidden";
  let formatted = format(CalendarEndDate, "EEE. MMM. d, y");
  setDisplayEndDate(formatted);
  if (form.start.date > CalendarEndDate) {
    setForm({ ...form, start: { ...form.start, date: CalendarEndDate } });
    let formatted = format(CalendarEndDate, "EEE. MMM. d, y");
    setDisplayStartDate(formatted);
  }
};
    return(
        <div>
         <form> 
        <Top>
          <DeleteEvent eventId={currentEvent._id} refreshEvents={refreshEvents} />
          <Title
            type="text"
            placeholder="Your event title"
            defaultValue={form.title}
            onChange={(ev) => handleTitle(ev.target.value)}
          />
          <Description
            type="text"
            placeholder="What will happen?"
            defaultValue={form.description}
            onChange={(ev) => handleDescription(ev.target.value)}
          />
        </Top>
        <Section>
        <Label>Date</Label>
          <div className="dateNTimeInputSection">
            <InputBorder>
              <SectionInput
                readOnly
                placeholder="Start date"
                onClick={() => startField()}
                value={displayStartDate}
                defaultValue={displayStartDate}
              />
            </InputBorder>
            <InputBorder>
              <SectionInput
                placeholder="End date"
                onClick={() => endField()}
                value={displayEndDate}
                defaultValue={displayEndDate}
              />
            </InputBorder>
          </div>
          <CalendarForm id="CalendarFormStart">
            <NewEventCalendar  
            onChange={onStartCalendarChange}
            value={CalendarStartDate}
            onClickDay={(value, event) => selectStartDate(value, event)}
            />
            <div className="ButtonBox">
              <button onClick={(event) => submitStartDate(event)}>Ok</button>
            </div>
          </CalendarForm>
          <CalendarForm id="CalendarFormEnd">
            <NewEventCalendar
              onChange={onEndCalendarChange}
              value={CalendarEndDate}
              onClickDay={(value, event) => selectEndDate(value, event)}
            />
            <div className="ButtonBox">
              <button onClick={(event) => submitEndDate(event)}>Ok</button>
            </div>
          </CalendarForm>
        </Section>
        <Section>
          <EditTime form={form} setForm={setForm}/>
        </Section>
        <Section>
        <Label>Location</Label>
          <div>
            <SectionInput2
              type="text"
              placeholder="Add location"
              onChange={(ev) => handleLocation(ev.target.value)}
              defaultValue={currentEvent.location}
            />
          </div>
        </Section>
        <ActionsSection>
            <ButtonClose onClick={closeDialog}>❌</ButtonClose>
            <ButtonCreate
              onClick={(ev) => UpdateEvent(ev)}
              disabled={buttonDisabled}
            >
              {status === "idle" ? (
                "Update event"
              ) : status === "loading" ? (
                "⏳"
              ) : (
                "Update event"
              )}
            </ButtonCreate>
      </ActionsSection>
      {status === "updated" ? (
        <ConfirmationBox>
          ✅ Your event was updated!
        </ConfirmationBox>
      ) : null}
          </form>
          <NewEventCalendar />
          <EditTime form={form} setForm={setForm}/>
        </div>
    )
}
const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f6f7f6;
  padding-top: 50px;
  padding-bottom: 30px;
`;
const Title = styled.input`
  margin: 10px 0;
  width: 75vw;
  border: none;
  border-bottom: 2px solid black;
  padding-bottom: 5px;
  font-size: 1.5rem;
  font-weight: 500;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 50%;
    font-weight: 400;
  }
`;
const Description = styled.input`
  margin: 10px 0;
  width: 75vw;
  border: none;
  border-bottom: 1px solid #b3b3b3;
  padding-bottom: 5px;
  font-size: 1rem;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 60%;
  }
`;
const Section = styled.div`
  width: 100vw;
  box-sizing: border-box;
  border-top: 1px solid #b3b3b3;
  padding: 15px 20px;
  .dateNTimeInputSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Label = styled.label`
  padding-bottom: 10px;
  display: block;
  font-size: 1.2rem;
`;
const InputBorder = styled.div`
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  display: inline-block;
  padding: 0 5px;
  align-items: center;
  display: flex;
`;

const SectionInput = styled.input`
  padding: 5px 0;
  font-size: 1rem;
  width: 140px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 70%;
  }
`;
const SectionInput2 = styled.input`
  padding: 5px 0;
  font-size: 1rem;
  width: 300px;
  padding-left: 5px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 70%;
  }
`;
const CalendarForm = styled.div`
  padding: 0 6vw;
  height: 100vh;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  .ButtonBox {
    margin: 10px 0;
  }
`;
const ActionsSection = styled.div`
  text-align: center;
  padding-top: 30px;
  padding-bottom: 15px;
  width: 100vw;
`;
const ButtonCreate = styled.button`
  border: none;
  background-color: white;
  color: green;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 10px;
  width: 160px;
  height: 40px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  &:disabled {
    opacity: 0.3;
  }
`;

const ButtonClose = styled.button`
  border: none;
  background-color: white;
  color: red;
  font-size: 1.3rem;
  line-height: 1rem;
  font-weight: 300;
  width: 40px;
  height: 40px;
  margin: 0 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 50px;
`;
const ConfirmationBox = styled.div`
  margin: 20px;
  border: 1px solid #00cc63;
  border-radius: 4px;
  background-color: #e6fff2;
  padding: 5px 20px;
`;