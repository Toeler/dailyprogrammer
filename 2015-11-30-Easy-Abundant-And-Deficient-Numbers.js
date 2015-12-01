"use strict";

function abundantAndDeficientNumbers(input) {
	return input.split(/\r?\n/).map(num => {
		num = parseInt(num, 10);

		let half = Math.floor(num / 2),
			factors = [1];

		for (let i = num % 2 === 0 ? 2 : 3, inc = i === 2 ? 1 : 2; i <= half; i += inc) {
			if (num % i === 0) {
				factors.push(i);
			}
		}

		var aliquot  = num - factors.reduce((a, b) => a + b, 0);
		if (aliquot  > 0) {
			return num + " deficient";
		} else if (aliquot < 0) {
			return num + " abundant by " + -aliquot;
		} else {
			return num + " neither";
		}
	}).join("\r\n");
}

console.log(abundantAndDeficientNumbers(`18
21
9`));

console.log(abundantAndDeficientNumbers(`111
112
220
69
134
85 `));