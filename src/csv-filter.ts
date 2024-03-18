interface InvoiceFields {
  id: string;
  date: string;
  grossAmount: string;
  netAmount: string;
  ivaTax: string;
  igicTax: string;
  concept: string;
  cif: string;
  nif: string;
}

class CSVFilter {
  private constructor(private readonly lines: string[]) {}

  static create(lines: string[]): CSVFilter {
    if (lines.length === 1) {
      throw new Error("Files with single lines are not allowed");
    }
    return new CSVFilter(lines);
  }

  get filteredLines(): string[] {
    if (this.lines.length === 0) {
      return [];
    }
    const [header, ...rawInvoices] = this.lines;
    return [
      header,
      ...this.nonRepeatedInvoicesFrom(this.validatedInvoicesFrom(rawInvoices)),
    ];
  }

  private validatedInvoicesFrom(rawInvoices: string[]) {
    return rawInvoices.filter(this.isValidInvoice);
  }

  private isValidInvoice = (rawInvoice: string): boolean => {
    const { grossAmount, netAmount, ivaTax, igicTax, cif, nif } =
      this.extractFieldsFrom(rawInvoice);
    const applicableTax = ivaTax || igicTax;

    return (
      this.hasCorrectTaxes(ivaTax, igicTax) &&
      this.hasCorrectAmount(netAmount, grossAmount, applicableTax) &&
      this.hasSingleTaxIdentify(nif, cif)
    );
  };

  private nonRepeatedInvoicesFrom(validatedInvoices: string[]): string[] {
    const repeatedInvoicesIds = this.repeatedIdsFrom(validatedInvoices);
    return validatedInvoices.filter((invoice: string) =>
      this.isNonRepeatedInvoice(invoice, repeatedInvoicesIds)
    );
  }

  private isNonRepeatedInvoice = (
    invoice: string,
    repeatedInvoicesIds: string[]
  ): boolean => !repeatedInvoicesIds.includes(this.idFrom(invoice));

  private repeatedIdsFrom(invoices: string[]): string[] {
    return invoices.map(this.idFrom).filter(this.isRepeatedIdInvoice);
  }

  private isRepeatedIdInvoice = (
    id: string,
    index: number,
    invoiceIds: string[]
  ): boolean => invoiceIds.indexOf(id) !== index;

  private idFrom = (invoice: string): string => {
    return this.extractFieldsFrom(invoice).id;
  };

  private extractFieldsFrom(rawInvoice: string): InvoiceFields {
    const [
      id,
      date,
      grossAmount,
      netAmount,
      ivaTax,
      igicTax,
      concept,
      cif,
      nif,
    ] = rawInvoice.split(",");
    return {
      id,
      date,
      grossAmount,
      netAmount,
      ivaTax,
      igicTax,
      concept,
      cif,
      nif,
    };
  }

  private hasCorrectTaxes(ivaTax: string, igicTax: string): boolean {
    return (
      this.hasSomeTax(ivaTax, igicTax) &&
      this.hasExclusionaryTaxes(ivaTax, igicTax) &&
      this.areTaxesDecimals(ivaTax, igicTax)
    );
  }

  private hasSomeTax(ivaTax: string, igicTax: string): boolean {
    return !!(ivaTax || igicTax);
  }

  private hasExclusionaryTaxes(ivaTax: string, igicTax: string): boolean {
    return !(ivaTax && igicTax);
  }

  private areTaxesDecimals(...taxes: string[]): boolean {
    const checkIfIsDecimalRegEx = /^\d*$/;
    return taxes.filter(Boolean).some((tax) => checkIfIsDecimalRegEx.test(tax));
  }

  private hasCorrectAmount(
    netAmount: string,
    grossAmount: string,
    applicableTax: string
  ): boolean {
    const parsedNetAmount = parseFloat(netAmount);
    const parsedGrossAmount = parseFloat(grossAmount);
    const parsedTax = parseFloat(applicableTax);
    return (
      parsedNetAmount ===
      parsedGrossAmount - (parsedGrossAmount * parsedTax) / 100
    );
  }

  private hasSingleTaxIdentify(nif: string, cif: string): boolean {
    return !(nif && cif);
  }
}

export default CSVFilter;
