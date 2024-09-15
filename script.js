/* SIDEBAR */
$(".menu >ul >li").click(function(e){
    $(this).siblings().removeClass("active");
    $(this).toggleClass("active");
    $(this).find("ul").slideToggle();
    $(this).siblings().find("ul").slideUp();
    $(this).siblings().find("ul").find("li").removeClass("active");
});

$(".menu-btn").click(function(){
    $(".sidebar").toggleClass("active");
});

/* To DO LIST */
const inputBox = document.getElementById("task-input-box");
const listContainer = document.getElementById("task-list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("Please add a task!");
    }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span)
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
    saveData();
},false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

/* NOTES */
const create_note = document.querySelector(".notes-btn");
const notesCon = document.querySelector(".notes-container");

let notes = document.querySelectorAll(".notes-input-box");

function showNotes(){
    notesCon.innerHTML = localStorage.getItem("notes");
}
showNotes();

function updateStorage(){
    localStorage.setItem("notes", notesCon.innerHTML);
}

create_note.addEventListener("click", ()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    console.log("New note");
    inputBox.className = "notes-input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "task-cancel.png";
    notesCon.appendChild(inputBox).appendChild(img);
});

notesCon.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".notes-input-box");
        notes.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }
});

document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("inserLineBreak");
        event.preventDefault();
    }
})

/* AGE CALCULATOR */
let userInput = document.getElementById("date");
userInput.max = new Date().toISOString().split("T")[0];

function calcAge(){
    let birthDate = new Date(userInput.value);
    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth()+1;
    let y1 = birthDate.getFullYear();

    let today = new Date();

    let d2 = today.getDate();
    let m2 = today.getMonth()+1;
    let y2 = today.getFullYear();

    let d3, m3, y3;
    y3 = y2-y1;
    if(m2>=m1){
        m3 = m2-m1;
    }else{
        y3--;
        m3 = 12 + m2-m1;
    }

    if(d2 >= d1){
        d3 = d2-d1;
    }else{
        m3--;
        d3 = getDays(y1,m1) + d2-d1;
    }
    if(m3<0){
        m3 = 11;
        y3--;
    }
    result = document.getElementById("result");
    result.innerHTML = `You are <span>${y3}</span> years, <span>${m3}</span> months and <span>${d3}</span> days old!`;
}

function getDays(year, month){
    return new Date(year, month,0).getDate();
}


/* STOP TIMER */

let [seconds, minutes, hours] = [0,0,0];
let displayTime = document.getElementById("displayTime");
let timer = null;
const playbtn = document.getElementById("play-clock");

function stopwatch(){
    if(playbtn.dataset.image == "play"){
        playbtn.src = "play-b.png";
        playbtn.dataset.image = "stop";
    }
    seconds++;
    if(seconds == 60){
        seconds = 0;
        minutes++;
        if(minutes == 60){
            minutes = 0;
            hours++;
        }
    }
    let h = hours < 10? "0"+hours:hours;
    let m = minutes < 10? "0"+minutes:minutes;
    let s = seconds < 10? "0"+seconds:seconds;

    displayTime.innerHTML = h+":"+m+":"+s;

}

function watchStart(){
    if(timer!== null){
        clearInterval(timer);
    }
    timer = setInterval(stopwatch,1000);
}

function watchStop(){
    clearInterval(timer);
    if(playbtn.dataset.image == "stop"){
        playbtn.src = "play.png";
        playbtn.dataset.image = "play";
    }
}
function watchReset(){
    clearInterval(timer);
    [seconds, minutes, hours] = [0,0,0];
    displayTime.innerHTML = "00:00:00";
    if(playbtn.dataset.image == "stop"){
        playbtn.src = "play.png";
        playbtn.dataset.image = "play";
    }
}

