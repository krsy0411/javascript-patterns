// <TDZ : Temporal Dead Zone>
// let,const 키워드로 선언된 변수가 스코프에 진입한 시점부터 초기화되는 시점 전까지 "참조할 수 없는 구간"
// 선언자체는 스코프 진입 시 일어나지만, 사용하려면 초기화가 필요해서 ReferenceError가 발생

function tdzExample() {
	// console.log(value); // Cannot access 'value' before initialization
	// 에러 발생하면서 실행 중단됨
	let value = 10;
	console.log(value);
}
tdzExample();

function tdzExample2() {
	// console.log(value); // Cannot access 'value' before initialization
	// 에러 발생하면서 실행 중단됨

	// <변수 선언>
	let value;
	console.log(value); // undefined

	// <변수값 초기화>
	value = 10;
	console.log(value); // 10
}
tdzExample2();

// --------------------------------------------------------------------------------------------------

// 그렇다면, var 키워드로 선언된 변수는 어떨까?
// var키워드로 선언된 변수는 TDZ의 영향을 안 받음 : 선언과 초기화가 동시에 일어나기 때문 -> 호이스팅 발생
console.log(a); // undefined(호이스팅으로 인해 접근 가능)
var a = 10;
console.log(a); // 10

// --------------------------------------------------------------------------------------------------

// 그렇다면, "var 키워드로 선언된 변수"와 "함수 선언문" 모두 호이스팅이 발생하는데, 왜 변수는 undefined이고 함수는 정상적으로 호출할 수 있을까?
// Answer) "var키워드 변수"는 초기화(할당) 단계가 별도로 진행되기 때문이며(선언은 호이스팅이 이뤄진것), "함수 선언문"은 선언과 정의가 함께 호이스팅되어 함수가 자체가 미리 메모리에 저장되기 때문
