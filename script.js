let gridContainer=document.querySelector(".grid-container");
let square=document.createElement("div");
let dim=100/16;
let clearDiv=document.createElement("div");
clearDiv.classList.add("clear");
square.style.cssText+=`width:${dim}%; padding-bottom:${dim}%; background-color:red;`;
square.classList.add("square");


for(let i=1;i<=16;i++){
    for(let j=1;j<=16;j++){
        gridContainer.innerHTML+=square.outerHTML;
        console.log("abc");
    }
    gridContainer.innerHTM+=clearDiv.outerHTML;
}