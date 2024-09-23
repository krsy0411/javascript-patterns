// 배열 길이를 매번 계산하는 방식 : 100만 기준
let arr = new Array(1000000).fill(0);

console.time("length-check-every-time");
for (let i = 0; i < arr.length; i++) {
	// 작업 수행
}
console.timeEnd("length-check-every-time"); // 결과 : 3.094ms

// 배열 길이를 캐싱하는 방식
let length = arr.length;

console.time("length-cached");
for (let i = 0; i < length; i++) {
	// 작업 수행
}
console.timeEnd("length-cached"); // 결과 : 0.846ms
