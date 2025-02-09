// this : 호출 시점에 따른 값

// 1. 기본 함수 호출
// this가 전역 객체를 가리킴 : 브라우저 환경 -> window 객체, Node.js 환경 -> global 객체
function showThis() {
	console.log(this);
}

showThis(); // 브라우저에서는 window 객체, Node.js에서는 global 객체 출력

// --------------------------------------------------------------------------------

// 2. 메서드 호출
// this가 메서드를 호출한 객체를 가리킴
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

// --------------------------------------------------------------------------------

// 3. 생성자 함수 호출
// this가 생성자 함수로 생성된 객체를 가리킴
function Person(name, age) {
	this.name = name;
	this.age = age;
}

const john = new Person("John", 30);
console.log(john.name); // John
console.log(john.age); // 30

// --------------------------------------------------------------------------------

// 4. call & apply & bind
// this가 지정된 값으로 설정됨

// 4-1) call method
const anotherPerson = {
	name: "Jane",
	age: 25,
};
// 함수를 즉시 호출해 this값을 지정된 값으로 설정
person.greet.call(anotherPerson); // Hello, my name is Jane and I am 25 years old.

// 4-2) apply method
const yetAnotherPerson = {
	name: "Alice",
	age: 28,
};
// call과 유사하긴 하지만, 인자를 배열 형태로 전달
person.greet.apply(yetAnotherPerson); // Hello, my name is Alice and I am 28 years old.

// 4-3) bind method
// 새로운 함수를 생성하고, 해당 함수의 this값을 지정된 값으로 설정(원래 함순느 호출되지 X)
const greetBound = person.greet.bind(anotherPerson);
greetBound(); // Hello, my name is Jane and I am 25 years old.

// --------------------------------------------------------------------------------

// 5. 화살표 함수
// 화살표 함수는 자신만의 this 바인딩을 가지지 X
// 화살표 함수 내부에서 this를 참조하면, 화살표 함수가 정의된 위치에서(=외부 스코프에서) this를 가져옴
const obj = {
	name: "John",
	age: 30,
	greet: function () {
		const innerFunc = () => {
			console.log(
				`Hello, my name is ${this.name} and I am ${this.age} years old.`
			);
		};
		innerFunc();
	},
};

obj.greet(); // Hello, my name is John and I am 30 years old.
