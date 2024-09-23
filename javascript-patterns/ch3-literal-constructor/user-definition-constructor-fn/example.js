// JS에는 클래스라는 것은 없음 -> 생성자 함수를 써서 객체를 생성한들, 결국은 하나의 함수을 뿐임!
let Person = function (name) {
	this.name = name;
	this.sayHi = function () {
		console.log("Hi! " + this.name);
	};
};

// 사용시
let lee = new Person("Lee");
lee.sayHi(); // Hi! Lee

// 이것과 동일하다고 할 수 있음
class Person2 {
	constructor(name) {
		this.name = name;
	}
	sayHi() {
		console.log("Hi! " + this.name);
	}
}

// --------------------------------------------------------------------------------

// new와 함께 생성자 함수를 호출할때의 동작 원리
let Person3 = function (name) {
	// 1. 빈 객체 생성 : this로 참조 가능 + 해당 함수의 프로토타입을 상속받음
	var thisExample = {};

	// 2. 빈 객체에 프로퍼티 추가
	this.name = name;
	this.sayHi = function () {
		console.log("Hi! " + this.name);
	};

	return thisExample;
};
// 윗 방식은 인스턴스를 생성할때마다 메모리에 새로 함수를 생성하므로 비효율적 -> prototype을 사용하는게 효율적
Person3.prototype.sayBye = function () {
	console.log("Bye! " + this.name);
};
// 이렇게하면, 인스턴스를 계속해서 생성해도 sayBye는 계속 생성되는게 아닌, 1번만 생성되어 인스턴스 사이에서 공유됨
let lee2 = new Person3("Lee2");
let lee3 = new Person3("Lee3");
console.log(lee2.sayBye === lee3.sayBye); // true -> 즉, 인스턴스 사이에서 같은 메서드 취급

// --------------------------------------------------------------------------------

// 생성자는 암묵적으로 this를 반환하지만, 명시적으로 반환값이 될 객체를 따로 지정할 수 있음(원시값을 반환하면 무시됨)
let ObjectMaker = function () {
	this.name = "Lee";

	let that = {};
	that.name = "Kim";
	that.age = 21;
	return that;
};
console.log(new ObjectMaker());
