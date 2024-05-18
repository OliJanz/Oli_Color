// src/components/FileUploader.tsx
import { createSignal } from "solid-js";

function FileUploader() {
  const [file, setFile] = createSignal<File | null>(null);

  const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    setFile(file);
  };

  const uploadFile = async () => {
    if (!file()) {
      alert("Bitte wähle zuerst eine Datei aus.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file() as Blob);

    // Hier musst du die URL anpassen, an die du die Datei senden möchtest.
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert("Datei erfolgreich hochgeladen!");
    } else {
      alert("Fehler beim Hochladen der Datei.");
    }
  };

  return (
    <div>
      <input type="file" accept="image/png" onChange={onFileChange} />
      <button onClick={uploadFile}>Hochladen</button>
    </div>
  );
}

export default FileUploader;
