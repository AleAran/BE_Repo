// JavaScript source code
const fs = require('fs');

function bookItem(title, price, thumbnail) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
}

class Container {

    save(obj) {
        const arrayItems = this.getAll() ? this.getAll() : [];
        console.log(arrayItems.length);

        obj.id = arrayItems.length == 0? 1 : arrayItems[arrayItems.length-1].id +1; //We need to find a better way to do this
        arrayItems.push(obj);

        fs.writeFileSync('../GeneratedFiles/testFile.txt',JSON.stringify(arrayItems));
        return this.mIds;
    }

    getAll() {
        try {
            const content = fs.readFileSync('../GeneratedFiles/testFile.txt', 'utf-8');
            const array = JSON.parse(content);
            return array;

        } catch (e) {
            console.log(e);
            return undefined;
        }
    }

    getById(id) {
        const arrayItems = this.getAll() ? this.getAll() : [];
        for (var i = 0; i < arrayItems.length; i++) {
            if (arrayItems[i].id == id) {
                return arrayItems[i];
            }
        }
        return null;
    }

    deleteById(id) {
        const arrayItems = this.getAll() ? this.getAll() : [];
        try {
            for (var i = 0; i < arrayItems.length; i++) {
                if (arrayItems[i].id == id) {
                    arrayItems.splice(i, 1);
                    fs.writeFileSync('../GeneratedFiles/testFile.txt', JSON.stringify(arrayItems));
                    console.log("Item deleted!");
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    deleteAll() {
        const arrayItems = [];
        fs.writeFileSync('../GeneratedFiles/testFile.txt', JSON.stringify(arrayItems));
        console.log("All deleted!");
    }
}

const bookHandler = new Container();
let firstBook = new bookItem('Infinite and Divine', 60, 'https://c.tenor.com/3_mXIoBPNhoAAAAC/party-parrot.gif');
let secondBook = new bookItem('JS for Dummies', 80, 'https://c.tenor.com/3_mXIoBPNhoAAAAC/party-parrot.gif');
let thirdBook = new bookItem('Silmarilion', 50, 'https://c.tenor.com/3_mXIoBPNhoAAAAC/party-parrot.gif');

bookHandler.save(firstBook);
bookHandler.save(secondBook);
bookHandler.save(thirdBook);
console.log(bookHandler.getAll());

bookHandler.deleteById(2);
console.log(bookHandler.getAll());

console.log(bookHandler.getById(1));

bookHandler.deleteAll();
console.log(bookHandler.getAll());