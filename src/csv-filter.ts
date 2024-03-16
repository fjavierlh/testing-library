class CSVFilter {
  private constructor(private readonly lines: string[]) {}

  static create(lines: string[]) {
    if (lines.length === 1) {
      throw new Error("Files with single lines are not allowed");
    }
    return new CSVFilter(lines);
  }

  get filteredLines(): string[] {
    if (this.lines.length === 0) {
      return [];
    }
    const [header, ...invoicesLines] = this.lines;
    const validatedInvoices = invoicesLines.filter(this.isValidInvoice);
    const duplicatedIds = this.takeRepeatedIdsFrom(validatedInvoices);
    const nonRepeatedInvoices = validatedInvoices.filter(
      (invoice) => !duplicatedIds.includes(this.idFrom(invoice))
    );
    return [header, ...nonRepeatedInvoices];
  }

  private isValidInvoice = (invoice: string): boolean => {
    const [, , grossAmount, netAmount, IVAtax, IGICtax, , cif, nif] =
      this.extractFieldsFrom(invoice);
    const applicableTax = IVAtax || IGICtax;
    const hasSomeTax = Boolean(applicableTax);
    const hasBothTaxes = Boolean(IVAtax && IGICtax);
    const checkDecimalRegEx = /^\d*$/;
    const someTaxIsNotADecimal = [IVAtax, IGICtax]
      .filter(Boolean)
      .some((tax) => checkDecimalRegEx.test(tax));
    const hasBothTaxIdNumbers = nif && cif;
    const hasCorrectAmount = this.hasCorrectAmount(
      netAmount,
      grossAmount,
      applicableTax
    );

    return (
      hasSomeTax &&
      !hasBothTaxes &&
      someTaxIsNotADecimal &&
      hasCorrectAmount &&
      !hasBothTaxIdNumbers
    );
  };

  private idFrom = (invoice: string): string => {
    return this.extractFieldsFrom(invoice)[0];
  };

  private extractFieldsFrom(invoice: string): string[] {
    return invoice.split(",");
  }

  private hasCorrectAmount(
    netAmount: string,
    grossAmount: string,
    applicableTax: string
  ) {
    const parsedNetAmount = parseFloat(netAmount);
    const parsedGrossAmount = parseFloat(grossAmount);
    const parsedTax = parseFloat(applicableTax);
    return (
      parsedNetAmount ===
      parsedGrossAmount - (parsedGrossAmount * parsedTax) / 100
    );
  }

  private takeRepeatedIdsFrom(invoices: string[]) {
    const invoiceIds = invoices.map(this.idFrom);
    return invoiceIds.filter((id, index) => invoiceIds.indexOf(id) !== index);
  }
}

export default CSVFilter;
