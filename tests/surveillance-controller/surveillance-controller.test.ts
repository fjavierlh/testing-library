import {
  MotionSensor,
  SurveillanceController,
  VideoRecorder,
} from "../../src/surveillance-controller/surveillance-controller";

describe("The video surveillance controller", () => {
  test("asks the recorder to start recording when sensor not detect", () => {
    let called = false;
    const saveCall = () => {
      called = true;
    };
    const sensor = new FakeMotionSensor();
    const recorder = new FakeVideoRecorder();
    recorder.stopRecording = saveCall;
    const surveillanceController = new SurveillanceController(sensor, recorder);

    surveillanceController.recordMotion();

    expect(called).toBeTruthy();
  });

  test("asks the recorder to start recording when sensor detects motion", () => {
    let called = false;
    const saveCall = () => {
      called = true;
    };
    const sensor = new FakeMotionSensor();
    sensor.isDetectingMotion = () => true;
    const recorder = new FakeVideoRecorder();
    recorder.startRecording = saveCall;
    const surveillanceController = new SurveillanceController(sensor, recorder);

    surveillanceController.recordMotion();

    expect(called).toBeTruthy();
  });
});

class FakeMotionSensor implements MotionSensor {
  isDetectingMotion(): boolean {
    return false;
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
