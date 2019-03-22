AFRAME.registerComponent('synth', {
    init: function ()
    {
        // Get Camera Object
        var camera = document.querySelector('#camera');
        // Setup Camera variables
        // cameraRotZ not used because the web-browser doesn't support Z-rotation and I'm too lazy
        // to view in a headset
        var cameraRotX, cameraRotY //, cameraRotZ;
        var cameraRotXNorm;
        // TODO: add room-tracking functionality. For now assume 3DOF.
        //var cameraPosx, cameaPosY, cameraPosZ;

        // Setup Frequency
        var frequency = 440;
        var delta = 10;

        // Setup Oscillators
        var panL = new Tone.Panner(-1).toMaster();
        var panR = new Tone.Panner(1).toMaster();
        var oscLFreq = frequency;
        var oscRFreq = oscLFreq + delta;
        var oscL = new Tone.Oscillator(oscLFreq, "sine").connect(panL).start();
        var oscR = new Tone.Oscillator(oscRFreq, "sine").chain(panR).start();
    },
    tick: function ()
    {
        // Listen to Camera rotation
        cameraRotX = camera.getAttribute('rotation').x;
        cameraRotXNorm = cameraRotX / 90;
        cameraRotY = camera.getAttribute('rotation').y % 360;
        //cameraRotZ = camera.getAttribute('rotation').z;

        // CURRENT SETTINGS - Try 1
        // X: Global pitch
        //      Lerp between -90 and 90
        // Y: Frequency Delta
        //      Modulo 360 then Lerp between 0 and 360
        // Z: NOTHING - Can't do Y rotation on web

        oscLFreq += cameraRotXNorm * 20;
    }
});

function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}