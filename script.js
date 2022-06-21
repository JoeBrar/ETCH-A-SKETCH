let gridSize=16;
let gridContainer=document.querySelector(".grid-container");
let square=document.createElement("div");
let clearDiv=document.createElement("div");
let viewPortWidth;
let viewPortHeight;
let changeGridBtn=document.querySelector(".ChangeGrid button");
let gridSizeText=document.querySelector(".ChangeGrid div");

if (typeof window.innerWidth != 'undefined') {
    viewPortWidth = window.innerWidth,
    viewPortHeight = window.innerHeight
}
if (viewPortHeight<=viewPortWidth){
    totaldim=viewPortHeight;
}
else{
    totaldim=viewPortWidth;
}
usablewidth=totaldim-0.2*totaldim;
gridContainer.style.width=`${usablewidth}px`;
console.log(viewPortHeight+"   "+viewPortWidth);
clearDiv.classList.add("clear");
square.classList.add("square");
square.setAttribute("onmouseover","changeColor(this)");

function changeColor(item){
    item.style.backgroundColor="blue";
}

function generateGrid(size){
    let dim=100/size;
    square.style.width=`${dim}%`;
    square.style.paddingBottom=`calc(${dim}% - 2px)`;
    for(let i=1;i<=size;i++){
        for(let j=1;j<=size;j++){
            gridContainer.innerHTML+=square.outerHTML;
            console.log("abc");
        }
        gridContainer.innerHTML+=clearDiv.outerHTML;
    }
}
generateGrid(gridSize);

function changeGridFunc(){
    x=parseInt(prompt("Enter no. of rows and columns (max 40): "));
    while(x>40){
        x=parseInt(prompt("Enter no. of rows and columns (max 40): "));
    }
    gridSizeText.innerText=`Grid Size: ${x}x${x}`;
    gridContainer.innerHTML="";
    generateGrid(x);
}
