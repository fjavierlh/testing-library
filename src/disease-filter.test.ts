import { DiseaseFilter } from "./disease-filter";

function createDiagnosis(id: number, location: string): any {
  return {
    id: id,
    name: "irrelevant-name",
    location: location,
    system: "irrelevant-system",
    origin: "irrelevant-origin",
    specie: "irrelevant-specie",
  };
}

function createCase(diagnosisId: number, patientName: string): any {
  return {
    id: 0,
    patientName: patientName,
    diagnosisId: diagnosisId,
    diagnosisName: "irrelevant-diagnosisName",
    publicNotes: [],
    privateNotes: [],
  };
}

describe("Disease filter", () => {
  beforeEach(() => {});

  it("filters cases when several diagnosis filters are applied together", () => {
    const searchCriterion1 = "Vías respiratorias altas";
    const searchCriterion2 = "Cerebro";
    const diagnoses = [
      createDiagnosis(1, searchCriterion1),
      createDiagnosis(2, searchCriterion2),
      createDiagnosis(3, "irrelevant-location"),
    ];
    const expectedPatientName1 = "Chupito";
    const expectedPatientName2 = "Juliana";
    const cases = [
      createCase(1, expectedPatientName1),
      createCase(2, expectedPatientName2),
      createCase(3, "irrelevant-name"),
    ];
    const diseaseFilter = DiseaseFilter.create(cases, diagnoses);
    diseaseFilter.addFilter("Cerebro");
    diseaseFilter.addFilter("Vías respiratorias altas");

    const result = diseaseFilter.casesFiltered;

    expect(result.length).toBe(2);
    expect(result[1].patientName).toBe(expectedPatientName1);
    expect(result[0].patientName).toBe(expectedPatientName2);
  });
});
