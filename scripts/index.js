let playerState = 'idle'; // defalt anim
let dropDown = document.getElementById('animations');
// document.getElementById("animations").selectedIndex = -1;
dropDown.addEventListener('change', (e)=>{
  playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx  = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// bring img in

const playerImage = new Image();
playerImage.src = '././assets/img/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;


let gameFrame = 0;
const staggerFrame = 5; // the higher the slower
const spriteAnimation = [];
const animationStates = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'getHit',
    frames: 4,
  }
]

animationStates.forEach((state,index) => {
  let frames = {
    loc:[],
  }
  // index = y (row in the sprite) 
  for (let j=0; j<state.frames;j++){
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({x: positionX, y: positionY})
  }
  spriteAnimation[state.name] = frames;
})
console.log(spriteAnimation)

function animate(){
  // clear the entire canvas
  ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
  let position = Math.floor(gameFrame/staggerFrame) % spriteAnimation[playerState].loc.length; // 7 frames
  /*
    1/5 = 0.2 Math.floor = 0  0 %6 =0
    2/5 = 0.4 Math.floor = 0  0 %6 =0
    3/5 = 0.6 Math.floor = 0  0 %6 =0
    4/5 = 0.8 Math.floor = 0  0 %6 =0
    5/5 = 1   Math.floor = 1  1 %6 =1

    0 %6 =0           6 %6 =0       12 %6 =0
    1 %6 =1           7 %6 =1       13 %6 =1
    2 %6 =2           8 %6 =2
    3 %6 =3           9 %6 =3
    4 %6 =4           10 %6 =4
    5 %6 =5           11 %6 =5
    says ^ frame by 1 every 5 milisec(staggerFrame)
  */
  let frameX = spriteWidth * position;
  let frameY = spriteAnimation[playerState].loc[position].y


  // ctx.fillRect(50,50,100,100); //(x,y,width,height)
  // calling drawing method from canvas
  ctx.drawImage(playerImage,(frameX),(frameY),spriteWidth,spriteHeight,0,0,CANVAS_WIDTH,CANVAS_HEIGHT); // context.drawImage(img,sx,sy,swidth,sheight,x,
  
  /*
  if(gameFrame%staggerFrame == 0){
    // for first row of the spripe
    if(frameX<maxFrame){ 
      frameX++
    } else {
      frameX = 0
    }

  }
  */ // replaced by position var above.

  

  gameFrame++
  requestAnimationFrame(animate)
}
animate()
console.log(CANVAS_WIDTH)