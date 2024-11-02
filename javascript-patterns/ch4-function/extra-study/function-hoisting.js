// 호이스팅 in 함수

// 1. 함수 선언문 : 호이스팅에 의해 스코프의 최상단으로 올라가므로, 정의된 위치보다 앞에서 호출가능
declareFn();
function declareFn() {
	console.log("Hello");
}

// 2. 함수 표현식 : 호이스팅에 의한 스코프의 최상단으로의 이동이 발생하지 않으므로, 정의된 위치보다 앞에서 호출 불가능
expressionFn(); // Cannot access 'expressionFn' before initialization
const expressionFn = function () {
	console.log("Hello");
};
