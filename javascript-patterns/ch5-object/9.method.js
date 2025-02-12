// method() 메서드
// JS를 좀 더 클래스 기반의 방식으로 변경한다면 사용 가능한 패턴
// 그러나, 그냥 1번 정도 보고가면 좋을 정도지, 굳이 사용할 필요는 없음

// 우선 범용 함수를 구현해보자
if (typeof Function.prototype.method !== "function") {
	Function.prototype.method = function (name, implementation) {
		this.prototype[name] = implementation;

		// 여기서 this는 생성자 함수를 가리킴
		return this;
	};
}

// 다음과 같이 method()라는 문법적 설탕을 이용해 클래스를 정의할 수 있음
const Person = function (name) {
	this.name = name;
}
	.method("getName", function () {
		return this.name;
	})
	.method("setName", function (name) {
		this.name = name;
	});
