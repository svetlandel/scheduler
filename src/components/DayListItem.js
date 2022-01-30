import React from "react";
import "components/DayListItem.scss";
var classnames = require('classnames');

export function formatSpots(props){
    let result = props.spots;
if (props.spots===0){
   result =  "no spots remaining";
}
if (props.spots>1 && props.spots<=5){
    result =  props.spots + " spots remaining";
 }
 if (props.spots===1){
    result =  props.spots + " spot remaining";
 }
 return (
     result
 );
}

export default function DayListItem(props) {

    const dayClass = classnames("day-list__item", {
      
        "day-list__item--selected": props.selected===true,
        "day-list__item--full": props.spots===0
      });
     
     
  return (
   
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}