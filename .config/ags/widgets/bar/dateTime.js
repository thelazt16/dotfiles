const { Box, Button, Label } = Widget;
import { getHoliday } from "../../functions/getHoliday.js";
import {
	countDownTime,
	startCountDown,
	stopCountDown,
} from "../../functions/sleepTimer.js";
import { toggleBox } from "./countDown.js";

const holiday = await Variable("", {
	poll: [
		3600000,
		async () => {
			return await getHoliday(new Date());
		},
	],
});

const getDateTime = Variable(new Date(), {
	poll: [
		1000,
		() => {
			const currentDate = new Date();
			const dayOfWeek = currentDate.getDay();
			const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // 0 is Sunday, 6 is Saturday

			return {
				date: `${currentDate.toLocaleDateString("en-US", {
					weekday: "long",
					month: "short",
					day: "numeric",
				})}`,
				time: `${currentDate.toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				})}`,
				isWeekend: isWeekend,
			};
		},
	],
});

export const DateTime = () => {
	const dateLabel = Label({
		class_name: "date",
		hpack: "end",
	}).hook(getDateTime, (self) => {
		self.label = getDateTime.value.date;
	});
	const timeLabel = Label({
		className: "time",
		hpack: "end",
	}).hook(getDateTime, (self) => {
		self.label = getDateTime.value.time;
	});

	return Button({
		onSecondaryClick: () => {
			if (countDownTime == undefined) startCountDown(60, "suspend");
			else {
				stopCountDown();
				toggleBox();
			}
		},
		child: Box({
			className: "date-time",
			vertical: true,
			hpack: "end",
			setup: (self) => {
				const updateClassName = () => {
					// print(JSON.stringify(getDateTime));
					// print(JSON.stringify(holiday.value));
					const isHoliday = holiday.value;
					const isWeekend = getDateTime.value.isWeekend;
					if (isHoliday || isWeekend) {
						self.toggleClassName("critical", true);
					} else {
						self.toggleClassName("critical", false);
					}
					self.children = [timeLabel, dateLabel];
				};

				// Hook into both getDateTime and holiday variables
				self.hook(getDateTime, updateClassName);
				self.hook(holiday, updateClassName);
			},
		}),
	});
};
