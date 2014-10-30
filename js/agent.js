var fb = new Firebase(FIREBASE_URI);
var possessedClientName = getParameterByName("client_name");
var possessed = true;
fb.push({ type:"possess", client_name: possessedClientName });

fb.on('child_added', function (snapshot) {
    var input; 
    var response;
    var record = snapshot.val();
    var type = record.type; 
    var client_name = record.client_name;
    var div = document.getElementById("convo");

    if (type === "botchat" && client_name === possessedClientName) { 
        input = record.input;        
        div.innerHTML = div.innerHTML + '<p><strong><i class="fa fa-user user"></i></strong> ' + input + '</p>';
        response = record.response;
        div.innerHTML = div.innerHTML + '<p><strong><i class="fa fa-user bot"></i></strong> ' + response + '</p>';
        div.scrollTop = div.scrollHeight;
    }

    else if (type === "customerchat" && client_name === possessedClientName) {
        input = record.input;
        div.innerHTML = div.innerHTML + '<p><strong><i class="fa fa-user user"></i></strong> ' + input + '</p>';
        div.scrollTop = div.scrollHeight;
    }

});

function doChat() {
    var div = document.getElementById("convo");
    var response = document.getElementById("yousay").value;
    var client_name = possessedClientName;
    document.getElementById("yousay").value = "";
    div.innerHTML = div.innerHTML + '<p><strong><i class="fa fa-user agent"></i></strong> ' + response + '</p>';
    div.scrollTop = div.scrollHeight;
    fb.push({ type:"agentchat", response: response, client_name: client_name });
}

function togglePossession() {

    if (possessed === true) {
        fb.push({ type: "unpossess", client_name: possessedClientName });
        document.getElementById("yousay").disabled = true;
        document.getElementById("toggle").innerHTML = '<i class="fa fa-check-circle"></i> Repossess';
        document.getElementById("toggle").className = "";
        document.getElementById("toggle").className = "btn btn-success";
        possessed = false;
    } 

    else {
        fb.push({ type: "possess", client_name: possessedClientName });
        document.getElementById("yousay").disabled = false;
        document.getElementById("toggle").innerHTML = '<i class="fa fa-times-circle"></i> End Possession';
        document.getElementById("toggle").className = "";
        document.getElementById("toggle").className = "btn btn-danger";
        possessed = true;
    }

}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

