// JavaScript source code
const fs = require('fs');

let obj = new testObject("hola", "tt", "00");
console.log(obj);

function testObject(title, price, thumbnail) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
}

class Container {
    constructor(){
    this.mIds = 0
    }

    save(obj) {
        this.mIds++;
        obj.id = this.mIds;
        fs.appendFileSync('../GeneratedFiles/testFile.txt', JSON.stringify(obj));
        return this.mIds;
    }

    getAll() {
        const txt = fs.readFileSync('../GeneratedFiles/testFile.txt', 'utf-8');
        const array = JSON.parse(txt);
        console.log(array);
    }
}
const testClass = new Container();

testClass.save(obj);
testClass.save(obj);
testClass.getAll();

/*
class User {
    constructor(obj = { }) {
        this.firstName = obj?.firstName || undefined;
        this.apellido = obj?.lastName || undefined;

        this.books = []; //Object. Can we force this to only take Object?
        this.pets = []; //String. Can we force this to only take Strings?
    }

    getFullName(){
        return `${this.firstName} ${this.lastName}`;
    }

    addPet(petName) {
        this.pets.push(petName);
    }

    countPets() {
        return this.pets.length;
    }

    addBook(bookName, bookAuthor) {
        this.books.push({ name:bookName, author:bookAuthor});
    }

    getBookNames() {
        result = this.books.map(obj => obj.author);
    }
}
*/