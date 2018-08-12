let sliderImages = document.querySelectorAll(".slide"),
    arrowRight = document.querySelector("#arrow-right"),
    arrowLeft = document.querySelector("#arrow-left"),
    current = 0;
// We first remove all images from the DOM
//console.log(sliderImages.length)
function reset() {
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display = "none";
    }
}

// Initialization of the slide:
/**
 * We fisrt reset the entire dom and remove all the images
 * Then we set first element in our image list to the show
 */
function startSlide() {
    reset();
    sliderImages[0].style.display = "block";
}

// Show previous image by clicking on the left arrow:
function slideLeft() {
    reset();
    // We will take the current image number and reduce one, then display it
    sliderImages[current - 1].style.display = "block";
    // Then update the value of the current by removing one.
    current--;
}

// Show previous image by clicking on the left arrow:
function slideRight() {
    reset();
    // We will take the current image number and reduce one, then display it
    sliderImages[current + 1].style.display = "block";
    // Then update the value of the current by removing one.
    current++;
}

// Left Arrow Click:
arrowLeft.addEventListener("click", function () {
    if (current === 0) {
        current = sliderImages.length;
    }
    slideLeft();
});

// Right Arrow Click:
arrowRight.addEventListener("click", function () {
    if (current === sliderImages.length - 1) {
        current = -1;
    }
    slideRight();
});

// Using KeyBoard Arrows:
// document.onkeyup = function(e) {
//     switch (e.keyCode) {
//         case 37:
//             slideLeft();
//             break;
//         case 39:
//             slideRight();
//             break;
//         default:
//             break;
//     }    
// }

// Bring up the settings:
var isSettingSectionOn = false;
document.getElementById("setting-gear").addEventListener("click", function () {
    if (!isSettingSectionOn) {
        // Show the setting-section
        document.getElementById("setting-section").style.animation = "show_setting_section 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
        isSettingSectionOn = true;
    }
    else {
        // Show the setting-section
        document.getElementById("setting-section").style.animation = "hide_setting_section 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
        isSettingSectionOn = false;
    }

});

// When this application starts, set the automatic slide to false in local storage
localStorage.setItem("AUTOMATIC_SLIDE", "true");
let automaticSlide = localStorage.getItem("AUTOMATIC_SLIDE");
let slideInterval;
function startInterval() {
    if (automaticSlide === "true") {
        slideInterval = setInterval(() => {
            arrowRight.click();
        }, 7000);
    };
}

// Change automaticSlideState
let isNotChecked = true;
document.getElementById("toggle-slide-play").addEventListener("click", function () {
    if (isNotChecked) {
        localStorage.setItem("AUTOMATIC_SLIDE", "false");
        document.getElementById("slide-autoplay-icon").innerHTML = "&#9744;";
        document.getElementById("slide-autoplay-text").innerHTML = "Slide autoplay is disabled. Click to enable. <br> You can use the arrows to slide through.";
        clearInterval(slideInterval);        
        document.getElementById("arrow-left").style.animation = "arrow-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
        document.getElementById("arrow-right").style.animation = "arrow-right 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
        isNotChecked = false;
    } else {
        localStorage.setItem("AUTOMATIC_SLIDE", "true");
        document.getElementById("slide-autoplay-icon").innerHTML = "&#9745;";
        document.getElementById("slide-autoplay-text").innerHTML = "Slide autoplay is enabled. Click to disable.";
        startInterval();        
        document.getElementById("arrow-left").style.animation = "hide-arrow-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
        document.getElementById("arrow-right").style.animation = "hide-arrow-right 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
        isNotChecked = true;
    }
});



// Show Office Info: Data from a database
let corporateInfo = {
    "New York": {
        office_title: "New York Head Quarters",
        office_role: "This is our corporate headquarters. We are located at the following address:",
        address_info: {
            office_street: "1263 Brodway Ave, Manhattan, NY 1234",
            office_phone: "+1 999-555-5511",
            office_email: "newyork@abccompany.com"
        }
    },
    "Berlin": {
        office_title: "Europe Regional Head Quarters",
        office_role: "This is our European headquarters. We are located at the following address:",
        address_info: {
            office_street: "Genslerstraße 84, Berlin Wedding, 13359",
            office_phone: "030 98 29592",
            office_email: "berlin@abccompany.com"
        }
    },
    "Washington DC": {
        office_title: "Washington DC Field Office",
        office_role: "Our DC office is where we deal with all our government business. We are located at the following address:",
        address_info: {
            office_street: "2378 Main Street, Washington, 42536",
            office_phone: "202-745-9479",
            office_email: "dc@abccompany.com"
        }
    },
    "Paris": {
        office_title: "Paris Field Office",
        office_role: "We conduct all our French and Belgian business here. We are located at the following address:",
        address_info: {
            office_street: "89  rue Reine Elisabeth, Paris, 77000",
            office_phone: "01.77.56.62460",
            office_email: "paris@abccompany.com"
        }
    },
    "Prague": {
        office_title: "Prague Field Office",
        office_role: "Our Prague office deals with New Technology Research. We are located at the following address:",
        address_info: {
            office_street: "U Sokolovny 1713, Nový Bydžov, 504 01",
            office_phone: "736 225 365",
            office_email: "prague@abccompany.com"
        }
    }
}
let el = document.getElementsByClassName('office-name');
for (let i = 0; i < el.length; i++) {
    el.item(i).onclick = showOfficeName;
}


let isOfficeInfoOn = false;
function showOfficeName(e) {
    // Get Elements names
    let office_title = document.getElementById("office_title"),
        office_role = document.getElementById("office_role"),
        office_street = document.getElementById("office_street"),
        office_phone = document.getElementById("office_phone"),
        office_email = document.getElementById("office_email");
    
    let officeName = corporateInfo[e.target.innerText];
    office_title.innerText = officeName.office_title;
    office_role.innerText = officeName.office_role;
    office_street.innerText = officeName.address_info.office_street;
    office_phone.innerText = officeName.address_info.office_phone;
    office_email.innerText = officeName.address_info.office_email;
    document.getElementById("company-branches").style.animation = "show_setting_section 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
    
}

document.getElementById("close-office-info").addEventListener("click", function () {
    // Show the setting-section
    document.getElementById("company-branches").style.animation = "hide_setting_section 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
})

// Run the app.
startSlide();
startInterval();