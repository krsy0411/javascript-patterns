// Error, SyntaxError, TypeError, RefrerenceError 등 여러 에러 생성자가 내장됨 : throw문과 함께 사용(Ex. throw new Error('error'))
// 에러 객체들은 다음 두 가지 프로퍼티를 가짐(물론 여러 프로퍼티들이 있으나, 이 두 가지가 브라우저마다 다 존재하는 속성)
// 1. name : 객체를 생성한 생성자 함수의 name 프로퍼티
// 2. message : 객체를 생성할때 생성자에 전달된 문자열

// 에러 객체라는게 "꼭 에러 생성자를 통해 객체를 생성해야하는 것은 아님". name & message 외에 다른 임의의 프로퍼티를 가질 수도 있음
try {
	throw {
		name: "MyErrorType", // 사용자 정의 에러 타입
		message: "oops",
		extra: "This was rather embarrassing",
		remedy: function () {
			return console.log("Remedy function");
		}, // 에러 처리기
	};
} catch (e) {
	console.log(e.message); // "oops"

	e.remedy(); // "Remedy function"
}
