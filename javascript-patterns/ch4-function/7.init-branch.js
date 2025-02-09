// 초기화 시점의 분기(최적화 패턴)

// 특정 조건이 프로그램 생명주기 동안 변경되지 않는 게 확실한 경우, 조건을 1번만 확인하는 것이 바람직할 때가 있음
// 예시 : 브라우저 탐지(기능 탐지)
const utils = {
	addListener: null,
	removeListener: null,
};

// 초기화 작업 : 브라우저 조건에 맞게끔 이벤트 리스너를 정의
if (window.addEventListener) {
	utils.addListener = function (el, type, fn) {
		el.addEventListener(type, fn, false);
	};
	utils.removeListener = function (el, type, fn) {
		el.removeEventListener(type, fn, false);
	};
} else if (document.attachEvent) {
	// IE
	utils.addListener = function (el, type, fn) {
		el.attachEvent("on" + type, fn);
	};
	utils.removeListener = function (el, type, fn) {
		el.detachEvent("on" + type, fn);
	};
} else {
	// 둘 다 지원하지 않는 경우(구형 브라우저)
	utils.addListener = function (el, type, fn) {
		el["on" + type] = fn;
	};
	utils.removeListener = function (el, type) {
		el["on" + type] = null;
	};
}
