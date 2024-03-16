import CSVFilter from "../src/csv-filter";

describe("The CSV filter", () => {
  const header =
    "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
  const emptyField = "";

  it("allows correct lines", () => {
    const invoiceLine = fileWithOneInvoiceLineHaving({});

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header, invoiceLine]);
  });

  it("allows invoice line if net amount is correctly calculated for IGIC tax", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving({
      IVATax: "",
      IGICTax: "7",
      netAmount: "930",
    });

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header, invoiceLine]);
  });

  it("allows multiple correct invoice lines", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving({});
    const invoiceLine2 = fileWithOneInvoiceLineHaving({ invoiceId: "2" });

    const csvFilter = CSVFilter.create([header, invoiceLine, invoiceLine2]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header, invoiceLine, invoiceLine2]);
  });

  it("removes invoice line if has exclusionary taxes", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving({
      IVATax: "21",
      IGICTax: "7",
    });

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header]);
  });

  it("removes invoice line if both taxes are not present", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving({
      IVATax: "",
      IGICTax: "",
    });

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header]);
  });

  it("removes invoice line if some tax is not a decimal number", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving({ IVATax: "XYZ" });

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header]);
  });

  it("removes invoice line if one tax is a decimal number and the other is not", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving({
      IVATax: "XYZ",
      IGICTax: "7",
    });

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header]);
  });

  it("removes invoice line if net amount is miscalculated for IVA tax", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving({
      netAmount: "900",
    });

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header]);
  });

  it("removes invoice line if net amount is miscalculated for IGIC tax", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving({
      IGICTax: "7",
    });

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header]);
  });

  it("removes invoice line if CIF and NIF are present", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving({
      nif: "C1234546",
    });

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header]);
  });

  it("removes all invoice lines with repeated id", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving({ invoiceId: "1" });
    const invoiceLine2 = fileWithOneInvoiceLineHaving({ invoiceId: "1" });
    const invoiceLine3 = fileWithOneInvoiceLineHaving({ invoiceId: "3" });
    const invoiceLine4 = fileWithOneInvoiceLineHaving({ invoiceId: "4" });
    const invoiceLine5 = fileWithOneInvoiceLineHaving({ invoiceId: "3" });

    const csvFilter = CSVFilter.create([
      header,
      invoiceLine,
      invoiceLine2,
      invoiceLine3,
      invoiceLine4,
      invoiceLine5,
    ]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header, invoiceLine4]);
  });

  it("an empty file produces same file as result", () => {
    const csvFilter = CSVFilter.create([]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([]);
  });

  it("does not allow a list of invoices with a single line", () => {
    const result = () => CSVFilter.create([header]);

    expect(result).toThrow();
  });

  interface FileWithOneInvoiceLineHavingParams {
    invoiceId?: string;
    IVATax?: string;
    IGICTax?: string;
    netAmount?: string;
    nif?: string;
  }

  function fileWithOneInvoiceLineHaving({
    invoiceId = "1",
    IVATax = "21",
    IGICTax = emptyField,
    netAmount = "790",
    nif = emptyField,
  }: FileWithOneInvoiceLineHavingParams) {
    const invoiceDate = "02/05/2021";
    const grossAmount = "1000";
    const concept = "ACER Laptop";
    const cif = "B76430134";

    return [
      invoiceId,
      invoiceDate,
      grossAmount,
      netAmount,
      IVATax,
      IGICTax,
      concept,
      cif,
      nif,
    ].join();
  }
});
