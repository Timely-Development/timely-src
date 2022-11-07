function showTime() {
    try{
        var unix = Math.round(Date.now() / 1000)
        var date = new Date(unix * 1000)

        var time = date.toLocaleTimeString("default");
        document.getElementById('time').innerHTML = time
    } catch (e) {
        console.warn('Failed to fetch time:', e)
    }
}

var t=setInterval(showTime,1000);