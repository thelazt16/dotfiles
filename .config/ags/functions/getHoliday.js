import { fetchHolidays } from "../services/fetchHolidayService.js";
const { Gio, GLib } = imports.gi;

const fileExists = (filePath) => {
	const file = Gio.File.new_for_path(filePath);
	return file.query_exists(null);
};

export const getHoliday = async (date = new Date()) => {
	const year = date.getFullYear();
	const userConfigDir = GLib.get_user_config_dir(); // Get ~/.config directory
	const holidaysDir = GLib.build_filenamev([
		userConfigDir,
		"ags",
		".cache",
		"holidays",
	]);
	const filePath = GLib.build_filenamev([holidaysDir, `${year}.json`]);

	if (!fileExists(filePath)) await fetchHolidays(year);

	try {
		const holidaysDataJSON = await Utils.readFileAsync(filePath);
		const holidaysData = JSON.parse(holidaysDataJSON); // Parse JSON data

		const formattedDate = date.toISOString().slice(0, 10); // Convert date to YYYY-MM-DD format
		// const formattedDate = "2024-02-8";
		const holiday = holidaysData.find((h) => h.tanggal === formattedDate);

		if (holiday) return holiday.keterangan;
		// if (!holiday) return "No holiday found for this date.";
	} catch (error) {
		console.error(error);
	}
};
