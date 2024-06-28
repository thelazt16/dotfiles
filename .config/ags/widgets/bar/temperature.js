const { Box, Label } = Widget;

const getTemperature = Variable("", {
	poll: [
		10000,
		`bash -c "sensors 2>/dev/null | grep 'Tctl' | awk '{print $2}'"`,
		(out) => parseFloat(out).toFixed(0) + "°C",
	],
});

export const Temperature = () =>
	Box({
		className: "temperature box",
		setup: (self) =>
			self.hook(getTemperature, () => {
				const status =
					[
						[100, "critical"],
						[90, "high"],
						[70, "medium-high"],
						[50, "medium"],
						[0, "low"],
					].find(
						([threshold]) => threshold <= parseFloat(getTemperature.value)
					)?.[1] || "critical";
				(self.className = `memory box ${status}`),
					(self.children = [
						Label({
							className: "temperature-icon icon",
							hpack: "start",
							vpack: "center",
							label: " ",
						}),
						Label({
							className: "temperature-label",
							hpack: "start",
							vpack: "center",
							label: getTemperature.value,
						}),
					]);
			}),
	});
