// <책임 연쇄 패턴>
// 요청을 처리할 수 있는 여러 객체가 있다면, 객체들을 체인 형태로 연결해 각 객체가 요청을 처리하거나 다음 객체로 요청을 넘기는 방식으로 요청을 처리하는 디자인 패턴
// 요청을 보내는 객체와 요청을 처리하는 객체를 분리 -> 요청을 처리할 수 있는 여러 객체가 있을때, 유연하게 처리 가능

// 예) 클라이언트의 장바구니 품목을 핸들러에 전달 : 핸들러가 쿠폰 객체를 순회 -> 적용 가능한 쿠폰들을 모아 결과값을 반환

// "책임연쇄패턴의 구성요소"
// 1. Handler(처리자) : 요청을 처리하는 인터페이스를 정의
// 2. ConcreteHandler(구체적인 처리자) : 실제 요청을 처리하는 클래스 - handler 인터페이스를 구현하고, 요청을 처리하거나 다음 처리자로 요청을 전달
// 3. Client(클라이언트) : 요청을 시작하는 객체 : 체인의 첫 번째 처리자(핸들러)에게 요청을 전달

// 예제
// Handler 인터페이스 : 요청을 처리하거나, 다음 처리자로 요청을 넘기는 기본 인터페이스
class Handler {
	setNext(handler) {
		this.nextHandler = handler;
		return handler;
	}

	handle(request) {
		if (this.nextHandler) {
			return this.nextHandler.handle(request);
		}

		return null;
	}
}

// ConcreteHandler1, ConcreteHandler2, ConcreteHandler3 : Handler인터페이스를 구현하고, 실제 요청을 처리하는 클래스

// ConcreteHandler1
class ConcreteHandler1 extends Handler {
	handle(request) {
		if (request === "Request1") {
			return `ConcreteHandler1 handled ${request}`;
		}
		return super.handle(request); // 부모 클래스의 handle 메서드를 호출하여 다음 처리자로 요청을 넘김
	}
}

// ConcreteHandler2
class ConcreteHandler2 extends Handler {
	handle(request) {
		if (request === "Request2") {
			return `ConcreteHandler2 handled ${request}`;
		}
		return super.handle(request); // 부모 클래스의 handle 메서드를 호출하여 다음 처리자로 요청을 넘김
	}
}

// ConcreteHandler3
class ConcreteHandler3 extends Handler {
	handle(request) {
		if (request === "Request3") {
			return `ConcreteHandler3 handled ${request}`;
		}
		return super.handle(request); // 부모 클래스의 handle 메서드를 호출하여 다음 처리자로 요청을 넘김
	}
}

// 클라이언트 코드 : Handler(처리자) 객체들을 체인 형태로 연결하고, 요청을 처리
const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();
const handler3 = new ConcreteHandler3();

handler1.setNext(handler2).setNext(handler3);

console.log(handler1.handle("Request1")); // ConcreteHandler1 handled Request1
console.log(handler1.handle("Request2")); // ConcreteHandler2 handled Request2
console.log(handler1.handle("Request3")); // ConcreteHandler3 handled Request3
console.log(handler1.handle("Request4")); // null

// ------------------------------------------------------------------------------------------------

// 다른 예시
// 기본 핸들러 클래스
class Handler {
	constructor(next) {
		this.next = next; // 다음 핸들러 참조
	}

	handle(request) {
		if (this.next) {
			return this.next.handle(request); // 다음 핸들러로 전달
		}
		return null;
	}
}

// 카드 결제 처리 핸들러
class CardPaymentHandler extends Handler {
	handle(request) {
		if (request.type === "card") {
			console.log("카드 결제를 처리합니다.");
			return true;
		}
		return super.handle(request);
	}
}

// 페이팔 결제 처리 핸들러
class PayPalPaymentHandler extends Handler {
	handle(request) {
		if (request.type === "paypal") {
			console.log("페이팔 결제를 처리합니다.");
			return true;
		}
		return super.handle(request);
	}
}

// 비트코인 결제 처리 핸들러
class BitcoinPaymentHandler extends Handler {
	handle(request) {
		if (request.type === "bitcoin") {
			console.log("비트코인 결제를 처리합니다.");
			return true;
		}
		return super.handle(request);
	}
}

// 연쇄 핸들러 연결
const chain = new CardPaymentHandler(
	new PayPalPaymentHandler(new BitcoinPaymentHandler(null))
);

// 테스트
chain.handle({ type: "paypal" }); // "페이팔 결제를 처리합니다." 출력
chain.handle({ type: "card" }); // "카드 결제를 처리합니다." 출력
chain.handle({ type: "bitcoin" }); // "비트코인 결제를 처리합니다." 출력
chain.handle({ type: "cash" }); // 처리 불가, 아무 출력 없음
