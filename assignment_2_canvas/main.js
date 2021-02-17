const game = document.querySelector('canvas').getContext('2d'); 

// RESIZE HANDLER
const resize_canvas = () => {
    game.canvas.width = game.canvas.clientWidth; 
    game.canvas.height = game.canvas.clientHeight; 
}; 
resize_canvas(); 
window.addEventListener('resize', resize_canvas); 

// RESPOND TO MOUSE MOVEMENT
game.canvas.addEventListener('mousemove', mousemove => {
    if(enemy_x <= mousemove.clientX && mousemove.clientX <= enemy_x + 10 && enemy_y <= mousemove.clientY && mousemove.clientY <= enemy_y + 10) {
        enemy_x = game.canvas.width / 2; 
        enemy_y = -100; 
    }
}); 

// ANIMATION
let enemy_x = game.canvas.width / 2; 
let enemy_y = -100; 
const animate = () => {
    game.clearRect(0, 0, game.canvas.width, game.canvas.height); 
    game.fillRect(enemy_x, enemy_y++, 10, 10); 
    window.requestAnimationFrame(animate); 
}; 
window.requestAnimationFrame(animate); 