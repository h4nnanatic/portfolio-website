import React from 'react';

export default function BackgroundGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Top Left Blob */}
      <div 
        className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full mix-blend-screen blur-[120px] opacity-30 animate-blob"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0) 70%)' }}
      ></div>
      
      {/* Middle Right Blob */}
      <div 
        className="absolute top-[30%] right-[-5%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full mix-blend-screen blur-[150px] opacity-25 animate-blob animation-delay-2000"
        style={{ background: 'radial-gradient(circle, rgba(4,120,87,0.3) 0%, rgba(4,120,87,0) 70%)' }}
      ></div>
      
      {/* Bottom Left Blob */}
      <div 
        className="absolute bottom-[-10%] left-[10%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full mix-blend-screen blur-[100px] opacity-25 animate-blob animation-delay-4000"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.3) 0%, rgba(52,211,153,0) 70%)' }}
      ></div>
    </div>
  );
}
