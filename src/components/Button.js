import React from "react";

import "components/Button.scss";
import { action } from "@storybook/addon-actions/dist/preview";
const classNames = require('classnames');

export default function Button(props) {
   const btnClass = classNames("button",{
      "button--confirm": props.confirm,
      "button--danger": props.danger
   })
   return (
      <button 
         className={btnClass}
         disabled={props.disabled} 
         onClick={props.onClick} 
      >
         {props.children}
      </button>
   );
 }