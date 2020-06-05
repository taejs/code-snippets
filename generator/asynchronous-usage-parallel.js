//generator를 사용하게 되면서 순차적 접근법을 사용하는 비동기 코드가 완성됨
const co = require('co');
const {
    performance
} = require('perf_hooks');

function* task(timeout, index) {
    yield setTimeout(() => {
        console.log(`${index} it works at ${performance.now()}`);
    }, timeout);
}

const tasks = new Array(20).fill(null).map((_, i)=> task(Math.random()* 1000, i));

co(function* () {
    yield Promise.all(tasks);
});