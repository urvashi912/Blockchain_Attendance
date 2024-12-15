import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

interface LectureQRCodeProps {
  lectureId: string;
  validityPeriod: number;
}

export default function LectureQRCode({ lectureId, validityPeriod }: LectureQRCodeProps) {
  const [timeLeft, setTimeLeft] = useState(validityPeriod);
  const [qrValue, setQrValue] = useState('');

  useEffect(() => {
    // Generate QR code value with lecture ID and timestamp
    const timestamp = Date.now();
    setQrValue(JSON.stringify({
      lectureId,
      timestamp,
      validUntil: timestamp + validityPeriod * 1000
    }));

    // Set up countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lectureId, validityPeriod]);

  if (timeLeft === 0) {
    return <div className="text-red-600">QR Code expired</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <QRCode value={qrValue} size={200} />
      </div>
      <div className="text-gray-600">
        Valid for: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );
}