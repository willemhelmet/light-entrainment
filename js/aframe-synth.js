// Declare Variables
var camera;                                         // Camera object
var cameraRotX, cameraRotY, cameraRotZ;             // Camera rotation
var cameraRotXNorm, cameraRotYNorm, cameraRotZNorm; // Normalized camera rotation
var cameraPosx, cameaPosY, cameraPosZ;              // Camera position
var cameraPosXNorm, cameraPosYNorm, cameraPosZNorm; // Normalized camera position

var frequency;                                      // Base frequency for synth
var freqDelta;                                      // Delta between two oscillators

var panL, oscLFreq, oscL;                           // Left speaker oscillator
var panR, socrFreq, oscR;                           // Right speaker oscillator

AFRAME.registerComponent('synth', {
    init: function ()
    {        
        setupCamera();
        setupSynth();
    },
    tick: function ()
    {
        // Listen to Camera rotation
        cameraRotX = camera.getAttribute('rotation').x;
        cameraRotXNorm = cameraRotX / 90;
        cameraRotY = camera.getAttribute('rotation').y % 360;
        cameraRotZ = camera.getAttribute('rotation').z % 360;

        // CURRENT SETTINGS - Try 1
        // X: Global pitch
        //      Lerp between -90 and 90
        // Y: Frequency Delta
        //      Modulo 360 then Lerp between 0 and 360
        // Z: NOTHING - Can't do Z rotation on web

        updatePitch(cameraRotXNorm);
    }
});

function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}

function setupCamera() {
    // Get Camera Object
    camera = document.querySelector('#camera');
}

function setupSynth() {
    frequency = 440;
    delta = 10;

    panL = new Tone.Panner(-1).toMaster();
    panR = new Tone.Panner(1).toMaster();
    oscLFreq = frequency;
    oscRFreq = oscLFreq + delta;
    oscL = new Tone.Oscillator(oscLFreq, "sine").connect(panL).start();
    oscR = new Tone.Oscillator(oscRFreq, "sine").chain(panR).start();
}

function updatePitch(rotation, scale) {
    oscLFreq = frequency + rotation * scale; 
    oscRFreq = oscLFreq + delta;
}
