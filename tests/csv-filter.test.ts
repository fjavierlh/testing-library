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
1. Un fichero correcto con una sola factura donde todos los datos son correctos produce la misma línea
Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,

2. Un fichero correcto con una sola factura donde hay IVA y IGIC debería eliminar esa línea
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
  it("allows correct lines", () => {
    const header =
      "Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente";
    const invoiceLine = "1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,";

    const csvFilter = new CSVFilter([header, invoiceLine]);
    const result = csvFilter.filteredLines;

    expect(result).toEqual([header, invoiceLine]);
  });
});
