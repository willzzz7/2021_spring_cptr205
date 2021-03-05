window.addEventListener('DOMContentLoaded', DOMContentLoaded => {

    // MESSAGE TYPES
    const messages = {}; 
    messages.NEW_PLAYER = 'NEW_PLAYER'; 
    messages.PLAYER_LEAVING = 'PLAYER_LEAVING'; 
    
    // GLOBAL VARIABLES
    const game = {}; 
    game.Game = 'evan_assignment_3'; 
    game.Name = Math.random().toString(); 
    let game_state = {}; 

    // JUST FOR FUN: EACH PLAYER WILL BE A RANDOM COLOR
    let our_fill = '#'; 
    for(let i = 0; i < 3; i++) {
        our_fill += Math.floor(Math.random() * 16).toString(16); 
    }

    // 2D CANVAS SETUP
    const render = document.querySelector('canvas').getContext('2d'); 
    const resize_canvas = () => {
        render.canvas.width = render.canvas.clientWidth // * window.devicePixelRatio; 
        render.canvas.height = render.canvas.clientHeight // * window.devicePixelRatio; 
    }; 
    resize_canvas(); 
    window.addEventListener('resize', resize_canvas); 
    
    // SEND STATE THROUGH WEBSOCKET
    const send_state = () => {
        game.Message = JSON.stringify(game_state); 
        ws.send(JSON.stringify(game)); 
    }; 
    
    // WEBSOCKET 
    const ws = new WebSocket('wss://southwestern.media/game_dev'); 
    ws.addEventListener('open', open => {
        console.log('WILLIAM IS HERE'); //changes here
        game.Message = messages.NEW_PLAYER; 
        ws.send(JSON.stringify(game)); 
        
        
        
        render.canvas.addEventListener('mousemove', mousemove => {
            game_state[game.Name] = {}; 
            game_state[game.Name].fill = our_fill; 
            game_state[game.Name].x = mousemove.clientX; 
            game_state[game.Name].y = mousemove.clientY; 
            send_state(); 
        }); 
        
        render.canvas.addEventListener('click', click => {
            game_state[game.Name] = {}; 
            game_state[game.Name].x = click.clientX; 
            game_state[game.Name].y = click.clientY; 
            alert(game_state[game.Name].x + " + " + game_state[game.Name].y)
            send_state(); 
        });
    }); 
    ws.addEventListener('close', close => {
        console.log('WEBSOCKETS CLOSED'); 
    }); 
    ws.addEventListener('error', ws_error => {
        console.log('WEBSOCKETS ERROR'); 
    }); 
    ws.addEventListener('message', message => {
        const incoming_message = JSON.parse(message.data); 
        if(incoming_message.Game !== game.Game) {
            return; 
        }
        if(incoming_message.Message === messages.NEW_PLAYER) {
            console.log('SAW A NEW PLAYER'); 
            send_state(); 
            return; 
        }
        game_state = JSON.parse(incoming_message.Message); 
        console.log(game_state); 
    }); 

    // BROADCAST WHEN WE LEAVE
    window.addEventListener('beforeunload', beforeunload => {
        delete game_state[game.Name]; 
        send_state(); 
        delete beforeunload['returnValue']; 
    }); 

    // ANIMATION LOOP
    let randX = Math.floor(Math.random() * Math.floor(render.canvas.width));
    let randY = Math.floor(Math.random() * Math.floor(render.canvas.height));
    const animation = () => {
        render.clearRect(0, 0, render.canvas.width, render.canvas.height); 
        
        render.fillStyle = '#00F'; 
        render.fillRect(0, 0, render.canvas.width / 2, render.canvas.height / 2); 
        render.fillRect(render.canvas.width / 2, render.canvas.height / 2, render.canvas.width / 2, render.canvas.height / 2); 
        
        render.fillStyle = '#FF0000'; 
        //render.arc(render.canvas.width / 2, render.canvas.height / 2, render.canvas.width / 10, 0, 2 * Math.PI);
        render.fillRect(randX, randY, render.canvas.width / 64, render.canvas.height / 64)

        Object.values(game_state).forEach(player => {
            render.beginPath(); 
            render.fillRect(player.x, player.y, render.canvas.width / 64, render.canvas.height / 64) //changes to square instead of circle
            //render.arc(player.x, player.y, render.canvas.width / 64, 0, 2 * Math.PI); 
            render.fillStyle = player.fill; 
            render.fill(); 
        }); 
        
        window.requestAnimationFrame(animation); 
    }; 
    window.requestAnimationFrame(animation); 
}); 
