// call method : 함수 호출시, this값을 명시적으로 설정(this binding)하고 실행할 수 있게 해줌
// 모든 자바스크립트 함수에 존재하는 메서드

// 기본 사용법1
function greet() {
	console.log(`Hello, my name is ${this.name}`);
}

const person1 = {
	name: "Alice",
};

// 객체를 함수의 this에 명시적으로 바인딩
greet.call(person1); // 출력: Hello, my name is Alice

// 기본 사용법2 - 함수에 매개변수가 있는 경우
function introduce(greeting, age) {
	console.log(
		`${greeting}, my name is ${this.name} and I am ${age} years old.`
	);
}

const person2 = {
	name: "Bob",
};

introduce.call(person2, "Hi", 25); // 출력: Hi, my name is Bob and I am 25 years old.

// 기본 사용법3 - 다른 객체의 메서드 빌려쓰기
const person3_1 = {
	name: "Charlie",
	greet: function () {
		console.log(`Hello, my name is ${this.name}`);
	},
};

const person3_2 = {
	name: "Dave",
};

person3_1.greet(); // 출력: Hello, my name is Charlie
person3_1.greet.call(person3_2); // 출력: Hello, my name is Dave

// --------------------------------------------------------------------------------

// 예시: toString.call()의 동작
console.log(Object.prototype.toString.call([1, 2, 3])); // "[object Array]"
console.log(Object.prototype.toString.call("Hello")); // "[object String]"
console.log(Object.prototype.toString.call(123)); // "[object Number]"
console.log(Object.prototype.toString.call(null)); // "[object Null]"
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"

// 중요) Object.prototype.toString.call() 메서드가 유용한 경우
// 1. 정확한 타입 확인할때 : typeof 연산자는 (null, Array, Object) 관계의 타입을 모두 "object"로 반환
// 2. 브라우저 호환성을 위해 메서드를 직접 추가할때 : 다음과 같이 말이다
if (!Array.isArray) {
	Array.isArray = function (arg) {
		return Object.prototype.toString.call(arg) === "[object Array]";
	};
}
