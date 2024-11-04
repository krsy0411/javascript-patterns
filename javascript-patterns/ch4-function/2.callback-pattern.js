// (함수 = 객체) -> 다른 함수에 인자로 전달 가능
// 인자로 전달할때는 괄호없이 함수를 전달하고, 실행은 추후 적절한 시점에 함수 내에서 괄호를 이용해서 실행될 수 있음

// 왜 콜백 패턴을 사용할까?
// 1. "비동기 처리를 위해" : 비동기 이벤트 리스너, 타이머 함수, ajax요청
// 2. "콜백 함수에 로직을 숨기고, 실행할 타이밍을 외부 함수에서 결정해서 합쳐 사용할 수 있기 때문" : 좀 더 함수들을 범용 함수로 만들 수 있음
function findNodes(callbackFn) {
	let i = 100,
		nodes = [],
		found;

	if (typeof callbackFn !== "function") {
		callbackFn = false;
	}

	while (i) {
		i -= 1;

		// 복잡한 로직은 이 곳에 작성

		// 여기서 콜백 함수 실행
		if (callbackFn) {
			callbackFn(found);
		}

		nodes.push(found);
	}

	return nodes;
}

// 콜백패턴 적용 : 함수의 관심사를 분리시킬 수 있음 + 함수 실행 시점을 따로 결정할 수 있음
findNodes((node) => {
	// node.style.display = "block";
});

// --------------------------------------------------------------------------------------------------
// 콜백함수가 함수라면 넘겨주면 되지만, 객체의 메서드인 경우라면? -> 객체 참조를 위해 this를 사용하면, this가 다른 객체를 참조할 수도 있음
const app = {};
app.color = "green";
app.paint = function (node) {
	console.log("paint");
	console.log(this.color);
};

function findNodes2(callback) {
	const found = "node";

	if (typeof callback === "function") {
		callback(found);
	}
}

findNodes2(app.paint); // undefined 출력 -> findNodes로 호출되었기에 객체 this는 '전역 객체'를 참조하거나, strict mode에서는 undefined를 참조
// 그렇기에 전달받은 객체를 바인딩해줄 필요가 있음
findNodes2(app.paint.bind(app)); // 'green' 출력 -> 제대로 바인딩된 상태

// 아니면 이렇게 작성해서 바인딩할 수도 있음
function findNodes3(callback, callbackObj) {
	const found = "node";

	if (typeof callback === "function") {
		callback.call(callbackObj, found);
	}
	if (typeof callback === "string") {
		callback = callbackObj[callback];
	}
}
// 사용할때는 이렇게
findNodes3(app.paint, app);
findNodes3("paint", app);
