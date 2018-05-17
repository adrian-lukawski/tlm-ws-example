const apiKey = 'putYourApiKeyHere'; // put your api key here
const beaconUniqueId = 'putYourBeaconUniqueIdHere'; // put your beacon unique id here

const wsServerEndpoint = 'wss://ovs.kontakt.io:9090/stream';
const healthTopic = '/stream/' + beaconUniqueId + '/health';
const sensorTopic = '/stream/' + beaconUniqueId + '/sensor';
const accelerometerTopic = '/stream/' + beaconUniqueId + '/accelerometer';

const stomp = Stomp.client(wsServerEndpoint);

const headers = {
    'api-key': apiKey
}

const callback = function (e) {
    let payload = JSON.parse(e.body);

    if (payload.deviceUtcTime !== undefined) {
        document.getElementById("deviceUtcTime").innerText = new Date(payload.deviceUtcTime * 1000);
    }
    if (payload.externalPower !== undefined) {
        document.getElementById("externalPower").innerText = payload.externalPower;
    }
    if (payload.batteryLevel !== undefined) {
        document.getElementById("batteryLevel").innerText = payload.batteryLevel;
    }
    if (payload.temperature !== undefined) {
        document.getElementById("temperature").innerText = payload.temperature;
    }
    if (payload.lightLevel !== undefined) {
        document.getElementById("lightLevel").innerText = payload.lightLevel;
    }
    if (payload.x !== undefined) {
        document.getElementById("x").innerText = payload.x;
    }
    if (payload.y !== undefined) {
        document.getElementById("y").innerText = payload.y;
    }
    if (payload.z !== undefined) {
        document.getElementById("z").innerText = payload.z;
    }
    if (payload.lastDoubleTap !== undefined) {
        document.getElementById("lastDoubleTap").innerText = payload.lastDoubleTap;
    }
    if (payload.lastThreshold !== undefined) {
        document.getElementById("lastThreshold").innerText = payload.lastThreshold;
    }
};


stomp.connect(headers, cb => {
    stomp.subscribe(healthTopic, callback, headers);
    stomp.subscribe(sensorTopic, callback, headers);
    stomp.subscribe(accelerometerTopic, callback, headers);
});




