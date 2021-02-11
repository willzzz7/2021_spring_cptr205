console.log('Hello, world!'); 

let canvas = document.querySelector('canvas'); 

let context = canvas.getContext('2d'); 

context.fillRect(50, 75, 10, 10); 

context.fillStyle = 'green'; 
context.fillRect(100, 75, 10, 10); 

let click_count = 0; 
document.addEventListener('click', click => {
    if(++click_count > 5) {
        context.fillStyle = 'blue'; 
    }
    context.fillRect(50, 25, 30, 30); 
}); 

document.addEventListener('keydown', keydown => {
    if(keydown.key === 'c') {
        context.clearRect(0, 0, canvas.width, canvas.height); 
    }
}); 