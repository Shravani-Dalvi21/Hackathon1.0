// DOT PATTERN
const pattern = [
"0011101100","0100010000","1110000000","1000010100",
"1010000000","0010001000","1000010000","1000010000",
"0010101111","1000000010","0100000010","0000010010","1111110000",
"0000001000","1000100000","0000001011","1111000000","1000000000",
"1000011000","0010101111","1000000010","0100000010","0000010010","1111110000"
];

const dotsContainer = document.getElementById("dots");
pattern.forEach(row=>{
    row.split("").forEach(cell=>{
        const dot=document.createElement("div");
        dot.classList.add("dot");
        if(cell==="0") dot.style.opacity="0";
        dotsContainer.appendChild(dot);
    });
});

// TEXT
const title="> TELNET 81.169.179.241 23";

const menuLines=[
"ALLMYSTERY",
"1 HOW & WILL ES GEHEN?",
"2 FORUM",
"3 FILES",
"4 MYTHENBANK",
"5 REGISTRIEREN"
];

let menuElements=[];
let selectedIndex=0;

// SCROLL FLAGS
let scrollToMail = false;
let scrollToWWW = false;
let scrollToDotcom = false;
let scrollToFacebook = false;
let scrollToMobile = false;
let scrollToChatGPT = false;
let scrollToWeb3 = false;

// TYPE FUNCTION
function typeLine(el, text, speed = 140){
    return new Promise(resolve=>{
        let i = 0;
        const sound = document.getElementById("typingSound");

        function typing(){
            if(i < text.length){

                el.innerHTML += text[i++];

                // 📍 GET CURRENT SLIDE
                const currentSlide = Math.floor(window.scrollY / window.innerHeight);

                // 🔊 ONLY PLAY ON SLIDE 0 & 1
                if(sound && audioUnlocked && (currentSlide === 0 || currentSlide === 1)){
                    sound.currentTime = 0;
                    sound.play().catch(()=>{});
                } else {
                    // ❌ FORCE STOP on other slides
                    if(sound){
                        sound.pause();
                        sound.currentTime = 0;
                    }
                }

                setTimeout(typing, speed);
            } else {
                if(sound){
                    sound.pause();
                    sound.currentTime = 0;
                }
                resolve();
            }
        }
        typing();
    });
}

// POP-UP FUNCTION
function showPopup(text,duration=1500){
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerText = text;
    document.body.appendChild(popup);
    // slide down
    setTimeout(()=>{ popup.style.top = "20px"; }, 50);
    // hide after duration
    setTimeout(()=>{
        popup.style.top = "-60px";
        setTimeout(()=> popup.remove(), 600);
    }, duration);
}

// DOT-COM CRASH FUNCTION
function startCrash() {
    let boom = document.getElementById("boomSection");

    // COLLAPSE BOOM SECTION
    boom.classList.add("dotcomCollapse");

    // AFTER COLLAPSE → SHOW CRASH
    setTimeout(() => {
        boom.style.display = "none";
        document.getElementById("crashSection").style.display = "block";
        document.getElementById("dotcomScreen").classList.add("crashMode");
    }, 1000);

    // STOCK FALL
    let value = 100;
    let interval = setInterval(() => {
        value -= 5;

        if (value <= 5) {
            value = 5;
            clearInterval(interval);
        }

        document.getElementById("stockValue").innerText = value;

    }, 80);
}

// START SEQUENCE
let started=false;
async function start(){
    const titleEl=document.getElementById("title");
    await typeLine(titleEl,title,150);

    const menu=document.getElementById("menu");

    // TYPE MENU
    for(let line of menuLines){
        let div=document.createElement("div");
        div.classList.add("line");
        menu.appendChild(div);
        await typeLine(div,line,130);
        menuElements.push(div);
    }

    updateSelection();

    // SLIDE 1 POPUP
    
    showPopup("In 1960s first msg sent, and that is crashed",1500);
    await new Promise(r=>setTimeout(r,1600)); // wait for popup animation

    // GREEN CRASH TYPING BELOW MENU ITEM 5 WITH ENTERS
    const crashDiv = document.createElement("div");
    crashDiv.classList.add("line");
    crashDiv.style.marginTop="10px";
    menu.appendChild(crashDiv);

    const crashLines = [
        "LOGIN",
        "sending data.......",
        "L",
        "O",
        "crashed..."
    ];

    for(let line of crashLines){
        await typeLine(crashDiv, line + "\n", 100);
    }

    // SET FLAG TO SCROLL TO MAIL SCREEN
    scrollToMail = true;
    scrollToScreen(1);
    
    if(!started){
        started=true;
        // SLIDE 2 POPUP BEFORE MAIL
        showPopup("The first popular internet use — email invented", 1500);
        setTimeout(mailScreen,1600); // delay mail typing until popup disappears
    }
}

// SCROLL FUNCTION WITH FLAGS
function scrollToScreen(slideIndex) {
    window.scrollTo({
        top: window.innerHeight * slideIndex,
        behavior: "smooth"
    });
}
window.addEventListener("scroll", () => {
    const sound = document.getElementById("typingSound");
    const currentSlide = Math.floor(window.scrollY / window.innerHeight);

    // STOP sound if NOT slide 1 or 2
    if(sound && !(currentSlide === 0 || currentSlide === 1)){
        sound.pause();
        sound.currentTime = 0;
    }
});

// HIGHLIGHT MENU
function updateSelection(){
    menuElements.forEach((el,i)=>{
        if(i===selectedIndex){
            el.style.background="#33ff99";
            el.style.color="#000";
        } else {
            el.style.background="transparent";
            el.style.color="#33ff99";
        }
    });
}

// NAVIGATION
document.addEventListener("keydown",(e)=>{
    if(e.key==="ArrowDown"){
        selectedIndex=(selectedIndex+1)%menuElements.length;
        updateSelection();
    }
    else if(e.key==="ArrowUp"){
        selectedIndex=(selectedIndex-1+menuElements.length)%menuElements.length;
        updateSelection();
    }
});

// SCROLL CHECKER
setInterval(() => {
    const scrollY = window.scrollY;
    const sectionHeight = window.innerHeight;
    
    if (scrollToMail && scrollY < sectionHeight) {
        scrollToScreen(1);
    }
    
    if (scrollToWWW && scrollY >= sectionHeight && scrollY < sectionHeight * 2) {
        scrollToScreen(2);
    }
    
    if (scrollToDotcom && scrollY >= sectionHeight * 2 && scrollY < sectionHeight * 3) {
        scrollToScreen(3);
    }
    if (scrollToMobile && scrollY >= sectionHeight * 4 && scrollY < sectionHeight * 5) {
    scrollToScreen(5);
}
if (scrollToChatGPT && scrollY >= sectionHeight * 5 && scrollY < sectionHeight * 6) {
    scrollToScreen(6);
}
if (scrollToWeb3 && scrollY >= sectionHeight * 6 && scrollY < sectionHeight * 7) {
    scrollToScreen(7);
}
}, 100);

// SECOND SCREEN MAIL
async function mailScreen(){
    const c=document.getElementById("mailContent");

    async function add(text){
        let div=document.createElement("div");
        div.className="line";
        c.appendChild(div);
        await typeLine(div,text,120);
    }

    await add("Please Sign On");
    await add(">YD ->IC001");
    await add("Password:");
    await add("On at 19:40 12/12/86 GMT");

    await add("");
    await add("Mail call (1 Unread express)");

    await add("");
    await add("1   From MIC-LIVE      Delivered:");
    await add("Fri 12-Dec-86 19:29 GMT Sys 10081");
    await add("Subject: Meeting");

    await add("");
    await add("Read or Scan: rEAD");

    await add("");
    await add("From: MIC-LIVE");
    await add("To: MAC");

    await add("");
    await add("Is it alright for you and Fred,to meet me in the office at 10 o'clock?");

    await add("");
    await add("David");
    await add("Mail Id:   IPM-10081-861212-1771312NNL\n (*..kjU9t")
    await add("Action Required");

    // SET FLAG FOR DOTCOM SCROLL AFTER 1.5s
    setTimeout(()=>{
        scrollToWWW = true;
        const grid = document.getElementById("grid");
        grid.style.display="block";
    },1500);
}

// SHOW GRID ONLY ON SLIDE 2
const grid=document.getElementById("grid");
window.addEventListener("scroll",()=>{
    const scrollY = window.scrollY;
    const sectionHeight = window.innerHeight;
    
    if(scrollY >= sectionHeight && scrollY < sectionHeight * 2){
        grid.style.display="block";
    } else {
        grid.style.display="none";
    }
});


// AUTO SCROLL TO DOTCOM AFTER 5s ON WWW SCREEN
setTimeout(()=>{
    if(window.scrollY >= window.innerHeight * 2){
        scrollToDotcom = true;
    }
}, 7000);

// AUTO TRIGGER DOTCOM CRASH AFTER 6s
setTimeout(()=>{
    if(window.scrollY >= window.innerHeight * 3){
        setTimeout(startCrash, 6000);
    }
}, 8000);
setTimeout(()=>{
    if(window.scrollY >= window.innerHeight * 3){
        scrollToFacebook = true;
    }
}, 12000);
setTimeout(()=>{
    if(window.scrollY >= window.innerHeight * 4){
        scrollToMobile = true;
    }
}, 15000);
setTimeout(()=>{
    if(window.scrollY >= window.innerHeight * 5){
        scrollToChatGPT = true;
    }
}, 18000);
setTimeout(()=>{
    if(window.scrollY >= window.innerHeight * 6){
        scrollToWeb3 = true;
    }
}, 22000);
let currentUser = "";

// LOGIN FUNCTION
function login(){
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user && pass){
        currentUser = user;

        document.getElementById("loginPage").style.display = "none";
        document.getElementById("mainPage").style.display = "block";

        document.getElementById("userDisplay").innerText = user;

        loadSamplePosts();
    }else{
        alert("Enter details!");
    }
}

// SAMPLE POSTS (OTHERS POSTS)
function loadSamplePosts(){
    addPostToFeed("Mark", "Welcome to Facebook!");
    addPostToFeed("Alice", "This is old Facebook style 😄");
}

// ADD NEW POST
function addPost(){
    let text = document.getElementById("postInput").value;

    if(text){
        addPostToFeed(currentUser, text);
        document.getElementById("postInput").value = "";
    }
}

// CREATE POST ELEMENT
function addPostToFeed(user, text){
    let postDiv = document.createElement("div");
    postDiv.className = "post";

    postDiv.innerHTML = `
        <b>${user}</b>
        <p>${text}</p>

        <div class="actions">
            <button onclick="likePost(this)">Like</button>
            <button onclick="showComment(this)">Comment</button>
            <span>0 Likes</span>
        </div>

        <div class="commentBox" style="display:none;">
            <input type="text" placeholder="Write comment">
            <button onclick="addComment(this)">Post</button>
            <div class="comments"></div>
        </div>
    `;

    document.getElementById("posts").prepend(postDiv);
}

// LIKE BUTTON
function likePost(btn){
    let span = btn.parentElement.querySelector("span");
    let count = parseInt(span.innerText);

    count++;
    span.innerText = count + " Likes";
}

// SHOW COMMENT BOX
function showComment(btn){
    let box = btn.parentElement.nextElementSibling;
    box.style.display = box.style.display === "none" ? "block" : "none";
}

// ADD COMMENT
function addComment(btn){
    let input = btn.previousElementSibling;
    let text = input.value;

    if(text){
        let commentDiv = document.createElement("p");
        commentDiv.innerHTML = "<b>" + currentUser + ":</b> " + text;

        btn.nextElementSibling.appendChild(commentDiv);
        input.value = "";
    }
}
// MOBILE APPS POP
setTimeout(()=>{
    let apps = document.getElementById("apps");
    if(apps){
        apps.style.opacity="1";

        document.querySelectorAll(".app").forEach((app,i)=>{
            setTimeout(()=>{
                app.style.animation="pop 0.4s forwards";
            }, i*150);
        });
    }
}, 3000);

// RIPPLE EFFECT
let phone = document.getElementById("phoneDisplay");
if(phone){
    phone.addEventListener("click", function(e){
        let ripple = document.createElement("div");
        ripple.className="ripple";

        ripple.style.left = e.offsetX+"px";
        ripple.style.top = e.offsetY+"px";
        ripple.style.width = ripple.style.height = "20px";

        this.appendChild(ripple);

        setTimeout(()=>ripple.remove(),600);
    });
}
// CHATGPT FUNCTIONS

function sendMsg(){
    let input = document.getElementById("userInput");
    let text = input.value;

    if(!text) return;

    addMsg(text, "user");
    input.value="";

    setTimeout(()=>{
        autoReply(text);
    }, 800);
}

function quickAsk(text){
    document.getElementById("userInput").value = text;
    sendMsg();
}

function addMsg(text, type){
    let div = document.createElement("div");
    div.className = "msg " + type;
    div.innerText = text;

    document.getElementById("chat").appendChild(div);
    div.scrollIntoView();
}

function autoReply(userText){
    let reply = "🤖 ";

    if(userText.toLowerCase().includes("ai")){
        reply += "AI means machines that think and learn.";
    }
    else if(userText.toLowerCase().includes("internet")){
        reply += "Internet evolved from ARPANET to Web to Mobile Apps.";
    }
    else{
        reply += "This is a simulated AI response.";
    }

    addMsg(reply, "bot");
}
// === WEB3 BLOCKCHAIN ANIMATION ===
let blockchainCtx;
let blocks = [];
let blockId = 0;

function initWeb3() {
    const canvas = document.getElementById('blockchainCanvas');
    blockchainCtx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 500;
    
    // CREATE INITIAL BLOCKS
    for(let i = 0; i < 8; i++) {
        createBlock();
    }
    
    // ANIMATE
    animateBlockchain();
}

function createBlock() {
    blocks.push({
        id: blockId++,
        x: Math.random() * 700 + 50,
        y: Math.random() * 400 + 50,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        hash: '0x' + Math.random().toString(16).substr(2, 64).toUpperCase(),
        txCount: Math.floor(Math.random() * 2000) + 100,
        size: 60 + Math.random() * 20
    });
}

function animateBlockchain() {
    blockchainCtx.clearRect(0, 0, 800, 500);
    
    // DRAW CONNECTION LINES
    blockchainCtx.strokeStyle = 'rgba(0,255,255,0.2)';
    blockchainCtx.lineWidth = 2;
    for(let i = 0; i < blocks.length; i++) {
        for(let j = i + 1; j < blocks.length; j++) {
            const dist = Math.hypot(blocks[i].x - blocks[j].x, blocks[i].y - blocks[j].y);
            if(dist < 150) {
                blockchainCtx.beginPath();
                blockchainCtx.moveTo(blocks[i].x + blocks[i].size/2, blocks[i].y + blocks[i].size/2);
                blockchainCtx.lineTo(blocks[j].x + blocks[j].size/2, blocks[j].y + blocks[j].size/2);
                blockchainCtx.stroke();
            }
        }
    }
    
    // UPDATE & DRAW BLOCKS
    blocks.forEach(block => {
        // PHYSICS
        block.x += block.vx;
        block.y += block.vy;
        if(block.x < 0 || block.x > 740) block.vx *= -1;
        if(block.y < 0 || block.y > 450) block.vy *= -1;
        
        // DRAW BLOCK
        const gradient = blockchainCtx.createLinearGradient(block.x, block.y, block.x + block.size, block.y + block.size);
        gradient.addColorStop(0, '#00ffff');
        gradient.addColorStop(1, '#0080ff');
        
        blockchainCtx.fillStyle = gradient;
        blockchainCtx.shadowColor = '#00ffff';
        blockchainCtx.shadowBlur = 15;
        blockchainCtx.fillRect(block.x, block.y, block.size, block.size);
        
        // BLOCK GLOW
        blockchainCtx.strokeStyle = 'rgba(0,255,255,0.8)';
        blockchainCtx.lineWidth = 2;
        blockchainCtx.strokeRect(block.x, block.y, block.size, block.size);
        
        // TEXT
        blockchainCtx.fillStyle = 'white';
        blockchainCtx.font = '12px Courier New';
        blockchainCtx.textAlign = 'center';
        blockchainCtx.fillText(`#${block.id}`, block.x + block.size/2, block.y + 25);
        blockchainCtx.font = '10px Courier New';
        blockchainCtx.fillText(`${block.txCount} TX`, block.x + block.size/2, block.y + 42);
        blockchainCtx.fillText(block.hash.substr(0,12) + '...', block.x + block.size/2, block.y + 55);
    });
    
    // ADD NEW BLOCKS
    if(Math.random() < 0.02) createBlock();
    
    requestAnimationFrame(animateBlockchain);
}

// === SCROLL TO WEB3 ===
scrollToWeb3 = false;
setTimeout(()=>{
    if(window.scrollY >= window.innerHeight * 6){
        scrollToWeb3 = true;
    }
}, 20000);

// SCROLL CHECKER UPDATE
// Add this to existing scroll checker interval:
if (scrollToWeb3 && scrollY >= sectionHeight * 6 && scrollY < sectionHeight * 7) {
    scrollToScreen(7);
}

// INIT WEB3 WHEN VISIBLE
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            initWeb3();
        }
    });
});
observer.observe(document.querySelector('.web3Screen'));
// 🔓 UNLOCK AUDIO (fix autoplay error)
let audioUnlocked = false;

document.addEventListener("click", () => {
    const sound = document.getElementById("typingSound");

    if(sound && !audioUnlocked){
        sound.play().then(()=>{
            sound.pause();
            sound.currentTime = 0;
            audioUnlocked = true;
        }).catch(()=>{});
    }
});

start();