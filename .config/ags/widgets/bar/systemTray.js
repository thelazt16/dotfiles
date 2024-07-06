const SystemTray = await Service.import("systemtray");
const { Box, Button, Icon } = Widget;

export const SysTray = () => {
	const items = SystemTray.bind("items").as((items) =>
		items.map((item) =>
			Button({
				className: "tray-icon icon",
				child: Icon({ icon: item.bind("icon"), size: 16 }),
				on_primary_click: (_, event) => item.activate(event),
				on_secondary_click: (_, event) => item.openMenu(event),
				tooltip_markup: item.bind("tooltip_markup"),
			})
		)
	);

	return Box({
		className: "tray-box",
		children: items,
	});
};
