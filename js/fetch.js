function fetchSplitTime() {
        try {
            // Define time
            var unix = Math.round(Date.now() / 1000)
            var date = new Date(unix * 1000)
            var time = date.toLocaleTimeString("default");
            
            // Convert time to string value, remove AM/PM
            var time_string = time.toString()

            // Seperate time by colon
            var time_values = time_string.split(":")

            return time_values
        } catch (e) {
            console.warn('Failed to fetch focused time:', e)
        }
}

function unix() {
    try {
        return Math.round(Date.now() / 1000)
    } catch (e) {
        console.error('Failed to fetch unix timestamp:', e)
    }
}

async function genericFocusedTime() {
    // Define weekdays to convert from number to readable string
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    // Create new date object
    const d = new Date();
    // Get current weekday in readable name
    var weekday = days[d.getDay()];
    
    if (weekday == "Friday" || weekday == "Saturday") { // Check if its a weekend
        document.getElementById('genericFocusTimePeriod').innerHTML = 'Now: Weekend'
        document.getElementById('genericFocusTimeEnds').innerHTML = 'on Sunday'
        document.getElementById('focusTimeNext').style.display = 'none'
    } else if (weekday == "Sunday" || weekday == "Monday" || weekday ==  "Wednesday" || weekday == "Thursday") { // Check if its a weekday
        var fetchJson = await fetch('../json/timetable.json')
        var json = await fetchJson.json();
        var timeTable = json.timeTables[0].timeTableValues
        var now = unix();

        var notnow = 0

        for (var i = 0; i < timeTable.length; i++) { // Run code for every part of timetable.json
            // Create shortcuts for properties
            const { period, special, startTime, endTime } = timeTable[i];
            const boolHomeroom = special[0].homeroom;
            const boolBreak = special[1].break;
            
            var dt0 = new Date();

            // Parse startTime to be compared to current time
            var s = startTime.split(':');
            var dt1 = new Date(dt0.getFullYear(), dt0.getMonth(), dt0.getDate(), parseInt(s[0]), parseInt(s[1]), parseInt(s[2]))
            var dt1_12 = dt1.toLocaleString("default")
            var dt1_12_remspace = dt1_12.split(',')
            var dt1_12_rem00 = dt1_12_remspace[1].replace('00', '')
            var dt1_12_done = dt1_12_rem00.replace(': ', ' ')

            // Parse endTime to be compared to current time
            var e = endTime.split(':')
            var dt2 = new Date(dt0.getFullYear(), dt0.getMonth(), dt0.getDate(), parseInt(e[0]), parseInt(e[1]), parseInt(e[2]))
            var dt2_12 = dt2.toLocaleString("default")
            var dt2_12_remspace = dt2_12.split(',')
            var dt2_12_rem00 = dt2_12_remspace[1].replace('00', '')
            var dt2_12_done = dt2_12_rem00.replace(': ', ' ')

            function remainingTime(seconds) {   
                // Hours, minutes and seconds
                var hrs = ~~(seconds / 3600);
                var mins = ~~((seconds % 3600) / 60);
                var secs = ~~seconds % 60;
            
                // Output like "1:01" or "4:03:59" or "123:03:59"
                var ret = "";
            
                if (hrs > 0) {
                    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
                }
            
                ret += "" + mins + ":" + (secs < 10 ? "0" : "");
                ret += "" + secs;
                return ret;
            }

            var end_unix = Math.round(dt2.getTime() / 1000);
            var now_unix = Math.round(Date.now() / 1000);
            
            var difference_seconds = end_unix - now_unix;
            var remaining_string = remainingTime(difference_seconds)
            
            // Check if current time lies between startTime and endTime
            if (dt0 >= dt1 && dt0 <= dt2) {
                try {
                    var nextJson = timeTable[i + 1]
                    var nextPeriod = nextJson.period;
                    var n_s = nextJson.startTime.split(':')
                    var dtnx = new Date(dt0.getFullYear(), dt0.getMonth(), dt0.getDate(), parseInt(n_s[0]), parseInt(n_s[1]), parseInt(n_s[2]))
                } catch (e) {
                    document.getElementById('focusTimeNext').style.display = "none";
                }

                var dtnx_12 = dtnx.toLocaleString("default")
                var dtnx_12_remspace = dtnx_12.split(',')
                var dtnx_12_rem00 = dtnx_12_remspace[1].replace('00', '')
                var dtnx_12_done = dtnx_12_rem00.replace(': ', ' ')

                if (Number.isInteger(period)) {
                    // Now
                    document.getElementById('genericFocusTimePeriod').innerHTML = 'Now: Period ' + period
                    document.getElementById('genericFocusTimeMain').innerHTML = remaining_string
                    document.getElementById('genericFocusTimeEnds').innerHTML = 'at ' + dt2_12_done
                    // Next
                    document.getElementById('genericFocusTimeNextPeriod').innerHTML = 'Next: Period ' + nextPeriod
                    document.getElementById('genericFocusTimeNextStarts').innerHTML = dtnx_12_done
                } else if (!Number.isInteger(period)) {
                    document.getElementById('genericFocusTimeMain').style.display = ''
                    document.getElementById('remaining').style.display = ''
                    document.getElementById('genericFocusTimeEnds').innerHTML = 'at ' + dt2_12_done
                    if (period == "School's Done!") {
                        document.getElementById('genericFocusTimeMain').style.display = "none";
                        document.getElementById('genericFocusTimePeriod').style.fontSize = "36px";
                        document.getElementById('remaining').style.display = "none";
                        document.getElementById('focusTimeNext').style.display = "none";

                        document.getElementById('genericFocusTimeEnds').style.position = "relative"; document.getElementById('endsText').style.position = "relative";
                        document.getElementById('genericFocusTimeEnds').style.top = "-15px"; document.getElementById('endsText').style.top = "-15px";
                        document.getElementById('genericFocusTimeEnds').innerHTML = "Tomorrow"; document.getElementById('endsText').innerHTML = "Ends ";
                    }
                    document.getElementById('genericFocusTimePeriod').innerHTML = 'Now: ' + period
                    document.getElementById('genericFocusTimeMain').innerHTML = remaining_string

                    // Next
                    document.getElementById('genericFocusTimeNextPeriod').innerHTML = 'Next: ' + nextPeriod
                    document.getElementById('genericFocusTimeNextStarts').innerHTML = dtnx_12_done
                }
            } else {
                notnow++
            }

            if (notnow >= 12) {
                document.getElementById('genericFocusTimePeriod').innerHTML = 'Now: A bug happened...'
                document.getElementById('genericFocusTimeEnds').innerHTML = 'Send details to talk@timely.fyi'
            }
        }
    } else if (weekday == "Tuesday") { // Check for Early Release Tuesday
        var fetchJson = await fetch('../json/timetable_revision.json')
        var json = await fetchJson.json();
        var now = unix();

        var timeTable = json.timeTables[1].timeTableValues

        for (var i = 0; i < timeTable.length; i++) { // Run code for every part of timetable_revision.json
        }
    }
}

var t=setInterval(genericFocusedTime,1000);
