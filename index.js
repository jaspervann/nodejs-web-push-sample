const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client")))


const vapidKeys = webpush.generateVAPIDKeys()
//webpush.setGCMAPIKey(process.env.GCMAPIKEY);

const publicVapidKey = vapidKeys.publicKey;
const privateVapidKey = vapidKeys.privateKey;

console.log(publicVapidKey);

webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: "Hello World", body: "This is your first push notification" });
    webpush.sendNotification(subscription, payload).catch(console.log);
    console.log("webpush sent");
})

const PORT = 5004;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
})
