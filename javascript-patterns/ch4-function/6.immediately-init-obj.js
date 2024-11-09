// '즉시 실행 함수'와 비슷한, "즉시 객체 초기화 패턴" : 전역 유효범위가 난잡해지지 않도록 보호하는 또 다른 방법
// 핵심 : 객체가 생성된 즉시, init() 메서드를 호출해 객체를 사용

// 장점 : 단 1번의 초기화 작업을 실행하는 동안, 전역 네임스페이스를 오염시키지 않음
({
	maxWidth: 600,
	maxHeight: 400,

	giveMeMax: function () {
		return this.maxWidth + "x" + this.maxHeight;
	},
	init: function () {
		console.log(this.giveMeMax());
		// 다른 초기화 작업들
	},
}).init(); // Output: 600x400

// --------------------------------------------------------------------------------
// 의문) 함수도 객체인데, 그럼 여기에도 '즉시 실행 함수' 패턴을 사용하면 어떠려나?
// 다음과 같은 객체면 사용할 패턴일지도..?
const myModule = (function () {
	let privateVar = "I am private";
	function privateFunc() {
		console.log(privateVar);
	}
	return {
		publicMethod: function () {
			privateFunc();
		},
		init: function () {
			console.log("Module initialized");
			this.publicMethod();
		},
	};
})();
myModule.init(); // Output: Module initialized, I am private
