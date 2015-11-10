var SAFE_CHARS = " ,',.\r'\n".split('');

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function typoglycemia(input) {
	input = input.split('');

	var firstIndex = -1;
	for (var i = 0; i < input.length; i++) {
		if (SAFE_CHARS.indexOf(input[i]) > -1 || i === 0 || i === (input.length - 1)) {
			if (firstIndex >= 0) {
				for (var j = firstIndex + 2; j < i - 2; j++) {
					var k = getRandomInt(firstIndex + 2, i - 1);
					var tmp = input[j];
					input[j] = input[k];
					input[k] = tmp;
				}
			}
			firstIndex = i;
		}
	}

	return input.join('');
}

console.log(typoglycemia('According to a research team at Cambridge University, it doesn\'t matter in what order the letters in a word are,\r\n'
			+'the only important thing is that the first and last letter be in the right place.\r\n'
			+'The rest can be a total mess and you can still read it without a problem.\r\n'
			+'This is because the human mind does not read every letter by itself, but the word as a whole.\r\n'
			+'Such a condition is appropriately called Typoglycemia.'));