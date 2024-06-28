const audio = await Service.import("audio");
const { Box, Button, Icon, Label } = Widget;

export const Volume = () => {
	return Button({
		setup: (self) =>
			self.hook(audio.speaker, (self) => {
				const changeVolume = (delta) => {
					let newVolume = audio.speaker.volume * 100 + delta;
					newVolume = Math.max(0, Math.min(newVolume, 100)); // Clamp between 0 and 100
					audio.speaker.volume = newVolume / 100;
				};
				const toggleVolume = () => {
					audio.speaker.is_muted = !audio.speaker.is_muted;
				};
				const volumeData =
					[
						[99, "overamplified"],
						[67, "high"],
						[34, "medium"],
						[1, "low"],
						[0, "muted"],
					].find(
						([threshold]) => threshold <= audio.speaker.volume * 100
					)?.[1] || "muted";
				const volumeStatus =
					[
						[99, "critical"],
						[67, "high"],
						[34, "medium"],
						[1, "low"],
						[0, "disabled"],
					].find(
						([threshold]) => threshold <= audio.speaker.volume * 100
					)?.[1] || "disabled";
				self.onScrollUp = () => changeVolume(+5);
				self.onScrollDown = () => changeVolume(-5);
				self.onClicked = () => toggleVolume();
				(self.className = !audio.speaker.is_muted
					? `volume box ${volumeStatus}`
					: `volume box disabled`),
					(self.child = Box({
						children: [
							Icon({
								className: "volume-icon icon",
								icon: !audio.speaker.is_muted
									? `audio-volume-${volumeData}-symbolic`
									: `audio-volume-muted-symbolic`,
							}),
							Label({
								className: "volume-label",
								label: !audio.speaker.is_muted
									? ` ${Math.round(audio.speaker.volume * 100).toString()}`
									: "",
							}),
						],
					}));
			}),
	});
};
