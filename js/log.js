var fb = new Firebase(FIREBASE_URI);
var fbLimited = fb.endAt().limit(500);

fbLimited.on('child_added', function (snapshot) {
    var record = snapshot.val();
    var type = record.type;

    if (type === "botchat") {
        var input = record.input;
        var response = record.response;
        var client_name = record.client_name;
        var date = record.date;
        var div = document.getElementById("convo");
        div.innerHTML = div.innerHTML + '<p class="date"><strong>' + date + '</strong></p>'; 
        div.innerHTML = div.innerHTML + '<p><a target="_blank" href="agent.html?client_name=' + client_name + '">' + client_name + '</a>: ' + input + '</p>';
        div.innerHTML = div.innerHTML + '<p class="response">Response: ' + response + '</p>';
        div.scrollTop = div.scrollHeight;
    }

});

function doRemove () {
    fb.remove();
    document.getElementById("convo").innerHTML = "";
}
