import './Superpowered.js';

class MyProcessor extends SuperpoweredWebAudio.AudioWorkletProcessor {
    // runs after the constructor
    onReady() {
        this.reverb = new this.Superpowered.Reverb(
            this.samplerate,
            this.samplerate
        );
        this.effect = new this.Superpowered.AutomaticVocalPitchCorrection(
            this.samplerate
        );
        this.reverb.enabled = false;
        this.reverb.mix = 0;

        this.inputGain = 0.5;
        this.previousInputGain = 0;

        this.effect.scale = this.Superpowered.AutomaticVocalPitchCorrection.CHROMATIC;
        this.effect.range = this.Superpowered.AutomaticVocalPitchCorrection.WIDE;
        this.effect.speed = this.Superpowered.AutomaticVocalPitchCorrection.EXTREME;
        this.effect.clamp = this.Superpowered.AutomaticVocalPitchCorrection.OFF;

        this.sendMessageToMainScope({ event: 'ready' });
    }

    onDestruct() {
        this.reverb.destruct();
        this.effect.destruct();
    }

    onMessageFromMainScope(message) {
        if (message.type === "parameterChange") {
          if (message.payload?.id === "inputGain") this.inputGain = message.payload.value;
          else if (message.payload?.id === "reverbMix") {
            this.reverb.enabled = true;
            this.reverb.mix = message.payload.value;
          }
          if (message.payload?.id === "speed") this.effect.speed = this.Superpowered.AutomaticVocalPitchCorrection[message.payload.value];
          if (message.payload?.id == "scale") {
            this.effect.scale = this.Superpowered.AutomaticVocalPitchCorrection[message.payload.value];    
          }
          if (message.payload?.id == "range") {
            this.effect.range = this.Superpowered.AutomaticVocalPitchCorrection[message.payload.value];    
          }
          if(message.payload.id === 'autotuneToggle') this.effect.enabled = message.payload.value
        }
    }

    processAudio(inputBuffer, outputBuffer, buffersize, parameters) {
         // Ensure the samplerate is in sync on every audio processing callback.
        this.reverb.samplerate = this.samplerate;
        this.effect.samplerate = this.samplerate;

        // Apply volume while copy the input buffer to the output buffer.
        // Gain is smoothed, starting from "previousInputGain" to "inputGain".
        this.Superpowered.Volume(
            inputBuffer.pointer,
            outputBuffer.pointer,
            this.previousInputGain,
            this.inputGain,
            buffersize
        );
        this.previousInputGain = this.inputGain; // Save the gain for the next round.    

        // // Apply reverb to output (in-place).
        this.reverb.process(outputBuffer.pointer, outputBuffer.pointer, buffersize);
        this.effect.process(
            outputBuffer.pointer,
            outputBuffer.pointer,
            true,
            buffersize
        );
    }
}

if (typeof AudioWorkletProcessor === 'function') {
    registerProcessor('VoiceProcessor1', MyProcessor);
}
export default MyProcessor;
