// 원시 타입 : String, Number, Boolean, null, undefined
// 변경 불가능한 값 - 값 자체를 저장

// 참조 타입 : 객체 또는 특수 객체 : Object, Array, Function, RegExp, Date, Map, Set, Class, Symbol
// 변경 가능한 값 - 참조값(주소)를 저장

// --------------------------------------------------------------------------------

// 원시 타입 중 String, Number, Boolean에 대한 "원시 데이터 타입 래퍼"객체 존재 : Number(), String(), Boolean() 생성자를 사용해 객체 생성
// 다음처럼, 같은 원시타입 데이터이지만, 다른 타입을 보여준다
let n = 100;
console.log(typeof n); // number
let nObj = new Number(100);
console.log(typeof nObj); // object

// 래퍼 객체에는 유용한 프로퍼티 및 메서드가 존재. 예를 들면 아래와 같다.
// 숫자 객체 : toFixed(), toExponential() 같은 메서드
// 문자열 객체 : substring(), charAt(), toLowerCase() 같은 메서드
// 하지만 "원시 데이터 타입 그대로 써도 래퍼 객체의 메서드들을 사용 가능" : 메서드를 호출하는 순간, 내부적으로 원시 데이터 타입 값이 객체로 임시 변환되어 객체처럼 동작
let s = "hello";
// 다음과 같이, 값 자체만으로도 원시타입 래퍼 "객체"처럼 동작 가능
console.log(s.toUpperCase()); // "HELLO"
console.log("monkey".slice(3, 6)); // "key"
console.log((22 / 7).toPrecision(3)); // "3.14"
// 그러므로 우리는 굳이 장황하게 래퍼 생성자를 쓸 필요는 없는 것이다. 다음과 같이 말이다.
let sBad = new String("hello");
