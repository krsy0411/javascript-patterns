// 자바스크립트의 constructor property
// 객체를 생성한 생성자 함수를 참조하는 프로퍼티 : 모든 객체가 어떤 생성자 함수를 통해 만들어졌는지 알려줌(생성방식과 무관하게)

// --------------------------------------------------------------------------------

// 생성자 함수 정의
function Person(name, age) {
	this.name = name;
	this.age = age;
}

// 새로운 객체 생성
const person1 = new Person("Alice", 30);

// 객체의 constructor 프로퍼티 확인
console.log(person1.constructor); // 출력: [Function: Person]

// 객체의 constructor 프로퍼티를 사용하여 새로운 객체 생성
const person2 = new person1.constructor("Bob", 25);
console.log(person2); // 출력: Person { name: 'Bob', age: 25 }

// --------------------------------------------------------------------------------

// 다른 예시
const arr = [1, 2, 3];
console.log(arr.constructor); // 출력: [Function: Array]

// 다른 예시
const obj = {
	key: "name",
	value: "Kim",
};
console.log(obj.constructor); // 출력: [Function: Object]

// --------------------------------------------------------------------------------

// 다른예시: Object 생성자함수는, 생성자 함수의 인자에 따라 다른 생성자 함수를 반환
const obj1 = new Object("name");
console.log(obj1.constructor); // 출력: [Function: String]
const obj2 = new Object(123);
console.log(obj2.constructor); // 출력: [Function: Number]
const obj3 = new Object(true);
console.log(obj3.constructor); // 출력: [Function: Boolean]
