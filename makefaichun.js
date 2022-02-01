var http = require('http');
var qs = require('querystring');
const utf8 = require('utf8');

const server = http.createServer(function(req, res) {
    const url2 = req.url;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.writeHead(200, { "Content-Type": "text/html" });
    // do a 200 response
    console.log("Fai Chung Maker starts");

    console.log("making makefaichun by " + req.method);
    var body = '';
    if (req.method == 'POST') {
        console.log("Start RECEIVING");

        req.on('data', function(data) {

            body += data;
            body = utf8.encode(body);
            console.log("taking data:" + body);
            if (body.length > 1e6) { res.connection.destroy(); }
        });


        req.on('end', function(data) {
            if (body !== "") {
                console.log("drawing:" + body);
                var post = qs.parse(body);
                console.log(qs.parse(body));
                var stringchar = post['fw'];
                var thestringcharcolor = post['wc'];
                var thebackgroundcol = post['bc'];
                console.log("received:" + stringchar + "," + thestringcharcolor + "," + thebackgroundcol);
                res.write("<html><head></head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /></script><body><div style='width:300px; padding-top:10px; padding-bottom:10px; font-size:130px; text-align:center; background-color:" + thebackgroundcol + "; color:" + thestringcharcolor + ";'>" + stringchar + "</div></body></html>");
                console.log("draw finished");
                res.end();

            }
        });

    }

    if (url2 === "/close") {
        console.log("closeing");
        endprocess();

    }




});

function endprocess() {
    server.close();
    console.log(process.send);
    if (process.send) {
        process.send("STOP");
    }
}
server.listen(3000, function() {
    console.log("server started at port http://127.0.0.1:3000");
});

process.on("STOP", function() {
    console.log("Exiting NodeJS server");
    server.close();
})