// src/routes/api/upload.ts
import { HandlerContext, Request } from "solid-start/server";
import { IncomingForm } from "formidable";

export async function post(req: Request, context: HandlerContext) {
  const form = new IncomingForm();
  form.uploadDir = "./uploads";  // Stelle sicher, dass dieses Verzeichnis existiert
  form.keepExtensions = true;
  
  try {
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ fields, files });
      });
    });

    // Hier kannst du weitere Verarbeitungsschritte hinzufügen, z.B. die Datei in die Datenbank speichern oder anderswo speichern.
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
