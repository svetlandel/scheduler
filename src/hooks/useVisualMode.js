const { useState } = require("react");

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = function(newMode, replace = false) {
    setMode(newMode);
    (replace)?history[history.length-1]=newMode : history.push(newMode);
    
    setHistory(history);  
  };

  const back = function() {
    if(history.length > 1){
        history.pop();
        let prevMode = history[history.length-1];    
        transition(prevMode, true);
    }
  };
 
  return { mode, transition, back, history };
}
