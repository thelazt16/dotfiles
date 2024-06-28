const { Box, Label } = Widget;

const getUsage = Variable("", {
	poll: [
		5000,
		`bash -c "top -b -n 1 | grep 'Cpu(s)' | awk '{print $2}'"`,
		(out) => parseFloat(out).toFixed(0),
	],
});

export const CPUUsage = () => {
	return Box({
		className: "cpu box",
		setup: (self) =>
			self.hook(getUsage, () => {
				const status =
					[
						[100, "critical"],
						[90, "high"],
						[60, "medium-high"],
						[30, "medium"],
						[0, "low"],
					].find(([threshold]) => threshold <= getUsage.value)?.[1] ||
					"critical";
				self.children = [
					Label({
						className: `cpu-icon icon ${status}`,
						hpack: "start",
						label: " ",
					}),
					Label({
						className: `cpu-label ${status}`,
						hpack: "start",
						label: getUsage.value.toString() + "%",
					}),
				];
			}),
	});
};
