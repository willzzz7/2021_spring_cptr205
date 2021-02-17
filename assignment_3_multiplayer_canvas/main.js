window.addEventListener('DOMContentLoaded', DOMContentLoaded => {

    // GLOBAL
    const our_name = Math.random().toString(); 
    const our_game = 'evan_assignment_3'; 
    const game_events = {}; 

    // 2D CANVAS SETUP
    const game = document.querySelector('canvas').getContext('2d'); 
    const resize_canvas = () => {
        game.canvas.width = game.canvas.clientWidth; 
        game.canvas.height = game.canvas.clientHeight; 

        // game.canvas.width = game.canvas.clientWidth * window.devicePixelRatio; 
        // game.canvas.height = game.canvas.clientHeight * window.devicePixelRatio; 
    }; 
    resize_canvas(); 
    window.addEventListener('resize', resize_canvas); 
    
    // WEBSOCKET STUFF
    const ws = new WebSocket('wss://southwestern.media/game_dev'); 
    ws.addEventListener('open', open => {
        console.log('WEBSOCKET CONNECTION OPENED'); 
        
        game.canvas.addEventListener('mousemove', mousemove => {
            const data = {}; 
            data.Game = our_game; 
            data.Name = our_name; 
            const our_message = {}; 
            our_message.x = mousemove.clientX; 
            our_message.y = mousemove.clientY; 
            data.Message = JSON.stringify(our_message); 
            ws.send(JSON.stringify(data)); 
        }); 
    }); 
    ws.addEventListener('close', close => {
        console.log('WEBSOCKETS CLOSED'); 
    }); 
    ws.addEventListener('error', ws_error => {
        console.log('WEBSOCKETS ERROR'); 
    }); 
    ws.addEventListener('message', message => {
        const message_data = JSON.parse(message.data); 
        if(message_data.Game !== our_game) {
            return; 
        }
        message_data.Message = JSON.parse(message_data.Message); 
        game_events[message_data.Name] = {x: message_data.Message.x, y: message_data.Message.y}; 

    }); 

    // RENDER LOOP
    let r_y = 0; 
    const render = () => {
        game.clearRect(0, 0, game.canvas.width, game.canvas.height); 
        game.fillStyle = '#00F'; 
        game.fillRect(0, r_y, game.canvas.width / 2, game.canvas.height / 2); 

        game.lineWidth = 20; 
        game.strokeRect(game.canvas.width / 2, r_y, game.canvas.width / 2, game.canvas.height / 2); 

        game.save(); 
        game.strokeStyle = '#0F0'; 
        game.lineCap = 'round'; 
        game.beginPath(); 
        game.moveTo(3 * game.canvas.width / 4, game.canvas.height / 4); 
        game.lineTo(3 * game.canvas.width / 4, game.canvas.height / 4); 
        game.stroke(); 
        game.restore(); 

        game.lineCap = 'round'; 
        game.beginPath(); 
        game.moveTo(3 * game.canvas.width / 4, 3 * game.canvas.height / 4); 
        game.lineTo(3 * game.canvas.width / 4, 3 * game.canvas.height / 4); 
        game.stroke(); 

        Object.keys(game_events).forEach(key => {
            const player = game_events[key]; 
            game.fillStyle = '#F00'; 
            game.fillRect(player.x, player.y, 20, 20); 
        }); 
        
        window.requestAnimationFrame(render); 
    }; 
    window.requestAnimationFrame(render); 
}); 