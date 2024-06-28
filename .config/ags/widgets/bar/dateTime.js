const { Box, Label } = Widget;

// const getDate = Variable("", {
//   poll: [1000, 'date "+%A, %b %d"'],
// });

// const getTime = Variable("", {
//   poll: [1000, 'date "+%H:%M:%S"'],
// });

export const DateTime = () => {
	const getDateTime = Variable("", {
		poll: [
			1000,
			'date "+%A, %b %d-%I:%M %p"',
			(out) => {
				const splitDateTime = out.split("-");
				const date = splitDateTime[0];
				const time = splitDateTime[1];
				return {
					date: date,
					time: time,
				};
			},
		],
	});

	const timeLabel = Label({
		class_name: "date",
		hpack: "end",
		label: getDateTime.bind().as((value) => `${value.date.toString()}`),
	});

	const dateLabel = Label({
		className: "time",
		hpack: "end",
		label: getDateTime.bind().as((value) => value.time.toString()),
	});
	return Box({
		children: [dateLabel, timeLabel],
		vexpand: true,
		vertical: true,
		hpack: "end",
	});
};
