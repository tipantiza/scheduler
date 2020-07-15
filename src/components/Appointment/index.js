import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    )
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    props.bookInterview(props.id, interview)
    .then(() => {transition(SHOW)})
    .catch(()=>{
      transition(ERROR_SAVE, true)
    })
  }
  function edit(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    props.editInterview(props.id, interview)
    .then(() => {transition(SHOW)})
    .catch(()=>{
      transition(ERROR_SAVE, true)
    })
  }

  function onDelete(){
    transition(DELETING, true)
    props.cancelInterview(props.id)
     .then(() => {transition(EMPTY)})
     .catch((err)=>{
       console.log(err);
      transition(ERROR_DELETE, true)
    })

  }

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => {transition(CONFIRM)}} onEdit={() => {transition(EDIT)}}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => {back()}} onSave={save} />}
      {mode === SAVING && <Status message="Saving"/> }
      {mode === DELETING && <Status message="Deleting"/> }
      {mode === CONFIRM && <Confirm  message="Delete the appointment?" onConfirm={() => {onDelete()}} onCancel={() => {back()}}/>}
      {mode === EDIT &&  <Form  name={props.interview.student} interviewers={props.interviewers} interviewer={props.interview.interviewer.id} onSave={edit} onCancel={() => {back()}}/> }
      {mode === ERROR_DELETE && <Error message= "Could not delete appointment." onClose={() => {back()}}/>}
      {mode === ERROR_SAVE && <Error message= "Could not save appointment." onClose={() => {back()}}/>}
    </article>
  );
}
