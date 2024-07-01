const Hyprland = await Service.import("hyprland");
const { Box, Button, EventBox } = Widget;

export const Workspaces = () => {
	const dispatch = (ws) => Hyprland.messageAsync(`dispatch workspace ${ws}`);

	return EventBox({
		onScrollUp: () => dispatch("+1"),
		onScrollDown: () => dispatch("-1"),
		className: "workspaces",
		child: Box({
			className: "outer-workspace",
			children: Array.from({ length: 9 }, (_, i) => i + 1).map(
				(i, index, array) =>
					Box({
						attribute: i,
						className:
							index === 0
								? "workspace first"
								: index === array.length - 1
								? "workspace last"
								: "workspace",
					})
			),
		}).hook(Hyprland, (self) => {
			let previousWorkspace = {};
			previousWorkspace.className = "";
			self.children.forEach((box, index, array) => {
				const isActive = Hyprland.active.workspace.id === box.attribute;
				const isOccupied = Hyprland.workspaces.some(
					(item) => item.id === box.attribute
				);
				let buttonClassName;
				if (isActive) {
					buttonClassName = "focused";
					box.className = "workspace focused";
				} else if (isOccupied) {
					buttonClassName = "occupied";
					box.className = "workspace occupied";
				} else {
					buttonClassName = "normal";
					box.className = "workspace normal";
				}

				if (isOccupied || isActive) {
					if (index === 0) box.toggleClassName("occupied-start", true);
					else if (previousWorkspace.className.includes("occupied-start")) {
						box.toggleClassName("occupied-end", true);
					} else if (previousWorkspace.className.includes("occupied-end")) {
						previousWorkspace.toggleClassName("occupied-end", false);
						previousWorkspace.toggleClassName("occupied-middle", true);
						box.toggleClassName("occupied-end", true);
					} else if (
						index === 8 &&
						!previousWorkspace.className.includes("occupied-start")
					)
						box.toggleClassName("occupied-single", true);
					else {
						box.toggleClassName("occupied-start", true);
					}
				} else {
					if (previousWorkspace.className.includes("occupied-start")) {
						previousWorkspace.toggleClassName("occupied-start", false);
						previousWorkspace.toggleClassName("occupied-single", true);
					}
				}

				if (index === 0) {
					box.toggleClassName("first", true);
				} else if (index === array.length - 1) {
					box.toggleClassName("last", true);
				}

				box.child = Button({
					className: buttonClassName,
					label: box.attribute.toString(),
					onClicked: () => dispatch(box.attribute),
					setup: (self) => {
						if (index === 0) {
							self.toggleClassName("first", true);
						} else if (index === array.length - 1) {
							self.toggleClassName("last", true);
						}
					},
				});

				// Pass current workspace attributes as previousWorkspace
				previousWorkspace = box;
			});
		}),
	});
};
