//colaberated with jalayna tipantiza and hafiz
function updateSpotVal(state, step) {
  let updatedDays = state.days.map(dayObj => {
    if(dayObj.name === state.day){
      return {
        ...dayObj,
        spots: dayObj.spots + step
      }
    }
    return {
      ...dayObj
    }
  });
  return {
    ...state,
    days: updatedDays 
  }
}

export function decreaseSpotVal(state) {
  return updateSpotVal(state, -1)
}
export function increaseSpotVal(state) {
  return updateSpotVal(state, 1)
}