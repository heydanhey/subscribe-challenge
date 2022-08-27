const EXEMPTION_LOOKUP_TABLE = {
  books: ["book"],
  foods: ["chocolate bar", "chocolates"],
  medical: ["headache pills"],
};

export const BASE_SALES_TAX = 0.1;
export const IMPORT_TAX = 0.05;

function isExempt(description) {
  for (const category in EXEMPTION_LOOKUP_TABLE) {
    const exemptions = EXEMPTION_LOOKUP_TABLE[category].filter(
      (exempted_keyword) => description.includes(exempted_keyword)
    );

    if (exemptions.length) {
      return true;
    }
  }
  return false;
}

function isImported(description) {
  return description.includes("imported");
}

export function getTaxRate(description) {
  let taxRate = BASE_SALES_TAX;

  if (isExempt(description)) {
    taxRate = 0;
  }

  if (isImported(description)) {
    taxRate += IMPORT_TAX;
  }

  return taxRate;
}
