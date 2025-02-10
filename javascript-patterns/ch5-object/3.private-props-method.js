// 비공개 프로퍼티 & 메서드
// 자바스크립트에는 "private, protected, public" 같은 접근 제어자가 없음 -> 즉, 객체읨 모든 멤버는 public(공개 상태)

// ----------------------------------------------------------------

// 비공개(Private) 멤버 : 클로저를 이용해 구현 가능. 객체 공개 메서드를 통해, 메서드 내에서 비공개 변수에 접근.
function Person() {
	// 비공개 프로퍼티
	const name = "LEE";
	const age = 25;

	// 공개 메서드(=특권 메서드)
	this.getName = function () {
		// 주의사항 : this.name을 반환하면, name 프로퍼티가 없기 때문에(비공개 프로퍼티니까) undefined 반환
		return name;
	};
}

const person = new Person();
console.log(person.name); // undefined
console.log(person.getName()); // LEE

// ----------------------------------------------------------------

// 특권(Privileged) 메서드 : 비공개 프로퍼티에 접근할 수 있는 메서드의 명칭
// 다만, 조심해야할 게 있음
// 1. 특권 메서드는 클로저로 비공개 프로퍼티에 접근하므로, 메모리 낭비가 발생할 수 있음
// 2. 특권 메서드에서 비공개 변수의 값을 바로 반환하는 경우, 변수가 객체 or 배열인 경우, 값이 아닌 참조가 반환되므로 외부 코드에서 비공개 변수 값을 의도치 않게 수정 가능

function PrivilegedPerson() {
	const specs = {
		name: "Privileged LEE",
		age: 25,
	};

	this.getSpecs = function () {
		return specs;
	};
}

const privilegedPerson = new PrivilegedPerson(),
	specs = privilegedPerson.getSpecs();
// 임의로 비공개 변수 내용 수정
specs.age = 30;
specs.name = "Privileged KIM";

// 다음과 같이 사용자에 의해 변경될 수 있음
console.log(privilegedPerson.getSpecs()); // { name: 'Privileged KIM', age: 30 }

// ----------------------------------------------------------------

// 객체 리터럴 & 비공개 멤버
// 객체 리터럴로 객체를 생성하는 경우엔, 비공개 멤버를 어떻게 사용할까?

// 익명 즉시 실행 함수를 추가해 클로저를 생성!
const literalPerson = (function () {
	const name = "Literal LEE";

	return {
		getSpecs: function () {
			return name;
		},
	};
})();
console.log(literalPerson.getSpecs()); // Literal LEE

// ----------------------------------------------------------------

// 프로포타입 & 비공개 멤버
// this에 멤버를 추가할 때 생기는 문제 : 생성자를 사용해 비공개 멤버를 만드는 경우, 새로운 객체를 만들 때마다 비공개 멤버가 재생성된다는 단점 존재
// 중복 없애고 메모리 절약하려면, "공통 프로퍼티 & 메서드"를 prototype에 추가해야함 -> 동일 생성자로 생성한 모든 인스턴스가 공통 부분을 공유
// 비공개 멤버들도 모든 인스턴스가 함께 사용 가능

function PrototypePerson() {
	const name = "Prototype LEE";
	this.getName = function () {
		return name;
	};
}
PrototypePerson.prototype = (function () {
	// 비공개 멤버
	const broswer = "Chrome";
	return {
		getBrowser: function () {
			return broswer;
		},
	};
})();

const prototypePerson = new PrototypePerson();
console.log(prototypePerson.getName()); // Prototype LEE
console.log(prototypePerson.getBrowser()); // Chrome

// ----------------------------------------------------------------

// 비공개 함수를 공개 메서드로 노출시키는 방법(= 노출 패턴)

// 기존 형태와 뭐가 다를까?
// 1. 구조 : 즉시 실행 함수를 사용해 비공개 멤버를 감싸고 API 객체를 반환
// 2. 사용 방식 : 객체 리터럴 사용(특권 메서드는 생성자 함수의 인스턴스를 통해 접근)
// 3. 메모리 사용 : 노출 패턴은 비공개 멤버를 한 번만 정의하고, 이를 여러 메서드에서 공유하지만, 특권 메서드는 인스턴스마다 비공개 멤버를 정의하므로 메모리 사용량 증가
let myarray;
(function () {
	// 비공개 변수
	let astr = "[object Array]",
		toString = Object.prototype.toString;

	// 비공개 함수
	function isArray(a) {
		return toString.call(a) === astr;
	}
	function indexOf(haystack, needle) {
		let i = 0,
			max = haystack.length;
		for (; i < max; i++) {
			if (haystack[i] === needle) {
				return i;
			}
		}
		return -1;
	}

	// 공개 API
	myarray = {
		isArray: isArray,
		indexOf: indexOf,
		inArray: indexOf,
	};
})();

console.log(myarray);
/* 결과는 다음과 같습니다
    {
        isArray: [Function: isArray],
        indexOf: [Function: indexOf],
        inArray: [Function: indexOf]
    }
*/

// ----------------------------------------------------------------
