const GRID_PX_SIZE = 800;
let grid_perim = 16; //how much pixels/boxes
let pixel_perim = (GRID_PX_SIZE/grid_perim) + "px";

//colored pixels percentage
let colored = 0;
let uncolored = grid_perim**2;
let percentage = colored/uncolored * 100 + "%";
const percentage_cont = document.querySelector(".percentage");
percentage_cont.textContent = percentage;

const grid_cont = document.querySelector(".grid");
const grid_perim_btn = document.querySelector(".ch-grid-size");
grid_perim_btn.addEventListener("click", () => {
    grid_perim = Number(prompt("Input new size (max 100)"));

    //if user input is wrong
    if (!grid_perim || grid_perim < 1 && grid_perim > 100){
        grid_perim = 16;
        alert("Please input only from 1-100");
    }

    pixel_perim = (GRID_PX_SIZE/grid_perim) + "px";
    colored = 0;
    uncolored = grid_perim**2;
    grid_cont.replaceChildren();
    calcPercentage();
    initializeGrid();
});

const reset_btn = document.querySelector(".reset");
reset_btn.addEventListener("click", () => {
    colored = 0;
    grid_cont.replaceChildren();
    calcPercentage();
    initializeGrid();
});

function initializeGrid() {
    for(let i = 0; i < grid_perim; i++){        
        let column = document.createElement("div"); //column that contains the pixels
        column.className = "col";
        column.style.width = pixel_perim;

        for(let j = 0; j < grid_perim; j++){
            let pixel = document.createElement("div");
            pixel.className = "pxl";
            pixel.style.height = pixel_perim;
            pixel.style.width = pixel_perim - 2;//-2 is the pixel's borders having 1px (top-bottom, left-right)
            pixel.addEventListener("mouseover", () =>{
                pixel.style.backgroundColor = randomizeRGB();
                pixel.classList.add("colored");
                colored = document.querySelectorAll(".colored").length;
                calcPercentage();
            });

            // pixel.id = "pxl_" + i + "_" + j;
            column.append(pixel);
        }
        // column.id = "col_" + i;
        grid_cont.append(column);
    }
}

function randomizeRGB(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return "rgb(" + r + "," + g + "," + b + ")";
}

function calcPercentage(){
    percentage = (colored/uncolored * 100).toFixed(1) + "%";
    percentage_cont.textContent = percentage;
}

initializeGrid();