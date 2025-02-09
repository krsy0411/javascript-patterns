// 객체 인자를 JSON 문자열로 직렬화해 키로 사용하는 경우, "순환참조"가 문제가 될 수 있음
// 순환참조란? : 객체가 직간접적으로 자기 자신을 참조하는 경우
// 순환참조가 문제가 되는 이유 : JSON.stringify() 메서드는 순환참조를 감지하지 못함

const obj = {};
obj.self = obj; // obj가 자기 자신을 참조

console.log(obj); // { self: [Circular] }

// 다음과 같이 JSON.stringify로 직렬화하려고 하면 오류가 발생함
try {
	JSON.stringify(obj);
} catch (error) {
	console.error(error.message); // "Converting circular structure to JSON"
}

// --------------------------------------------------------------------------------

// import/export를 위한 모듈 시스템에서의 순환 참조 문제도 있더라구요.
// "A.js -> B.js -> C.js -> A.js", "A.js -> B.js -> A.js"의 형태로 각각의 파일들을 참조 중인 경우, 순환 참조가 발생

// 이럴 때, 어떻게 해결해야할까?

// 1. 의존성 재구성 : 공통 모듈을 참조하도록 변경
// 2. 모듈 분리 : 모듈들의 공통 기능을 별도 모듈로 분리
// 3. 동적 import : 모듈을 런타임에 임포트(CommonJS의 require()와 유사)
