import { stringCalculator } from "../src/string-calculator";
/**
1. En el caso de recibir null o una cadena vacía, la función deberá devolver 0.
null => 0, "" => 0

2. En el caso de recibir sólo un número en formato string debe convertirlo a un tipo numérico y devolverlo.
"10" => 10

3. En el caso de recibir varios números debe devolver correctamente el resultado de la suma. Los números van a estar separados, por defecto, por comas.
"1,2" => 3, "1,2,3" => 6 

4. Podría darse el caso de que algunos de los elementos separados por comas fuese un carácter no numérico, como, por ejemplo, una letra. Estos valores no deberían afectar al resultado total. 
"a" => 0, "1,C,2" => 3, "1,Q,2,&,3,2a" => 6 

5. Por último, la función debe admitir separadores personalizados. Para ello, en la primera parte de la expresión se indicará la configuración. El principio de la configuración vendrá dado por una doble barra inclinada, luego el siguiente carácter sería el separador que ha escogido el usuario y el final de la configuración se indica con otra barra inclinada.
"1%C%2" => 3, "//1#Q,#2#&#3#2a" => 6,  "1,C,2" => 0,
 */

describe("The string calculator", () => {
  test("does not increment the total in case of null or empty expression", () => {
    expect(stringCalculator(null)).toBe(0);
    expect(stringCalculator("")).toBe(0);
  });
  test("convert number in the string to number type", () => {
    expect(stringCalculator("1")).toBe(1);
  });

  test("sum all numbers separated by commas", () => {
    expect(stringCalculator("1,2")).toBe(3);
  });
});
