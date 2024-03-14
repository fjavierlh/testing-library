class CSVFilter {
  private constructor(private readonly lines: string[]) {}

  static create(lines: string[]) {
    return new CSVFilter(lines);
  }

  get filteredLines(): string[] {
    const [header, ...invoicesLines] = this.lines;
    const filteredInvoices = invoicesLines.filter((invoice) =>
      this.hasValidTaxes(invoice)
    );

    return [header, ...filteredInvoices];
  }

  private extractFieldsFrom(invoice: string): string[] {
    return invoice.split(",");
  }

  private hasValidTaxes(invoice: string): boolean {
    const [, , grossAmount, netAmount, IVAtax, IGICtax] =
      this.extractFieldsFrom(invoice);
    const hasSomeTax = Boolean(IVAtax || IGICtax);
    const hasBothTaxes = Boolean(IVAtax && IGICtax);
    const isDecimalRegEx = /^\d*$/;
    const someTaxIsNotADecimal = [IVAtax, IGICtax]
      .filter(Boolean)
      .some((tax) => isDecimalRegEx.test(tax));

    return (
      hasSomeTax &&
      !hasBothTaxes &&
      someTaxIsNotADecimal &&
      this.netIsCorrectlyCalculated(netAmount, grossAmount, IVAtax)
    );
  }

  private netIsCorrectlyCalculated(
    netAmount: string,
    grossAmount: string,
    tax: string
  ) {
    const parsedNetAmount = parseFloat(netAmount);
    const parsedGrossAmount = parseFloat(grossAmount);
    const parsedTax = parseFloat(tax);
    return (
      parsedNetAmount ===
      parsedGrossAmount - (parsedGrossAmount * parsedTax) / 100
    );
  }
}

export default CSVFilter;
