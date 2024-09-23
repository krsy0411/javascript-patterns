let myarray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. for 루프를 좀 더 최적화하는 방법 : 배열(or 컬렉션)의 길이를 캐시
for (let i = 0, max = myarray.length; i < max; i++) {
	console.log(myarray[i]);

	// 이걸 좀 더 강화시켜보자
	let result = "";
	result += `${myarray[i]}\t`;
	console.log(result);
}

// 2. <1번>의 경우를 "단일 변수 패턴"으로 변형해보기
function looper() {
	let i = 0,
		max,
		myarray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 이 변수는 함수 내부에서만 유효한 범위를 가지므로(블록범위 - 함수범위X), 전역변수의 myarray와 충돌 X
	// 함수 나머지....
	for (i = 0, max = myarray.length; i < max; i++) {
		console.log(myarray[i]);
	}
}

// --------------------------------------------------------------------------------------------

// 3. 미세 최적화 2가지
// 3-1) 변수 덜어내기
// 3-2) 카운트를 거꾸로 하기 : 0과의 비교가 length비교보다 대게 빠름

// for문
for (let i = myarray.length; i--; ) {
	console.log(myarray[i]);
}
// while문
let whileI = myarray.length;
while (whileI--) {
	console.log(myarray[whileI]);
}
