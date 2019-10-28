export {};

const s = require("fs");




const requestHandler = (req: any,res: any) => {
    const url = req.url;
    const methodType = req.method;

    if(url === "/"){
        res.write("<html>");
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"></body>');
        res.write("<html>");
        res.end()
        return null;
    }else if(url === "/message" && methodType === "POST"){
        const dataChunks: any = [];
        req.on("data", (chunk: any) => {
            dataChunks.push(chunk);

        });
        req.on("end",() => {
            const parsedData = Buffer.concat(dataChunks).toString();
            fs.writeFileSync("message.txt", parsedData );
            res.statusCode = 302;
            res.setHeader("Location","/");
        return res.end();
        })

    }
}

module.exports = requestHandler;