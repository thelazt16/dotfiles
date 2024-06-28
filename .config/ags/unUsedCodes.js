// return Box({
//   className: "clients",
//   children: [
//     Box({
//       className: "client",
//       children: Hyprland.bind("clients").as((clients) =>
//         clients
//           // .sort((a, b) => a.address.localeCompare(b.address)) // Sort clients by address
//           .filter(
//             (client) =>
//               client.workspace.id === Hyprland.active.workspace.id ||
//               client.workspace.name ===
//                 `special:${Hyprland.active.workspace.id}`
//           )
//           .map((client) =>
//             Button({
//               className: "client-button",
//               child: getIcon(
//                 client.initialClass,
//                 client.initialTitle,
//                 client.workspace.name ===
//                   `special:${Hyprland.active.workspace.id}`
//                   ? 0.4
//                   : 1
//               ),
//               onClicked: () =>
//                 client.workspace.name ===
//                 `special:${Hyprland.active.workspace.id}`
//                   ? show(client.workspace.name.split(":")[1], client.address)
//                   : hide(client.workspace.id, client.address),
//             })
//           )
//       ),
//     }),
//   ],
// });

// export const Volume = () => {
// 	const volumeIcon = Icon({
// 		className: "volume-icon icon",
// 		hpack: "start",
// 		vpack: "center",
// 	}).hook(audio.speaker, (self) => {
// 		updateIcon(self);
// 	});

// 	const volumeLabel = Label({
// 		className: "volume-label",
// 		hpack: "start",
// 		vpack: "center",
// 	}).hook(audio.speaker, (self) => {
// 		updateLabel(self);
// 	});

// 	const volumeButton = Button({
// 		onScrollUp: () => updateVolume(5),
// 		onScrollDown: () => updateVolume(-5),
// 		on_clicked: () => {
// 			audio.speaker.is_muted = !audio.speaker.is_muted;
// 			updateIcon(volumeIcon);
// 			updateLabel(volumeLabel);
// 		},
// 		child: Box({
// 			hpack: "start",
// 			vpack: "center",
// 			children: [volumeIcon, volumeLabel],
// 		}),
// 	});

// 	const updateVolume = (delta) => {
// 		let newVolume = audio.speaker.volume * 100 + delta;
// 		newVolume = Math.max(0, Math.min(newVolume, 100)); // Clamp between 0 and 100
// 		audio.speaker.volume = newVolume / 100;
// 		updateIcon(volumeIcon);
// 		updateLabel(volumeLabel);
// 	};

// 	const updateIcon = (icon) => {
// 		const vol = audio.speaker.is_muted ? 0 : audio.speaker.volume * 100;
// 		const iconName =
// 			[
// 				[100, "overamplified"],
// 				[67, "high"],
// 				[34, "medium"],
// 				[1, "low"],
// 				[0, "muted"],
// 			].find(([threshold]) => threshold <= vol)?.[1] || "muted";

// 		icon.icon = `audio-volume-${iconName}-symbolic`;
// 		icon.tooltip_text = audio.speaker.is_muted
// 			? "Muted"
// 			: `Volume ${Math.floor(vol)}%`;

// 		if (audio.speaker.is_muted) {
// 			icon.toggleClassName("volume-icon-muted", true);
// 		} else {
// 			icon.toggleClassName("volume-icon-muted", false);
// 		}
// 	};

// 	const updateLabel = (label) => {
// 		if (audio.speaker.is_muted) {
// 			label.label = "";
// 		} else {
// 			const vol = audio.speaker.volume * 100;
// 			label.label = ` ${Math.round(vol).toString()}`;
// 		}
// 	};

// 	volumeButton.connect("scroll-event", (widget, event) => {
// 		const scrollDirection = event.get_scroll_direction();
// 		if (scrollDirection === Gdk.ScrollDirection.UP) {
// 			updateVolume(5);
// 		} else if (scrollDirection === Gdk.ScrollDirection.DOWN) {
// 			updateVolume(-5);
// 		}
// 		return true;
// 	});

// 	return Box({
// 		className: "volume box",
// 		hpack: "start",
// 		child: volumeButton,
// 	});
// };
