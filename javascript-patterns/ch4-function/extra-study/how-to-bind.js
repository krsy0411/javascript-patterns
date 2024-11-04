// <객체를 함수에 바인딩하는 법> : bind, call, apply

// 기본 객체와 함수 정의
const person = {
	name: "John",
	age: 30,
	greet: function () {
		console.log(
			`Hello, my name is ${this.name} and I am ${this.age} years old.`
		);
	},
};
person.greet(); // Hello, my name is John and I am 30 years old.

// bind 메서드 사용 예제
const greetBound = person.greet.bind(person);
greetBound(); // Hello, my name is John and I am 30 years old.
// bind - test
const person1 = {
	name: "lee",
	age: 25,
};
const greetBound1 = person.greet.bind(person1);
greetBound1(); // Hello, my name is lee and I am 25 years old.

// call 메서드 사용 예제
const anotherPerson = {
	name: "Jane",
	age: 25,
};
person.greet.call(anotherPerson); // Hello, my name is Jane and I am 25 years old.
// call - test
person.greet.call(person1); // Hello, my name is lee and I am 25 years old.

// apply 메서드 사용 예제
const yetAnotherPerson = {
	name: "Alice",
	age: 28,
};
person.greet.apply(yetAnotherPerson); // Hello, my name is Alice and I am 28 years old.
// apply - test
person.greet.apply(person1); // Hello, my name is lee and I am 25 years old.
// apply - 추가 인자가 필요한 경우
function introduce(greeting, punctuation) {
	console.log(
		`${greeting}, my name is ${this.name} and I am ${this.age} years old${punctuation}`
	);
}
introduce.apply(person1, ["Hi", "!"]); // Hi, my name is Lee and I am 25 years old!
// --------------------------------------------------------------------------------
// 그렇다면, 어떤 차이가 있는걸까?
// 우선, bind & call & apply 모두 this를 바인딩하는 방법
// 1. bind method : 새로운 함수를 생성하고, 해당 함수의 this값을 지정된 값으로 설정(즉, 원래 함수는 호출되지 X)
// 2. call method : 함수를 즉시 호출하고, this값을 지정된 값으로 설정(추가 인자는 쉼표로 구분해서 전달)
// 3. apply method : call과 유사하지만, 인자를 배열 형태로 전달
