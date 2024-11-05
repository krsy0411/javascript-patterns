// <템플릿 메서드 패턴>
// 알고리즘의 구조를 정의하고, 하위 클래스에서 알고리즘의 특정 단계를 구현하도록 하는 디자인 패턴
// 알고리즘의 골격을 정의하는 "템플릿 메서드"를 제공하고, "하위 클래스에서 구체적인 구현을 제공"하여 알고리즘의 일부 단계를 재정의할 수 있게 함

// 템플릿 메서드 패턴의 구성요소
// 1. 추상 클래스 : 알고리즘의 구조를 정의하는 템플릿 메서드를 제공 : 하위 클래스에서 구현됨
// 2. 구체 클래스 : 추상클래스에서 정의된 추상 메서드를 구현 -> 알고리즘의 구체적인 단계를 구현

// 예시: 주문 처리 알고리즘
// 추상 클래스: 주문 처리 알고리즘의 구조를 정의
class OrderProcessor {
	// 템플릿 메서드: 알고리즘의 구조를 정의
	processOrder() {
		this.validateOrder();
		this.processPayment();
		this.prepareShipment();
		this.notifyCustomer();
	}

	// 추상 메서드: 하위 클래스에서 구현해야 하는 메서드
	validateOrder() {
		throw new Error("validateOrder() must be implemented");
	}

	processPayment() {
		throw new Error("processPayment() must be implemented");
	}

	prepareShipment() {
		throw new Error("prepareShipment() must be implemented");
	}

	notifyCustomer() {
		throw new Error("notifyCustomer() must be implemented");
	}
}

// 구체 클래스: 신용카드 결제를 처리하는 주문 처리기
class CreditCardOrderProcessor extends OrderProcessor {
	validateOrder() {
		console.log("Validating order for credit card payment...");
	}

	processPayment() {
		console.log("Processing credit card payment...");
	}

	prepareShipment() {
		console.log("Preparing shipment for credit card order...");
	}

	notifyCustomer() {
		console.log("Notifying customer about credit card order...");
	}
}

// 구체 클래스: 페이팔 결제를 처리하는 주문 처리기
class PayPalOrderProcessor extends OrderProcessor {
	validateOrder() {
		console.log("Validating order for PayPal payment...");
	}

	processPayment() {
		console.log("Processing PayPal payment...");
	}

	prepareShipment() {
		console.log("Preparing shipment for PayPal order...");
	}

	notifyCustomer() {
		console.log("Notifying customer about PayPal order...");
	}
}

// 클라이언트 코드: 주문 처리기 사용
const creditCardOrder = new CreditCardOrderProcessor();
creditCardOrder.processOrder();
// Output:
// Validating order for credit card payment...
// Processing credit card payment...
// Preparing shipment for credit card order...
// Notifying customer about credit card order...

const payPalOrder = new PayPalOrderProcessor();
payPalOrder.processOrder();
// Output:
// Validating order for PayPal payment...
// Processing PayPal payment...
// Preparing shipment for PayPal order...
// Notifying customer about PayPal order...

// ---------------------------------------------------------------------------------------
// 템플릿 메서드 패턴의 장단점은 뭘까?

// 장점
// 1. 코드 재사용성
// 2. 유연성
// 3. 유지보수성

// 단점
// 1. 복잡성 증가 : 상속 구조를 이해해야함
// 2. 상위 클래스 알고리즘의 구조 변경에 취약함 : 하위 클래스들의 코드 수정이 불가피
