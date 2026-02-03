import React from 'react';
import loveCat from '@/assets/love-cat.png';
import heart1 from '@/assets/heart1.png';
import heart3 from '@/assets/heart3.png';

interface ValentineQuestionProps {
  onAccept: () => void;
}

const ValentineQuestion: React.FC<ValentineQuestionProps> = ({ onAccept }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 animate-in fade-in duration-500">
      {/* Header with hearts */}
      <div className="flex items-center gap-4">
        <img src={heart1} alt="heart" className="w-8 h-8 heart-float" />
        <span className="font-pixel text-valentine-red text-sm">LOVE</span>
        <span className="font-pixel text-valentine-dark">-</span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <img 
              key={i}
              src={heart3} 
              alt="heart" 
              className="w-6 h-6 pulse-love"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <img src={heart1} alt="heart" className="w-8 h-8 heart-float" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Main Card */}
      <div className="bg-checker pixel-border p-8 flex flex-col items-center gap-6 max-w-md">
        {/* Question */}
        <h2 className="font-pixel text-valentine-dark text-center text-sm leading-relaxed">
          Will you be my Valentine?
        </h2>

        {/* Cute Cat */}
        <div className="relative">
          <img 
            src={loveCat} 
            alt="Love cat" 
            className="w-48 h-48 object-contain pulse-love"
          />
        </div>

        {/* Sweet message for Charlize */}
        <p className="font-quicksand text-valentine-dark text-center text-base max-w-xs leading-relaxed">
          Charlize Jillian Carta, you make my heart skip a beat every single day 💕
        </p>

        {/* Buttons - Both say YES! */}
        <div className="flex gap-4">
          <button 
            onClick={onAccept}
            className="pixel-btn text-valentine-dark hover:bg-valentine-pink transition-colors"
          >
            YES
          </button>
          <button 
            onClick={onAccept}
            className="pixel-btn text-valentine-dark hover:bg-valentine-pink transition-colors"
          >
            YES
          </button>
        </div>

        {/* Playful note */}
        <p className="font-pixel text-valentine-red text-[8px] opacity-70">
          (There's only one answer!)
        </p>
      </div>

      {/* Floating hearts decoration */}
      <div className="absolute top-10 left-10 opacity-50">
        <img src={heart1} alt="" className="w-6 h-6 heart-float" />
      </div>
      <div className="absolute top-20 right-16 opacity-50">
        <img src={heart3} alt="" className="w-5 h-5 heart-float" style={{ animationDelay: '0.3s' }} />
      </div>
      <div className="absolute bottom-20 left-16 opacity-50">
        <img src={heart1} alt="" className="w-4 h-4 heart-float" style={{ animationDelay: '0.6s' }} />
      </div>
      <div className="absolute bottom-32 right-10 opacity-50">
        <img src={heart3} alt="" className="w-7 h-7 heart-float" style={{ animationDelay: '0.9s' }} />
      </div>
    </div>
  );
};

export default ValentineQuestion;
