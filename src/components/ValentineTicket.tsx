import React from 'react';
import heart1 from '@/assets/heart1.png';
import heart2 from '@/assets/heart2.png';
import heart3 from '@/assets/heart3.png';
import heart4 from '@/assets/heart4.png';
import heart5 from '@/assets/heart5.png';
import loveCat from '@/assets/love-cat.png';

const ValentineTicket: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 animate-in fade-in zoom-in duration-700">
      {/* Celebration text */}
      <div className="text-center">
        <p className="font-pixel text-valentine-red text-xs sparkle">
          🎉 SHE SAID YES! 🎉
        </p>
      </div>

      {/* Ticket Container */}
      <div className="relative">
        {/* Ticket */}
        <div className="bg-gradient-to-br from-valentine-cream via-valentine-light-pink to-valentine-cream pixel-border ticket-shine p-0 max-w-sm">
          {/* Ticket Header */}
          <div className="bg-valentine-red px-6 py-4 flex items-center justify-between">
            <div className="flex gap-1">
              {[heart1, heart2, heart3, heart4, heart5].map((heart, i) => (
                <img 
                  key={i}
                  src={heart} 
                  alt="" 
                  className="w-5 h-5 pulse-love"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="font-pixel text-valentine-cream text-[10px]">V-DAY</span>
          </div>

          {/* Ticket Body */}
          <div className="p-6 bg-checker">
            <div className="bg-valentine-cream/90 p-6 rounded-lg space-y-4">
              {/* Title */}
              <div className="text-center border-b-2 border-dashed border-valentine-pink pb-4">
                <h1 className="font-pixel text-valentine-red text-sm leading-relaxed">
                  VALENTINE'S DAY
                </h1>
                <p className="font-pixel text-valentine-dark text-[10px] mt-2">
                  OFFICIAL INVITATION
                </p>
              </div>

              {/* Cat mascot */}
              <div className="flex justify-center">
                <img 
                  src={loveCat} 
                  alt="Love mascot" 
                  className="w-24 h-24 object-contain heart-float"
                />
              </div>

              {/* Details */}
              <div className="space-y-3 text-center">
                <div>
                  <p className="font-pixel text-valentine-dark text-[8px] opacity-70">GUEST OF HONOR</p>
                  <p className="font-quicksand text-valentine-red text-lg font-bold">
                    Charlize Jillian Carta
                  </p>
                </div>

                <div className="flex justify-center gap-8">
                  <div>
                    <p className="font-pixel text-valentine-dark text-[8px] opacity-70">DATE</p>
                    <p className="font-quicksand text-valentine-dark text-base font-semibold">
                      Feb 14, 2025
                    </p>
                  </div>
                  <div>
                    <p className="font-pixel text-valentine-dark text-[8px] opacity-70">SPOT</p>
                    <p className="font-quicksand text-valentine-dark text-base font-semibold">
                      TBA ✨
                    </p>
                  </div>
                </div>
              </div>

              {/* Romantic message */}
              <div className="text-center pt-4 border-t-2 border-dashed border-valentine-pink">
                <p className="font-quicksand text-valentine-dark text-sm italic leading-relaxed">
                  "Can't wait to spend this special day with you, my love. You're the best thing that ever happened to me."
                </p>
              </div>

              {/* Hearts decoration */}
              <div className="flex justify-center gap-2 pt-2">
                {[heart1, heart3, heart5, heart3, heart1].map((heart, i) => (
                  <img 
                    key={i}
                    src={heart} 
                    alt="" 
                    className="w-4 h-4 opacity-70"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Ticket Footer */}
          <div className="bg-valentine-red px-6 py-3 flex items-center justify-center">
            <p className="font-pixel text-valentine-cream text-[8px]">
              💕 ADMIT ONE SPECIAL PERSON 💕
            </p>
          </div>
        </div>

        {/* Ticket stub indicator - left side */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2">
          <div className="w-4 h-4 bg-background rounded-full" />
        </div>
        
        {/* Ticket stub indicator - right side */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2">
          <div className="w-4 h-4 bg-background rounded-full" />
        </div>
      </div>

      {/* Bottom message */}
      <div className="text-center space-y-2">
        <p className="font-quicksand text-valentine-dark text-base">
          See you there, beautiful! 💕
        </p>
        <p className="font-pixel text-valentine-red text-[10px] opacity-70">
          - With all my love
        </p>
      </div>

      {/* Confetti/hearts decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <img 
            key={i}
            src={[heart1, heart2, heart3, heart4, heart5][i % 5]} 
            alt="" 
            className="absolute w-6 h-6 opacity-40 heart-float"
            style={{ 
              left: `${(i * 8) + 2}%`,
              top: `${Math.sin(i) * 20 + 10}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ValentineTicket;
