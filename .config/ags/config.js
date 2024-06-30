import { Bar } from "./widgets/bar.js";
import { NotificationPopups } from "./widgets/notification.js";
import { debug } from "./debug.js";

// debug.hypr();
// debug.active();
// debug.clients();
// debug.monitors();
// debug.workspaces();
// Now you can use App to start your application
App.config({
	style: "./styles/styles.css",
	gtkTheme: "Lavanda-Dark-Compact-Tokyonight",
	// cursorTheme: "Phinger Cursors (light)",
	iconTheme: "Papirus-Dark",
	windows: [
		Bar(),
		NotificationPopups(),

		// you can call it, for each monitor
		// Bar(0),
		// Bar(1)
	],
});
