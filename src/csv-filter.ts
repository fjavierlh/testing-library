class CSVFilter {
  constructor(private readonly lines: string[]) {}

  get filteredLines(): string[] {
    return this.lines;
  }
}

export default CSVFilter;
