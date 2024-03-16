/**
 * Requirements
Es válido que algunos campos estén vacíos, apareciendo dos comas seguidas o una coma final.
(x) Los impuestos IVA e IGIC son excluyentes, es decir, sólo puede aplicarse uno de los dos. Si alguna línea tiene contenido en ambos campos debe quedarse fuera.
(x) Los campos CIF y NIF son excluyentes, sólo se puede usar uno de ellos.
(x) El número de factura no puede estar repetido, si lo estuviese eliminaremos todas las líneas con repetición.
El neto es el resultado de aplicar al bruto el correspondiente impuesto. Si algún neto no está bien calculado la línea se queda fuera.
 */

/**
 * Example:
Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
2,03/08/2019,2000,2000,,8,MacBook Pro,,78544372A
3,03/12/2019,1000,2000,19,8, LenovoLaptop,,78544372A
 */

/**
 * Test cases
(x) 1. Un fichero correcto con una sola factura donde todos los datos son correctos produce la misma línea
Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,

(x) 2. Un fichero correcto con una sola factura donde hay IVA y IGIC debería eliminar esa línea
Num _factura, Fecha,      Bruto, Neto, IVA, IGIC, Concepto,    CIF_cliente, NIF_cliente
1,            02/05/2019, 1008,  810,   19,   21, ACERLaptop,  B76430134,

3. Un fichero correcto con una sola factura donde existe CIF y NIF debería eliminar esa línea
Num _factura, Fecha,      Bruto, Neto, IVA, IGIC, Concepto,    CIF_cliente, NIF_cliente
1,            02/05/2019, 1008,  810,   19,   21, ACERLaptop,  B76430134,

4. Un fichero correcto con una sola factura donde el neto esté mal calculado debería eliminar esa línea
Num _factura, Fecha,      Bruto, Neto, IVA, IGIC, Concepto,    CIF_cliente, NIF_cliente
1,            02/05/2019, 1008,  810,   19,   21, ACERLaptop,  B76430134,

5. Un fichero correcto en el que existen dos facturas con el mismo número identificador debería eliminar los repetidos
Num _factura, Fecha,      Bruto, Neto, IVA, IGIC, Concepto,    CIF_cliente, NIF_cliente
1,            02/05/2019, 1008,  810,   19,   21, ACERLaptop,  B76430134,
1,            02/05/2019, 1008,  810,   19,   21, ACERLaptop,  B76430134,


6. Un fichero vacío producirá un fichero sin líneas
Num _factura, Fecha,      Bruto, Neto, IVA, IGIC, Concepto,    CIF_cliente, NIF_cliente


7. Un fichero que contiene una sola línea es incorrecto si no tiene cabecera

 */

import CSVFilter from "../src/csv-filter";

describe("The CSV filter", () => {
  const header =
    "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
  const emtpyField = "";

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

  it("removes invoice line if has excluyent taxes", () => {
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
    IGICTax = emtpyField,
    netAmount = "790",
    nif = emtpyField,
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
