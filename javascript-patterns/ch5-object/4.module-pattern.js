// 모듈 패턴 : 네임스페이스 패턴 + 즉시 실행 함수 + 비공개 멤버 & 특권 멤버 + 의존 관계 선언
// JS는 패키지를 위한 별도 문법 X -> 모듈 패턴을 통해, 개별적인 코드를 느슨하게 결합 가능

var MY_APP = MY_APP || {};

MY_APP.namespace = function (ns_string) {
	let parts = ns_string.split("."),
		parent = MY_APP,
		i = 0;

	// 처음에 중복되는 전역 객체명은 제거(예: MY_APP)
	if (parts[0] === "MY_APP") {
		parts = parts.slice(1);
	}

	// 프로퍼티가 정의되지 않은 경우, 생성
	for (; i < parts.length; i++) {
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}
		// 다음 하위 프로퍼티를 넣어주기 위해 업데이트
		parent = parent[parts[i]];
	}

	return parent;
};

// 1. 네임스페이스 설정 : 해당 프로퍼티가 존재하는지 체크하고, 없으면 생서
MY_APP.namespace("MY_APP.utilities.array");

// 2. 모듈 설정
MY_APP.utilities.array = (function () {
	// 비공개 프로퍼티
	let array_string = "[object Array]",
		ops = Object.prototype.toString;

	// 비공개 메서드
	let isArray = function (a) {
		return ops.call(a) === array_string;
	};

	// 공개 API
	return {
		isArray: isArray,
		// 필요하면 추가하면 됨
	};
})();

// ----------------------------------------------------------------

// 생성자를 생성하는 모듈
MY_APP.namespace("MY_APP.utilities.Array");
MY_APP.utilities.Array = (function () {
	// 필요시, 의존 관계 선언
	let uobj = MY_APP.utilities.object,
		ulang = MY_APP.utilities.lang;

	// 비공개 프로퍼티
	let Constr;

	// 공개 API - 생성자
	Constr = function (o) {
		this.elements = this.toArray(o);
	};

	// 공개 API - 프로토타입
	Constr.prototype = {
		constructor: MY_APP.utilities.Array,
		version: "2.0",
		toArray: function (obj) {
			const a = [];
			for (let i = 0, len = obj.length; i < len; i++) {
				a[i] = obj[i];
			}
			return a;
		},
		// 필요하면 추가
	};

	// 생성자 반환 : 함수를 반환해 생성자를 생성
	return Constr;
})();

// 생성자 함수를 통해 인스턴스 생성
const arr = new MY_APP.utilities.Array([1, 2, 3]);
// 결과들 체크
console.log(arr); // { elements: [1, 2, 3] }
console.log(arr.elements); // [1, 2, 3]
console.log(arr.version); // 2.0
console.log(arr.prototype); // undefined : 인스턴스 객체에는 프로포타입 속성X(생성자 함수의 프로토타입 객체를 접근해야지)
console.log(Object.getPrototypeOf(arr)); // { constructor: {}, version: "2.0", toArray: [Function: toArray] }

// ----------------------------------------------------------------

// 모듈에 전역 변수 가져오기 : 즉시 실행 함수에 인자(전역변수 참조 or 전역 객체 자체)를 전달 -> 즉시 실행 함수 내에서 지역 변수로 사용 가능 -> 탐색 작업 수월
MY_APP.namespace("MY_APP.utilities.module");
MY_APP.utilities.module = (function (app, global) {
	// 전역 객체 참조
	// 전역 애플리케이션 네임스페이스 객체에 대한 참조

	console.log(app === MY_APP); // true
	console.log(global); // {}
})(MY_APP, this);
