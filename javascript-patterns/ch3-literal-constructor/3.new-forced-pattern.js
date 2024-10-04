// ES5부터는 "strict mode"모드 사용시, 생성자 함수 내 this는 전역 객체를 가리키지 않음
function Waffle() {
	this.tastes = "yummy";
}

let good_morning = new Waffle();
console.log(typeof good_morning); // object
console.log(good_morning.tastes); // yummy

let good_evening = Waffle();
console.log(typeof good_evening); // undefined -> new를 빼먹고 호출한 경우
console.log(global.tastes); // yummy -> 전역 객체에 tastes 프로퍼티가 추가됨(현재는 nodejs환경이라 global : 브라우저 환경이면 window)
// console.log(good_evening.tastes); // TypeError: Cannot read properties of undefined (reading 'tastes')

// 참고
// ES6부터는 모듈 시스템(import, export)를 사용하면 자동으로 strict mode가 적용됨

// --------------------------------------------------------------------------------

// 해결방식은 다음과 같다
// 1. 명명 규칙 : 생성자 함수명의 첫 글자를 대문자로 : 강제하는건 아님
// 2. that 사용 : 생성자가 항상 생성자로 동작하도록 해주는 패턴
// 예시) 명명규칙을 지키면서 that을 사용해서 항상 생성자로 동작하도록 하기
function Example2() {
	let that = {};
	that.tastes = "yummy";
	return that;
}

let good_morning2 = new Example2();
let good_morning2_1 = Example2();
console.log(typeof good_morning2); // object
console.log(good_morning2.tastes); // yummy
console.log(typeof good_morning2_1); // object
console.log(good_morning2_1.tastes); // yummy

// 다만, 치명적 단점이 존재 : 프로토타입과의 연결고리가 끊어짐 -> 프로토타입에 멤버를 추가해도 객체에서 사용이 불가함
Example2.prototype.tastes2 = "yummy2";
// 프로토타입을 통해 상속된 프로퍼티는 뒤늦게 추가되어도 인스턴스에서 사용 가능함
console.log(good_morning2.tastes2); // undefined -> 다음처럼 프로토타입 체이닝이 끊어짐

// 3. 스스로를 호출하는 생성자
// 이제, 명명규칙을 지키면서 항상 생성자로서 동작하도록 강제하면서도, 인스턴스 객체에서 프로토타입의 프로퍼티들을 사용가능하도록 해보자
function WaffleUpgrade() {
	// 핵심 : 생성자 함수가 new 없이 호출되었을때 -> this가 전역객체를 가리키므로(if not strict mode) -> 생성자 함수가 호출되었을때 this가 생성된 인스턴스를 가리키도록 강제함
	if (!(this instanceof WaffleUpgrade)) {
		return new WaffleUpgrade();
	}
	this.tastes = "yummy";
	console.log("this : ", this);
}
WaffleUpgrade.prototype.isUpgraded = true; // 프로토타입에 프로퍼티 추가
let upgraded_waffle = new WaffleUpgrade(),
	second_upgraded_waffle = WaffleUpgrade();
console.log(upgraded_waffle.tastes); // yummy
console.log(upgraded_waffle.isUpgraded); // true
console.log(second_upgraded_waffle.tastes); // yummy
console.log(second_upgraded_waffle.isUpgraded); // true
