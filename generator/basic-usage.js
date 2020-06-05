function *infinite() {
    let index = 0;
    while(true) {
        yield index++;
    }
}

const generator = infinite();

console.log(generator.next());
console.log(generator.next());
console.log(generator.next());