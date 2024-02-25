export interface MotionSensor {
  isDetectingMotion(): boolean;
}

export interface VideoRecorder {
  startRecording(): void;
  stopRecording(): void;
}

export class SurveillanceController {
  motionSensor: MotionSensor;
  videoRecorder: VideoRecorder;
  isDetectingMotion: boolean;

  constructor(motionSensor: MotionSensor, videoRecorder: VideoRecorder) {
    this.motionSensor = motionSensor;
    this.videoRecorder = videoRecorder;
  }

  recordMotion(numberOfSeconds = 1) {
    this.range(numberOfSeconds).forEach(() => {
      this.tryToRecordMotion();
      this.wait();
    });
  }

  private range(length = 1) {
    return Array.from({ length }, (_, i) => i);
  }

  private tryToRecordMotion() {
    try {
      this.motionSensor.isDetectingMotion()
        ? this.videoRecorder.startRecording()
        : this.videoRecorder.stopRecording();
    } catch (error) {
      this.videoRecorder.stopRecording();
    }
  }

  private wait(milliseconds = 1000) {
    let startTime = new Date().getTime();
    const endTime = new Date().getTime() + milliseconds;
    while (startTime < endTime) {
      startTime = new Date().getTime();
    }
  }
}
