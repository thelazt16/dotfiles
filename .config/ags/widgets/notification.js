const notifications = await Service.import("notifications");
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

const notification = (n) => {
	const icon = Box({
		hpack: "end",
		vpack: "center",
		className: "notification-icon",
		child: notificationIcon(n),
	});

	const notificationTitle = Label({
		className: "notification-title",
		xalign: 1,
		justification: "left",
		hexpand: true,
		maxWidthChars: 24,
		truncate: "end",
		wrap: true,
		label: n.summary,
		useMarkup: true,
	});

	const notificationBody = Label({
		className: "notification-body",
		xalign: 1,
		vpack: "center",
		hexpand: true,
		useMarkup: true,
		justification: "left",
		label: n.body,
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
			Box([Box({ vertical: true }, notificationTitle, notificationBody), icon]),
			notificationActions
		)
	);
};

export const NotificationPopups = (monitor = 0) => {
	const list = Box({
		vertical: true,
		children: notifications.popups.map(notification),
	});

	const onNotified = (_, /** @type {number} */ id) => {
		const n = notifications.getNotification(id);
		if (n) list.children = [notification(n), ...list.children];
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
		anchor: ["top", "right"],
		child: Box({
			css: "min-width: 2px; min-height: 2px;",
			className: "notifications",
			vertical: true,
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
