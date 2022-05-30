// JavaScript source code
/*

const http = require('http');

const server = http.createServer((petition, answer) => { answer.end('Hello world') });
const connectedServer = server.listen(8080, () => { console.log(`Http Server on port ${connectedServer.address().port}`) })
*/
const fs = require('fs');
const express = require('express');
const app = express();

const PORT = 8080; //port 0 picks up random

const server = app.listen(PORT, () => console.log(`Http Server on port ${server.address().port}`));
server.on("error", error => console.log(`Error on server ${error}`));



function bookItem(title, price, thumbnail) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
}

class Container {
    constructor() {
        this.arrayItems = this.getAll() ? this.getAll() : [];
    }
    save(obj) {
        obj.id = this.arrayItems.length == 0 ? 1 : this.arrayItems[this.arrayItems.length-1].id +1; //We need to find a better way to do this
        this.arrayItems.push(obj);

        fs.writeFileSync('../GeneratedFiles/testFile.txt',JSON.stringify(this.arrayItems));
        return this.mIds;
    }

    getAll() {
        try {
            if (!fs.existsSync('../GeneratedFiles/')) {
                fs.mkdirSync('../GeneratedFiles/');
            }
            const content = fs.readFileSync('../GeneratedFiles/testFile.txt', 'utf-8');
            const array = JSON.parse(content);
            return array;

        } catch (e) {
            console.log(e);
            return undefined;
        }
    }

    getById(id) {
        for (var i = 0; i < this.arrayItems.length; i++) {
            if (this.arrayItems[i].id == id) {
                return this.arrayItems[i];
            }
        }
        return null;
    }

    getProductAmount() { return this.arrayItems.length };

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

if (bookHandler.getAll() == undefined) {
    bookHandler.save(firstBook);
    bookHandler.save(secondBook);
    bookHandler.save(thirdBook);
}

console.log(bookHandler.getAll());


console.log(bookHandler.getById(1));

app.get('/', (req, res) => res.send({ message: 'Hello World' }));
app.get('/products', (req, res) => res.send({ message: bookHandler.getAll() }));
app.get('/productsRandom', (req, res) => res.send({ message: bookHandler.getById(Math.round(Math.floor(Math.random() * bookHandler.getProductAmount())+1 )) })); //We don want decimals, we want it random between 1 and product amount