interface Invoice {
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
    const [header, ...rawInvoices] = this.lines;
    const validatedInvoices = rawInvoices.filter(this.isValidInvoice);
    const duplicatedIds = this.repeatedIdsFrom(validatedInvoices);
    const nonRepeatedInvoices = validatedInvoices.filter(
      (invoice) => !duplicatedIds.includes(this.idFrom(invoice))
    );
    return [header, ...nonRepeatedInvoices];
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

  private extractFieldsFrom(rawInvoice: string): Invoice {
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

  private repeatedIdsFrom(invoices: string[]) {
    const invoiceIds = invoices.map(this.idFrom);
    return invoiceIds.filter((id, index) => invoiceIds.indexOf(id) !== index);
  }

  private idFrom = (invoice: string): string => {
    return this.extractFieldsFrom(invoice).id;
  };

  private hasCorrectTaxes(ivaTax: any, igicTax: any) {
    return (
      this.hasSomeTax(ivaTax, igicTax) &&
      this.hasExclusionaryTaxes(ivaTax, igicTax) &&
      this.taxesAreDecimals(ivaTax, igicTax)
    );
  }

  private hasSomeTax(ivaTax: string, igicTax: string) {
    return ivaTax || igicTax;
  }

  private hasExclusionaryTaxes(ivaTax: string, igicTax: string) {
    return !(ivaTax && igicTax);
  }

  private taxesAreDecimals(...taxes: string[]) {
    const checkIsDecimalRegEx = /^\d*$/;
    return taxes.filter(Boolean).some((tax) => checkIsDecimalRegEx.test(tax));
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

  private hasSingleTaxIdentify(nif: string, cif: string) {
    return !(nif && cif);
  }
}

export default CSVFilter;
