import * as xlsx from 'xlsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function downloadData(data: any[], columns: string[], filename = 'data') {
	if (data.length === 0) {
		console.warn('No data to export');
		return;
	}

	// const workbook = xlsx.utils.book_new();

	// // Iterate over each JSON element
	// data.forEach((jsonElement, index) => {
	// 	// Find the key with an array of objects
	// 	const key = Object.keys(jsonElement).find((k) => Array.isArray(jsonElement[k]));
	// 	if (key) {
	// 		// Get the array of objects
	// 		const arrayData = jsonElement[key];

	// 		// Create a worksheet from the array of objects
	// 		const worksheet = xlsx.utils.json_to_sheet(arrayData);

	// 		// Append the worksheet to the workbook
	// 		xlsx.utils.book_append_sheet(workbook, worksheet, `Sheet${index + 1}`);
	// 	}
	// });

	// Create a worksheet from the data with headers
	const worksheet = xlsx.utils.json_to_sheet(data, { header: columns });

	// Add headers manually to the worksheet
	xlsx.utils.sheet_add_aoa(worksheet, [columns], { origin: 'A1' });

	// Create a new workbook and append the worksheet
	const workbook = xlsx.utils.book_new();
	xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

	// Write the workbook to a binary string
	const binaryString = xlsx.write(workbook, { bookType: 'xlsx', type: 'binary' });

	// Convert the binary string to a Blob
	const blob = new Blob([s2ab(binaryString)], { type: 'application/octet-stream' });

	// Create a temporary URL for the Blob and trigger the download
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename + '.xlsx';
	a.click();
	window.URL.revokeObjectURL(url);
}

function s2ab(s: string): ArrayBuffer {
	const buf = new ArrayBuffer(s.length);
	const view = new Uint8Array(buf);
	for (let i = 0; i < s.length; i++) {
		view[i] = s.charCodeAt(i) & 0xff;
	}
	return buf;
}
