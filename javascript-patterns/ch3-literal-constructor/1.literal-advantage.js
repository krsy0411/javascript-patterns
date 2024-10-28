// 자바스크립트의 객체 = "이름-값 쌍의 해시 테이블"
// 즉, JS에서 생성한 객체(= (내장)네이티브 객체)의 프로퍼티들도 대다수 변경 가능 + 빈 객체를 정의해두고 기능 추가 가능
// 이렇게 동적으로 객체를 확장할때 리터럴 표기법이 장점을 가짐
let dog = {};
// 프로퍼티 추가
dog.name = "Benji";
// 메서드 추가
dog.getName = function () {
	return dog.name;
};

console.log(dog);
console.log(typeof dog.getName);
console.log(typeof dog);

// 윗 예제처럼, 백지 상태의 빈 객체에서 프로퍼티와 메서드들을 추가 가능
// 또한, 아래와 같이 프로그램의 생명주기 중 어느때라도 객체를 수정 가능

dog.getName = function () {
	return "Lee";
};
delete dog.getName;
console.log(dog);
dog.say = function () {
	return "Woof!";
};
dog.fleas = true;

// 물론, 생성 시점에 객체에 기능(프로퍼티, 메서드)을 추가하는 것도 가능
// 참고) JS에서의 빈 객체는, 사실 빈 객체가 아님. Object.prototype을 상속받아 생성된 객체임 -> 상속받은 프로퍼티와 메서드들이 존재
// 비어있다는 건, 객체로부터 상속받은 것 외에 자기 자신의 프로퍼티는 안 갖고 있다는 의미
let cat = {};
console.log(cat);
// 이렇게 자신만의 프로퍼티가 없음을 확인 가능
console.log(cat.hasOwnProperty("meow"));
