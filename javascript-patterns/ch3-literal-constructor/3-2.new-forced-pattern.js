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
// 하지만, 언제나 ES6+ & strict mode환경임을 보장할 수 없으므로, new 강제 패턴을 학습할 필요O

// --------------------------------------------------------------------------------

// 해결방식은 다음과 같다
// 1. 명명 규칙 : 생성자 함수명의 첫 글자를 대문자로 : 강제하는건 아님
// 예시) 대문자를 사용해서, 일반함수와 구분하기
function lee() {
	return "LEE";
}
function Lee() {
	this.name = "LEE";
}

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

// 간단한 경우엔, 객체 리터럴을 사용해도 ok
function Test() {
	return {
		tastes: "yummy",
	};
}

// 다만, 치명적 단점이 존재 : 프로토타입과의 연결고리가 끊어짐 -> 프로토타입에 멤버를 추가해도 객체에서 사용이 불가함
// 이유 : 생성자 함수에서 this가 암묵적으로 프로토타입 상속을 받기 때문이다(명시적으로 직접 반환하는 객체는 이러한 기능은 없음)
Example2.prototype.tastes2 = "yummy2"; // 다음과 같이 프로토타입 상속을 추가해보자
console.log(good_morning2.tastes2); // undefined -> 다음처럼 프로토타입 체이닝이 끊어짐

// 3. 스스로를 호출하는 생성자
// 이제, 명명규칙을 지키면서 항상 생성자로서 동작하도록 강제하면서도, 인스턴스 객체에서 프로토타입의 프로퍼티들을 사용가능하도록 해보자
function WaffleUpgrade() {
	// 핵심 : 생성자 함수가 new 없이 호출되었을때 -> this가 전역객체를 가리키므로(if not strict mode) -> 생성자 함수가 호출되었을때 this가 생성된 인스턴스를 가리키도록 강제함
	if (!(this instanceof WaffleUpgrade)) {
		return new WaffleUpgrade(); // 재귀호출
	}
	this.tastes = "yummy";
	console.log("this : ", this);
}
WaffleUpgrade.prototype.isUpgraded = true; // 프로토타입에 프로퍼티 추가

// 인스턴스 생성 : new 쓴 버전 & 안 쓴 버전
let upgraded_waffle = new WaffleUpgrade(),
	second_upgraded_waffle = WaffleUpgrade();

console.log(upgraded_waffle.tastes); // yummy
// that객체 반환 버전과는 달리, 프로토타입 상속도 잘 이루어짐을 확인 가능
console.log(upgraded_waffle.isUpgraded); // true
console.log(second_upgraded_waffle.tastes); // yummy
console.log(second_upgraded_waffle.isUpgraded); // true
