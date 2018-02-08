"use strict"
const template = document.querySelector('template').content;
const main = document.querySelector('main');
const nav = document.querySelector('nav');
const catLink = "http://kea-alt-del.dk/t5/api/categories";
const pListLink = "http://kea-alt-del.dk/t5/api/productlist";
const pLink = "http://kea-alt-del.dk/t5/api/product?id=";
const imglink = "http://kea-alt-del.dk/t5/site/imgs/"

modal.addEventListener("click", () => modal.classList.add("hide"));


fetch(catLink).then(result => result.json()).then(data => createCatContainers(data));

function createCatContainers(categories) {
    categories.unshift("menu");
    categories.forEach(category => {
        const section = document.createElement("section");
        const a = document.createElement("a");
        a.textContent = category;
        a.href = "#";
        a.addEventListener("click", () => filter(category));
        nav.appendChild(a);
        const h2 = document.createElement("h2");
        section.id = category;
        h2.textContent = category;
        section.appendChild(h2);
        main.appendChild(section);
    });
    fetch(pListLink).then(result => result.json()).then(data => showProducts(data));
}

function filter(myFilter) {
    document.querySelectorAll("main section").forEach(section => {
        if (section.id == myFilter || myFilter == "menu") {
            section.classList.remove("hide");

        } else {
            section.classList.add("hide");
        }
    })
}

function showDetails(product) {
    modal.querySelector("h1").textContent = product.name;
    modal.querySelector("p").textContent = product.longdescription;
    modal.classList.remove("hide");
    modal.querySelector("img").src = "http://kea-alt-del.dk/t5/site/imgs/small/" + product.image + "-sm.jpg";


}



function showProducts(data) {
    data.forEach(elem => {
        const section = document.querySelector("#" + elem.category);
        const clone = template.cloneNode(true);
        clone.querySelector("img").src = "http://kea-alt-del.dk/t5/site/imgs/small/" + elem.image + "-sm.jpg";
        clone.querySelector("h2").textContent = elem.name;
        clone.querySelector("p").textContent = elem.shortdescription;
        clone.querySelector(".price span").textContent = elem.price;
        clone.querySelector("button").addEventListener("click", () => {
            fetch(pLink + elem.id).then(result => result.json()).then(product => showDetails(product));


        })
        if (elem.discount) {
            const newPrice = Math.ceil(elem.price - elem.price * elem.discount / 100);
            clone.querySelector(".discountprice span").textContent = newPrice;
            clone.querySelector(".discountprice.hide").classList.remove("hide")
            clone.querySelector(".price").classList.add("strike");
        }
        if (elem.alcohol) {

            const newImage = document.createElement("img");
            newImage.setAttribute("src", "img/alc.png");
            newImage.setAttribute("alt", "Contains alcohol " + elem.alcohol + "%");
            newImage.setAttribute("title", "Contains alcohol " + elem.alcohol + "%");
            clone.querySelector(".icons").appendChild(newImage);
        }

        if (elem.soldout) {

            const newImage = document.createElement("img");
            newImage.setAttribute("src", "img/soldout.png");
            newImage.setAttribute("alt", "soldout " + elem.soldout + "%");
            newImage.setAttribute("title", "soldout " + elem.soldout);
            clone.querySelector(".icons").appendChild(newImage);
        }



 if (elem.vegetarian) {

            const newImage = document.createElement("img");
            newImage.setAttribute("src", "img/veggie.png");
            newImage.setAttribute("alt", "Veggie " + elem.vegetarian + "%");
            newImage.setAttribute("title", "Veggie " + elem.vegetarian);
            clone.querySelector(".icons").appendChild(newImage);
        }
        section.appendChild(clone);
    })
}

