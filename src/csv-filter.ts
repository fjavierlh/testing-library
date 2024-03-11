class CSVFilter {
  private constructor(private readonly lines: string[]) {}

  static create(lines: string[]) {
    return new CSVFilter(lines);
  }

  get filteredLines(): string[] {
    const [header, ...invoicesLines] = this.lines;
    const filteredInvoices = invoicesLines
      .filter((invoice) => {
        const [, , , , IVAtax, IGICtax] = invoice.split(",");
        const hasBothTaxes = IVAtax && IGICtax;

        return !hasBothTaxes;
      })
      .filter((invoice) => {
        const [, , , , IVAtax, IGICtax] = invoice.split(",");
        const hasSomeTax = IVAtax || IGICtax;
        
        return hasSomeTax;
      });

    return [header, ...filteredInvoices];
  }
}

export default CSVFilter;
