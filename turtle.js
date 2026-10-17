/// <reference path="./lib/Intellisense/js-turtle_hy.ts" />
//DOCUMENTATION: https://hanumanum.github.io/js-turtle/
/*
showGrid(x);      
forward(distance)  
right(angle)       
left(angle) 	   
goto(x,y) 	       
clear() 	       
penup() 	       
pendown() 	       
reset() 	       
angle(angle)	   
width(width)       

color(r,g,b)
color([r,g,b])
color("red")
color("#ff0000")
*/


let height = 100;
let cubeAngle = 0;
const fill_step = 1;
let percievedColors = Array;
let baseWidth = 3;


const calculatePerceivedWidth = (height, anglee) => {
    const diagonalAdjustment = Math.sqrt(2) - 1;
    const angleProjection = Math.abs(Math.sin(4 * anglee * Math.PI / 360));

    return height * ((diagonalAdjustment * angleProjection) + 1);
}

function drawRectangle(x, y, length, height, colors) {
    penup();

    console.log({x, y, length, height, cubeAngle});

    goto(x, y);
    pendown();
    for (i2 = 0; i2 < 2; i2++) {
        color(colors);
        forward(height);
        right(90);
        forward(length);
        right(90);
    }
}
function fillRectangle(x1, x2, y1, y2, colors) {
    goto(Math.ceil(x1 + (fill_step / 2)), Math.min(y1, y2));
    width(fill_step);
    color(colors);
    for (i = 0; i < Math.ceil(Math.abs(x2 - x1) / fill_step); i++) {
        goto(Math.ceil(x1 + (fill_step / 2) + (i * fill_step)), Math.min(y1, y2));
        forward(Math.abs(y2 - y1));
    }
}
function calculateLinePosition(anglee) { // Returns the position of the division of sides(the edge) as a number between 1 and 0
    return (Math.asin(((anglee % 90) / 45) - 1) / Math.PI) + 0.5;
}
function gridRectangle(x1, x2, y1, y2, colors, widthh, divisions) {
    color(colors);
    width(widthh);
    for (i = 0; i < divisions; i++) {
        goto(Math.min(x1, x2) + (i * (Math.abs(x2 - x1)) / divisions), Math.min(y1, y2));
        forward(Math.abs(y2 - y1));
        
        angle(90);
        goto(Math.min(x1, x2), (Math.min(y1, y2) + (i * Math.abs(y2 - y1) / divisions)));
        forward(Math.abs(x2 - x1));
        angle(0);
    }
}
function renderSides(anglee) {
    const perceivedWidth = calculatePerceivedWidth(height, anglee);
    const xDraw = (perceivedWidth / -2);
    const yDraw = -0.5 * height;
    if (anglee >= 0 && anglee < 90) {
        percievedColors = [
            [255, 0, 0], [0, 0, 255]
        ]
    } else if (anglee >= 90 && anglee < 180) {
        percievedColors = [
            [0, 0, 255], [255, 127, 0]
        ]
    } else if (anglee >= 180 && anglee < 270) {
        percievedColors = [
            [255, 127, 0], [0, 255, 0]
        ]
    } else if (anglee >= 270 && anglee < 360) {
        percievedColors = [
            [0, 255, 0], [255, 0, 0]
        ]
    }
    // drawRectangle(xDraw, yDraw, perceivedWidth, height, percievedColors[0]);
    fillRectangle(xDraw, xDraw + (perceivedWidth * (1 - calculateLinePosition(anglee))), yDraw, -yDraw, percievedColors[0]);
    fillRectangle(xDraw + (perceivedWidth * (1 - calculateLinePosition(anglee))), -xDraw, yDraw, -yDraw, percievedColors[1]);
    gridRectangle(xDraw, xDraw + (perceivedWidth * (1 - calculateLinePosition(anglee))), yDraw, -yDraw, percievedColors[0], 3, 3);
    gridRectangle(xDraw + (perceivedWidth * (1 - calculateLinePosition(anglee))), -xDraw, yDraw, -yDraw, percievedColors[1], 3, 3);

    goto(xDraw, yDraw - (baseWidth * 0.5));
    width(baseWidth);
    angle(90);
    color(255, 255, 0);
    forward(perceivedWidth);
    angle(0);

    goto(xDraw, -yDraw + (baseWidth * 0.5));
    width(baseWidth + 1);
    angle(90);
    color(245, 245, 245);
    forward(perceivedWidth);
    angle(0);
}
setInterval(() => {
    if (cubeAngle >= 360) {
        cubeAngle = 0;
    }
    clear();
    renderSides(cubeAngle);
    cubeAngle += 1;
}, 50);