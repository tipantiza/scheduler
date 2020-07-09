export function getAppointmentsForDay(state, day) {
    let appmtArr = state.days.filter(dayObj => dayObj.name === day)
    if(appmtArr.length < 1){
      return [];
    }
    appmtArr = appmtArr[0].appointments;
    const results = appmtArr.map((elem) => {
      return state.appointments[`${elem}`]
    })
    return results;
}

export function getInterview(state, interview){
  if(interview){
    const results = {
      interviewer: state.interviewers[`${interview.interviewer}`],
      student: interview.student
    }
    return results;
  }
  return null;
}

//comand+d