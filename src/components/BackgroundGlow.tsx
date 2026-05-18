import React from 'react';

export default function BackgroundGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden mix-blend-screen">
      {/* Top Left Blob */}
      <div 
        className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px] opacity-60 animate-blob"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(16,185,129,0) 70%)' }}
      ></div>
      
      {/* Middle Right Blob */}
      <div 
        className="absolute top-[30%] right-[-5%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full blur-[120px] opacity-50 animate-blob animation-delay-2000"
        style={{ background: 'radial-gradient(circle, rgba(4,120,87,0.4) 0%, rgba(4,120,87,0) 70%)' }}
      ></div>
      
      {/* Bottom Left Blob */}
      <div 
        className="absolute bottom-[-10%] left-[10%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full blur-[90px] opacity-50 animate-blob animation-delay-4000"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.4) 0%, rgba(52,211,153,0) 70%)' }}
      ></div>
    </div>
  );
}
