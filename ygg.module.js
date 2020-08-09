"use strict";

let yggdrasil_url = ""

export function set_yggdrasil_url(url) { yggdrasil_url = url; }

function http_post(path, data, callback) {
    if (typeof(data) == "object") { data = JSON.stringify(data); }
    
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(request.responseText);
        }
    }
    request.open("POST", "http://" + yggdrasil_url + path, true);
    request.send(data);
}

export function auth_login(username, password, callback) {
    let params = JSON.stringify({
        "agent" : {
            "name" : "Minecraft",
            "version" : 1
        },
        "username" : username,
        "password" : password
    });
    
    http_post("/authenticate", params, (data) => {
        callback(JSON.parse(data));
    });
}