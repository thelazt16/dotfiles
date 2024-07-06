const { Icon } = Widget;
const { lookUpIcon } = Utils;

export const getIcon = (
	/** @type {string} */ clientClass,
	/** @type {string} */ clientTitle,
	/** @type {float} */ clientOpacity
) => {
	let icon;
	let iconName;
	let formattedClientTitle;
	const fallbackIconName = {
		aladropterm: "Alacritty",
		alaupdate: "alaupdate",
		kittydropterm: "kitty",
		kittyupdate: "kitty",
		"code-url-handler": "vscode",
		kvantummanager: "kvantum",
		Rofi: "kappfinder",
		workspace: "vokoscreen",
	};

	iconName = fallbackIconName[clientClass]
		? fallbackIconName[clientClass]
		: clientClass;

	icon = lookUpIcon(iconName);
	if (!icon) {
		icon = lookUpIcon(clientClass.toLowerCase());
		if (icon) iconName = clientClass.toLowerCase();
	}
	if (!icon) {
		icon = lookUpIcon(`${clientClass}-symbolic`);
		if (icon) iconName = `${clientClass}-symbolic`;
	}
	if (!icon) {
		formattedClientTitle = clientTitle.toLowerCase().replace(/ /g, "-");
		icon = lookUpIcon(formattedClientTitle);
		if (icon) iconName = formattedClientTitle;
	}
	if (!icon) {
		formattedClientTitle = `${clientTitle
			.toLowerCase()
			.replace(/ /g, "-")}-symbolic`;
		icon = lookUpIcon(formattedClientTitle);
		if (icon) iconName = formattedClientTitle;
	}
	if (!icon) {
		iconName = "xfce-unknown";
	}

	return Icon({ icon: iconName, css: `opacity: ${clientOpacity}` });
};
