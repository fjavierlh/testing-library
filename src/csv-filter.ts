class CSVFilter {
  private constructor(private readonly lines: string[]) {}

  static create(lines: string[]) {
    return new CSVFilter(lines);
  }

  get filteredLines(): string[] {
    return this.lines;
  }
}

export default CSVFilter;
