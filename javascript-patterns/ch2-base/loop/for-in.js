// 자바스크립트에선 배열도 객체이긴 하지만, 웬만하면 객체로만 for-in문을 사용하도록 하자 : 배열 객체에 사용자 정의 기능을 추가하면 논리적 오류가 발생할 수 있음
const arr = [1, 2, 3];
// 배열에 사용자 정의 속성 추가
arr.customProperty = "Hello";
// for-in 문을 사용하여 배열을 순회
for (let index in arr) {
	console.log(index, arr[index]);
	// 결과값은 다음과 같이 문자열도 나오게 됨 : 배열의 인덱스뿐만 아니라 객체에 추가된 모든 열거 가능한 속성까지 순회하기 때문
	// 0 1
	// 1 2
	// 2 3
	// customProperty Hello
}

// --------------------------------------------------------------------------------------------

let man = {
	hands: 2,
	legs: 2,
	heads: 1,
	eyes: 2,
};
// 다음과 같이 프로토타입 체인을 따라 객체에 메서드를 추가했다고 생각해보자
if (typeof Object.prototype.clone === "undefined") {
	// 프로토타입 체인의 변경 사항은 실시간으로 반영됨 -> 자동적으로 모든 객체가 해당 메서드(clone)을 사용 가능하게 됨
	Object.prototype.clone = function () {};
}
for (let i in man) {
	// 이렇게 프로토타입 프로퍼티를 걸러내야함
	if (man.hasOwnProperty(i)) {
		console.log(i, ": ", man[i]);
	}
	// 또는 이렇게도 필터링 가능 : 이 경우엔 man객체 내 hasOwnProperty 메서드를 재정의해서 "오버라이딩"시키는 경우에도 필터링이 가능하다는 장점 존재
	if (Object.prototype.hasOwnProperty.call(man, i)) {
		console.log(i, ": ", man[i]);
	}
	// 함수 본문...
}

// 참고 : 오버라이딩에 대한 방어도 된다는 건 무슨 소리일까?
