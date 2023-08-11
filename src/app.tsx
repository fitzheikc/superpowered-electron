/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useMemo, useState } from 'react';
import './lib/Superpowered';
import { ipcRenderer } from 'electron';

function onMessageProcessorAudioScope(message: string) {
    console.log(message);
}

const preset1 = {
    speed: 'SUBTLE',
    scale: 'CMAJOR',
    range: 'WIDE'
}
const preset2 = {
    speed: 'EXTREME',
    scale: 'AMINOR',
    range: 'WIDE'
}

export const App = () => {
    const [processorNode1, setprocessorNode1] = useState<any>(null);
    const [gain1, setGain1] = useState(0.5);
    const [reverbMix, setReverbMix] = useState(0);
    const [port, setPort] = useState<number | undefined>(undefined);
    const [activePreset, setActivePreset] = useState<number | null>(null);

    const presetStyles = useMemo(() => {
        return (presetId: number) => ({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
            height: 30,
            cursor: 'pointer',
            border: activePreset === presetId ? '4px solid blue' : '2px solid black'
        })
    }, [activePreset]);

    ipcRenderer.on('port', (_, value) => {
        setPort(value);
    })
    
    async function loadSP() {
        const publicSuperpoweredLocation = `http://127.0.0.1:${port}/Superpowered.js` 
        const superpowered = await SuperpoweredGlue.Instantiate(
            'ExampleLicenseKey-WillExpire-OnNextUpdate',
            publicSuperpoweredLocation
        );
        console.log(`Running Superpowered v${superpowered.Version()}`);

        const devices = await navigator.mediaDevices.enumerateDevices();
        const microphoneDevices: MediaDeviceInfo[]  = devices.filter((x) => x.kind === 'audioinput')
        console.log({microphoneDevices})

        const webaudioManager1 = new SuperpoweredWebAudio(48000, superpowered);
        webaudioManager1.audioContext.suspend();
        
        if(microphoneDevices[0]?.deviceId) {
            const micStream1 = await webaudioManager1.getUserMediaForAudioAsync({'fastAndTransparentAudio': {
                deviceId: microphoneDevices[0]?.deviceId
            }})
            console.log("🚀 ~ file: app.tsx:46 ~ loadSP ~ micStream1:", micStream1)

            if (!micStream1) return;

            const audioInput1 = webaudioManager1.audioContext.createMediaStreamSource(micStream1);
            
            const userInputMergerNode1 = webaudioManager1.audioContext.createChannelMerger(2);

            audioInput1.connect(userInputMergerNode1, 0, 0);
            audioInput1.connect(userInputMergerNode1, 0, 1);        


            const audioNode1 = await webaudioManager1.createAudioNodeAsync(
                `http://127.0.0.1:${port}/voiceProcessor.js`,
                `VoiceProcessor1`,
                onMessageProcessorAudioScope
            );
            setprocessorNode1(audioNode1)
            userInputMergerNode1.connect(audioNode1 as any)
            audioNode1.connect(webaudioManager1.audioContext.destination);    
            webaudioManager1.audioContext.resume(); 
        }
    }

    useEffect(() => {
        if(port !== undefined) {
            loadSP();
        }
    }, [port]);

    const handleChange = (id: string, device: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if(processorNode1) {
            console.log(id, e.target.value)
            if(id === 'inputGain'){
                if(device === 1) {
                    setGain1(Number(e.target.value));
                }
            } 
            if(id === 'reverbMix') {
                setReverbMix(Number(e.target.value));
                if(processorNode1) {
                    processorNode1.sendMessageToAudioScope({
                        type: "parameterChange",
                        payload: {
                          id,
                          value: Number(e.target.value) // we should type cast here.
                        }
                    });
                }

                return;
            }

            processorNode1.sendMessageToAudioScope({
                type: "parameterChange",
                payload: {
                  id,
                  value: Number(e.target.value) // we should type cast here.
                }
            });
        }
    }



    const handleClickPreset = (presetId: number) => () => {
        if(activePreset === presetId) {
            setActivePreset(null);
            processorNode1.sendMessageToAudioScope({
                type: "parameterChange",
                payload: {
                  id: 'autotuneToggle',
                  value: false
                }
            });
            return;
        }
        setActivePreset(presetId);
        processorNode1.sendMessageToAudioScope({
            type: "parameterChange",
            payload: {
              id: 'autotuneToggle',
              value: true
            }
        });
        const preset = presetId === 1 ? preset1 : preset2;
        processorNode1.sendMessageToAudioScope({
            type: "parameterChange",
            payload: {
              id: 'speed',
              value: preset.speed
            }
        });
        processorNode1.sendMessageToAudioScope({
            type: "parameterChange",
            payload: {
              id: 'range',
              value: preset.range
            }
        });
        processorNode1.sendMessageToAudioScope({
            type: "parameterChange",
            payload: {
              id: 'scale',
              value: preset.scale
            }
        });
    }

    return (
        <div>
          <div style={{display: 'flex', paddingTop: '10px', flexDirection: 'column', rowGap: '5px', width: '25%'}}>
            <label>Input Gain 1: <span id="inputGain">{gain1}</span></label>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={gain1}
                onChange={handleChange('inputGain', 1)}
            />
            <label>Reverb Mix <span id="reverbMix">{reverbMix}</span></label>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={reverbMix}
                onChange={handleChange('reverbMix', 1)}
            />
            <div style={{
                display: 'flex',
                paddingTop: 10,
                columnGap: 10
            }}>
                <div onClick={handleClickPreset(1)} style={presetStyles(1)} >Preset 1</div>
                <div onClick={handleClickPreset(2)} style={presetStyles(2)} >Preset 2</div>
            </div>
          </div>
        </div>
    )
}