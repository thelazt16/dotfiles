const { Gtk, Gdk } = imports.gi;

export const forMonitors = (widget) => {
	const display = Gdk.Display.get_default();
	const n = display ? display.get_n_monitors() : 1;
	return range(n, 0).flatMap(widget);
};

export const range = (length, start = 1) => {
	return Array.from({ length: length }, (_, i) => i + start);
};
