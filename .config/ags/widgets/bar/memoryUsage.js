const { Box, Label } = Widget;

const getUsage = Variable("", {
	poll: [
		10000,
		`bash -c "free --mebi | awk '/^Mem:/ {print $3}'"`,
		(out) => {
			const usageValue = out;

			const formatValue = (value) => {
				if (value > 1000) {
					value = value / 1000;
					return value.toFixed(1) + "G";
				}
				return value + "M";
			};

			const usageFormatted = formatValue(usageValue);
			return usageFormatted;
		},
	],
});

export const MemoryUsage = () =>
	Box({
		hpack: "start",
		setup: (self) =>
			self.hook(getUsage, () => {
				const status =
					[
						[100, "critical"],
						[90, "high"],
						[60, "medium-high"],
						[30, "medium"],
						[0, "low"],
					].find(
						([threshold]) =>
							threshold <= (parseFloat(getUsage.value) / 16) * 100
					)?.[1] || "critical";
				(self.className = `memory box ${status}`),
					(self.children = [
						Label({
							className: "memory-icon icon",
							hpack: "start",
							vpack: "center",
							label: "  ",
						}),
						Label({
							className: "memory-label",
							hpack: "start",
							vpack: "center",
							label: getUsage.value,
						}),
					]);
			}),
	});
