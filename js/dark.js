const icon = document.getElementById('darkLightToggle');
const storedItem = window.localStorage.getItem('dark');
const body = document.body

if (storedItem == 'true') {
    icon.src = './img/sun_2600-fe0f.png';
    body.setAttribute('theme', 'dark');
    document.getElementById('focusTimeNextOverlay').setAttribute('theme', 'dark');
    document.getElementById('partOfNavbar').setAttribute('theme', 'dark');
    document.getElementById('profileBtn').setAttribute('theme', 'dark');
    document.getElementById('darkToggle').setAttribute('theme', 'dark');
} if (storedItem == 'false') {
    icon.src = './img/crescent-moon_1f319.png';
    body.removeAttribute('theme');
    document.getElementById('focusTimeNextOverlay').removeAttribute('theme');
    document.getElementById('partOfNavbar').removeAttribute('theme');
    document.getElementById('profileBtn').removeAttribute('theme');
    document.getElementById('darkToggle').removeAttribute('theme');
}

async function darkLightToggle() {
    if (storedItem == 'true') {
        window.localStorage.setItem('dark', 'false');
        body.removeAttribute('theme');
        document.getElementById('focusTimeNextOverlay').removeAttribute('theme');
        document.getElementById('partOfNavbar').removeAttribute('theme');
        document.getElementById('profileBtn').removeAttribute('theme');
        document.getElementById('darkToggle').removeAttribute('theme');

        icon.src = './img/crescent-moon_1f319.png';
    } else if (storedItem == 'false') {
        window.localStorage.setItem('dark', 'true');
        body.setAttribute('theme', 'dark');
        document.getElementById('focusTimeNextOverlay').setAttribute('theme', 'dark');
        document.getElementById('partOfNavbar').setAttribute('theme', 'dark');
        document.getElementById('profileBtn').setAttribute('theme', 'dark');
        document.getElementById('darkToggle').setAttribute('theme', 'dark');

        icon.src = './img/sun_2600-fe0f.png';
    }
}