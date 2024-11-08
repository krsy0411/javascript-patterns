// 함수를 동적으로 정의하고 변수에 할당해줄 수 있음
// 만약 이미 다른 함수를 가지고 있는 변수에 할당하면, 새로운 함수가 이전 함수를 덮어씀 : 이전 함수를 가리키는 포인터가 새로운 함수를 가리키도록 재사용하는 것
// 이걸 함수 본문 내에서도 가능 : 자기 자신을 새로운 구현으로 덮어쓰고 재정의하는 것!

// 예시
let selfDefineFn = function () {
	// 초기화 준비 작업 : 1번만 수행
	console.log("Initial function definition");

	// 자기 자신을 새로운 구현으로 덮어씀
	selfDefineFn = function () {
		console.log("Re-defined function definition");
	};
};

// 첫 번째 호출: 초기 정의된 함수가 실행됨
selfDefineFn(); // Output: Initial function definition
// 두 번째 호출: 재정의된 함수가 실행됨
selfDefineFn(); // Output: Re-defined function definition

// --------------------------------------------------------------------------------

// 왜 "자기 자신을 정의하는 함수"를 사용할까? : 함수가 초기화 준비 작업을 딱 1번만 수행하는 경우엔 유용
// 불필요한 작업을 반복하지 않음으로써 애플리케이션 성능 향상 도움 : "재정의 함수에서의 작업량이 줄기 때문"
// 참고) "게으른 함수 선언(lazy function definition) : 함수 최초 사용 전까진 함수를 완전히 정의하지 않다가, 호출된 이후엔 더 적게 일하기 때문"

// 그렇다면 "단점"은 무엇일까?
// 1. 우선, 가독성이 낮음.
// 2. 함수 재정의된 전 후의 동작을 디버깅하기 어려울 수 있음 : 다른 곳에서 호출되어도, 같은 함수 내에서 처리된거니까
// 3. 함수 재정의된 시점을 잘못 이해하면, 예측값과 다른 값이 나옴
