// 1. 리터럴
// 리터럴 표기법은, 코드가 간결하며, 객체가 "변형 가능한 해시"에 불과하며, 클래스로부터 만들어내야하는 것이 아님을 직관적으로 보여줌
// 또한, "유효범위 판별 작업" 또한 할 필요 없음
var obj = {
	name: "Lee",
	sayHi: function () {
		console.log("Hi! " + this.name);
	},
};

// 2. 내장 생성자
let Person2 = new Object();
Person2.name = "Lee";
Person2.sayHi = function () {
	console.log("Hi! " + this.name);
};

// 번외: 사용자 정의 생성자 함수
function Person(name) {
	this.name = name;
	this.sayHi = function () {
		console.log("Hi! " + this.name);
	};
}

console.log("리터럴 표기법 : ", obj);
console.log("내장 생성자 : ", Person2);
console.log("사용자 정의 생성자 함수 : ", new Person("Lee"));

// --------------------------------------------------------------------------------
// 객체 생성자를 이용한 예제 : 객체 생성자는 인자에 어떤 값이 들어가냐에 따라 다른 내장 생성자에게 객체 생성을 위임하여, 기대와는 다른 객체가 반환될 수 있음
let strObj = new Object("Hello");
let numObj = new Object(123);
let boolObj = new Object(true);

console.log("\n<객체 생성자를 이용한 예제>");
console.log("String Object: ", strObj); // String Object: [String: 'Hello']
console.log("Number Object: ", numObj); // Number Object: [Number: 123]
console.log("Boolean Object: ", boolObj); // Boolean Object: [Boolean: true]

console.log(
	"\n<다른 내장 생성자에게 객체 생성을 위임함 : 내장 래퍼 생성자가 만들어냄>"
);
console.log(strObj.constructor === String); // true
console.log(strObj.constructor === Object); // false
console.log(numObj.constructor === Number); // true
console.log(numObj.constructor === Object); // false
console.log(boolObj.constructor === Boolean); // true
console.log(boolObj.constructor === Object); // false

console.log("\n<결론적으로는 객체 타입으로 인식하기는 함>");
console.log(typeof strObj); // object
console.log(typeof numObj); // object
console.log(typeof boolObj); // object
