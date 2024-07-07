import { fetchHolidays } from "../services/fetchHolidayService.js";
const { Gio, GLib } = imports.gi;

const fileExists = (filePath) => {
	const file = Gio.File.new_for_path(filePath);
	return file.query_exists(null);
};

export const getHoliday = async (date = new Date()) => {
	const year = date.getFullYear();
	const userCacheDir = GLib.get_user_cache_dir();
	const holidaysDir = GLib.build_filenamev([userCacheDir, "ags", "holidays"]);
	const filePath = GLib.build_filenamev([holidaysDir, `${year}.json`]);

	if (!fileExists(filePath)) await fetchHolidays(year);

	try {
		const holidaysDataRaw = await Utils.readFileAsync(filePath);
		const holidaysData = JSON.parse(holidaysDataRaw); // Parse JSON data

		const formattedDate = date.toISOString().slice(0, 10); // Convert date to YYYY-MM-DD format
		// const formattedDate = "2024-02-8";
		const holiday = holidaysData.find((h) => h.tanggal === formattedDate);

		if (holiday) return holiday.keterangan;
		// if (!holiday) return "No holiday found for this date.";
	} catch (error) {
		console.error(error);
	}
};
