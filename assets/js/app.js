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

// Bring up the setting to either show or hide the carousel:
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
// Retrieve the state of the carousel slide behavior
let automaticSlide = localStorage.getItem("AUTOMATIC_SLIDE");

// Show the image every 7 seconds
let slideInterval;
function startInterval() {
    if (automaticSlide === "true") {
        slideInterval = setInterval(() => {
            arrowRight.click();
        }, 7000);
    };
}

// Change automaticSlideState when the user clicks on the message:
let isNotChecked = true;
document.getElementById("toggle-slide-play").addEventListener("click", function () {
    if (isNotChecked) {
        // Get the state
        localStorage.setItem("AUTOMATIC_SLIDE", "false");
        // By default, the icon is checked because the slide show is automatically set to on...
        // First, we change the icon to to unchecked using HTML symbols
        document.getElementById("slide-autoplay-icon").innerHTML = "&#9744;";
        // We then change the instruction text and let the user know that the slide show has been disabled
        document.getElementById("slide-autoplay-text").innerHTML = "Slide autoplay is disabled. Click to enable. <br> You can use the arrows to slide through.";
        // We then clear the interval so it stops sliding
        clearInterval(slideInterval);
        // We then show both arrows
        document.getElementById("arrow-left").style.animation = "arrow-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
        document.getElementById("arrow-right").style.animation = "arrow-right 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
        // Finally, set the value to false so we can toggle the above seetings if the state is false
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



// Show Office Info: 

// This office data would come from a database through an XHR Request
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
// We get the name of the office clicked on by looping through all the class 'office-name' and call the function
let el = document.getElementsByClassName('office-name');
for (let i = 0; i < el.length; i++) {
    el.item(i).onclick = showOfficeName;
}

// When this function is called on each office name clicked:
function showOfficeName(e) {
    // Instantiate element names and assign their values
    let office_title = document.getElementById("office_title"),
        office_role = document.getElementById("office_role"),
        office_street = document.getElementById("office_street"),
        office_phone = document.getElementById("office_phone"),
        office_email = document.getElementById("office_email");
    
    // We then get the clicked's office data from the object (received from a db) 
    let officeInfoData = corporateInfo[e.target.innerText];
    // Set the values for the elements with their data
    office_title.innerText = officeInfoData.office_title;
    office_role.innerText = officeInfoData.office_role;
    office_street.innerText = officeInfoData.address_info.office_street;
    office_phone.innerText = officeInfoData.address_info.office_phone;
    office_email.innerText = officeInfoData.address_info.office_email;
    document.getElementById("company-branches").style.animation = "show_setting_section 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
    
}
// To dismiss the office info, we click on the 'x' and change it's opacity usins the hide_setting_section keyframes
document.getElementById("close-office-info").addEventListener("click", function () {
    // Show the setting-section
    document.getElementById("company-branches").style.animation = "hide_setting_section 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
})

// Start the slidewho and the interval.
startSlide();
startInterval();