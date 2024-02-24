import {
  MotionSensor,
  SurveillanceController,
  VideoRecorder,
} from "../../src/surveillance-controller/surveillance-controller";

describe("The video surveillance controller", () => {
  let sensor: MotionSensor;
  let recorder: FakeVideoRecorder;
  let surveillanceController: SurveillanceController;

  beforeEach(() => {
    sensor = new FakeMotionSensor();
    recorder = new FakeVideoRecorder();
    surveillanceController = new SurveillanceController(sensor, recorder);
  });

  test("asks the recorder to stop recording when sensor not detect", () => {
    const sensor = new FakeMotionSensor();
    const recorder = new FakeVideoRecorder();
    const spyRecorder = jest.spyOn(recorder, "stopRecording");
    const surveillanceController = new SurveillanceController(sensor, recorder);

    surveillanceController.recordMotion();

    expect(spyRecorder).toHaveBeenCalled();
  });

  test("asks the recorder to start recording when sensor detects motion", () => {
    const spyRecorder = jest.spyOn(recorder, "startRecording");
    const stubSensor = jest.spyOn(sensor, "isDetectingMotion");
    stubSensor.mockImplementation(() => true);

    surveillanceController.recordMotion();

    expect(spyRecorder).toHaveBeenCalled();
  });

  test("asks the recorder to start recording when the sensor thrown an unexpected error", () => {
    const spyRecorder = jest.spyOn(recorder, "stopRecording");
    const stubSensor = jest.spyOn(sensor, "isDetectingMotion");
    stubSensor.mockImplementation(() => {
      throw new Error("Unknown error");
    });

    surveillanceController.recordMotion();

    expect(spyRecorder).toHaveBeenCalled();
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
