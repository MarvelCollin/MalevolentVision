export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight * 2;

// function getCanvas(){
//     const canvas = document.getElementById("gameCanvas")
//     if(canvas == null) return null;
    
//     return canvas;
// }