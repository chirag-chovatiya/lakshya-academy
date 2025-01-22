// pages/api/fetchSheet.js
import axios from "axios";
import * as XLSX from "xlsx";

export async function POST(request) {
    try {
        const googleSheetUrl =
          "https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?format=xlsx";
    
        const response = await axios.get(googleSheetUrl, {
          responseType: "arraybuffer",
        });
    
        const workbook = XLSX.read(response.data, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; 
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); 
    
        console.log(sheetData);
    
        // Respond with the parsed data
        res.status(200).json({ data: sheetData });
      } catch (error) {
        console.error("Error fetching or parsing sheet:", error);
        res.status(500).json({ error: "Failed to fetch or process the Google Sheet." });
      }
  }