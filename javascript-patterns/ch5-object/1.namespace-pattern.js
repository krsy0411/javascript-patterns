// 네임스페이스 패턴
// 전역 변수 오염 방지 + 코드 구조 체계적으로 관리하기 위함

// 장점
// 1, 전역 병수 오염 방지
// 2. 코드 구조화

// 단점
// 1. 코드량 증가 : 네임스페이스 객체 생성, 함수, 변수 추가 등의 작업이 필요
// 2. 이름 중첩 + 길어짐 -> 검색 작업 불편

// --------------------------------------------

// 네임스페이스 객체 생성
var MyNamespace = MyNamespace || {};

// 네임스페이스에 함수와 변수 추가
MyNamespace.myFunction = function () {
	console.log("1 : 안녕하세요");
};

MyNamespace.myVariable = "1 : myVariable";

// 다음과 같이, 네임스페이스 객체를 통해 함수와 변수에 접근
MyNamespace.myFunction();
console.log(MyNamespace.myVariable);

// --------------------------------------------

// 네임스페이스에 추가하려는 프로퍼티가 이미 존재하거나, 내용을 덮어쓰게 될 수도 있음
// 따라서, 프로퍼티 추가 전에 이미 존재하는지 여부를 확인하는게 좋음

// 범용 네임스페이스 함수
MyNamespace.namespace = function (ns_string) {
	let parts = ns_string.split("."),
		parent = MyNamespace;

	// 처음에 중복되는 전역 객체명은 제거
	if (parts[0] === "MyNamespace") {
		parts = parts.slice(1);
	}

	for (let i = 0; i < parts.length; i++) {
		// 프로퍼티가 존재하지 않으면 생성
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}

		// 계속 해당 하위 객체를 참조할 수 있도록 parent를 업데이트
		parent = parent[parts[i]];
	}

	return parent;
};

// 범용 네임스페이스 함수 예제
MyNamespace.namespace("MyNamespace.modules.module2");
console.log(MyNamespace);
/* 결과는 다음과 같습니다
    {
        myFunction: [Function (anonymous)],
        myVariable: '1 : myVariable',
        namespace: [Function (anonymous)],
        modules: { module2: {} }
    }   
*/
