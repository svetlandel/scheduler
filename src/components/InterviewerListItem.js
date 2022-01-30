import React, { useState } from "react";
import "components/InterviewerListItem.scss";
var classnames = require('classnames');
export default function InterviewerListItem(props) {
  
    const classList = classnames("interviewers__item", {
        "interviewers__item--selected": props.selected
      });
    
  return (
    <li className={classList} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />  
 {props.selected && props.name}
  </li> 
  );
}



