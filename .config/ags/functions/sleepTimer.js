import { toggleBox } from "../widgets/bar/countDown.js";

let countDownTime;
let sleepType;
const sleepOptions = ["suspend", "hibernate", "shutdown"];

const timerEnd = () => {
	toggleBox();
	Utils.exec(`bash -c "~/.config/hypr/scripts/sleepIn ${sleepType} 0"`);
};

const currentDistance = Variable(
	{},
	{
		poll: [
			1000,
			() => {
				if (!countDownTime) {
					return {
						days: "00",
						hours: "00",
						minutes: "00",
						seconds: "00",
					};
				}

				const now = new Date().getTime();
				const distance = countDownTime - now;

				if (distance <= 0) {
					timerEnd();
					stopCountDown(); // Stop the countdown and polling
					return {
						days: "0",
						hours: "00",
						minutes: "00",
						seconds: "00",
					};
				}

				const days = Math.floor(distance / (1000 * 60 * 60 * 24));
				const hours = Math.floor(
					(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				)
					.toString()
					.padStart(2, "0");
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
					.toString()
					.padStart(2, "0");
				const seconds = Math.floor((distance % (1000 * 60)) / 1000)
					.toString()
					.padStart(2, "0");

				return {
					days: days,
					hours: hours,
					minutes: minutes,
					seconds: seconds,
				};
			},
		],
	}
);

currentDistance.stopPoll();

const startCountDown = (minutes, type = "suspend") => {
	const now = new Date().getTime();
	countDownTime = now + minutes * 60 * 1000;
	sleepType = type;
	currentDistance.startPoll();
};

const stopCountDown = () => {
	countDownTime = undefined;
	sleepType = undefined;
	currentDistance.stopPoll();
};

const changeCountDownTime = (operator, time) => {
	if (operator === "+") countDownTime += time;
	if (operator === "-") countDownTime -= time;
};

const changeSleepType = () => {
	const currentIndex = sleepOptions.indexOf(sleepType);
	const nextIndex = (currentIndex + 1) % sleepOptions.length;
	sleepType = sleepOptions[nextIndex];
	// print(`Sleep type changed to: ${sleepType}`);
};

// Export currentDistance
export {
	startCountDown,
	stopCountDown,
	changeCountDownTime,
	changeSleepType,
	countDownTime,
	currentDistance,
	sleepType,
};
