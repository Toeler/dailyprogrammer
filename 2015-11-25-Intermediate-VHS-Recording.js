// TODO: Optimize so it skips a long show in the middle
// TODO: Support the required show

function vhsRecording(input) {
	input = input.split("\r\n");
	var required;
	if (!parseInt(input[0], 10)) {
		required = input.splice(0, 1)[0];
	}

	var shows = input.map(function(line) {
		return line.match(/^(\S+)\s(\S+)(?:\s(.*))?$/).slice(1).map(function(num) {
			return parseInt(num, 10) || num;
		}).filter(function(el) { return el !== undefined; });
	}).sort(function(a, b) {
		return a[0] - b[0];
	});

	var result = [], lastEndTime;
	for (var i = 0; i < shows.length; i++) {
		if (!lastEndTime || shows[i][1] > lastEndTime) {
			result.push(shows[i]);
			lastEndTime = shows[i][1]
		}
	}

	if (result[0] && result[0][2]) {
		return result.map(function (show) { return show[2]; }).join("\r\n");
	}
	return result.length;
}

console.log(vhsRecording("1530 1600\r\n1555 1645\r\n1600 1630\r\n1635 1715"));
console.log(vhsRecording("1535 1610 Pokémon\r\n1610 1705 Law & Order\r\n1615 1635 ER\r\n1615 1635 Ellen\r\n1615 1705 Family Matters\r\n1725 1810 The Fresh Prince of Bel-Air"));
//console.log(vhsRecording("The Fresh Prince of Bel-Air\r\n1530 1555 3rd Rock from the Sun\r\n1550 1615 The Fresh Prince of Bel-Air\r\n1555 1615 Mad About You\r\n1615 1650 Ellen\r\n1655 1735 Quantum Leap"));