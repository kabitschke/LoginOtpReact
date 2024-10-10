"use client"

import React, { useState, useEffect, useRef } from 'react';

const Home: React.FC = () => {
  const [otp, setOtp] = useState<Array<number | undefined>>(Array(6).fill(undefined));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

 

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const inputValue = event.target.value;

    if (inputValue && !isNaN(Number(inputValue))) {
      const updatedOtp = [...otp];
      updatedOtp[index] = Number(inputValue);
      setOtp(updatedOtp);

      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    } else {
      const updatedOtp = [...otp];
      updatedOtp[index] = undefined;
      setOtp(updatedOtp);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace') {
      const updatedOtp = [...otp];
      updatedOtp[index] = undefined;
      setOtp(updatedOtp);

      // Foca no campo anterior, se não for o primeiro
      if (index > 0 && !otp[index]) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    event.preventDefault();
    const pasteContent = event.clipboardData.getData('text').trim();
    const updatedOtp = [...otp];

    for (let i = 0; i < pasteContent.length && i < 6; i++) {
      const num = parseInt(pasteContent[i]);
      if (!isNaN(num)) {
        updatedOtp[i] = num;
      }
    }
    setOtp(updatedOtp);
    inputsRef.current[Math.min(pasteContent.length, 5)]?.focus();
  };

  return (
    <>
      <header className="bg-purple-500 p-4">
        <div className="container">
          <h1 className="text-white text-2xl">Sistema de login OTP</h1>
        </div>
      </header>

      <main className="container">
        <h2 className="mt-4">Digite o código</h2>
        <p>Te enviamos um código no e-mail, digite-o aqui.</p>

        <div className="otp-area mt-4 text-black">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value !== undefined ? value : ''}
              onChange={(event) => handleInput(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)} // Adicione o tratamento de KeyDown
              onPaste={(event) => handlePaste(event, index)}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              maxLength={1}
              className="otp-input"
            />
          ))}
        </div>

        <button className="btn">Confirmar código</button>
        <p className="mt-4">
          Não recebeu o código? <a href="#">Enviar novamente</a>
        </p>
      </main>
    </>
  );
};

export default Home;
