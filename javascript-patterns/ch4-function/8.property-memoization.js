// (함수 = 객체) -> 프로퍼티 소유 가능
// 사실, 함수는 처음(생성 당시)부터 프로퍼티 & 메서드를 보유 : ex. length property

// "메모이제이션 패턴"이란?
// 언제든지 함수에 "사용자 정의 프로퍼티" 추가 가능 : "프로퍼티를 추가해 결과(반환 값)를 캐싱하면, 다음 호출 시점에 복잡한 연산을 반복하지 않아도 되는 활용 방법"
const myFunc = function (param) {
	// param : 1개의 매개변수 & 문자열과 같은 원시 데이터 타입
	if (!myFunc.cache[param]) {
		let result = {};
		// 비용이 드는 수행 처리들 수행...

		myFunc.cache[param] = result;
	}

	return myFunc.cache[param];
};
// 캐시 저장공간
myFunc.cache = {};

// --------------------------------------------------------------------------------
// 만약, 매개변수가 여러 개인 함수라면 -> 직렬화해서 해결
const myFuncAdvanced = function () {
	// 1. arguments : 함수에 전달된 모든 인수를 담고 있는 유사배열 객체
	// 2. Array.prototype.slice : 배열의 일부분을 복사해 새로운 배열을 반환하는 메서드 : 유사 배열 객체를 실제 배열로 변환
	// 3. call : 함수를 호출하면서 this값을 arguments로 설정 -> arguments를 배열로 변환
	let cacheKey = JSON.stringify(Array.prototype.slice.call(arguments));

	if (!myFuncAdvanced.cache[cacheKey]) {
		let result = {};
		// 비용이 드는 수행 처리들 수행...

		myFuncAdvanced.cache[cacheKey] = result;
	}

	return myFuncAdvanced.cache[cacheKey];
};
// 캐시 저장공간
myFuncAdvanced.cache = {};

// 주의사항 : 직렬화시, 객체를 식별할 수 X
// 이게 뭔 말이지? : 객체의 키가 동일한 경우 -> 직렬화되었을때 키 문자열이 동일해지므로, 동일 항목을 공유하게 됨
// 해결책 : 각 객체에 고유 id값을 부여해서 사용
