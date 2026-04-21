import tesseract from "node-tesseract-ocr";

const config = {
  lang: "por",
  oem: 1,
  psm: 3,
};

export class ExtractInvoiceData {
  // You can pass the path (file path) or Buffer
  async processInvoice(filePath: string) {
    try {
      // Here we use the 'config' defined above and the 'filePath' received
      const extractedText = await tesseract.recognize(filePath, config);

      // 1. Regex for Total Value
      // Looking for "TOTAL A PAGAR", skip anything (including line breaks) until I find "R$" and the value
      const totalValueMatch = extractedText.match(
        /TOTAL\s*A\s*PAGAR[\s\S]*?R\$\s*([\d,.]+)/i,
      );

      // 2. Regex for Consumption in kWh
      // In Energisa, actual consumption billed usually comes after "Consumo em kWh"
      // 1. We do the match
      const consumptionMatch = extractedText.match(
        /Consumo\s*em\s*kWh\s*(\d+)/i,
      );

      let consumptionKwh = null;

      // 2. We check if the consumptionMatch exists AND if group [1] was captured
      if (consumptionMatch && consumptionMatch[1]) {
        const readValue = consumptionMatch[1]; // Here TS already knows it's a string

        // 3. Apply logic to remove extra zeros
        consumptionKwh =
          readValue.length > 3 && readValue.endsWith("00")
            ? readValue.slice(0, -2)
            : readValue;
      }
      // 3. Regex for Installation Code (Consumer Unit)
      const clientCodeMatch = extractedText.match(
        /CÓDIGO\s*DO\s*CLIENTE[\s\S]*?(\d{2}\/\d+\-\d)/i,
      );

      // 4. Regex for Reference Month
      const referenceMonthMatch = extractedText.match(
        /REF:\s*MÊS\s*\/\s*ANO\s*\n\n(.*?)\s*\//i,
      );

      return {
        fullText: extractedText,
        totalValue: totalValueMatch ? totalValueMatch[1] : null,
        consumptionKwh: consumptionKwh, // We use the treated variable here
        clientCode: clientCodeMatch ? clientCodeMatch[1] : null,
        referenceMonth: referenceMonthMatch ? referenceMonthMatch[1] : null,
      };
    } catch (error) {
      console.error("OCR error:", error);
      throw new Error("Failed to process invoice data.");
    }
  }
}
