
const publicVapidKey = "BLpfdcKTPp02ITWZhHVo0ViVTdRDECImPJM_9dDQECCvDmtPzQl0vKaxnAXQlR85Kqy7OTt9HpX0kzkWsA_vLyk";


if('serviceWorker' in navigator) {


    console.log("unregstering")
    navigator.serviceWorker.getRegistrations().then(function(registrations) {

    for(let registration of registrations) {

            registration.unregister()
	    console.log("Oke down");

    }

//    registerServiceWorker().catch(console.log)
    console.log("Did it  register?")

	}).catch(function(err) {

        console.log('Service Worker UNregistration failed: ', err);

    });




    registerServiceWorker().catch(console.log)
    console.log("Did it  register?")

}


async function sendNotification() {
    let res = await fetch("/notify", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

async function registerServiceWorker() {
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    });
console.log("Yes it did!");

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey,
    });
	console.log("after subscription");

    let res = await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json",
        }
    })
    let data = res.json()
    console.log("Data",data);
    console.log("end");
}
