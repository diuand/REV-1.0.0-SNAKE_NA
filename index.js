window.onload = init

// size of canvas
var rows = 30
var cols = 30
var block_size = 22
var context 
var board

// random snake location
var snake_x = block_size * Math.floor(Math.random()*30)
var snake_y = block_size * Math.floor(Math.random()*30)

var snake_body = []

//game settings
var game_over = false
var end_game = document.getElementsByClassName('end_game')[0]
var start_game = document.getElementsByClassName('start')[0]
const score = document.getElementsByClassName('score')[0]

var apple_x
var apple_y
var direction = 0

var interval

// velocity
var move_y = 0
var move_x = 0 



function init(){
  // canvas setup
  board = document.getElementsByClassName('board')[0]
  board.height = rows * block_size
  board.width = cols * block_size
  context = board.getContext("2d")

  // spawn the first apple
  random_apple()

  //keyup snake move on (change_dir)
  document.addEventListener('keyup',change_dir)

  // game speed
  interval = setInterval(update,700/10)
  

}

// snake arrowkeys move
function change_dir(e){
  if (e.key == 'ArrowLeft' && move_y != 1){
    move_y = -1
    move_x = 0
    
  }
  else if (e.key == 'ArrowUp'&& move_x != 1 ){
    move_y = 0
    move_x = -1
   
  }
  else if (e.key == 'ArrowDown'&& move_x != -1 ){
    move_y = 0
    move_x = 1
   
  }
  else if (e.key == 'ArrowRight'&& move_y != -1 ){
    move_y = 1
    move_x = 0
   
  }
}

function update(){
  //backgrouns
  context.fillStyle = 'black'
  context.fillRect(0,0,board.width,board.height)
  
  //moving the snake with one block size
  snake_x += move_x * block_size
  snake_y += move_y * block_size

  // draw the apple
  base_image = new Image()
  base_image.src = 'done.png';

  context.fillStyle = 'red'
  context.drawImage(base_image,apple_x,apple_y,22,22)
  // context.fillRect(apple_x,apple_y,block_size,block_size)
  
  //incease the snake size
  if (apple_x === snake_y && apple_y === snake_x){
    snake_body.push([apple_x,apple_y])
    score.textContent =  Number(score.textContent) + 1
    random_apple()
  }

  //draw the snake
  context.fillStyle = 'lime'
  context.fillRect(snake_y,snake_x,block_size,block_size)
  for (let i =0;i<snake_body.length;i++){
    context.fillRect(snake_body[i][0],snake_body[i][1],block_size,block_size)
  }
  for (let i=snake_body.length-1;i>0;i--){
    snake_body[i] = snake_body[i-1]
  }
  if (snake_body.length){
    snake_body[0] = [snake_y,snake_x]
  }

  // if snake is out of canvas, game is over
  if (snake_x < 0 || snake_x > block_size * rows -1 || snake_y < 0 || snake_y > block_size * cols -1){
    game_over=true
    end_game.textContent = 'GAME OVER'
  }

  // if snake hit himself, game is over
  for (let i =1;i<snake_body.length;i++){
    if(snake_body[0][0] == snake_body[i][0] && snake_body[0][1] == snake_body[i][1]){
      game_over=true
      end_game.textContent = 'GAME OVER'
    }

  }

  // on full score, game is over
  if (score.textContent == (rows*cols)-1) {
    game_over=true
    end_game.textContent = 'YOU WON'
  }

  // on game over canvas is black, reset button appear 
  if (game_over){
    context.fillStyle = 'black'
    context.fillRect(0,0,board.width,board.height)
    var buton = document.createElement('div')
    if (end_game.textContent == 'YOU WON'){
      buton.innerHTML = '<button class="reload" onClick="window.location.reload();">Play Again</button>'
    }
    else{buton.innerHTML = '<button class="reload" onClick="window.location.reload();">Try Again</button>'}
    document.body.appendChild(buton)
    clearInterval(interval)
  }
 }

// get a random location in canvas != snake location
function random_apple(){
  apple_x = Math.floor(Math.random() * cols) * block_size
  apple_y = Math.floor(Math.random() * rows) * block_size
  if (apple_x === snake_x && apple_y === snake_y){
    random_apple()
    
  }
  
}