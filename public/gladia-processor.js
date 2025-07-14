class GladiaProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this.inputSampleRate = options.processorOptions.inputSampleRate;
    this.targetSampleRate = options.processorOptions.targetSampleRate;
    this.port.postMessage({ debug: true, inputSampleRate: this.inputSampleRate, targetSampleRate: this.targetSampleRate });
  }

  resample(input) {
    if (this.inputSampleRate === this.targetSampleRate) {
      const output = new Int16Array(input.length);
      for (let i = 0; i < input.length; i++) {
        const clamped = Math.max(-1, Math.min(1, input[i]));
        output[i] = clamped * 0x7fff;
      }
      return output;
    }

    const ratio = this.inputSampleRate / this.targetSampleRate;
    const outputLength = Math.floor(input.length / ratio);
    const output = new Int16Array(outputLength);

    for (let i = 0; i < outputLength; i++) {
      const floatIndex = i * ratio;
      const index = Math.floor(floatIndex);
      const nextIndex = Math.min(index + 1, input.length - 1);
      const weight = floatIndex - index;

      const sample = (1 - weight) * input[index] + weight * input[nextIndex];
      const clamped = Math.max(-1, Math.min(1, sample));
      output[i] = clamped * 0x7fff;
    }

    return output;
  }

  process(inputs) {
    const input = inputs[0][0];
    if (input) {
      const resampled = this.resample(input);
      this.port.postMessage(resampled);
    }
    return true;
  }
}

registerProcessor("gladia-processor", GladiaProcessor);
