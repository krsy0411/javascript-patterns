// 프로토타입을 활용한 상속
// 객체가 객체를 상속받음

// ---------------------------------

// 상속을 구현하는 함수
function object(o) {
	function F() {}
	F.prototype = o;

	return new F();
}

const parent = {
	name: "parent",
};

const child = object(parent);
console.log(child.name); // parent

// 그러나 반드시 객체 리터럴로 부모를 생성해야하는건 X -> 생성자 함수로도 부모 생성 가능
// 다만, 이 경우엔 부모 객체 자신의 프로퍼티 & 생성자 함수의 프로토타입에 포함된 프로퍼티가 모두 상속됨
function Person() {
	this.name = "LEE";
}
Person.prototype.getName = function () {
	return this.name;
};

const me = new Person();
const kid = object(me);
console.log(kid.getName()); // LEE

// 생성자 함수의 프로토타입 객체만 상속받을 수 있도록(즉, 부모 객체의 프로퍼티는 상속받지 않도록) 수정해보자
const kid_upgrade = object(Person.prototype);
console.log(typeof kid_upgrade.getName); // function : 해당 메서드가 prototype에 존재하므로
console.log(typeof kid_upgrade.name); // undefined : prototype만 상속되었으므로
