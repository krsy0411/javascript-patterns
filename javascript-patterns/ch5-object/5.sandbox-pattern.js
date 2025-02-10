// 샌드박스 패턴
// 모듈화 & 네임스페이스 패턴을 통해, 코드를 격리하고 보호하는 방법
// 전역 네임스페이스 오염을 방지하고, 모듈 간 의존성을 명확히 하고, 코드 재사용성을 높이는 방법

// 기본 구조 : Sandbox 생성자 함수, 모듈 정의, Sandbox 인스턴스 생성

// ----------------------------------------

// Sandbox 생성자 함수
function Sandbox() {
	// 필요한 모듈을 주입받아 초기화
	const args = Array.prototype.slice.call(arguments); // 인자들을 배열로 변환
	const callback = args.pop(); // 인자의 마지막 함수(콜백 함수)
	const modules = args[0] && typeof args[0] === "string" ? args : args[0];

	// 필요한 모듈을 주입
	if (!(this instanceof Sandbox)) {
		return new Sandbox(modules, callback);
	}

	// 사용할 모듈을 저장할 객체
	this.modules = {};

	// 모듈 초기화
	if (!modules || modules === "*") {
		modules = [];
		for (let module in Sandbox.modules) {
			if (Sandbox.modules.hasOwnProperty(module)) {
				modules.push(module);
			}
		}
	}

	// 모듈 주입
	for (let i = 0; i < modules.length; i++) {
		Sandbox.modules[modules[i]](this);
	}

	// 콜백 실행
	callback(this);
}

// 모듈 정의
Sandbox.modules = {};

// 예제 모듈 추가
Sandbox.modules.dom = function (box) {
	box.getElement = function (id) {
		return document.getElementById(id);
	};
	box.getElements = function (tag) {
		return document.getElementsByTagName(tag);
	};
};

Sandbox.modules.event = function (box) {
	box.addEvent = function (el, type, fn) {
		if (el.addEventListener) {
			el.addEventListener(type, fn, false);
		} else if (el.attachEvent) {
			el.attachEvent("on" + type, fn);
		} else {
			el["on" + type] = fn;
		}
	};
	box.removeEvent = function (el, type, fn) {
		if (el.removeEventListener) {
			el.removeEventListener(type, fn, false);
		} else if (el.detachEvent) {
			el.detachEvent("on" + type, fn);
		} else {
			el["on" + type] = null;
		}
	};
};

// Sandbox 인스턴스 생성 및 사용
Sandbox(["dom", "event"], function (box) {
	const element = box.getElement("myElement");
	box.addEvent(element, "click", function () {
		alert("Element clicked!");
	});
});
