// Time
function getTime(){
    document.querySelector("#timeElementA").innerHTML = new Date().toLocaleTimeString();
    document.querySelector("#timeElementB").innerHTML = new Date().toLocaleDateString();
}

getTime()
setInterval(getTime, 1000);

// Window Drag Functionality
function dragWindow(windowName){
    var initX = 0;
    var initY = 0;
    var curX = 0;
    var curY = 0;
    var windowElement = document.getElementById(windowName)

    if (document.getElementById(windowName + "topbar")){
        document.getElementById(windowName + "topbar").onmousedown = startDragging;
    } else {
        windowElement.onmousedown = startDragging;
    }

    function startDragging(e){
        e = e || window.event;
        e.preventDefault();

        initX = e.clientX;
        initY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = moveWindow;
    }

    function moveWindow(e){
        e = e || window.event;
        e.preventDefault();

        curX = initX - e.clientX;
        curY = initY - e.clientY;
        initX = e.clientX;
        initY = e.clientY;

        windowElement.style.top = (windowElement.offsetTop - curY) + "px";
        windowElement.style.left = (windowElement.offsetLeft - curX) + "px";
    }

    function stopDragging(){
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Window Minimizing/Opening
function closeWindow(windowElement){
    windowElement.style.display = "none"
};

function openWindow(windowElement){
    windowElement.style.display = "flex"
};

function openable(windowName){
    var windowOpen = document.querySelector("#" + windowName + "open")
    windowOpen.addEventListener("click", function(){
        openWindow(document.querySelector("#" + windowName))
        if (windowOpen.classList.contains("app")){
            selectApp(windowOpen)
        }
        highestIndex++;
        document.querySelector("#" + windowName).style.zIndex = highestIndex
    });

    var windowClose = document.querySelector("#" + windowName + "close")
    windowClose.addEventListener("click", function(){
        closeWindow(document.querySelector("#" + windowName))
        if (windowOpen.classList.contains("selectedapp")){
            deselectApp(windowOpen)
        }
    });
}

// Timer
var setTime = 300
var timeLeft = 300
var timerInterval = undefined

const timerDisplay = document.getElementById("timerdisplay")
const startBtn = document.getElementById("startBtn")
const resetBtn = document.getElementById("resetBtn")
const pauseBtn = document.getElementById("pauseBtn")

const minuteInput = document.getElementById("minuteInput")
const secondsInput = document.getElementById("secondsInput")
const setBtn = document.getElementById("setBtn")

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    const minuteDisplay = String(minutes).padStart(2,'0')
    const secondDisplay = String(seconds).padStart(2,'0')
    timerDisplay.textContent = `${minuteDisplay}:${secondDisplay}`
}

function pauseTimer(){
    clearInterval(timerInterval)
    timerInterval = undefined
    startBtn.disabled = false
    pauseBtn.disabled = true
    setBtn.disabled = false
}

function resetTimer(){
    pauseTimer();
    timeLeft = setTime;
    updateTimer();
}

startBtn.addEventListener("click", function(){
    if (timerInterval !== undefined || timeLeft <= 0) return

    startBtn.disabled = true
    pauseBtn.disabled = false
    setBtn.disabled = true
    document.getElementById("clockwind").play()

    timerInterval = setInterval(() => {
        if (timeLeft > 0){
            timeLeft--
            updateTimer()
        } else {
            clearInterval(timerInterval)
            timerInterval = undefined
            document.getElementById("beep").play()
            resetTimer()
        }
    }, 1000)
})
pauseBtn.addEventListener("click", pauseTimer)
resetBtn.addEventListener("click", resetTimer)
setBtn.addEventListener("click", function(){
    pauseTimer()

    const mins = Math.max(0,minuteInput.value)
    const secs = Math.max(0,Math.min(59,secondsInput.value))

    setTime = (mins * 60) + secs
    timeLeft = setTime
    updateTimer()
})

// Settings stuff
const backgroundNames = [
    "Kingdom_Outskirts",
    "Scholars_Nest",
    "Kings_Arsenal",
    "Red_Darkhouse",
    "Churchmouse_Streets",
    "Emerald_Lakeside",
    "The_Pale_Keep",
    "Moonlit_Pinnacle",
    "Crack_In_The_Geode",
    "Darkhouse_Depths",
    "Atelier_Aurum",
    "Subterra_Sanctum",
    "Looping_Hallway",
    "Reflecting_Pool"
]

const savedBackground = localStorage.getItem("backgroundImage")
var curBackgroundOption = undefined
if (savedBackground){
    document.body.style.backgroundImage = 'url(apps/system/backgrounds/' + savedBackground + '.png)'
    curBackgroundOption = document.querySelector("#"+ savedBackground)
    curBackgroundOption.classList.add("selectedapp")
} else {
    var randBackground = backgroundNames[Math.floor(Math.random() * backgroundNames.length)]
    curBackgroundOption = document.querySelector("#"+ randBackground)
    curBackgroundOption.classList.add("selectedapp")
    document.body.style.backgroundImage = 'url(apps/system/backgrounds/' + randBackground + '.png)'
}

for (const backgroundName of backgroundNames){
    document.querySelector("#"+ backgroundName).addEventListener("click", function(){
        if (curBackgroundOption){curBackgroundOption.classList.remove("selectedapp")}

        curBackgroundOption = document.querySelector("#"+ backgroundName)
        curBackgroundOption.classList.add("selectedapp")

        const location = "apps/system/backgrounds/" + backgroundName + ".png"
        document.body.style.backgroundImage = 'url(' + location + ')'

        localStorage.setItem("backgroundImage", backgroundName)
    })
}

const blurButton = document.querySelector("#blur")
function blur(){
    if (blurButton.textContent == "Blur: On") {
        blurButton.textContent = "Blur: Off"

        for (const div of document.body.children){
            div.classList.remove("blur")
        }
    } else {
        blurButton.textContent = "Blur: On"

        for (const div of document.body.children){
            div.classList.add("blur")
        }
    }
    localStorage.setItem("blur", blurButton.textContent)
}
blurButton.addEventListener("click",blur)
if (localStorage.getItem("blur")){
    if (localStorage.getItem("blur") == "Blur: On"){
        blurButton.textContent = "Blur: On"
        for (const div of document.body.children){
            div.classList.add("blur")
        }
    } else {
        blurButton.textContent = "Blur: Off"
        for (const div of document.body.children){
            div.classList.remove("blur")
        }
    }
} else {
    for (const div of document.body.children){
            div.classList.add("blur")
    }
}

const shadowButton = document.querySelector("#dropshadow")
function shadow(){
    if (shadowButton.textContent == "Drop Shadow: On") {
        shadowButton.textContent = "Drop Shadow: Off"

        for (const div of document.body.children){
            div.classList.remove("dropshadow")
        }
    } else {
        shadowButton.textContent = "Drop Shadow: On"

        for (const div of document.body.children){
            div.classList.add("dropshadow")
        }
    }
    localStorage.setItem("shadow", shadowButton.textContent)
}
shadowButton.addEventListener("click",shadow)
if (localStorage.getItem("shadow")){
    if (localStorage.getItem("shadow") == "Drop Shadow: On"){
        shadowButton.textContent = "Drop Shadow: On"
        for (const div of document.body.children){
            div.classList.add("dropshadow")
        }
    } else {
        shadowButton.textContent = "Drop Shadow: Off"
        for (const div of document.body.children){
            div.classList.remove("dropshadow")
        }
    }
} else {
    for (const div of document.body.children){
            div.classList.add("dropshadow")
    }
}

// Z-Index stuff
var highestIndex = 0

function addWindowRiseHandling(windowElement){
    windowElement.addEventListener("mousedown", function(){
        highestIndex++;
        windowElement.style.zIndex = highestIndex
    })
}

// Appbar Functionality
var selectedApp = undefined

function selectApp(appElement){
    appElement.classList.add("selectedapp")
    selectedApp = appElement
}

function deselectApp(appElement){
    appElement.classList.remove("selectedapp")
    selectedApp = undefined
}

// init
function initWindow(windowName){
    dragWindow(windowName);
    openable(windowName);
    addWindowRiseHandling(document.getElementById(windowName))
}

initWindow("landing")
initWindow("wiki")
initWindow("system")
initWindow("music")
initWindow("timer")
initWindow("timerset")