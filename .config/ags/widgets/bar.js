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

// Bar layout
function Left() {
	return Box({
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
}

function Center() {
	return Box({
		spacing: 8,
		children: [Workspaces()],
	});
}

function Right() {
	return Box({
		hpack: "end",
		spacing: 8,
		children: [
			NetworkIndicator(),
			Volume(),
			CheckUpdates(),
			SysTray(),
			DateTime(),
		],
	});
}

export function Bar(monitor = 0) {
	return Window({
		name: `bar-${monitor}`, // name has to be unique
		className: "bar",
		monitor,
		anchor: ["top", "left", "right"],
		exclusivity: "exclusive",
		child: CenterBox({
			className: "bar-window",
			start_widget: Left(),
			center_widget: Center(),
			end_widget: Right(),
		}),
	});
}
