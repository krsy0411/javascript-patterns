// JS에서 정규표현식 또한 객체일뿐이며, 생성방식은 두 가지
// 1. new RegExp() 생성자
// 2. 정규식 리터럴

// a문자열 뒤에 하나 이상의 b문자가 오고, 뒤에 c문자가 오는 패턴을 찾는 정규식(flag : 대소문자 구분 안 함)
let re_constructor = new RegExp("ab+c", "i");
let re_literal = /ab+c/i;
// 역시나 정규식 또한 리터럴이 더 짧고, 생성자를 고민할 필요 없기에 편리함 -> 정규식 리터럴을 웬만하면 고수하자

// --------------------------------------------------------------------------------

// 1) 정규표현식 리터럴 "문법"
// 매칭에 사용되는 정규식 패턴을 슬래시로 감싸고, 뒤에는 따옴표 없이 문자 형태의 flag(변경자)를 둔다(= /패턴/flag)
// g: 전역 매칭, m: 여러 줄 매칭, i: 대소문자 구분 안 함
// 정규식 리터럴을 통해, String.prototype.replace()같은 메서드를 호출할때 정확한 코드를 작성 가능
let no_letters = "abc123XYZ".replace(/[a-z]/gi, "");
console.log(no_letters); // '123'

// 2) 그러나, 런타임에 패턴이 문자열로 만들어지는 경우 -> 생성자 함수를 사용해야함 : 동적으로 패턴을 생성할 수가 없으므로

// 3) 정규식 리터럴을 사용하면, 정규식을 생성할 때마다 새로운 객체를 생성하지 않음 -> 메모리 사용량이 줄어듦
// 3-1) 같은 객체를 반환하는 경우
const re = /[a-z]/;

function getREGood() {
	return re;
}

function getREBad() {
	let re = /[a-z]/;
	re.foo = "bar";

	return re;
}

let badReg = getREBad(),
	badReg2 = getREBad();
let goodReg = getREGood(),
	goodReg2 = getREGood();

console.log("한번만 생성된 경우 : ", goodReg === goodReg2); // true
console.log("다른 객체를 여러 개 생성하는 경우 : ", badReg === badReg2); // false : 즉, 객체들이 서로 다른 메모리 주소를 참조함
badReg.foo = "baz";
console.log(badReg2.foo); // 'bar' : 즉, 함수 내에서 정규식 객체를 정의하면, 함수를 호출할 때마다 새로운 객체가 생성됨
goodReg.foo = "baz";
console.log(goodReg2.foo); // 'baz' : 즉, 함수 밖에서 정규식 객체을 정의하면, 함수를 호출할 때마다 같은 객체를 반환함

// --------------------------------------------------------------------------------

// 정규식 생성자 함수는 new를 빼먹어도 new와 함께 호출한 것처럼 동작함
