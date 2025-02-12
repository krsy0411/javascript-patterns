// 클로저 & 비공개 스태틱 변수의 차이
// Q) 문법적으로 유사한데, 정확히 어떤 차이지?

// closure : 함수가 생성될 때의 렉시컬 환경을 기억하는 기능
// 함수가 선언된 스코프 외부에서도 해당 스코프의 변수에 접근 가능
function createCounterClosure() {
	let counter = 0;

	return function () {
		counter++;
		return counter;
	};
}
const counter1 = createCounterClosure();
console.log(counter1()); // 1
console.log(counter1()); // 2

const counter2 = createCounterClosure();
console.log(counter2()); // 1
console.log(counter2()); // 2

// private static variable : 특정 생성자 함수의 모든 인스턴스가 공유하는 변수
// 생성자 함수 외부에서 접근 불가능. 생성자 함수 내부에서만 접근 가능
const Counter = (function () {
	let counter = 0; // 비공개 스태틱 변수

	function Counter() {
		counter++;
	}

	Counter.prototype.getId = function () {
		return counter;
	};

	return Counter;
})();

const m1 = new Counter();
const m2 = new Counter();
// 다음처럼, 모든 인스턴스가 공유하는 변수를 가지게 됨
console.log(`m1: ${m1.getId()}, m2: ${m2.getId()}`); // m1: 2, m2: 2
