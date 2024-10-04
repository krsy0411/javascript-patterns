// singleton pattern : 애플리케이션 내에서 하나의 클래스에 대해 오직 하나의 인스턴스만을 허용하고, 그 인스턴스를 어디에서든 접근할 수 있게 하는 디자인 패턴
class Singleton {
	// 생성자 함수
	constructor() {
		if (Singleton.instance) {
			console.log("처음");
			return Singleton.instance;
		}

		this.data = "아직은 데이터가 초기화되지 않았어요";
		Singleton.instance = this; // 인스턴스가 생성될 때 저장 : "static 변수" -> 모든 인스턴스가 공유
	}

	// 인스턴스가 저장된 데이터 반환
	getData() {
		return this.data;
	}

	// 새로운 데이터를 설정
	setData(newData) {
		this.data = newData;
	}
}

// 인스턴스 생성
const instance1 = new Singleton(); // 첫번째 로그 : undefined

// 두 번째 인스턴스 생성 시 기존 인스턴스 반환
const instance2 = new Singleton(); // 두번째 로그 : Singleton { data: '아직은 데이터가 초기화되지 않았어요' }
instance2.setData("새로운 데이터");

console.log(instance1.getData()); // 세번째 로그 : 새로운 데이터
console.log(instance1 === instance2); // true

// ------------------------------------------------------------------------------------------------

class Test {
	constructor() {
		console.log(Test.instance);
		this.data = "테스트 데이터";
	}

	// 인스턴스가 저장된 데이터 반환
	getData() {
		return this.data;
	}

	// 새로운 데이터를 설정
	setData(newData) {
		this.data = newData;
	}
}

const test1 = new Test(); // undefined
test1.setData("setter를 활용해서 넣은 데이터");
console.log(test1.getData()); // setter를 활용해서 넣은 데이터
const test2 = new Test(); // undefined
console.log(test2.getData()); // 테스트 데이터

// Q. 왜 Test 클래스는 싱글톤 패턴이 아닐까요?
// A. 생성자 함수 내에 스태틱 변수를 사용해줘야함 -> "Test.instance = this;"를 추가해줘야함
