import { useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

function App() {
  const [qrCodeText, setQrCodeText] = useState('');
  const [scanning, setScanning] = useState(false);
  const qrRef = useRef<Html5Qrcode | null>(null);
  const scannerId = 'reader';

  const iniciarLeitura = async () => {
    if (scanning) return; // já está lendo
    setScanning(true);

    const html5QrCode = new Html5Qrcode(scannerId);
    qrRef.current = html5QrCode;

    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length) {
        const cameraId = devices[0].id;

        await html5QrCode.start(
          cameraId,
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            setQrCodeText(decodedText);
            pararLeitura();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } catch (err) {
      console.error('Erro ao acessar câmera:', err);
      setQrCodeText('Erro ao acessar câmera.');
      setScanning(false);
    }
  };

  const pararLeitura = async () => {
    if (qrRef.current) {
      await qrRef.current.stop();
      qrRef.current.clear();
      setScanning(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Leitor de QR Code</h1>

      <button onClick={iniciarLeitura} disabled={scanning}>
        {scanning ? 'Lendo...' : 'Ler QR Code'}
      </button>

      {scanning && <div id={scannerId} style={{ width: '300px', margin: 'auto', marginTop: '1rem' }}></div>}

      <p style={{ marginTop: '2rem' }}><strong>Resultado:</strong> {qrCodeText || 'Nenhum QR Code lido ainda'}</p>
    </div>
  );
}

export default App;
