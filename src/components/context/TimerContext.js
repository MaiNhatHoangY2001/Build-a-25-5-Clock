import { createContext, useState } from "react";

const TimerContext = createContext();

function TimerProvider({children}){

    const [timeBreak, setTimeBreak] = useState(300);
    const [timeSession, setTimeSession] = useState(1500);

    const [timeLimit, setTimeLimit] = useState(timeSession);
    const [timePause, setTimePause] = useState(false);
    const [isTimeBreak, setIsTimeBreak] = useState(false);
	const [timeLeft, setTimeLeft] = useState(timeLimit);

    const value = {
        timeLimit,
        setTimeLimit,
        timePause,
        setTimePause,
        timeLeft,
        setTimeLeft,
        isTimeBreak,
        setIsTimeBreak,
        timeBreak,
        setTimeBreak,
        timeSession,
        setTimeSession
    }

    return <TimerContext.Provider value={value}> 
        {children}
    </TimerContext.Provider>
}

export {TimerContext, TimerProvider}