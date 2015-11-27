function getRecordList(shows, requiredShow, lastEndTime) {
	var result = [];
	lastEndTime = lastEndTime || 0;
	for (var i = 0; i < shows.length; i++) {
		var show = shows[i];
		if (show[2] != undefined && show[2] == requiredShow) {
			if (show[0] >= lastEndTime) {
				return [show].concat(getRecordList(shows.slice(i + 1), requiredShow, show[1]));
			}
			return [];
		} else if (show[0] >= lastEndTime) {
			var recordListWithThisShow = [show].concat(getRecordList(shows.slice(i + 1), requiredShow, show[1]));
			if (recordListWithThisShow.length > result.length) {
				result = recordListWithThisShow;
			}
		}
	}
	return result;
}

function vhsRecording(input) {
	input = input.split("\r\n");
	var requiredShow;
	if (isNaN(parseInt(input[0], 10))) { // Assumes the show doesn't begin with a number
		requiredShow = input.splice(0, 1)[0];
	}

	var shows = input.map(function(line) {
		return line.match(/^(\S+)\s(\S+)(?:\s(.*))?$/).slice(1).map(function(num) {
			return parseInt(num, 10) || num;
		}).filter(function(el) { return el !== undefined; });
	}).sort(function(a, b) {
		return a[0] - b[0];
	});

	var result = getRecordList(shows, requiredShow);
	if (result[0] && result[0][2]) {
		return result.map(function (show) { return show[2]; }).join("\r\n");
	}
	return result.length;
}

console.log(vhsRecording("1530 1600\r\n1555 1645\r\n1600 1630\r\n1635 1715")); // Challenge
//console.log(vhsRecording("1535 1610 Pokémon\r\n1610 1705 Law & Order\r\n1615 1635 ER\r\n1615 1635 Ellen\r\n1615 1705 Family Matters\r\n1725 1810 The Fresh Prince of Bel-Air")); // Bonus 1
//console.log(vhsRecording("The Fresh Prince of Bel-Air\r\n1530 1555 3rd Rock from the Sun\r\n1550 1615 The Fresh Prince of Bel-Air\r\n1555 1615 Mad About You\r\n1615 1650 Ellen\r\n1655 1735 Quantum Leap")); // Bonus 2
//console.log(vhsRecording("1525 1635 1\r\n1530 1600 2\r\n1555 1645 3\r\n1600 1630 4\r\n1635 1715 5")); // First choice is bad
//console.log(vhsRecording("1530 1600 1\r\n1555 1645 2\r\n1600 1800 3\r\n1600 1630 4\r\n1635 1715 5")); // Long running show in the middle
//console.log(vhsRecording("0000 0100 1\r\n1530 1600 2\r\n1555 1645 3\r\n1600 1630 4\r\n1635 1715 5")); // Show starting at midnight (start is falsy)