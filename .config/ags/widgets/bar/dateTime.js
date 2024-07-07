const { Box, Label } = Widget;
import { getHoliday } from "../../functions/getHoliday.js";

const holiday = await Variable("", {
	poll: [
		3600000,
		async () => {
			return await getHoliday();
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
			// const isWeekend = false;

			return {
				date: `${currentDate.toLocaleDateString("en-US", {
					weekday: "long",
					// year: "numeric",
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
	// print(JSON.stringify(holiday));
	const dateLabel = Label({
		class_name: "date",
		hpack: "end",
		label: getDateTime.value.date,
	});

	const timeLabel = Label({
		className: "time",
		hpack: "end",
		label: getDateTime.value.time,
	});
	return Box({
		className: "date-time",
		vexpand: true,
		vertical: true,
		hpack: "end",
		setup: (self) => {
			// print(JSON.stringify(getDateTime));
			self.hook(getDateTime, () => {
				holiday || getDateTime.value.isWeekend
					? self.toggleClassName("critical", true)
					: self.toggleClassName("critical", false);
				self.children = [timeLabel, dateLabel];
			});
		},
	});
};
