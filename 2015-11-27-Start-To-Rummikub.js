"use strict";
const TILE_COLS = ["B", "Y", "R", "P"];
const TILE_NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const MAX_OCCURANCE = 2;

class Tile {
	constructor(col, num) {
		if (arguments.length === 1) {
			this.col = col.substr(0, 1);
			this.num = parseInt(col.substr(1));
		} else {
			this.col = col;
			this.num = num;
		}
	}
	hasSameCol(tile) { return tile.col === this.col };
	hasSameNum(tile) { return tile.num === this.num };
	proceeds(tile) { return tile.num + 1 === this.num };
	equals(tile) { return tile.hasSameCol(this) && tile.hasSameNum(this) };
	toString() { return this.col + this.num };
}

function generateRandomTile(existingTiles) {
	if (existingTiles.length >= TILE_COLS.length * TILE_NUMS.length * MAX_OCCURANCE) {
		throw new Error("Out of tiles");
	}

	while(true) {
		let newTile = new Tile(TILE_COLS[Math.floor(Math.random() * TILE_COLS.length)], TILE_NUMS[Math.floor(Math.random() * TILE_NUMS.length)]),
			count = 0;
		for (let tile of existingTiles) {
			if (newTile.equals(tile)) {
				++count;
			}
		}
		if (count < 2) {
			return newTile;
		}
	}
}

function listContainsTile(list, tile) {
	return list.findIndex(t => t.equals(tile)) > -1;
}

function getRun(tile, otherTiles) {
	var result = [tile];
	for (let otherTile of otherTiles) {
		if (otherTile.hasSameCol(tile) && otherTile.proceeds(result[result.length - 1])) {
			result.push(otherTile);
		}
	}
	return result;
}

function getGroup(tile, otherTiles) {
	var result = [tile];
	for (let otherTile of otherTiles) {
		if (!otherTile.hasSameCol(tile) && otherTile.hasSameNum(tile) && !listContainsTile(result, otherTile)) {
			result.push(otherTile);
		}
	}
	return result;
}

function getSetScore(tiles, pick, result, resultScore) {
	if (pick.length >= 3) {
		let pickClone = pick.slice(0);
		let pickResult = findBestMove(tiles.filter(t => {
			let i = pickClone.findIndex(t2 => t2.equals(t));
			if (i > -1) {
				pickClone.splice(i, 1);
				return false;
			}
			return true;
		}), pick.reduce((a, b) => a + b.num, 0));

		if (pickResult) {
			let newResult = [pick].concat(pickResult[1]);
			if (pickResult[0] >= 30) {
				if (newResult.length > result.length) {
					result = newResult;
					resultScore = pickResult[0];
				}
			} else if (pickResult[0] > resultScore) {
				result = newResult;
				resultScore = pickResult[0];
			}
		}
	}
	return [result, resultScore];
}

function findBestMove(tiles, currentScore) {
	currentScore = currentScore || 0;
	var result = [], resultScore = 0;
	for (let tile of tiles) {
		let index = tiles.indexOf(tile);

		let tmp = getSetScore(tiles, getRun(tile, tiles.slice(index + 1)), result, resultScore);
		result = tmp[0];
		resultScore = tmp[1];
		tmp = getSetScore(tiles, getGroup(tile, tiles.slice(index + 1)), result, resultScore);
		result = tmp[0];
		resultScore = tmp[1];
	}
	return [currentScore + resultScore, result];
}

function startToRummikub(input, grabExtraTiles) {
	input = input.split(" ").map(tile => new Tile(tile)).sort((a, b) => a.num - b.num);
	var bestMove = findBestMove(input),
		addedTiles = [];
	if (grabExtraTiles) {
		while (bestMove[0] < 30) {
			let newTile = generateRandomTile(input);
			addedTiles.push(newTile);
			input.push(newTile);
			input = input.sort((a, b) => a.num - b.num);
			bestMove = findBestMove(input);
		}
	}
	var result = "";
	if (addedTiles.length > 0) {
		result = ["Grabbed:"].concat(addedTiles).concat("\r\nFound set:\r\n").join("\r\n");
	}
	if (bestMove[0] >= 30) {
		result += bestMove[1].map(pick => pick.join(" ")).join("\r\n");
	} else {
		result += "Impossible";
	}
	return result;
}

console.log(startToRummikub("P12 P7 R2 R5 Y2 Y7 R9 B5 P3 Y8 P2 B7 B6 B8")); // R2 Y2 P2\r\nB5 B6 B7 B8
//console.log(startToRummikub("P7 R5 Y2 Y13 R9 B5 P3 P7 R3 Y8 P2 B7 B6 B12")); // Impossible
//console.log(startToRummikub("P7 R5 Y2 Y13 R9 B5 P3 P7 R3 Y8 P2 B7 B6 B12", true)); // ???

// Testing
//console.log(getGroup(new Tile('B2'), [new Tile('Y2'), new Tile('R2'), new Tile('B2'), new Tile('P2'), new Tile('Y3'), new Tile('B3')])); // B2 Y2 R2 P2
//console.log(getRun(new Tile('B2'), [new Tile('Y2'), new Tile('R2'), new Tile('B2'), new Tile('B3'), new Tile('B4'), new Tile('Y5')])); // B2 B3 B4