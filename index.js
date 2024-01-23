const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client")))


webpush.setVapidDetails("mailto:test@test.com", BKYUn4rLJeped19WAF0weuvU8PdYLmIjg6bHNS4vFqBa7tiAS6ELWXHiBQJMWpnO20uSFoeeLDB1pYdoi-jp7Dc, hFUIkXfry98sr2e0Wz2f4f_mQUaq4_nT5yUz4-YC9aI);

let subscription;
app.post('/subscribe', (req, res) => {
    subscription = req.body;
    res.status(201).json({});
})

app.get('/notify', (req, res) => {
    res.status(201).json({});
    const payload = JSON.stringify({ title: "Hello World", body: "This is your first push notification" });
    webpush.sendNotification(subscription, payload).catch(console.log);
    console.log("webpush sent");
})

const PORT = 5004;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
})
