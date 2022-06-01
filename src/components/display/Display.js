// Credit: Mateusz Rybczonec

import { useContext, useRef } from 'react';
import { TimerContext } from '../context/TimerContext';
import './Display.css';

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
	info: {
		color: 'green',
	},
	warning: {
		color: 'orange',
		threshold: WARNING_THRESHOLD,
	},
	alert: {
		color: 'red',
		threshold: ALERT_THRESHOLD,
	},
};

function Display() {
	const context = useContext(TimerContext);
	const timeLimit = context.timeLimit;
	const setTimeLimit = context.setTimeLimit;
	const timePause = context.timePause;
	const setTimePause = context.setTimePause;
	const timeLeft = context.timeLeft;
	const setTimeLeft = context.setTimeLeft;
	const isTimeBreak = context.isTimeBreak;
	const setIsTimeBreak = context.setIsTimeBreak;
	const timeBreak = context.timeBreak;
	const timeSession = context.timeSession;

	const remainingPathColor = useRef(COLOR_CODES.info.color);

	const timerInterval = useRef(null);

	const pauseTimer = () => {
		setTimePause(!timePause);
		setTimeOut();
	};

	const setTimeOut = () => {
		clearInterval(timerInterval.current);
	};

	const setTimeChange = (time) => {
		setTimeLimit(time);
		setTimeLeft(time);
		setRemainingPathColor(time);
	};

	const handleTimeBreak = (timeTemp) => {
		document.querySelector('.timer-type__label').innerHTML = 'Break';
		setTimeChange(timeTemp);
		playAudio();
	};
	const handleTimeSession = (timeTemp) => {
		document.querySelector('.timer-type__label').innerHTML = 'Session';
		setTimeChange(timeTemp);
	};

	const startTimer = () => {
		let timeTemp = timeLeft;
		let isTimeBreakTemp = isTimeBreak;
		setTimePause(!timePause);

		timerInterval.current = setInterval(() => {
			timeTemp -= 1;
			setTimeLeft((prevState) => prevState - 1);
			document.getElementById('time-left').innerHTML = formatTime(timeTemp);
			setCircleDasharray(timeTemp);
			setRemainingPathColor(timeTemp);
			if (timeTemp === 0) {
				//setTimeOut();
				setIsTimeBreak(!isTimeBreakTemp);

				if (!isTimeBreakTemp) {
					timeTemp = timeBreak;
					isTimeBreakTemp = !isTimeBreakTemp;
					handleTimeBreak(timeTemp);
				} else {
					timeTemp = timeSession;
					isTimeBreakTemp = !isTimeBreakTemp;
					handleTimeSession(timeTemp);
				}
			}
		}, 1000);
		return () => setTimeOut();
	};

	function formatTime(time) {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;

		const minutesConverted = ('0' + minutes).slice(-2);
		const secondsConverted = ('0' + seconds).slice(-2);

		return `${minutesConverted}:${secondsConverted}`;
	}

	function setRemainingPathColor(timeLeft) {
		const { alert, warning, info } = COLOR_CODES;
		if (timeLeft <= alert.threshold) {
			document.getElementById('base-timer-path-remaining').classList.remove(warning.color);
			document.getElementById('base-timer-path-remaining').classList.add(alert.color);
		} else if (timeLeft <= warning.threshold) {
			document.getElementById('base-timer-path-remaining').classList.remove(info.color);
			document.getElementById('base-timer-path-remaining').classList.add(warning.color);
		} else {
			document.getElementById('base-timer-path-remaining').classList.remove(alert.color);
			document.getElementById('base-timer-path-remaining').classList.add(info.color);
		}
	}

	function calculateTimeFraction(timeLeft) {
		const rawTimeFraction = timeLeft / timeLimit;
		return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
	}

	function setCircleDasharray(timeLeft) {
		const circleDasharray = `${(calculateTimeFraction(timeLeft) * FULL_DASH_ARRAY).toFixed(0)} 283`;
		document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', circleDasharray);
	}

	const handleButtonReset = () => {
		const myAudio = document.getElementById('beep');
		myAudio.pause();
		setIsTimeBreak(false);
		handleTimeSession(timeSession);
		setTimePause(false);
		setTimeOut();
	};

	const playAudio = () => {
		const myAudio = document.getElementById('beep');
		myAudio.play();

		setTimeout(function () {
			myAudio.pause();
			myAudio.currentTime = 0;
		}, 3000);
	};

	return (
		<div className="display text-center">
			<div className="base-timer">
				<svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<g className="base-timer__circle">
						<circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
						<path
							id="base-timer-path-remaining"
							strokeDasharray="283"
							className={`base-timer__path-remaining ${remainingPathColor.current}`}
							d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
						></path>
					</g>
				</svg>
				<h1 className="timer-type__label">Session</h1>
				<h1 id="time-left" className="base-timer__label">
					{formatTime(timeLeft)}
				</h1>

				<button id="start_stop" className="btn btn-primary" onClick={timePause ? pauseTimer : startTimer}>
					{timePause ? 'Pause' : 'Start'}
				</button>

				<button id="reset" className="btn btn-primary m-2" onClick={handleButtonReset}>
					Reset
				</button>
				<audio
					id="beep"
					preload="auto"
					src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
					__idm_id__="1359873"
				></audio>
			</div>
		</div>
	);
}

export default Display;
