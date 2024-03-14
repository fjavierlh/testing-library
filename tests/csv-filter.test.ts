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
    const invoiceLine = fileWithOneInvoiceLineHaving();

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header, invoiceLine]);
  });

  it("removes invoice line if has excluyent taxes", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving("21", "7");

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header]);
  });

  it("removes invoice line if both taxes are not present", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving("", "");

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header]);
  });

  it("removes invoice line if tax is not a decimal number", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving("XYZ");

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header]);
  });

  it("removes invoice line if one tax is a decimal number and the other is not", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving("XYZ", "7cd");

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header]);
  });

  it("removes invoice line if net amount is miscalculated for iva tax", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = fileWithOneInvoiceLineHaving("21", "", "900");

    const csvFilter = CSVFilter.create([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header]);
  });

  function fileWithOneInvoiceLineHaving(
    IVATax = "21",
    IGICTax = emtpyField,
    netAmount = "790"
  ) {
    const invoiceId = "1";
    const invoiceDate = "02/05/2021";
    const grossAmount = "1000";
    const concept = "ACER Laptop";
    const cif = "B76430134";
    const nif = emtpyField;

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
