const { Button } = Widget;

const inhibitorScript = "~/.config/hypr/scripts/inhibitor.sh";
const startInhibitor = () =>
	Utils.execAsync(`bash -c '${inhibitorScript} start'`);
const stopInhibitor = () =>
	Utils.execAsync(`bash -c '${inhibitorScript} stop'`);
const inhibitorID = Variable(undefined, {
	poll: [1000, () => Utils.exec(`bash -c '${inhibitorScript} check'`)],
});

export const Inhibitor = () => {
	return Button({
		setup: (self) =>
			self.hook(inhibitorID, () => {
				// print(JSON.stringify(inhibitorID.value));
				self.onPrimaryClick = () => {
					if (!inhibitorID.value) startInhibitor();
					if (inhibitorID.value) stopInhibitor();
				};
				self.className = "inhibitor box icon";
				self.label = inhibitorID.value ? " " : " ";
				self.visible = inhibitorID.value ? true : false;
				self.toggleClassName("disabled", inhibitorID.value ? false : true);
				self.toggleClassName("low", inhibitorID.value ? true : false);
			}),
	});
};

export { inhibitorID, startInhibitor, stopInhibitor };
