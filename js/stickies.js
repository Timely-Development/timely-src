/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.width = "475px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}

var localstoragesticky = localStorage.getItem("stickyText");

if (localstoragesticky == "") {
    localStorage.setItem("stickyText", "")
}

function loadFromLocalStorage() {
    document.getElementById('stickyTextArea').value = localstoragesticky
}

loadFromLocalStorage();