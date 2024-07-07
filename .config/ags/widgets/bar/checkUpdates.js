const { Box, Button, Label } = Widget;

const getUpdate = Variable(0, {
	poll: [
		1800000,
		`bash -c "checkupdates-with-aur | wc -l"`,
		(out) => parseFloat(out),
	],
});

export const CheckUpdates = () => {
	const updateBox = Box({
		setup: (self) => {
			self.hook(getUpdate, () => {
				self.children = [
					Label({
						className: `update-icon icon`,
						hpack: "start",
						label: "󰓦 ",
					}),
					Label({
						className: `update-label`,
						hpack: "start",
						label: getUpdate.value.toString(),
					}),
				];
			});
		},
	});

	// Create a container for conditionally rendering the updateBox
	const updateButton = Button({
		className: "update box critical",
		onClicked: () =>
			Utils.execAsync([
				"bash",
				"-c",
				"kitty --class kitty-update --title kitty-update -e yay -Syyu --noconfirm --removemake --answerupgrade y --overwrite && echo 1",
			])
				.then((out) => {
					let updateMessage;
					updateMessage = "Failed updating the system";
					if (out == 1) {
						getUpdate.setValue(0);
						updateMessage = "Successfully updated the system";
					}
					Utils.exec(
						`bash -c 'notify-send -a dialog-information -i dialog-information-symbolic -h string:x-canonical-private-synchronous:update "System Update" "Update ${updateMessage}"'`
					);
				})
				.catch((err) => print(err)),
		onSecondaryClick: () =>
			Utils.execAsync(["bash", "-c", "checkupdates-with-aur | wc -l"])
				.then((out) => {
					Utils.exec(
						`bash -c 'notify-send -a dialog-information -i dialog-information-symbolic -h string:x-canonical-private-synchronous:update "Check Update" "Found ${out} new updates"'`
					);
					getUpdate.setValue(parseFloat(out));
				})
				.catch((err) => print(err)),
		setup: (self) => {
			self.hook(getUpdate, () => {
				self.child = updateBox;
				self.visible = getUpdate.value > 0 ? true : false;
			});
		},
	});

	return updateButton;
};
