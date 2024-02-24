import {
  MotionSensor,
  SurveillanceController,
  VideoRecorder,
} from "../../src/surveillance-controller/surveillance-controller";

describe("The video surveillance controller", () => {
  test("asks the recorder to start recording when sensor not detect", () => {
    const sensor = new StubMotionSensorDetectingNoMotion();
    const recorder = new SpyVideoRecorder();
    const surveillanceController = new SurveillanceController(sensor, recorder);

    surveillanceController.recordMotion();

    expect(recorder.stopRecordingCalled).toBeTruthy();
  });

  test("asks the recorder to start recording when sensor detects motion", () => {
    const sensor = new StubMotionSensorDetectingMotion();
    const recorder = new SpyVideoRecorder();
    const surveillanceController = new SurveillanceController(sensor, recorder);

    surveillanceController.recordMotion();

    expect(recorder.startRecordingCalled).toBeTruthy();
  });
});

class StubMotionSensorDetectingMotion implements MotionSensor {
  isDetectingMotion(): boolean {
    return true;
  }
}
class StubMotionSensorDetectingNoMotion implements MotionSensor {
  isDetectingMotion(): boolean {
    return false;
  }
}

class SpyVideoRecorder implements VideoRecorder {
  startRecordingCalled = false;
  stopRecordingCalled = false;
  startRecording(): void {
    this.startRecordingCalled = true;
  }
  stopRecording(): void {
    this.stopRecordingCalled = true;
  }
}

class FakeVideoRecorder implements VideoRecorder {
  startRecording(): void {
    console.log("start recording...");
  }
  stopRecording(): void {
    console.log("stop recording...");
  }
}
