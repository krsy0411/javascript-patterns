// 커링 : 함수를 변형하는 과정 : 함수가 부분 적용을 이해하고 처리할 수 있도록 만드는 과정

// 예제
function multiply(a, b) {
	if (typeof b === "undefined") {
		// 클로저 생성 : a값은 내부적으로(비공개적으로) 접근 + 인자로 받는 b값을 곱해줌
		return function (b) {
			return a * b;
		};
	}
}

console.log(multiply(2)); // [Function (anonymous)]
console.log(multiply(2)(3)); // 6
const mul1 = multiply(3);
console.log(mul1(10)); // 30

// --------------------------------------------------------------------------------
// 그럼 어떤 함수라도 커링할 수 있도록 만드는 "범용 함수"를 만들어보자
function schonfinkelize(fn) {
	const slice = Array.prototype.slice; // 배열의 slice() 메서드를 변수에 할당(캐싱)
	const storedArgs = slice.call(arguments, 1); // fn을 제외한 나머지 인자를 배열로 저장

	// 클로저 생성 : storedArgs와 새로운 인자를 합친 후 fn을 호출
	return function () {
		const newArgs = slice.call(arguments); // 첫 호출 이후, 재호출된 함수로부터 받는 인자를 배열로 저장
		const args = storedArgs.concat(newArgs); // 기존 인자와 새로운 인자를 합침

		return fn.apply(null, args); // fn을 호출하고 인자를 전달 : 하고자 했던 함수의 역할을 완벽히 수행
	};
}

// 이렇게도 가능하겠다 : 좀 더 축약시켜봄
function schonfinkelize2(fn) {
	const storedArgs = [_, ...arguments];

	return (...newArgs) => {
		const args = [...storedArgs, ...newArgs];

		return fn.apply(null, args);
	};
}
