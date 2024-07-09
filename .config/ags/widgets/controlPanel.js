export function ControlPanel(monitor = 0) {
	return Window({
		name: `controlpanel-${monitor}`, // name has to be unique
		className: "controlpanel",
		monitor,
		anchor: ["top", "right"],
		exclusivity: "exclusive",
		child: Box({
			className: "panel-box",
		}),
	});
}
