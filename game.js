const duration=20;
const goal=12;
const shuffleDelay=1400;

const canvas=document.getElementById('gameCanvas');
const ctx=canvas.getContext('2d');
const scoreDom=document.getElementById('score');
const timeDom=document.getElementById('time');
const bestDom=document.getElementById('best');
const messageDom=document.getElementById('message');
const startBtn=document.getElementById('startBtn');
const resetBtn=document.getElementById('resetBtn');

//game variables
const radius=31
let targets=[];
let score=0;
let best=0;
let running=false;
let deadline=0;
let nextShuffle=0;
let timer;

//generate random positions
function shuffleTargets(){
    const cells=[0,1,2,3,4,5,6,7];
    targets=[];
    for(let i=0;i<4;i++){
        const index=Math.floor(Math.random()*cells.length);
        const cell=cells.splice(index,1)[0];
        targets.push({
            x:75+(cell%4)*150,
            y:90+Math.floor(cell/4)*140,
            trap:i===3
        });
    }
    draw();
}

//render canvas
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //background star dots
    ctx.fillStyle="#7283b0";
    for(let i=0;i<35;i++){
        ctx.fillRect((i*97)%600,(i*53)%320,2,2);
    }
    for(const target of targets){
        ctx.beginPath();
        ctx.arc(target.x,target.y,radius,0,Math.PI*2);
        ctx.fillStyle=target.trap?"#a52b4d":"#ffdc73";
        ctx.fill();
        ctx.font="bold 36px system-ui";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillStyle=target.trap?"#ffffff":"#493515";
        ctx.fillText(target.trap?"❌":"🌟",target.x,target.y);
    }
}
//update score text
function updateScore(){
    scoreDom.textContent="Score:"+score+"/"+goal;
}

//game end
function finish(success){
    running=false;
    clearInterval(timer);
    best=Math.max(best,score);
    bestDom.textContent="Best Score: "+best;
    messageDom.textContent=success
    ?"Mission Complete! Play again"
    :"Time's up! Your score: "+score+". Try again!";
    startBtn.textContent="Play Again";
}

//timer tick
function tick(){
    const now=performance.now();
    const remaining=Math.max(0,Math.ceil((deadline-now)/1000));
    timeDom.textContent="Time Left: "+remaining+"s";
    if(now>=deadline){
        finish(false);
        return;
    }
    if(now>=nextShuffle){
        shuffleTargets();
        nextShuffle=now+shuffleDelay;
    }
}

//start game button
startBtn.addEventListener("click",function(){
    clearInterval(timer);
    score=0;
    running=true;
    const now=performance.now();
    deadline=now+duration*1000;
    nextShuffle=now+shuffleDelay;
    updateScore();
    shuffleTargets();
    messageDom.textContent="Collect yellow 🌟, avoid red ❌";
    startBtn.textContent="Restart";
    tick();
    timer=setInterval(tick,100);
});

//reset button
resetBtn.addEventListener("click",function(){
    clearInterval(timer);
    running=false;
    score=0;
    timeDom.textContent="Time Left: "+duration+"s";
    updateScore();
    bestDom.textContent="Best Score: "+best;
    messageDom.textContent="Click Start to begin adventure";
    startBtn.textContent="Start Game";
    shuffleTargets();
});

//canvas tap / click event
canvas.addEventListener("pointerdown",function(event){
    if(!running)return;
    tick();
    if(!running)return;
    const rect=canvas.getBoundingClientRect();
    const clickX=(event.clientX-rect.left)*canvas.width/rect.width;
    const clickY=(event.clientY-rect.top)*canvas.height/rect.height;
    for(const target of targets){
        const distance=Math.hypot(clickX-target.x,clickY-target.y);
        if(distance<=radius){
            score=Math.max(0,score+(target.trap?-2:1));
            updateScore();
            messageDom.textContent=target.trap
            ?"Hit trap! -2 points. Watch out for red ❌"
            :"Found ✨! +1 point";
            if(score>=goal){
                finish(true);
            }
            else{
                shuffleTargets();
                nextShuffle=performance.now()+shuffleDelay;
            }
            break;
        }
    }
});

//initialize screen
updateScore();
timeDom.textContent="Time Left: "+duration+"s";
shuffleTargets();
