const { Box, Label } = Widget;

const getTraffic = Variable(
	{},
	{
		poll: [
			1000,
			`bash -c "ifstat enp6s0 -t 1 | grep -E '^enp6s0' | awk '{print \\"download:\\", $6, \\"upload:\\", $8}'"`,
			(out) => {
				const outSplit = out.split(" ");
				let downloadSpeed = outSplit[1];
				let uploadSpeed = outSplit[3];
				let status;
				let trafficSpeed;
				let trafficPercentage;

				// Function to convert speed to bytes
				const convertSpeedToBytes = (speed) => {
					if (speed.endsWith("K")) {
						speed = parseFloat(speed) * 1000;
					} else if (speed.endsWith("M")) {
						speed = parseFloat(speed) * 1000000;
					} else {
						speed = parseFloat(speed);
					}
					return speed;
				};

				// Function to format speed to appropriate units
				const formatSpeed = (speed) => {
					if (speed > 1000000) {
						return (speed / 1000000).toFixed(2) + " MB/s";
					} else if (speed > 1000) {
						return (speed / 1000).toFixed(0) + " KB/s";
					} else {
						return speed.toFixed(0) + " B/s";
					}
				};

				downloadSpeed = convertSpeedToBytes(downloadSpeed);
				uploadSpeed = convertSpeedToBytes(uploadSpeed);

				// Determine status (upload or download)
				status =
					downloadSpeed >= 1000000 && uploadSpeed >= 1000000
						? "both"
						: downloadSpeed >= uploadSpeed
						? "download"
						: "upload";
				// Determine traffic speed based on status
				trafficSpeed =
					downloadSpeed > uploadSpeed ? downloadSpeed : uploadSpeed;
				// Get percentage of traffic to max speed (50Mbps)
				trafficPercentage = trafficSpeed / (50000000 / 8);
				// Format traffic speed using the formatSpeed function
				trafficSpeed = formatSpeed(trafficSpeed);

				return {
					status: status,
					speed: trafficSpeed,
					percentage: trafficPercentage,
				};
			},
		],
	}
);

const networkIcon = Label({
	className: "network-icon icon",
	hpack: "start",
	vpack: "center",
	label: getTraffic
		.bind()
		.as((traffic) =>
			traffic.status === "both"
				? "󱚻  "
				: traffic.status === "download"
				? "󱚶  "
				: "󱚺  "
		),
});

const networkLabel = Label({
	className: "network-label",
	hpack: "start",
	vpack: "center",
	label: getTraffic.bind().as((traffic) => traffic.speed),
});

export const NetworkIndicator = () => {
	return Box({
		hpack: "start",
		setup: (self) =>
			self.hook(getTraffic, () => {
				const status =
					[
						[100, "critical"],
						[90, "high"],
						[60, "medium-high"],
						[30, "medium"],
						[0, "low"],
					].find(
						([threshold]) => threshold <= getTraffic.value.percentage * 100
					)?.[1] || "critical";
				(self.className = `network box ${status}`),
					(self.children = [networkIcon, networkLabel]);
			}),
	});
};
