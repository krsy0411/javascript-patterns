// 의존 관계 선언
// 객체 간 의존성을 명확히 정의하고 관리하는 패턴

// 장점
// 1. 의존성 명시적 정의
// 2. 결합도 감소 : 의존성이 명확히 정의되어 있으므로, 의존성이 변경되었을때 영향을 받는 객체를 쉽게 파악할 수 있음
// 3. 고급 압축 도구(구글 클로저 컴파일러 등..)은, 지역 변수명에 대해 글자를 축약해 코드량을 줄임(전역 변수명은 축약X)

// --------------------------------------------------------------------------------

// 예제 1
// 의존성 객체 생성
const dependencies = {
	logger: console,
	config: {
		apiUrl: "https://api.example.com",
	},
};

// 의존성을 주입받는 객체 생성
function ApiClient(dependencies) {
	this.logger = dependencies.logger;
	this.config = dependencies.config;
}

// ApiClient 객체의 메서드 정의
ApiClient.prototype.getData = function () {
	this.logger.log(`Fetching data from ${this.config.apiUrl}`);
	// 실제 데이터 가져오는 로직...
};

// 의존성을 주입하여 ApiClient 객체 생성
const apiClient = new ApiClient(dependencies);

// 메서드 호출
apiClient.getData(); // 출력: Fetching data from https://api.example.com

// --------------------------------------------------------------------------------

// 예제2
// 자바스크립트 라이브러리들은 대부분 네임스페이스를 지정해 모듈화 -> 필요 모듈만 골라서 사용 가능
// 이때, 모듈 내 최상단에 지역변수를 만들어 원하는 모듈을 가리키도록 선언해도 좋음

// YUI2의 YAHOO 객체라던지 DOM 모듈이라던지
const myFunction = function () {
	const event = YAHOO.util.Event,
		dom = YAHOO.util.Dom;
	// 이후 event, dom 객체 사용
};
