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
    const [, , , , IVAtax, IGICtax] = this.extractFieldsFrom(invoice);
    const hasSomeTax = Boolean(IVAtax || IGICtax);
    const hasBothTaxes = Boolean(IVAtax && IGICtax);
    const taxIsNotADigit = [IVAtax, IGICtax].some((tax) => tax.match(/^\d/));

    return hasSomeTax && !hasBothTaxes && taxIsNotADigit;
  }
}

export default CSVFilter;
