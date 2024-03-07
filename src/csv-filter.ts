class CSVFilter {
  private constructor(private readonly lines: string[]) {}

  static create(lines: string[]) {
    return new CSVFilter(lines);
  }

  get filteredLines(): string[] {
    const [header, invoice] = this.lines;
    const [, , , , IVAtax, IGICtax] = invoice.split(",");

    if ([IGICtax, IVAtax].every(Boolean)) {
      return [header];
    }

    return this.lines;
  }
}

export default CSVFilter;
