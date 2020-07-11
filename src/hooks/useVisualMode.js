import { useState } from "react";

export default function useVisualMode (initial){
  const [mode, setmode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const transition = (newMode, replacement = false) => {
    if(replacement){
    setmode(newMode)
    } else {
      setmode(newMode)
      setHistory(prev => replacement ? [ newMode ] : [ ...prev, newMode] )
    }
  }
  const back = () => {
    if(history.length > 1){
      history.pop();
    }
    setmode(history[history.length - 1])
  }
  return { mode, transition, back };
}