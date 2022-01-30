import React from "react";
import DayListItem from "./DayListItem";

 /*
const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];
*/
var classnames = require('classnames');

export default function DayList(props){
//const [day, setDay] = useState();
//.console.log(props.selectedDay);
const dayListItems = props.days.map(d  => {
 
    return ( <DayListItem key = {d.id}
       selected={props.selectedDay===d.name}
       name = {d.name}
       spots = {d.spots}
       setDay = {props.setDay}
      /> )
})

    return (
    <ul>
        {dayListItems}    
      </ul>
     
    );
  }



 
