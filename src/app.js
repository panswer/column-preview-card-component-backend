const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const staticFolder = path.resolve(__dirname, '../www');
if (fs.existsSync(staticFolder)) {
    app.use(express.static(staticFolder));
} else {
    console.log("Without www folder");
    process.exit(1);
}

app.get('/*', (req, res) => {
    try {
        const indexPath = path.resolve(staticFolder, './index.html');

        if(fs.existsSync(indexPath)){
            res.sendFile(indexPath);
        }else{
            console.log('Wihtout index file');
            res.status(404).send('Page Not Found.');
        }

    } catch (error) {
        console.log(error);
        res.status(404).send('Page Not Found.');
    }
});

module.exports = app;