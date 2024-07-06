const { Box, Button, Label } = Widget;

const getUpdate = Variable("", {
	poll: [
		3600000,
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
				return self;
			});
		},
	});

	// Create a container for conditionally rendering the updateBox
	const updateButton = Button({
		className: "update box critical",
		onClicked: () => {
			Utils.execAsync([
				"bash",
				"-c",
				"kitty --class kitty-update --title kitty-update -e yay -Syyu --noconfirm --removemake --answerupgrade y --overwrite && echo 1",
			])
				.then((out) => {
					let updateMessage = "Failed updating the system";
					if (out == 1) {
						getUpdate.setValue(0);
						updateMessage = "Successfully updated the system";
					}
					Utils.exec(
						`bash -c 'notify-send -a dialog-information -i dialog-information-symbolic -h string:x-canonical-private-synchronous:update "System Update" "Update ${status}"'`
					);
				})
				.catch((err) => print(err));
		},
		setup: (self) => {
			self.hook(getUpdate, () => {
				self.child = updateBox;
				if (getUpdate.value > 0) {
					self.visible = true;
				} else {
					self.visible = false;
				}
				return self;
			});
		},
	});

	return updateButton;
};
