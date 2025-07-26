import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("Hello");
  const [qrCode, setQrCode] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState("");

  const generateQRCode = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      word
    )}&size=250x250`;
    setQrCode(qrUrl);
  };

  const downloadQRCode = async () => {
    const response = await fetch(qrCode);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToast("✅ QR Code downloaded!");
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <div className="App">
        <h1>QR Code Generator</h1>

        <div className="controls">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter text or URL"
          />

          <button onClick={generateQRCode}>Generate</button>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {qrCode && (
          <div className="output-box">
            <img src={qrCode} alt="QR Code" />
            <button onClick={downloadQRCode}>📥 Download QR</button>
          </div>
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
}

export default App;