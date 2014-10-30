var pb = new Pandorabot("aiaas.pandorabots.com", APP_ID, BOTNAME, USER_KEY);
var fb = new Firebase(FIREBASE_URI);
var client_name;
var thisConvoPossessed = false;

function doStart(input) {
  pb.talk(input, function(data) {
    var response = data["responses"];
    div = document.getElementById("convo");
    div.innerHTML = div.innerHTML + '<p><strong><i class="fa fa-user bot"></i></strong> ' + response + '</p>';
  });
}

function doTalk() {
    var d = new Date();
    var date = d.toString();
    var input = document.getElementById("yousay").value;
    var div = document.getElementById("convo");
    document.getElementById("yousay").value = "";
    div.innerHTML = div.innerHTML + '<p><strong><i class="fa fa-user user"></i></strong> ' + input + '</p>';
    
    if (!thisConvoPossessed) {
        pb.talk(input, function(data) {
            var time = new Date();
            var response = data["responses"];
            div.innerHTML = div.innerHTML + '<p><strong><i class="fa fa-user bot"></i></strong> ' + response + '</p>';
            div.scrollTop = div.scrollHeight;
            client_name = pb.client_name;
            fb.push({ type:"botchat", date: date, client_name: client_name, input:input, response:response });
        });
    }     

    else {
        fb.push({ type:"customerchat", date: date, client_name: client_name, input:input });    
    }

}

fb.on('child_added', function (snapshot) {
    var record = snapshot.val();
    var type = record.type;
    var possessedID = record.client_name;

    if (type === "possess" && possessedID === client_name) {        
        thisConvoPossessed = true;
        // alert("Now talking to an agent");
    }
    
    if (type === "unpossess" && possessedID === client_name) {
        thisConvoPossessed = false;
        // alert("Now talking to a bot");
    }

    else if (type === "agentchat" && possessedID === client_name) {
        var response = record.response;
        var div = document.getElementById("convo");
        div.innerHTML = div.innerHTML + '<p><strong><i class="fa fa-user agent"></i></strong> ' + response + '</p>';
        div.scrollTop = div.scrollHeight;
    }

});
