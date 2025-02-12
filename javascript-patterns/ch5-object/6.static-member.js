// 스태틱 멤버(공개/비공개)

// 클래스 기반 언어는 별도의 문법을 통해 스태틱 멤버를 생성해 클래스 자체 멤버인 것처럼 사용
// JS는 스태틱 멤버 표기를 위한 별도의 문법 존재X -> "생성자에 프로퍼티를 추가"함으로써 동일 기능 사용 가능

// ---------------------------------------------------

// 1. 공개 스태틱 멤버
const Person = function () {
	this.name = "lee";
	this.age = 20;
};

// 스태틱 메서드
Person.getName = function () {
	return this.name;
};
// 프로토타입에 일반 메서드를 추가
Person.prototype.getAge = function () {
	return this.age;
};

console.log(Person.getName()); // Person
const person = new Person();
console.log(person.getAge()); // 20

// 이처럼 스태틱 메서드는 this를 사용할때, 유의해야함
// 스태틱 메서드는 생성자 함수 자체에 바인딩되어 있음 -> 생성자 함수를 통해 호출해야함
Person.getName2 = function () {
	return new Person().name;
};
console.log(Person.getName2()); // lee

// 또한, 스태틱 메서드가 인스턴스를 통해 호출되었을 때도 동작하면 편리한 경우도 존재
Person.prototype.getName2 = Person.getName2;
console.log(new Person().getName2()); // lee
// 우선 그냥 덮어씌우겠습니다
Person.getName2 = function () {
	let msg = "My name";

	// 스태틱하지 않은 방식의 경우
	if (this instanceof Person) {
		msg += " is " + this.name;
	}

	console.log(this); // 스태틱하게 접근하면, 결과는 [Function: Person] / 인스턴스를 통해 접근하면 결과는 Person

	return msg;
};

console.log(Person.getName2()); // My name
// ---------------------------------------------------

// 2. 비공개 스태틱 멤버
// 다음과 같은 의미를 가짐
// 2-1) 동일 생성자 함수로 생성된 객체들이 공유하는 멤버
// 2-2) 생성자 외부에서는 접근 불가
// 비공개 스태틱 멤버는 생성자 함수 내부에 변수로 선언하면 됨

// 기본 구조는 다음과 같습니다
const Machine = (function () {
	let counter = 0;

	return function () {
		console.log(++counter);
	};
})();

const m1 = new Machine(); // 1
const m2 = new Machine(); // 2

// 위 예제처럼, 비공개 스태틱 프로퍼티는 개별 객체의 유일성을 식별하는 ID가 될 수 있음
// -> 특권 메서드로 노출시켜 유일 식별자(ID)를 활용해보자

const Machine2 = (function () {
	let counter = 0,
		NewMachine;

	NewMachine = function () {
		counter += 1;
		this.id = counter;
	};

	// 특권 메서드
	NewMachine.prototype.getId = function () {
		return this.id;
	};

	// 생성자 덮어쓰기
	return NewMachine;
})();

const m3 = new Machine2();
const m4 = new Machine2();
console.log(`m3: ${m3.getId()}, m4: ${m4.getId()}`); // m3: 2, m4: 2
