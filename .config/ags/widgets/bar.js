const Hyprland = await Service.import("hyprland");

const { Box, CenterBox, Window } = Widget;

import { Workspaces } from "./bar/workspaces.js";
import { ActiveClient } from "./bar/activeClient.js";
import { SysTray } from "./bar/systemTray.js";
import { DateTime } from "./bar/dateTime.js";
import { Clients } from "./bar/clients.js";
import { Volume } from "./bar/volume.js";
import { NetworkIndicator } from "./bar/networkMonitor.js";
import { OSIcon } from "./bar/osicon.js";
import { MemoryUsage } from "./bar/memoryUsage.js";
import { CPUUsage } from "./bar/cpuUsage.js";
import { Temperature } from "./bar/temperature.js";
import { CheckUpdates } from "./bar/checkUpdates.js";
import { CountDown } from "./bar/countDown.js";
import { Inhibitor } from "./bar/inhibitor.js";

// Bar layout
const Left = () => {
	return Box({
		hpack: "start",
		spacing: 8,
		children: [
			OSIcon(),
			Temperature(),
			CPUUsage(),
			MemoryUsage(),
			Clients(),
			ActiveClient(),
		],
	});
};

const Center = () => {
	return Box({
		hpack: "center",
		spacing: 8,
		children: [Workspaces()],
	});
};

const Right = () => {
	return Box({
		hpack: "end",
		spacing: 8,
		children: [
			NetworkIndicator(),
			Volume(),
			CheckUpdates(),
			CountDown(),
			Inhibitor(),
			SysTray(),
			DateTime(),
		],
	});
};

export const Bar = (monitor = 0) =>
	Window({
		monitor,
		name: `bar-${monitor}`, // name has to be unique
		className: "bar",
		exclusivity: "exclusive",
		anchor: ["top", "left", "right"],
		child: CenterBox({
			css: "min-width: 2px; min-height: 2px;",
			className: "bar-window",
			startWidget: Left(),
			centerWidget: Center(),
			endWidget: Right(),
		}),
		// setup: (self) =>
		// 	self.hook(Hyprland, () => {
		// 		print(self.monitor);
		// 	}),
	});
