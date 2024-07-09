const { Box, Button, Label } = Widget;
import { getIcon } from "../../functions/getIcon.js";
import {
	changeCountDownTime,
	changeSleepType,
	countDownTime,
	currentDistance,
	sleepType,
} from "../../functions/sleepTimer.js";

let countDownBox;

export const CountDown = () => {
	countDownBox = Box({
		className: "count-down box",
		visible: false,
		child: Button({
			onPrimaryClick: () => changeCountDownTime("+", 10 * 60 * 1000),
			onMiddleClick: () => changeSleepType(),
			onSecondaryClick: () => changeCountDownTime("-", 10 * 60 * 1000),
			setup: (self) =>
				self.hook(currentDistance, () => {
					const { days, hours, minutes, seconds } = currentDistance.value;
					let countDownLabel = "";
					if (countDownTime) {
						if (days > 1) countDownLabel += `${days} days `;
						if (days === 1) countDownLabel += `${days} day `;
						if (hours > 0 || days > 0) countDownLabel += `${hours}:`;

						countDownLabel += `${minutes}:${seconds}`;
					}
					const sleepIcon =
						sleepType === "suspend"
							? "  "
							: sleepType === "hibernate"
							? " "
							: " ";
					// print(JSON.stringify(currentDistance.value));
					self.child = Box({
						children: [
							Label({
								className: "label icon",
								label: sleepIcon,
							}),
							Label({
								className: "label",
								label: countDownLabel,
							}),
						],
					});
				}),
		}),
		setup: (box) =>
			box.hook(currentDistance, () => {
				box.visible = countDownTime ? true : false;
			}),
	});

	return countDownBox;
};

export const toggleBox = () => {
	if (countDownBox) {
		countDownBox.visible = !countDownBox.visible;
		// print(countDownBox.visible);
	}
};
