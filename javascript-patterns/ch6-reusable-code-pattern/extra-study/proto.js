// __proto__ : 프로퍼티 : 모든 자바스크립트 객체 내부에 존재하는, 비표준 속성
// 객체의 프로토타입을 가리키며, 객체가 다른 객체로부터 상속받은 속성과 메서드를 찾을 때 사용

// prototype : 프로퍼티 : 함수 객체의 속성
// 해당 함수가 생성자로 사용될 때, 생성된 객체의 프로토타입을 정의

// ----------------------------------------------------------------------------
// 다음과 같이, __proto__를 사용해 상속을 구현 가능

const parent = {
	name: "Parent",
	greet: function () {
		console.log(`Hello from ${this.name}`);
	},
};

const child = {
	__proto__: parent,
	name: "Child",
};

child.greet(); // Hello from Child

// ----------------------------------------------------------------------------
// 다만, 설명을 위해서는 사용되는 용어가 될 수는 있어도, __proto__를 직접 사용하는 것은 권장되지 않음 : 비표준 속성이기 때문
// 그래도 대부분의 자바스크립트 엔진에 구현되어 있기는 함.
// 하지만, ES6에서는 __proto__를 사용하지 않고, Object.setPrototypeOf(), Object.setPrototypeOf()를 사용하는 것이 권장됨 : ECMAScript 사양에 포함된 표준 방법이기 때문

const parent2 = {
	name: "Parent2",
	greet: function () {
		console.log(`Hello from ${this.name}`);
	},
};

const child2 = {
	name: "Child2",
};
Object.setPrototypeOf(child2, parent2);

child2.greet(); // Hello from Child2

console.log(Object.getPrototypeOf(child2) === parent2); // true
