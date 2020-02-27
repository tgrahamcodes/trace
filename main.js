var lat, lng;
var IP;
var coords;
var url;

function init() {
    IP = document.getElementById('ip').value;
    if (!IP) {
        url = 'http://ipinfo.io/?token=';
    }
    else {
        url = 'http://ipinfo.io/' + IP + '/?token=';
    }
    console.log(url);
    if (url != undefined) {
        doLookup(url);
    }
}

function doLookup(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var txt = xhr.responseText;
                var obj = JSON.parse(txt);
                var loc = obj.loc;
                var locationArray = loc.split(',');
                initMap(locationArray[0], locationArray[1]);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
};

function initMap(lat, lon) {
    coords = { lat: Number(lat), lng: Number(lon) };
    map = new google.maps.Map(document.getElementById('map'), { zoom: 15, center: coords, mapTypeId: 'hybrid' });
    marker = new google.maps.Marker({ position: coords, map: map });
};
