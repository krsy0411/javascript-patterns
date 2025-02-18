// 책에서는 범용 함수를 구현했는데, 객체 상속과 관련한 메서드들이 존재

// --------------------------------------------

// Object.create() : 객체 상속을 위한 메서드
// ES5에 추가된 메서드로, 객체를 상속받기 위해 사용되는 언어 내장 메서드
const parent = {
	name: "parent",
	greet: function () {
		console.log(`Hello from ${this.name}`);
	},
};

const child = Object.create(parent);
// 다음과 같이 두 번째 인자로 프로퍼티를 추가할 수 있음 : 반환되는 child2 객체 자신의 프로퍼티로 추가됨
const child2 = Object.create(parent, {
	// 다만, 속성 설명자는 "객체"여야 하고 "value", "writable", "enumerable", "configurable"등의 속성 설명자를 포함해야함
	// 즉, 그냥 age:23 같은 식으로 쓰면 안됨
	age: {
		value: 23,
	},
});

// 테스트
child.greet(); // Hello from parent
console.log(child2.hasOwnProperty("age")); // true

// --------------------------------------------

// Object.setPrototypeOf() : 객체의 프로토타입을 설정하는 메서드
const child3 = {
	name: "child3",
	age: 21,
};
Object.setPrototypeOf(child3, parent);
child3.greet(); // Hello from child3

// --------------------------------------------

// Object.getPrototypeOf() : 객체의 프로토타입을 반환하는 메서드
const child4 = Object.create(parent);
console.log(Object.getPrototypeOf(child4) === parent); // true

// --------------------------------------------

// Object.prototype.isPrototypeOf() : 객체의 프로토타입이 다른 객체의 프로토타입인지 확인하는 메서드
const child5 = Object.create(parent);
console.log(parent.isPrototypeOf(child5)); // true

// --------------------------------------------

// Object.prototype.hasOwnProperty() : 객체가 특정 프로퍼티를 가지고 있는지 확인하는 메서드
const child6 = Object.create(parent);
child6.name = "child6";
child6.age = 16;

console.log(`child6 : ${child6.hasOwnProperty("greet")}`); // false : greet은 parent 객체의 속성
console.log(
	`child6 proto : ${Object.getPrototypeOf(child6).hasOwnProperty("greet")}`
); // true : greet은 parent 객체의 속성
console.log(`child6 : ${child6.hasOwnProperty("name")}`); // true : name은 child6 객체의 자체 속성
console.log(
	`child6 proto : ${Object.getPrototypeOf(child6).hasOwnProperty("name")}`
); // true : name은 parent 객체의 자체 속성
console.log(`child6 : ${child6.hasOwnProperty("age")}`); // true : age는 child6 객체의 속성
console.log(
	`child6 proto : ${Object.getPrototypeOf(child6).hasOwnProperty("age")}`
); // false : age는 child6 객체의 속성
