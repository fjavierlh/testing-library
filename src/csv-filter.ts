class CSVFilter {
  private constructor(private readonly lines: string[]) {}

  static create(lines: string[]) {
    return new CSVFilter(lines);
  }

  get filteredLines(): string[] {
    const [header, ...invoicesLines] = this.lines;
    const validatedInvoices = invoicesLines.filter(this.isValidInvoice);
    return [header, ...validatedInvoices];
  }

  private extractFieldsFrom(invoice: string): string[] {
    return invoice.split(",");
  }

  private isValidInvoice = (invoice: string): boolean => {
    const [, , grossAmount, netAmount, IVAtax, IGICtax, , cif, nif] =
      this.extractFieldsFrom(invoice);
    const applicableTax = IVAtax || IGICtax;
    const hasSomeTax = Boolean(applicableTax);
    const hasBothTaxes = Boolean(IVAtax && IGICtax);
    const isDecimalRegEx = /^\d*$/;
    const someTaxIsNotADecimal = [IVAtax, IGICtax]
      .filter(Boolean)
      .some((tax) => isDecimalRegEx.test(tax));
    const hasBothTaxIdNumbers = nif && cif;

    return (
      hasSomeTax &&
      !hasBothTaxes &&
      someTaxIsNotADecimal &&
      this.netAmountIsCorrectlyCalculated(
        netAmount,
        grossAmount,
        applicableTax
      ) &&
      !hasBothTaxIdNumbers
    );
  };

  private netAmountIsCorrectlyCalculated(
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

  takeRepeatedIdsFrom(invoices: string[]) {
    const invoiceIds = invoices.map(
      (invoice) => this.extractFieldsFrom(invoice)[0]
    );
    return invoiceIds.filter((id, index) => invoiceIds.indexOf(id) !== index);
  }
}

export default CSVFilter;
