import { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import './Tool.css';

function Tool() {
	const context = useContext(TimerContext);
	const setTimeLimit = context.setTimeLimit;
	const timeLimit = context.timeLimit;
	const setTimeLeft = context.setTimeLeft;
	const timePause = context.timePause;
	const timeSession = context.timeSession;
	const setTimeSession = context.setTimeSession;
	const timeBreak = context.timeBreak;
	const setTimeBreak = context.setTimeBreak;
	const isTimeBreak = context.isTimeBreak;


	const handleClickIncrementBreak = () => {
		const minute = Math.floor(timeBreak / 60);
		if (minute < 99 && !timePause) {
			setTimeBreak((preVal) => preVal + 60);
			if (isTimeBreak) incrementTime();
		}
	};


	const handleClickIncrementSession = () => {
		const minute = Math.floor(timeSession / 60);
		if (minute < 99 && !timePause) {
			setTimeSession((preVal) => preVal + 60);
			if (!isTimeBreak) incrementTime();
		}
	};

	const incrementTime = () => {
		setTimeLimit((preVal) => preVal + 60);
		setTimeLeft(timeLimit + 60);
	};

	const handleClickDecrementBreak = () => {
		const minute = Math.floor(timeBreak / 60);
		if (minute > 1 && !timePause) {
			setTimeBreak((preVal) => preVal - 60);
			if (isTimeBreak) decrementTime();
		}
	};

	const handleClickDecrementSession = () => {
		const minute = Math.floor(timeSession / 60);
		if (minute > 1 && !timePause) {
			setTimeSession((preVal) => preVal - 60);
			if (!isTimeBreak) decrementTime();
		}
	};

	const decrementTime = () => {
		setTimeLimit((preVal) => preVal - 60);
		setTimeLeft(timeLimit - 60);
	};

	return (
		<div className="tool d-flex justify-content-center">
			<div className="break-time m-3">
				<h3>Break Length</h3>
				<button id="break-increment" onClick={handleClickIncrementBreak}>
					<i className="fa fa-arrow-up fa-2x"></i>
				</button>
				<span id="break-label">{Math.floor(timeBreak / 60)}</span>
				<button id="break-decrement" onClick={handleClickDecrementBreak}>
					<i className="fa fa-arrow-down fa-2x"></i>
				</button>
			</div>
			<div className="session-time m-3">
				<h3>Session Length</h3>
				<button id="session-increment" onClick={handleClickIncrementSession}>
					<i className="fa fa-arrow-up fa-2x"></i>
				</button>
				<span id="session-label">{Math.floor(timeSession / 60)}</span>
				<button id="session-decrement" onClick={handleClickDecrementSession}>
					<i className="fa fa-arrow-down fa-2x"></i>
				</button>
			</div>
		</div>
	);
}

export default Tool;
