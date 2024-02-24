/**
Indica al grabador que detenga la grabación cuando el sensor no detecta movimiento.
Indica al grabador que comience la grabación cuando el sensor detecta movimiento.
Indica al grabador que detenga la grabación cuando el sensor arroja un error inesperado.
Comprueba el estado del sensor de movimiento una vez por segundo.
 */
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

  recordMotion() {
    if (this.motionSensor.isDetectingMotion()) {
      this.videoRecorder.startRecording();
    } else {
      this.videoRecorder.stopRecording();
    }
  }
}
