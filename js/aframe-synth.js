// Declare Variables
var camera;                                         // Camera object
var cameraRotX, cameraRotY, cameraRotZ;             // Camera rotation
var cameraRotXNorm, cameraRotYNorm, cameraRotZNorm; // Normalized camera rotation
var cameraPosx, cameaPosY, cameraPosZ;              // Camera position
var cameraPosXNorm, cameraPosYNorm, cameraPosZNorm; // Normalized camera position

var initialFrequency                                // Initial frequency for synth
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
        cameraRotYNorm = cameraRotY / 360;
        /*
        cameraRotZ = camera.getAttribute('rotation').z % 360;
        cameraRotZNorm = cameraRotZ / 360;
        */

        updatePitch(cameraRotXNorm, cameraRotYNorm);
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
    synthL = new Tone.Synth
    oscL = new Tone.Oscillator(oscLFreq, "sine").connect(panL).start();
    oscR = new Tone.Oscillator(oscRFreq, "sine").chain(panR).start();
    console.log(oscL);
}

function updatePitch(xRot, yRot) {
    frequency = ( xRot * 320 ) + 440;
    delta = (yRot * 50) + 10;
    oscLFreq = frequency;
    oscRFreq = oscLFreq + delta;
    oscL.frequency.value = oscLFreq;
    oscR.frequency.value = oscRFreq;
}
