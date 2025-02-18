// 프로퍼티 복사를 사용한 상속 패턴 : 프로토타입과 상관없는, "객체 & 프로퍼티"만을 다루는 상속(코드 재사용) 패턴

// 1. 얕은 복사
function extend(parent, child) {
	let i,
		copiedChild = child || {};

	// 부모의 멤버들에 대해 루프를 돌면서 자식에 복사
	for (i in parent) {
		if (parent.hasOwnProperty(i)) {
			copiedChild[i] = parent[i];
		}
	}

	return copiedChild;
}
const dad = { name: "LEE" };
const kid = extend(dad);
console.log(kid.name); // LEE

// 그러나, 자바스크립트에서 객체는 참조만 전달되기 때문에, 객체와 배열을 다룰 때는 예상치 못한 결과가 나올 수 있음
const dad2 = {
	age: 50,
	counts: [1, 2, 3],
	reads: {
		paper: true,
	},
};
const kid2 = extend(dad2);
kid2.counts.push(4);
console.log(dad2.counts); // [1, 2, 3, 4]
console.log(kid2.counts === dad2.counts); // true

// 이처럼, 분명 다른 객체로 다뤄져야하지만 객체들은 실제로는 같은 데이터를 참조하고 있음

// 2. 깊은 복사
// 이럴때는 깊은 복사를 사용해야함
function deepCopy(parent, child) {
	let i,
		toStr = Object.prototype.toString,
		astr = "[object Array]",
		copiedChild = child || {};

	for (i in parent) {
		if (parent.hasOwnProperty(i)) {
			// 객체 타입이면, 객체이거나 배열
			if (typeof parent[i] === "object") {
				// 배열이면 빈 배열을, 객체면 빈 객체를 생성
				copiedChild[i] = toStr.call(parent[i]) === astr ? [] : {};
				// 배열 및 객체의 내부 프로퍼티에 대해 재귀적으로 호출
				deepCopy(parent[i], copiedChild[i]);
			} else {
				// 객체 타입이 아니면, 그냥 복사
				copiedChild[i] = parent[i];
			}
		}
	}

	// 최종적으로는 복사된 객체를 반환
	return copiedChild;
}
const dad3 = {
	counts: [1, 2, 3],
	reads: {
		paper: true,
	},
};
const kid3 = deepCopy(dad3);
kid3.counts.push(4);
console.log(dad3.counts); // [1, 2, 3]
console.log(kid3.counts === dad3.counts); // false
