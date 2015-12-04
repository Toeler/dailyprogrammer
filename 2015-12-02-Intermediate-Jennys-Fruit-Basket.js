"use strict";
var solveCache = {};
function solve(items, goal) {
	if (solveCache[goal] && solveCache[goal][JSON.stringify(items)]) {
		return solveCache[goal][JSON.stringify(items)];
	}
	var solutions = [];
	for (let item of items) {
		let newGoal = goal - item.price;
		if (newGoal > 0) {
			solutions = solutions.concat(solve(items, newGoal).map(solution => [item].concat(solution)));
		} else if (newGoal === 0) {
			solutions.push([item]);
		}
	}
	let unique = {};
	solveCache[goal] = solveCache[goal] || {};
	return solveCache[goal][JSON.stringify(items)] = solutions.map(solution => solution.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name))).filter(solution => {
		let hash = JSON.stringify(solution);
		return unique.hasOwnProperty(hash) ? false : (unique[hash] = true);
	});
}

function jennysFruitBasket(input) {
	input = input.split(/\r?\n/).map(line => {
		let split = line.split(" ");
		return { name: split[0], price: parseInt(split[1], 10) };
	});

	return solve(input, 500).map(solution => {
		let output = {};
		solution.forEach(item => output[item.name] = output[item.name] ? output[item.name] + 1 : 1);
		return Object.keys(output).map(key => output[key] + " " + key + (output[key] > 1 ? "s" : "")).join(", ");
	}).join("\r\n");
}

console.log(jennysFruitBasket(`banana 32
kiwi 41
mango 97
papaya 254
pineapple 399`));

console.log(jennysFruitBasket(`apple 59
banana 32
coconut 155
grapefruit 128
jackfruit 1100
kiwi 41
lemon 70
mango 97
orange 73
papaya 254
pear 37
pineapple 399
watermelon 500`));