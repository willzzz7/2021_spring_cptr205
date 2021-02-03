console.log('Hello, world!'); 

let canvas = document.querySelector('canvas'); 

let context = canvas.getContext('2d'); 

context.fillRect(50, 75, 10, 10); 

context.fillStyle = 'green'; 
context.fillRect(100, 75, 10, 10); 

document.addEventListener('click', click => {
    context.fillRect(50, 25, 30, 30); 
}); 

document.addEventListener('keydown', keydown => {
    if(keydown.key === 'c') {
        context.clearRect(0, 0, canvas.width, canvas.height); 
    }
}); 

// 