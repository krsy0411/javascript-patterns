// Object.prototype.hasOwnProperty.call() 메서드에 대해 학습합니다.

// Object.prototype.hasOwnProperty.call(object, property) 메서드는 객체가 특정 속성을 직접 소유하고 있는지 확인할 때 사용됩니다. 이 메서드는 객체가 hasOwnProperty 메서드를 오버라이드한 경우에도 안전하게 사용할 수 있습니다.
// 인자1 - object : 속성을 확인할 객체
// 인자2 - property : 확인할 속성 이름(문자열)

// 기본 사용법
const obj1 = {
	ownProp: "I am an own property",
};

console.log(Object.prototype.hasOwnProperty.call(obj1, "ownProp")); // true
console.log(Object.prototype.hasOwnProperty.call(obj1, "toString")); // false (상속된 속성)

// Object.prototype.hasOwnProperty.call() 사용
const obj3 = {
	ownProp: "I am an own property",
	hasOwnProperty: function () {
		return false; // hasOwnProperty 메서드를 오버라이드
	},
};

for (let key in obj3) {
	// 이처럼 해당 메서드는 객체가 hasOwnProperty 메서드를 오버라이드한 경우에도 안전하게 사용할 수 있음
	if (Object.prototype.hasOwnProperty.call(obj3, key)) {
		console.log(key); // 출력: ownProp
	}
}
