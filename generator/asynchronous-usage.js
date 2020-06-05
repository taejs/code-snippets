//generator를 사용하게 되면서 순차적 접근법을 사용하는 비동기 코드가 완성됨
const co = require('co');
const {
    performance
} = require('perf_hooks');

function* asyncGenerator(callback) {
    yield setTimeout(callback, 1000);
    yield setTimeout(callback, 2000);
}

function asyncFlow(generatorFunction) {
    const callback = () => {
        console.log('1: it works at', performance.now());
        gen.next();
    };

    const gen = generatorFunction(callback);
    gen.next();
}




function timeoutThunk(time) {
    return (callback) => {
        setTimeout(callback, time);
    }
}

function* asyncGeneratorWithThunks() {
    yield timeoutThunk(1000);
    yield timeoutThunk(3000);
}

function asyncFlowWithThunks (generatorFunction) {
    const callback = () => {
        console.log('2: it works at', performance.now());
        runThunk();
    }
    const gen = generatorFunction(callback);
    const runThunk = () => {
        let thunk = gen.next().value;
        thunk && thunk(callback);
    }

    runThunk();
}

asyncFlow(asyncGenerator)
asyncFlowWithThunks(asyncGeneratorWithThunks);
co(function* () {
    yield new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('3: it works at', performance.now());
        }, 1000)
    })
});