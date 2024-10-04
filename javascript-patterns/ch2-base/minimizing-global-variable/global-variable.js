myglobal = "hello";
console.log(myglobal); // hello
console.log(global.myglobal); // undefined
console.log(global["myglobal"]); // hello
console.log(this); // {}
// module.exports = myglobal; ---> 이 코드를 활성화하고 실행하면, 아래의 코드의 결과는 false
function test() {
	console.log("hello");
}
module.exports = test;
console.log(this === module.exports); // true
console.log(this);
console.log(module.exports);
const globalOption = function () {
	return this;
};
console.log(globalOption());
