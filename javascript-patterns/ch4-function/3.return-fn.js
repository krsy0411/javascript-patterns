// (함수 = 객체) -> 반환 값으로 사용 가능 === 함수 실행 결과로 꼭 어떤 데이터값이나 배열을 반환할 필요는 없다는 뜻

// 함수를 반환하는 함수
const setup = function () {
	console.log("Hello, world!");

	return function () {
		console.log("Hello, world!");
	};
};

const my = setup();
my(); // Hello, world! 2번 출력

// --------------------------------------------------------------------------------

// 함수를 반환하는 함수 -> 클로저를 생성
// 클로저란?) 함수와 그 함수가 선언된 어휘적 환경(Lexical Environment)의 조합 : 함수가 선언된 환경 외부에서 그 환경에 접근 가능하게 해줌
// 클로저의 특징) 1. 내부함수 + 2. 외부 변수 접근  + 3. 상태 유지

// 클로저 예제
// 1. 함수 선언
function createCounter() {
	let count = 0; // 클로저가 접근할 수 있는 변수

	return function () {
		count += 1;
		return count;
	};
}

// 2. 함수 호출 & 클로저 생성
// 클로저는, 반환되는 함수에서는 접근할 수 있지만 코드 외부에서는 접근 불가 -> "비공개 데이터 저장"을 위해 사용 가능
const counter = createCounter(); // createCounter 함수 호출로 "클로저 생성"
// 3. 클로저 호출
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
