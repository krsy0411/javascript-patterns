// 객체 상수
// 이 방법은 웬만한 경우엔 "명명 규칙 + const"로만 처리하면 되기에 과한 방법
// 그래도 한 공간에 묶어서 놔둔다는 점에서는 1번 정도 정리하고 가면 좋을듯

const constant = function () {
	const constants = {},
		ownProp = Object.prototype.hasOwnProperty,
		allowed = {
			string: 1,
			number: 1,
			boolean: 1,
		},
		// prefix를 통해, 변수명 중복을 방지
		prefix = (Math.random() + "_").slice(2);

	return {
		set: function (name, value) {
			// 우선, 이미 정의되어있는 변수 명인지 확인
			if (this.isDefined(name)) {
				return false;
			}
			// value의 타입이 허용된 타입인지 확인
			if (!ownProp.call(allowed, typeof value)) {
				return false;
			}

			// 타입과 변수명 모두 허용된다면, 객체에 변수명 & 값 추가
			constants[prefix + name] = value;
			return true;
		},
		get: function (name) {
			// 우선, 이미 정의되어있는 변수 명인지 확인
			if (this.isDefined(name)) {
				// 있으면, 해당 변수의 값을 반환
				return constants[prefix + name];
			}
			return null;
		},
		isDefined: function (name) {
			// prefix + name이 constants 변수에 존재하는지 확인
			return ownProp.call(constants, prefix + name);
		},
	};
};
