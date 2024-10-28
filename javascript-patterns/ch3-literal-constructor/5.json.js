// JSON : 자바스크립트 객체 표기법(JavaScript Object Notation)의 줄임말이자, "데이터 전송 형식"의 일종
// JSON은 그저 배열과 객체 리터럴 표기법의 조합일 뿐

// --------------------------------------------------------------------------------

// 1) JSON 다루기
// JSON.parse() : JSON 문자열을 객체로 변환 (ES5+부터 언어에 포함되며, 최신 브라우저의 JS엔진에 내장된 메서드)
let jstr = '{"mykey": "my value"}';
let data = JSON.parse(jstr);
console.log(data); // { mykey: 'my value' }
console.log(data.mykey); // "my value"

// JSON.stringify() : 객체를 JSON 문자열로 변환
let dog = {
	name: "Fido",
	dob: new Date(),
	legs: [1, 2, 3, 4],
};

let jsonstr = JSON.stringify(dog);
console.log(jsonstr); // "{"name":"Fido","dob":"2021-07-19T07:41:30.000Z","legs":[1,2,3,4]}"
