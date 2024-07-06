const notifications = await Service.import("notifications");
notifications.popupTimeout = 5000;
notifications.forceTimeout = false;
notifications.cacheActions = false;
notifications.clearDelay = 100;
const { Box, Button, EventBox, Icon, Label, Window } = Widget;
/** @param {import('resource:///com/github/Aylur/ags/service/notifications.js').Notification} n */

const notificationIcon = ({ appEntry, appIcon, image }) => {
	if (image) {
		return Box({
			css:
				`background-image: url("${image}");` +
				"background-size: contain;" +
				"background-repeat: no-repeat;" +
				"background-position: center;",
		});
	}

	let icon = "dialog-information-symbolic";
	if (Utils.lookUpIcon(appIcon)) icon = appIcon;

	if (appEntry && Utils.lookUpIcon(appEntry)) icon = appEntry;

	return Box({
		child: Icon(icon),
	});
};

const Notification = (n) => {
	const icon = Box({
		hpack: "center",
		vpack: "center",
		className: "notification-icon",
		child: notificationIcon(n),
	});

	const notificationTitle = Label({
		className: "notification-title",
		xalign: 0,
		vpack: "center",
		justification: "left",
		truncate: "end",
		hexpand: true,
		vexpand: true,
		maxWidthChars: 24,
		wrap: true,
		label: n.summary,
		useMarkup: true,
	});

	const notificationBody = Label({
		className: "notification-body",
		xalign: 1,
		hpack: "start",
		vpack: "start",
		justification: "left",
		// truncate: "end",
		useMarkup: true,
		vexpand: true,
		label: n.body.split(" ").slice(0, 50).join(" "),
		wrap: true,
	});

	const notificationActions = Box({
		className: "notification-actions",
		children: n.actions.map(({ id, label }) =>
			Button({
				className: "notification-action",
				onClicked: () => {
					n.invoke(id);
					n.dismiss();
				},
				hexpand: true,
				child: Label(label),
			})
		),
	});

	return EventBox(
		{
			attribute: { id: n.id },
			onPrimaryClick: n.dismiss,
		},
		Box(
			{
				className: `notification ${n.urgency}`,
				vertical: true,
			},
			Box([
				icon,
				Box(
					{ vertical: true, vexpand: true, hexpand: true },
					notificationTitle,
					notificationBody
				),
			]),
			notificationActions
		)
	);
};

export const NotificationPopups = (monitor = 0) => {
	const list = Box({
		vertical: true,
		children: notifications.popups.map(Notification),
	});

	const onNotified = (_, /** @type {number} */ id) => {
		const n = notifications.getNotification(id);
		if (n) list.children = [Notification(n), ...list.children];
	};

	const onDismissed = (_, /** @type {number} */ id) => {
		list.children.find((n) => n.attribute.id === id)?.destroy();
	};

	list
		.hook(notifications, onNotified, "notified")
		.hook(notifications, onDismissed, "dismissed");

	return Window({
		monitor,
		name: `notifications${monitor}`,
		className: "notification-popups",
		hexpand: true,
		vexpand: true,
		anchor: ["top", "right"],
		child: Box({
			css: "min-width: 100px; min-height: 100px",
			className: "notifications",
			vertical: true,
			hexpand: true,
			vexpand: true,
			child: list,

			/** this is a simple one liner that could be used instead of
                hooking into the 'notified' and 'dismissed' signals.
                but its not very optimized becuase it will recreate
                the whole list everytime a notification is added or dismissed */
			// children: notifications.bind('popups')
			//     .as(popups => popups.map(Notification))
		}),
	});
};
