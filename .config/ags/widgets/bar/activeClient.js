const Hyprland = await Service.import("hyprland");
const { Box, Icon, Label } = Widget;
import { getIcon } from "../../functions/getIcon.js";

export const ActiveClient = () => {
	// Define clientLabel outside the setup function to allow it to be accessed inside the hook
	const clientLabel = Label({
		className: "active-client-label",
		wrap: true,
		truncate: "end",
		hpack: "start",
		maxWidthChars: 50,
		useMarkup: true,
		label: "Lorem Ipsum", // add placeholder so when it gets update it wouldn't cause a flicker
	});

	// Initialize the clientIcon with a placeholder, to be updated in the hook
	const clientIcon = Box({
		className: "active-client-icon",
		child: getIcon("workspace", "", 1),
	});

	const activeClient = Box({
		className: "active-client box",
		children: [clientIcon, clientLabel],

		setup: (self) =>
			self.hook(Hyprland.active, () => {
				const { address, title, class: className } = Hyprland.active.client;
				let cleanedTitle = title;

				if (address && Hyprland.clients) {
					const client = Hyprland.clients.find(
						(client) => client.address === address
					);
					if (client) {
						const initialTitle = client.initialTitle;
						const clientClass = client.initialClass || client.class;

						// Handle special case for "thunar"
						if (className === "thunar" && initialTitle) {
							// Remove " - Thunar" from the end of initialTitle
							cleanedTitle = initialTitle.replace(/ - Thunar$/, "");
						} else if (title && initialTitle && title !== initialTitle) {
							// Construct a regex pattern to match any separator followed by initialTitle
							const pattern = new RegExp(
								`(?:\\s*[—–\\-–—•·]*\\s*)?${initialTitle}`,
								"i"
							);

							// Replace segments matching the pattern with an empty string
							cleanedTitle = cleanedTitle.replace(pattern, "").trim();
						}

						// Update clientIcon using getIcon
						clientIcon.child = getIcon(clientClass, cleanedTitle, 1);
					}
				}

				// If cleanedTitle is still empty or undefined, fall back to workspace name
				if (!cleanedTitle) {
					cleanedTitle = `Workspace ${Hyprland.active.workspace.name}`;
					clientIcon.child = getIcon("workspace", "", 1);
				}

				// Update clientLabel
				clientLabel.label = ` ${cleanedTitle}`;
			}),
	});

	return activeClient;
};
