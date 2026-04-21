import { Request, Response } from "express";
import { ExtractInvoiceData } from "../../../shared/services/TesseractService";

export async function create(req: Request, res: Response): Promise<Response> {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File not sent" });
    }

    const extractInvoiceData = new ExtractInvoiceData();

    // Pass the file path that Multer saved
    const data = await extractInvoiceData.processInvoice(req.file.path);

    // Optional: delete file after processing
    // await fs.promises.unlink(req.file.path);

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: "Error processing invoice" });
  }
}
