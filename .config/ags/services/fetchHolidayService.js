const { Gio, GLib } = imports.gi;

export const fetchHolidays = async (year) => {
	try {
		const response = await Utils.fetch(
			`https://dayoffapi.vercel.app/api?year=${year}`
		);
		const text = await response.text();

		const userConfigDir = GLib.get_user_config_dir(); // Get ~/.config directory
		const holidaysDir = GLib.build_filenamev([
			userConfigDir,
			"ags",
			".cache",
			"holidays",
		]);
		const filePath = GLib.build_filenamev([holidaysDir, `${year}.json`]);

		// Ensure the holidays directory exists
		const holidaysDirFile = Gio.File.new_for_path(holidaysDir);
		if (!holidaysDirFile.query_exists(null)) {
			holidaysDirFile.make_directory_with_parents(null);
		}

		// Write data to the file
		await Utils.writeFile(text, filePath).catch((error) => {
			console.error(`Error writing file: ${error}`);
		});

		print(`Holidays data for ${year} saved to ${filePath}`);
	} catch (error) {
		console.error("Error fetching holidays:", error);
	}
};
