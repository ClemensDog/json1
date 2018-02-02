"use stric"
const template = document.querySelector('template').content;
const main = document.querySelector('main');
const link = "http://kea-alt-del.dk/t5/api/productlist";
const imglink = "http://kea-alt-del.dk/t5/site/imgs/"
fetch(link).then(result=>result.json()).then(generic_word=>show(generic_word));

function show(generic_word){
    generic_word.forEach(elem=>{
        console.log(elem.shortdescription);
        const clone = template.cloneNode(true);
        clone.querySelector("img").src=imglink +"small/" +elem.image + "-sm.jpg";
        clone.querySelector("h2").textContent=elem.name;
        clone.querySelector("p").textContent=elem.shortdescription;
        main.appendChild(clone);
    })
}
