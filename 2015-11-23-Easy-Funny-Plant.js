function funnyPlant(input) {
	input = input.split(" ").map(function(i) { return parseInt(i, 10); });
	var people = input[0], plants = input[1];

	for (var weeks = 1, fruits = 0; fruits < people; ++weeks) {
		fruits += plants;
		plants += fruits;
	}
	return weeks;
}
function funnyPlantFib(input) {
	input = input.split(" ").map(function(i) { return parseInt(i, 10); });
	var people = input[0] / input[1];

	for (var a = 0, b = 1, weeks = 1; a < people; ++weeks) {
		a += b;
		b += a;
	}

	return weeks;
}

console.log(funnyPlant("15 1")); // 5
console.log(funnyPlant("200 15")); // 5
console.log(funnyPlant("50000 1")); // 14
console.log(funnyPlant("150000 250")); // 9
console.log();
console.log(funnyPlantFib("15 1")); // 5
console.log(funnyPlantFib("200 15")); // 5
console.log(funnyPlantFib("50000 1")); // 14
console.log(funnyPlantFib("150000 250")); // 9