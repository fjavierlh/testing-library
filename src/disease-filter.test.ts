import { Diagnosis, DiseaseFilter, Case } from "./disease-filter";

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

function casesWithDiagnoses() {
  let diagnosisId = 0;
  let diagnoses: Diagnosis[] = [];
  let cases: Case[] = [];

  const add = (location: string, patientName: string) => {
    diagnosisId++;
    diagnoses.push(createDiagnosis(diagnosisId, location));
    cases.push(createCase(diagnosisId, patientName));
  };

  const builder = {
    havingDiagnosisWithLocationAndCaseWithName: (
      location: string,
      patientName: string
    ) => {
      add(location, patientName);
      return builder;
    },
    build: () => ({ diagnoses: () => diagnoses, cases: () => cases }),
  };

  return builder;
}

describe("Disease filter", () => {
  it("filters cases when several diagnosis filters are applied together", () => {
    const searchCriterion1 = "Vías respiratorias altas";
    const searchCriterion2 = "Cerebro";

    const expectedPatientName1 = "Chupito";
    const expectedPatientName2 = "Juliana";

    const fixtures = casesWithDiagnoses()
      .havingDiagnosisWithLocationAndCaseWithName(
        searchCriterion1,
        expectedPatientName1
      )
      .havingDiagnosisWithLocationAndCaseWithName(
        searchCriterion2,
        expectedPatientName2
      )
      .havingDiagnosisWithLocationAndCaseWithName(
        "irrelevant-location",
        "irrelevant-name"
      )
      .build();

    const diseaseFilter = DiseaseFilter.create(
      fixtures.cases(),
      fixtures.diagnoses()
    );
    diseaseFilter.addFilter("Cerebro");
    diseaseFilter.addFilter("Vías respiratorias altas");

    const result = diseaseFilter.casesFiltered;

    expect(result.length).toBe(2);
    expect(result[1].patientName).toBe(expectedPatientName1);
    expect(result[0].patientName).toBe(expectedPatientName2);
  });
});
