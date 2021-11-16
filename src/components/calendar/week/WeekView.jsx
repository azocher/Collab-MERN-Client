import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
//import NewEvent from '../components/NewEvent'

const WeekView = () => {
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
    useEffect(() => {
      if (weekRange.length > 0){
        setStatus("idle")
        
      }
    })


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

        </Wrapper>
    )
}
const Wrapper = styled.div`
  height: 900px;
  background-color: white;
`;