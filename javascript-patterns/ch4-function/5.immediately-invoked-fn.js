// "IIFE (Immediately Invoked Function Expression)" : "즉시 실행 함수 표현식" : "즉시 실행 함수 패턴"
// 함수표현식(기명 or 무명)을 생성한 직후 실행

// 장점1 : 유효범위 샌드박스를 제공
// 초기화 단계에서 사용할 임시 변수들에 대해서 전역변수로 생성하지 않고, 즉시 실행 함수 내에서만 사용할 수 있도록 제한하는 경우
// 내부 함수 & 변수가 외부 스코프에 영향X -> 전역 네임스페이스 오염 방지
(function () {
	console.log("Executed!"); // Output: Executed!
})();

// --------------------------------------------------------------------------------
// 매개변수도 전달 가능 : 다만, 일반적으로 많이 전달하지 않음
(function (global) {
	console.log(global); // Output: {}
})(this);
console.log(global); // Output: Object[global] {...}

// --------------------------------------------------------------------------------
// 값을 반환하거나 반환값을 변수에 할당 가능
const result1 = (function () {
	return 2 + 2;
})();
console.log(result1); // Output: 4

// --------------------------------------------------------------------------------
// 장점2 : 모듈 패턴 구현
// 비공개 변수 & 함수를 보호하고, 필요한 기능만 외부에 노출시키게끔 가능

// 특정 데이터를 비공개 상태로 저장하고, 반환되는 내부 함수에서만 접근 가능하도록 함 - "클로저"
const getResult = (function () {
	const res = 2 + 2;
	// "클로저" : 내부에서는 res변수 접근 가능
	return function () {
		return res;
	};
})();

// 객체 프로퍼티를 정의하는 경우
const moduleObj = {
	message: (function () {
		const who = "me",
			what = "call";

		return `${who} ${what}`;
	})(),
	getMsg: function () {
		return this.message;
	},
};
console.log(moduleObj.message);
console.log(moduleObj.getMsg());
