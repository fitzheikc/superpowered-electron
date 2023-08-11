/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-mixed-spaces-and-tabs */
export { };

declare global {
  interface Window {
	SuperpoweredGlue: any;
	bridge: any
	ipcRenderer: Electron.IpcRendere
  }
  var staticServerPort: number;
  declare class SuperpoweredGlue {
  	static wasmbin: string

  	niceSize(bytes: number): string;

  	createFloatArray(length: number): any;

  	static SuperpoweredGlueSourceURL: null | string

  	static Instantiate(licenseKey: string, url?: string): Promise<SuperpoweredGlue>;

  	constructor();

  	updateBuffer(buffer: any, arraybuffer: ArrayBuffer): void;

  	createViewFromType(type: number, pointer: number, length: number): any;

  	returnPointerToView(r: any, type: number): any;

  	invokeMethod(...args: Array<any>): any;

  	invokeFunction(...args: Array<any>): any;

  	invokeExportedFunction(...args: Array<any>): any;

  	createClass(classnamePointer: number, classnameLen: number, sizeofClass: number): void;

  	createConstructor(): void;

  	createDestructor(): void;

  	createClassConstant(nameptr: number, namelen: number, value: any): void;

  	createConstant(nameptr: number, namelen: number, value: any): void;

  	createPropertyFromDescriptor(object: any, descriptor: any): void;

  	createProperty(propertynamePointer: number, propertynameLen: number, offset: number, viewType: number, viewLength: number): void;

  	createStaticPropertyFromDescriptor(wasmClass: any, descriptor: any): void;

  	createStaticProperty(propertynamePointer: number, propertynameLen: number, pointer: number, viewType: number, viewLength: number): void;

  	createMethod(methodnamePointer: number, methodnameLen: number, returnPointerType: number): void;

  	createStaticMethod(methodnamePointer: number, methodnameLen: number, returnPointerType: number): void;

  	createFunction(methodnamePointer: number, methodnameLen: number, returnPointerType: number): void;

  	exportToWasm(functionName: string, f: Function): void;

  	onMemoryGrowth(n: number): void;

  	consolelog(pointer: number, strlen: number): void;

  	setInstance(wasmInstance: WebAssembly.Instance): void;

  	loadFromArrayBuffer(wasmCode: ArrayBuffer, afterWASMLoaded?: { afterWASMLoaded: () => void }): Promise<void>;

  	loadFromModule(module: WebAssembly.Module): Promise<void>;

  	loadFromURL(url: string, storeCode?: boolean): Promise<void>;

  	toString(pointer: number, strlen?: number): string;

  	toWASMString(str: string, view?: Uint8Array | null): number;

  	logMemory(): void;

  	malloc(bytes: number): number;

  	updateMemoryViews(): void;

  	free(pointer: number): void;

  	setInt64(pointer: number, index: number, value: number): void;

  	bufferToWASM(buffer: any, input: any, index?: number): void;

  	bufferToJS(buffer: any, output: any, index?: number): void;

  	arrayBufferToWASM(arrayBuffer: ArrayBuffer, offset?: number): number;

  	copyWASMToArrayBuffer(pointer: number, lengthBytes: number): ArrayBuffer;

  	moveWASMToArrayBuffer(pointer: number, lengthBytes: number): ArrayBuffer;

  	static loaderWorkerMain(url: string): Promise<void>;

  	static loaderWorkerOnmessage(message: MessageEvent): void;

  	registerTrackLoader(receiver: any): number;

  	handleTrackLoaderMessage(message: MessageEvent): boolean;

  	async loadTrackInWorker(url: string, trackLoaderID: number): Promise<void>;

  	transferLoadedTrack(arrayBuffer: ArrayBuffer, trackLoaderWorker: Worker): void;

  	downloadAndDecode(url: string, obj: any): void;

  	Version(): string;
  }

declare class SuperpoweredWebAudio {
	static AudioWorkletHasBrokenModuleImplementation: boolean

	audioContext: AudioContext

	constructor(minimumSamplerate: number, superpowered: any);

	getUserMediaForAudio(
    constraints: MediaStreamConstraints,
    onPermissionGranted: (stream: MediaStream) => void,
    onPermissionDenied: (error: Error) => void
  ): void;

	getUserMediaForAudioAsync(
    constraints: MediaStreamConstraints
  ): Promise<MediaStream>;

	createAudioNode(
    url: string,
    className: string,
    callback: (
      node:
        | AudioWorkletNode
        | ScriptProcessorNode
        | SuperpoweredWebAudio.AudioWorkletProcessor
    ) => void,
    onMessageFromAudioScope: (message: any) => void,
    numInputs?: number,
    numOutputs?: number
  ): void;

	createAudioNodeAsync(
    url: string,
    className: string,
    onMessageFromAudioScope: (message: any) => void,
    numInputs?: number,
    numOutputs?: number
  ): Promise<
    AudioWorkletNode | ScriptProcessorNode | SuperpoweredWebAudio.AudioWorkletProcessor
  >;
}

declare namespace SuperpoweredWebAudio {
  class AudioWorkletProcessor extends globalThis.AudioWorkletProcessor {
  	constructor(options: {
      processorOptions: {
        wasmCode: ArrayBuffer;
        samplerate: number;
        maxChannels: number;
        numberOfInputs: number;
        numberOfOutputs: number;
        trackLoaderID: number;
      };
    });

  	trackLoaderID: number

  	state: number

  	port: MessagePort

  	samplerate: number

  	Superpowered: any

  	numberOfInputs: number

  	numberOfOutputs: number

  	afterWASMLoaded(): void;

  	onReady(): void;

  	onDestruct(): void;

  	onMessageFromMainScope(message: any): void;

  	sendMessageToMainScope(message: any): void;

  	processAudio(
      buffer: Array<Float32Array>,
      parameters: Record<string, Float32Array>,
      smth: any,
      smth2: any
    ): void;

  	process(
      inputs: Array<Array<Float32Array>>,
      outputs: Array<Array<Float32Array>>,
      parameters: Record<string, Float32Array>
    ): boolean;
  }}

  declare class SuperpoweredAudioWorkletProcessor extends AudioWorkletProcessor {
  	constructor(options: {
      processorOptions: {
        wasmCode: ArrayBuffer;
        samplerate: number;
        maxChannels: number;
        numberOfInputs: number;
        numberOfOutputs: number;
        trackLoaderID: number;
      };
    });

  	trackLoaderID: number

  	state: number

  	port: MessagePort

  	samplerate: number

  	Superpowered: SuperpoweredGlue

  	numberOfInputs: number

  	numberOfOutputs: number

  	afterWASMLoaded(): void;

  	onReady(): void;

  	onDestruct(): void;

  	onMessageFromMainScope(message: any): void;

  	sendMessageToMainScope(message: any): void;

  	processAudio(buffer: Array<Float32Array>, parameters: Record<string, Float32Array>): void;

  	process(
      inputs: Array<Array<Float32Array>>,
      outputs: Array<Array<Float32Array>>,
      parameters: Record<string, Float32Array>
    ): boolean;
  }
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
    }
  }
}