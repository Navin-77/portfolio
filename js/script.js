// ================= BACK TO TOP BUTTON =================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){
        backToTop.classList.add("show");
    }
    else{
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

});

// ================= ACTIVE NAVBAR =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }

    });

});

// ================= PROFESSIONAL SCROLL ANIMATION =================

const animatedElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right, .reveal-scale"
);

function revealAnimation() {

    animatedElements.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if (top < window.innerHeight - 80) {
            element.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealAnimation);

revealAnimation();

// ================= IMAGE GALLERY =================

const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");
const galleryButtons = document.querySelectorAll(".gallery-btn");

const closeGallery = document.querySelector(".close-gallery");
const prevBtn = document.querySelector(".gallery-prev");
const nextBtn = document.querySelector(".gallery-next");
const galleryCounter = document.getElementById("galleryCounter");
const galleryThumbnails = document.getElementById("galleryThumbnails");

const galleryTitle = document.getElementById("galleryTitle");
const galleryDescription = document.getElementById("galleryDescription");

const certificates = [

    {
        image: "assets/certificates/ibm-ai.jpeg",
        title: "IBM SkillsBuild - Getting Started with Artificial Intelligence",
        description: ""
    },

    {
        image: "assets/certificates/cisco-datascience.png",
        title: "Cisco Networking Academy - Data Science Essentials with Python",
        description: ""
    },

    {
        image: "assets/certificates/cisco-networking.png",
        title: "Cisco Networking Academy - Networking Basics",
        description: ""
    },

    {
        image: "assets/certificates/infosys-problem-solving.jpeg",
        title: "Infosys Springboard - Computational Problem Solving",
        description: ""
    },

    {
        image: "assets/certificates/forage-cloud.jpeg",
        title: "Forage - Introduction to Cloud Job Simulation",
        description: ""
    },

    {
        image: "assets/certificates/smartedu-iot.jpeg",
        title: "SmartED Innovations - Internet of Things Internship",
        description: ""
    },

    {
        image: "assets/certificates/forage-genai.png",
        title: "Forage - GenAI Powered Data Analytics",
        description: ""
    },

    {
        image: "assets/certificates/codtech-c.png",
        title: "CodTech IT Solutions - C Programming Internship",
        description: ""
    },

    {
        image: "assets/certificates/tcs-ion.png",
        title: "TCS iON Career Edge - IT Primer",
        description: ""
    },

    {
        image: "assets/certificates/cognitive-prompt.png",
        title: "Cognitive Class - Prompt Engineering for Everyone",
        description: ""
    }

];

const galleryImages = {

    stock:[

        {

            image:"images/stock-dashboard-1.png",

            title:"Real-Time Stock Dashboard",

            description:"Interactive dashboard built with Streamlit, Plotly and yFinance for live market tracking."

        },

        {

            image:"images/stock-dashboard-2.png",

            title:"Live Stock Analysis",

            description:"Visualize stock prices, market trends and historical performance."

        }

    ]

};

let currentProject = [];
let currentIndex = 0;

let currentZoom = 1;

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

// ================= UPDATE COUNTER =================

function updateCounter(){

    galleryCounter.textContent =
        `${currentIndex + 1} / ${currentProject.length}`;

}

// ================= LOAD THUMBNAILS =================

function loadThumbnails(){

    galleryThumbnails.innerHTML = "";

    currentProject.forEach((item,index)=>{

        const thumb = document.createElement("img");

        thumb.src = item.image;

        thumb.classList.add("gallery-thumbnail");

        if(index === currentIndex){

            thumb.classList.add("active");

        }

        thumb.addEventListener("click",()=>{

            changeImage(index);

        });

        galleryThumbnails.appendChild(thumb);

    });

}

// ================= CHANGE IMAGE =================

function changeImage(index){

    galleryImage.classList.add("fade");

    setTimeout(()=>{

        currentIndex = index;

        galleryImage.src = currentProject[currentIndex].image;

        galleryTitle.textContent =
            currentProject[currentIndex].title;

        galleryDescription.textContent =
            currentProject[currentIndex].description;

        updateCounter();

        loadThumbnails();

        currentZoom = 1;

        galleryImage.style.transform =
            "translateY(-60px) scale(1)";

        galleryImage.classList.remove("fade");

    },180);

}

// ================= OPEN GALLERY =================

galleryButtons.forEach(button=>{

    button.addEventListener("click",function(e){

        e.preventDefault();

        const project = this.dataset.project;

        currentProject = galleryImages[project];

        currentIndex = 0;

        galleryImage.src =
            currentProject[currentIndex].image;

        galleryTitle.textContent =
            currentProject[currentIndex].title;

        galleryDescription.textContent =
            currentProject[currentIndex].description;

        currentZoom = 1;

        galleryImage.style.transform =
            "translateY(-60px) scale(1)";

        updateCounter();

        loadThumbnails();

        galleryModal.classList.add("show");

    });

});

// ================= NEXT =================

nextBtn.addEventListener("click",()=>{

    let next = currentIndex + 1;

    if(next >= currentProject.length){

        next = 0;

    }

    changeImage(next);

});

// ================= PREVIOUS =================

prevBtn.addEventListener("click",()=>{

    let prev = currentIndex - 1;

    if(prev < 0){

        prev = currentProject.length - 1;

    }

    changeImage(prev);

});

// ================= KEYBOARD NAVIGATION =================

document.addEventListener("keydown",(e)=>{

    if(!galleryModal.classList.contains("show")) return;

    if(e.key === "ArrowRight"){

        let next = currentIndex + 1;

        if(next >= currentProject.length){

            next = 0;

        }

        changeImage(next);

    }

    if(e.key === "ArrowLeft"){

        let prev = currentIndex - 1;

        if(prev < 0){

            prev = currentProject.length - 1;

        }

        changeImage(prev);

    }

    if(e.key === "Escape"){

        galleryModal.classList.remove("show");

        if(openedFromCertificates){

            certificateModal.style.display = "block";

            openedFromCertificates = false;

        }
        galleryCounter.style.display = "block";

        currentZoom = 1;

        galleryImage.style.transform =
            "translateY(-60px) scale(1)";

    }

});

// ================= CLOSE =================

closeGallery.addEventListener("click",()=>{

    galleryModal.classList.remove("show");

    if(openedFromCertificates){

        certificateModal.style.display = "block";

        openedFromCertificates = false;

    }

    galleryCounter.style.display = "block";

    currentZoom = 1;

    galleryImage.style.transform =
        "translateY(-60px) scale(1)";

});

// ================= CLICK OUTSIDE =================

galleryModal.addEventListener("click",(e)=>{

    if(e.target === galleryModal){

        galleryModal.classList.remove("show");

        if(openedFromCertificates){

            certificateModal.style.display = "block";

            openedFromCertificates = false;

        }
        galleryCounter.style.display = "block";

        currentZoom = 1;

        galleryImage.style.transform =
            "translateY(-60px) scale(1)";

    }

});

// ================= MOUSE WHEEL ZOOM =================

galleryImage.addEventListener("wheel",(e)=>{

    e.preventDefault();

    if(e.deltaY < 0){

        currentZoom += 0.15;

    }

    else{

        currentZoom -= 0.15;

    }

    if(currentZoom < MIN_ZOOM){

        currentZoom = MIN_ZOOM;

    }

    if(currentZoom > MAX_ZOOM){

        currentZoom = MAX_ZOOM;

    }

    galleryImage.style.transform =
        `translateY(-60px) scale(${currentZoom})`;

});


// ================= TYPING ANIMATION =================

const typingText = document.getElementById("typing-text");

const professions = [

    "Aspiring Software Developer",

    "Python Developer",

    "IoT Enthusiast",

    "Frontend Developer"

];

let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentText = professions[professionIndex];

    if (!isDeleting) {

        typingText.textContent = currentText.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentText.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    } else {

        typingText.textContent = currentText.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            professionIndex++;

            if (professionIndex >= professions.length) {

                professionIndex = 0;

            }

        }

    }

    const speed = isDeleting ? 50 : 100;

    setTimeout(typeEffect, speed);

}

typeEffect();

// ================= GLASS NAVBAR =================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 60){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

});

// ================= MOBILE MENU =================

const menuToggle = document.querySelector(".menu-toggle");
const menuIcon = menuToggle.querySelector("i");

// Notice the different variable name
const mobileNav = document.querySelector(".nav-links");

const mobileNavItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {

    mobileNav.classList.toggle("active");

    if (mobileNav.classList.contains("active")) {

        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");

    } else {

        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");

    }

});

mobileNavItems.forEach(item => {

    item.addEventListener("click", () => {

        mobileNav.classList.remove("active");

        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");

    });

});

document.addEventListener("click", (e) => {

    if (
        !mobileNav.contains(e.target) &&
        !menuToggle.contains(e.target)
    ) {

        mobileNav.classList.remove("active");

        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");

    }

});

// ================= DOUBLE CLICK ZOOM =================

galleryImage.addEventListener("dblclick",()=>{

    if(currentZoom === 1){

        currentZoom = 2;

    }

    else{

        currentZoom = 1;

    }

    galleryImage.style.transform =
        `translateY(-60px) scale(${currentZoom})`;

});

// ================= DOUBLE CLICK ZOOM =================

galleryImage.addEventListener("dblclick",()=>{

    if(currentZoom === 1){

        currentZoom = 2;

    }

    else{

        currentZoom = 1;

    }

    galleryImage.style.transform =
        `translateY(-60px) scale(${currentZoom})`;

});

// ================= EMAILJS CONTACT FORM =================

const contactForm = document.getElementById("contactForm");

const sendBtn = document.getElementById("sendBtn");

const btnText = document.getElementById("btnText");

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    sendBtn.disabled = true;

    btnText.textContent = "Sending...";

    emailjs.sendForm(

        "service_c23vzmj",

        "template_b7fq8wm",

        this

    )

    .then(() => {

        btnText.textContent = "Message Sent ✓";

        alert("✅ Your message has been sent successfully!");

        contactForm.reset();

        setTimeout(() => {

            btnText.textContent = "Send Message";

            sendBtn.disabled = false;

        }, 2000);

    })

    .catch((error) => {

        console.error("EmailJS Error:", error);

        alert(
            "❌ " +
            (error?.text || error?.message || JSON.stringify(error))
        );

        btnText.textContent = "Send Message";

        sendBtn.disabled = false;

    });

});

// ================= THEME TOGGLE =================

const themeToggle = document.getElementById("themeToggle");

// Load saved theme
if(localStorage.getItem("theme") === "light"){

    document.body.classList.add("light-theme");

    themeToggle.textContent = "☀️";

}

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("light-theme");

    if(document.body.classList.contains("light-theme")){

        themeToggle.textContent = "☀️";

        localStorage.setItem("theme","light");

    }else{

        themeToggle.textContent = "🌙";

        localStorage.setItem("theme","dark");

    }

});

/*==============================
    CERTIFICATE MODAL
==============================*/

const certificateModal = document.getElementById("certificateModal");
const viewAllCertificates = document.getElementById("viewAllCertificates");
const closeCertificate = document.querySelector(".close-certificate");

// Open modal
viewAllCertificates.addEventListener("click", function (e) {
    e.preventDefault();
    certificateModal.style.display = "block";
});

// Close button
closeCertificate.addEventListener("click", function () {
    certificateModal.style.display = "none";
});

// Click outside to close
window.addEventListener("click", function (e) {
    if (e.target === certificateModal) {
        certificateModal.style.display = "none";
    }
});

// ESC key closes modal
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        certificateModal.style.display = "none";
    }
});

const certificateImages = document.querySelectorAll(".certificate-image");

certificateImages.forEach((img, index) => {

    img.addEventListener("click", () => {

        certificateModal.style.display = "none";

        currentProject = certificates;

        currentIndex = index;

        galleryImage.src = currentProject[currentIndex].image;

        galleryTitle.textContent = currentProject[currentIndex].title;

        galleryDescription.textContent = "";

        currentZoom = 1;

        galleryImage.style.transform =
            "translateY(-60px) scale(1)";

        updateCounter();

        loadThumbnails();

        galleryCounter.style.display = "block";

        galleryModal.classList.add("show");

    });

});