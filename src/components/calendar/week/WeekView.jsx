import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import NewEvent from '../components/NewEvent'

export default function WeekView() {
    let history = useHistory();
    const [status, setStatus] = useState("idle");
    const [today, setToday] = useState(new Date());
    const [weekEvents, setWeekEvents] = useState([]);

    //DETERMINE CURRENT 7 DAY WEEK
    let toStartOfWeek = today.getDay() - 1;
    let startOfWeekDate = new Date();
    startOfWeekDate.setDate(today.getDate() - toStartOfWeek);
    //put dates of CURRENT WEEK in array
    let weekArray = [];
    for (let i = 0; i < 7; i++) {
        let date = new Date();
        date.setDate(startOfWeekDate.getDate() + i);
        weekArray.push(format(date, "yyyy-MM-dd"));
  }
    //put array in state
    const [weekRange, setWeekRange] = useState(weekArray);
    //AXIOS CALL(maybe?) just FETCH EVENTS OF THIS WEEK 
    //👹
    // useEffect(() => {
    //   if (weekRange.length > 0){
    //     setStatus("idle")
        
    //   }
    // })


    //take data and format days of the week
    useEffect(() => {
        //Determine the date for the current week's Monday
        //let current_month = format(today, "LLLL");
        let toStartOfWeek = today.getDay() - 1;
        let startOfWeekDate = new Date();
        startOfWeekDate.setDate(today.getDate() - toStartOfWeek);
    
        // Create an array with all the dates of the current week
        let weekArray = [];
        for (let i = 0; i < 7; i++) {
          let date = new Date();
          date.setDate(startOfWeekDate.getDate() + i);
          weekArray.push(format(date, "yyyy-MM-dd"));
        }
        setWeekRange(weekArray);
      }, [today]);
    
//REFRESH AFTER NEW EVENT FUNCTION
    const nextWeek = () => {
        let nextDay = new Date();
        nextDay.setDate(today.getDate() + 7);
        setToday(nextDay);
      };
    
      const previousWeek = () => {
        let prevDay = new Date();
        prevDay.setDate(today.getDate() - 7);
        setToday(prevDay);
      };
    return(
        <Wrapper>
          <NewEvent  />
           <WeekBar>
        <div className="month">{format(today, "LLLL yyyy")}</div>
        <div className="numbers">
          <WeekButton onClick={(ev) => previousWeek()}> {"‹"} </WeekButton>
          {weekRange.map((weekDay) => {
            let date = new Date(
              weekDay.slice(0, 4),
              weekDay.slice(5, 7) - 1,
              weekDay.slice(8, 10)
            );
            return <div>{date.getDate()}</div>;
          })}
          <WeekButton onClick={(ev) => nextWeek()}> {"›"} </WeekButton>
        </div>
      </WeekBar>
      <WeekContainer>
              <DateContainer>
                <WEDateContainer>

                </WEDateContainer>
                </DateContainer>
      </WeekContainer>
        </Wrapper>
    )
}
const Wrapper = styled.div`
  height: 900px;
  background-color: white;
`;
const WeekBar = styled.div`
  text-align: center;
  background-color: white;
  padding-bottom: 8px;
  .month {
    padding-top: 8px;
    font-size: 1.4rem;
    text-transform: lowercase;
  }
  .numbers {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 0px;
    font-size: 1.3rem;
  }
`;
const WeekButton = styled.button`
  margin: 0 10px;
  border: none;
  background-color: white;
  font-size: 1.4rem;
  line-height: 1rem;
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;
const WeekContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 80%;
  .week-date {
    width: 100%;
    text-align: center;
    padding: 5px 0;
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: underline 3px solid rgb(187, 222, 215);
  }
`;
const DateContainer = styled.div`
  border: 1px solid #dae2f1;
  width: 49%;
  height: 43%;
`;
const WEDateContainer = styled.div`
  border-bottom: 1px solid #cedefd;
  height: 40%;
  &:last-of-type {
    border: none;
  }
`;