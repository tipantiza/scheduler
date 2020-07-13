
export function decreaseSpotVal (state) {
  let dayObj = state.days.filter(dayObj => dayObj.name === state.day);
    const spotsUpdate = dayObj[0].spots - 1;
    const dayKey = dayObj[0].id - 1;
    state.days[dayKey].spots = spotsUpdate;
    return state
}

export function increaseSpotVal(state) {
  let dayObj = state.days.filter(dayObj => dayObj.name === state.day);
    const spotsUpdate = dayObj[0].spots + 1;
    const dayKey = dayObj[0].id - 1;
    state.days[dayKey].spots = spotsUpdate;
    return state
}