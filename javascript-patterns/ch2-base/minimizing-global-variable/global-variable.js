myglobal = "hello";
console.log(myglobal); // hello
console.log(global.myglobal); // undefined
console.log(global["myglobal"]); // hello
console.log(this); // {}
// module.exports = myglobal; ---> 이 코드를 활성화하고 실행하면, 아래의 코드의 결과는 false
console.log(this === module.exports); // true
const globalOption = function () {
	return this;
};
console.log(globalOption());
