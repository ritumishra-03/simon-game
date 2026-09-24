let gameseq = [];
let userseq = [];
  
let btns = ["red", "blue", "green", "yellow"];

let started = false;
let level = 0; 

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelup();
    }
});

function gameflash(btn) {
    if (!btn) return;
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    if (!btn) return;
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h3.innerText = `level ${level}`;
     
    let randIdx = Math.floor(Math.random() * 4);
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log("Game Sequence:", gameseq);
    gameflash(randbtn);
}
  

function checkans(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000); 
        }
    } else {
        h3.innerHTML = `game is over! your score was <b> ${level} </b> <br> press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
} 


function btnpress() {
    let btn = this;
    userflash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    console.log("User Sequence (Mouse):", userseq);
    checkans(userseq.length - 1);
}
 

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}


document.addEventListener("keydown", function(event) {
    if (started == true) {
        let key = event.key.toLowerCase();
        let targetcolor = "";
        
        if (key === 'r') targetcolor = "red";
        else if (key === 'b') targetcolor = "blue";
        else if (key === 'g') targetcolor = "green";
        else if (key === 'y') targetcolor = "yellow";

        if (targetcolor !== "") {
            let btn = document.getElementById(targetcolor);
            userflash(btn);
            userseq.push(targetcolor);
            console.log("user sequence (keyboard):", userseq);
            checkans(userseq.length - 1);
        }      
    }
});
     
function reset() {
    started = false; 
    gameseq = [];
    userseq = [];
    level = 0;
}
