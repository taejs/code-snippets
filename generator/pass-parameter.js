function* generator() {
    try {
        const param = yield null;
        console.log(param);
    } catch (e) {
        console.log('error occured');
    }
}

const iter = generator();
iter.next()
//iter.next('hello');
iter.throw(new Error('error'));
