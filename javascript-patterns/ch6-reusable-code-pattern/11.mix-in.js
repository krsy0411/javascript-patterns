// 믹스-인 : 프로퍼티 복사 업그레이드 버전
// 하나의 객체를 복사X, 여러 객체에서 복사해온 것을 한 객체 안에 섞어넣는 방법

// 구현 방법 : 함수에 인자로 전달된 객체들을 받아 루프를 돌면서 모든 프로퍼티를 복사
// 다만, 해당 함수는 얕은 복사를 진행

// 얕은 복사는 장단점이 있다.
// 만약 단지 여러 기존 객체들을 한 곳에서 핸들링하고 싶은거라면, 얕은 복사가 옳다
// 다만, 여러 객체들을 한 곳에 모으되 아예 기존 객체들과 분리할 생각이라면 깊은 복사가 필요하다
function mix(...arguments) {
	let arg,
		prop,
		child = {};

	for (arg = 0; arg < arguments.length; arg++) {
		for (prop in arguments[arg]) {
			if (arguments[arg].hasOwnProperty(prop)) {
				child[prop] = arguments[arg][prop];
			}
		}
	}

	return child;
}
