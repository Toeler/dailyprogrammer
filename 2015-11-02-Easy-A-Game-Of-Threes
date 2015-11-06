function threes(input) {
	while (input > 1) {
		if (input % 3 == 2) {
			console.log(input, 1);
			input = ++input / 3;
		} else if (input % 3 == 1) {
			console.log(input, -1);
			input = --input / 3;
		} else {
			console.log(input, 0);
			input /= 3;
		}
	}
	console.log(input);
}

function threesRecursive(input) {
	if (input == 1) {
		console.log(input);
		return;
	} if (input % 3 == 2) {
		console.log(input, 1);
		threesRecursive(++input / 3);
	} else if (input % 3 == 1) {
		console.log(input, -1);
		threesRecursive(--input /  3);
	} else {
		console.log(input, 0);
		threesRecursive(input / 3);
	}
}

threes(100);
threesRecursive(100);