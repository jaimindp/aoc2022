#!/usr/bin/node

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')
let cnt = 0;

let cache = {};

// First pass add to the stack if higher for each row
// Second pass, do the same in reverse for each row
// Thris pass do top to bottom for each col
// 4th pass do bottom to top for each col
// Cache result

let arr = []

input.forEach((line,i) => {
  arr.push([])
  line.split("").forEach((tree, i2) => {
		arr[i].push(Number(tree))
		cache[i.toString() + ' ' + i2.toString()] = []
	})
})
let max = -1


function treeVisible(){

	// Check rows asc
	for (let i=0;i<arr.length-1;i++){
		for (let j=0;j<arr[0].length-1;j++){
			let coords = i.toString() + ' ' + j.toString()
			let dist = 0
			let counter = 0
			for (dist; j-dist > 0; dist++){
				if (arr[i][j-dist-1] >= arr[i][j]){
					break	
				}
				counter++
			}
			cache[coords].push(counter)
		}
	}
	console.log(1)
	// Check rows desc
	for (let i=0;i<arr.length;i++){
		for (let j=arr[i].length-1;j>=0;j--){
			let coords = i.toString()+ ' ' + j.toString()
			let dist = 0
			let counter = 0
			for (dist; j+dist < arr[i].length-1; dist++){
				if (arr[i][j+dist+1] >= arr[i][j]){
					break	
				}
				counter++
			}
			cache[coords].push(counter)
		}
	}
	console.log(2)
	// Check cols asc
	for (let j=0;j<arr.length;j++){
		for (let i=0;i<arr[j].length;i++){
			let coords = i.toString() + ' ' + j.toString()
			let dist = 0
			let counter = 0 
			for (dist; i-dist > arr[j].length+1; dist++){
				if (arr[i-dist-1][j] >= arr[i][j]){
					break	
				}
				counter++
			}
			cache[coords].push(counter)
		}
	}
	console.log(3)
	// Check cols desc
	for (let j=0;j<arr.length;j++){
		for (let i=arr[j].length-1;i>=0;i--){
			let dist = 0
			let counter = 0
			let coords = i.toString() + ' ' + j.toString()
			for (dist; i+dist < arr[j].length-1; dist++){
				if (arr[i+dist+1][j] >= arr[i][j]){
					break	
				}
				counter++
			}
			cache[coords].push(counter)
		}
	}
	console.log(4)
}


treeVisible()
let topit = 0

for (const [key, value] of Object.entries(cache)){
	let thissum = value.reduce((partialSum, a) => partialSum + a, 0);
//	console.log(thissum)
	if (thissum > topit){
		topit = thissum
	}	
}

console.log(cache)

console.log(topit)
//console.log(cache['0 0'])
