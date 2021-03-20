const fs = require("fs");
const http = require("http");
const https = require('https');

// Defaults, in case file read results in an error
let yggdrasil_url = "authserver.mojang.com";
let server_port = 1234;
let get_resp = "TEST";

fs.readFile("config.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
        console.log("Server Listening on Port: " + server_port);
        server.listen(server_port);
        return;
    }
    let prst = JSON.parse(data);
    
    yggdrasil_url = prst.yggdrasil_url;
    server_port = process.env.PORT || prst.server_port;
    get_resp = prst.get_resp;
    
    console.log("Server Listening on Port: " + server_port);
    server.listen(server_port);
});

function ygg_req(path, req_dat, callback) {
    let options = {
        hostname : yggdrasil_url,
        path : path,
        method : "POST",
        headers : {
            "Content-Length" : req_dat.length,
            "Content-Type" : "application/json"
        }
    };
    
    let req = https.request(options, (res) => {
        let data = "";
        
        if (res.statusCode != 200) {
            return;
        }
        
        res.on("data", (chunk) => {
            data += chunk;
        });
        
        res.on("end", () => {
            callback(data);
        });
    }).on("error", (err) => {
        console.log("Error: " + err);
    });
    
    req.write(req_dat);
    req.end();
}

var server = http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
	// res.setHeader('Access-Control-Request-Method', '*');
	// res.setHeader('Access-Control-Allow-Methods', 'PUSH, GET');
	// res.setHeader('Access-Control-Allow-Headers', '*');
    
    res.writeHead(200);
    
    if (req.method == "POST") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            ygg_req(req.url, body, (resp) => {
                res.write(resp);
                res.end();
            });
        });
    } else {
        res.end(get_resp);
    }
});
