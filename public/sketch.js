let cam;
const setup = () => {
    noCanvas();
    cam = createCapture(VIDEO);
    cam.parent('sketch-holder');

    if ("geolocation" in navigator) {
        console.log("geolocation is available");
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = Math.round( position.coords.latitude * 10) / 10
            const lon = Math.round( position.coords.longitude * 10) / 10
            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
            /*initMap(lat,lon);*/
        });
    }
    else {
        console.log("geolocation IS NOT available");
    }
}

const draw = () => {
    //
}

const onSubmit = () => {
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = Math.round( position.coords.latitude * 10) / 10
        const lon = Math.round( position.coords.longitude * 10) / 10
        const caption = document.getElementById('caption').value;
        cam.loadPixels();
        const image64 = cam.canvas.toDataURL();
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = lon;
        const data = { lat, lon, caption, image64 };
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        }
        const response = await fetch('/api', options);
        const rData = await response.json();
        console.log(rData);
        alert("Entry added! Click \"View scrapbook\" to see.");
    });
}
