// 배열 생성 방식은 2가지
// 1. Array 생성자 함수
const a = new Array("item1", "item2", "item3");
// 2. 배열 리터럴
const a_literal = ["item1", "item2", "item3"];

console.log(a.constructor);

console.log("<Array 생성자 함수>");
console.log("type :", typeof a, "\nconstructor :", a.constructor === Array);
console.log("<배열 리터럴>");
console.log(
	"type :",
	typeof a_literal,
	"\nconstructor :",
	a_literal.constructor === Array
);

// 다만, 생성자 함수의 경우, 인자로 정수를 주면 -> 원소 값이 되는게 아니라, 배열의 길이를 지정하게 됨
// 또한, 인자로 부동소수점을 주면 -> RangeError 발생
// 따라서, 런타임에 동적으로 배열을 생성하는 경우라면 -> 웬만하면 배열 리터럴 표기법을 쓰는 것이 예상치 못한 버그를 발생시키지 않음

// --------------------------------------------------------------------------------------------

// JS에서 배열은, 객체이므로 typeof 연산자를 써도 "object"가 반환됨
// 배열의 실제값이 배열인지 확인하는 가장 좋은 방법은, Array.isArray() 메서드 : "다만, ES5부터 지원"
console.log(Array.isArray([])); // true
// 배열과 비슷한 객체로 속여보기 : 보통 배열의 대표메서드 중 하나인 length, slice를 통해서 배열인지 확인하는데, 객체가 두 메서드를 안 갖는다고 보장하지 않으므로 테스트해보자
console.log(
	Array.isArray({
		length: 3,
		0: 1,
		slice: function () {},
	})
); // false

// 배열 프로퍼티(slice, length)들이 존재하는것도 하나의 방법이긴하나, 객체가 slice, length같은 프로퍼티나 메서드를 가지고 있으면 체크가 안됨(당연히 그럴 일은 거의 없겠지만)
const example_obj_to_cheat = { length: 3, slice: function () {} };
console.log(
	typeof example_obj_to_cheat.length === "number" &&
		typeof example_obj_to_cheat.slice === "function"
); // true -> 이처럼 객체가 배열의 프로퍼티명을 가지고 있으면, 속일 수 있음

// 만약 바벨같은 트랜스파일러를 사용 못하고, ES5 이하에서 작업해야한다면, 다음과 같은 방법으로 배열인지 확인 가능
if (typeof Array.isArray === "undefined") {
	Array.isArray = function (arg) {
		return Object.prototype.toString.call(arg) === "[object Array]";
	};
}
