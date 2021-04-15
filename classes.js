// Here, we define all variables for global use
const videoDeviceRef = document.getElementsByClassName('video-device');
const videoDevStatus = document.getElementById('video-device-status');
const hardDiskRef = document.getElementsByClassName('hard-disk');
const hardDevStatus = document.getElementById('hard-disk-status');
const ssdRef = document.getElementsByClassName('ssd');
const ssdStatus = document.getElementById('ssd-status');
let videoList = [];
let hardList = [];
let ssdList = [];
let positionNumberVideo = 0;
let positionNumberHard = 0;
let positionNumberSsd = 0;

// Here, we create one base class and a couple of inherited once
class Device {
    constructor(options) {
        this._status;
        this.replacementCost = options.replacementCost;
        this.supplierName = options.supplierName;
        this.serialNumber = options.serialNumber;
    }

    get status() {
        return this._status;
    }

    enable() {
        return this._status = 1;
    }

    disable() {
        return this._status = 0;
    }
}

class VideoDevice extends Device {
    constructor(options) {
        super(options);
        this.resolution = options.resolution;
        this.type = options.type;
    }
}

class DiskDevice extends Device {
    constructor(options) {
        super(options);
        this.size = options.size;
        this.transferRate = options.transferRate;
    }
}

class HardDisk extends DiskDevice {
    constructor(options) {
        super(options);
        this.platterSize = options.platterSize;
        this.numberOfPlatters = options.numberOfPlatters;
    }
}

class SSD extends DiskDevice {
    constructor(options) {
        super(options);
        this.type = options.type;
        this.wearLeveling = options.wearLeveling;
    }
}
// -----------------------------------------------------------------------------------

// Create a function that behaves buttons` selection
const behaveButtons = (selectedButton, selectedDevice) => {
    switch (selectedButton) {
        case 'PREVIOUS': return decrement(selectedDevice);

        case 'NEXT': return increment(selectedDevice);

        case 'UPDATE': return updateInput(selectedDevice);

        case 'NEW': return newInput(selectedDevice);

        default: return console.log('You selected incorrect value!');
    }
}

// Create a function that shows a next element of the array
function increment(dev) {
    switch (dev) {
        case 'videoDev': return (() => {
            if (positionNumberVideo < videoList.length - 1) {
                positionNumberVideo++;
                displayDevices(videoDeviceRef, videoDevStatus, videoList, positionNumberVideo);
            } else {
                alert('You reached the last value!');
            }
        })();

        case 'hardDev': return (() => {
            if (positionNumberHard < hardList.length - 1) {
                positionNumberHard++;
                displayDevices(hardDiskRef, hardDevStatus, hardList, positionNumberHard);
            } else {
                alert('You reached the last value!');
            }
        })();

        case 'ssdDev': return (() => {
            if (positionNumberSsd < ssdList.length - 1) {
                positionNumberSsd++;
                displayDevices(ssdRef, ssdStatus, ssdList, positionNumberSsd);
            } else {
                alert('You reached the last value!');
            }
        })();

        default: return console.log('You selected incorrect value!');
    }
}

// Create a function that shows a previous element of the array
function decrement(dev) {
    switch (dev) {
        case 'videoDev': return (() => {
            if (positionNumberVideo > 0) {
                positionNumberVideo--;
                displayDevices(videoDeviceRef, videoDevStatus, videoList, positionNumberVideo);
            } else {
                alert('You reached the first value!');
            }
        })();

        case 'hardDev': return (() => {
            if (positionNumberHard > 0) {
                positionNumberHard--;
                displayDevices(hardDiskRef, hardDevStatus, hardList, positionNumberHard);
            } else {
                alert('You reached the first value!');
            }
        })();

        case 'ssdDev': return (() => {
            if (positionNumberSsd > 0) {
                positionNumberSsd--;
                displayDevices(ssdRef, ssdStatus, ssdList, positionNumberSsd);
            } else {
                alert('You reached the first value!');
            }
        })();

        default: return console.log('You selected incorrect value!');
    }
}

// Create a function that updates a current element
function updateInput(dev) {
    switch (dev) {
        case 'videoDev': return (() => {
            for (let i = 0; i < videoDeviceRef.length; i++) {
                videoList[positionNumberVideo][videoDeviceRef[i].name] = videoDeviceRef[i].value;
            }

            if (videoDevStatus.checked === true) {
                videoList[positionNumberVideo].enable();
            } else if (hardDevStatus.checked === false) {
                 videoList[positionNumberVideo].disable();
            }

            console.log(videoList[positionNumberVideo]);
            alert('The device is updated!');
        })();

        case 'hardDev': return (() => {
            for (let i = 0; i < hardDiskRef.length; i++) {
                hardList[positionNumberHard][hardDiskRef[i].name] = hardDiskRef[i].value;
            }

            if (hardDevStatus.checked === true) {
                hardList[positionNumberHard].enable();
            } else if (hardDevStatus.checked === false) {
                hardList[positionNumberHard].disable();
            }

            console.log(hardList[positionNumberHard]);
            alert('The device is updated!');
        })();

        case 'ssdDev': return (() => {
            for (let i = 0; i < ssdRef.length; i++) {
                ssdList[positionNumberSsd][ssdRef[i].name] = ssdRef[i].value;
            }

            if (ssdStatus.checked === true) {
                ssdList[positionNumberSsd].enable();
            } else if (ssdStatus.checked === false) {
                ssdList[positionNumberSsd].disable();
            }

            console.log(ssdList[positionNumberSsd]);
            alert('The device is updated!');
        })();

        default: return console.log('You selected incorrect value!');
    }
}

// Create a function that generates a new element of the array
function newInput(dev) {
    let objectCustom = {};
    let cpObject = undefined;
    switch (dev) {
        case 'videoDev': return (() => {
            for (let i = 0; i < videoDeviceRef.length; i++) {
                objectCustom[videoDeviceRef[i].name] = videoDeviceRef[i].value;
            }

            cpObject = new VideoDevice(objectCustom);
            if (videoDevStatus.checked === true) {
                cpObject.enable();
            } else if (videoDevStatus.checked === false) {
                 cpObject.disable();
            }

            videoList.push(cpObject);
            console.log(videoList);
            displayDevices(videoDeviceRef, videoDevStatus, videoList, positionNumberVideo);
            alert('You added a new video device!')
        })();

        case 'hardDev': return (() => {
            for (let i = 0; i < hardDiskRef.length; i++) {
                objectCustom[hardDiskRef[i].name] = hardDiskRef[i].value;
            }

            cpObject = new HardDisk(objectCustom);
            if (hardDevStatus.checked === true) {
                cpObject.enable();
            } else if (hardDevStatus.checked === false) {
                 cpObject.disable();
            }

            hardList.push(cpObject);
            console.log(hardList);
            displayDevices(hardDiskRef, hardDevStatus, hardList, positionNumberHard);
            alert('You added a new hard disk!');
        })();

        case 'ssdDev': return (() => {
            for (let i = 0; i < ssdRef.length; i++) {
                objectCustom[ssdRef[i].name] = ssdRef[i].value;
            }

            cpObject = new SSD(objectCustom);
            if (ssdStatus.checked === true) {
                cpObject.enable();
            } else if (ssdStatus.checked === false) {
                 cpObject.disable();
            }

            ssdList.push(cpObject);
            console.log(ssdList);
            displayDevices(ssdRef, ssdStatus, ssdList, positionNumberSsd);
            alert('You added a new SSD!');
        })();

        default: return console.log('You selected incorrect value!');
    }
}

// Create a function that displays a current item of the array
function displayDevices(reference, checkStatus, arrayList, position) {
    let itemMap = new Map(Object.entries(arrayList[position]));

    for (let i = 0; i < reference.length; i++) {
        if (itemMap.has(reference[i].name)) {
            reference[i].value = itemMap.get(reference[i].name);
        }
    }

    if (arrayList[position].status === 0) {
        checkStatus.checked = false;
    } else if (arrayList[position].status === 1) {
        checkStatus.checked = true;
    }
    
    console.log(arrayList[position]);
}