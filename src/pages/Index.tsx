import React, { useState } from 'react';
import SnakeGame from '@/components/SnakeGame';
import ValentineQuestion from '@/components/ValentineQuestion';
import ValentineTicket from '@/components/ValentineTicket';
import heart1 from '@/assets/k.png';
import heart3 from '@/assets/v.png';

type GameState = 'game' | 'question' | 'ticket';

const Index: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('game');

  const handleGameComplete = () => {
    setGameState('question');
  };

  const handleAcceptValentine = () => {
    setGameState('ticket');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <img 
          src={heart1} 
          alt="" 
          className="absolute w-16 h-16 heart-float" 
          style={{ top: '5%', left: '5%' }}
        />
        <img 
          src={heart3} 
          alt="" 
          className="absolute w-12 h-12 heart-float" 
          style={{ top: '15%', right: '10%', animationDelay: '0.5s' }}
        />
        <img 
          src={heart1} 
          alt="" 
          className="absolute w-10 h-10 heart-float" 
          style={{ bottom: '20%', left: '8%', animationDelay: '1s' }}
        />
        <img 
          src={heart3} 
          alt="" 
          className="absolute w-14 h-14 heart-float" 
          style={{ bottom: '10%', right: '5%', animationDelay: '1.5s' }}
        />
        <img 
          src={heart1} 
          alt="" 
          className="absolute w-8 h-8 heart-float" 
          style={{ top: '40%', left: '3%', animationDelay: '0.7s' }}
        />
        <img 
          src={heart3} 
          alt="" 
          className="absolute w-10 h-10 heart-float" 
          style={{ top: '60%', right: '3%', animationDelay: '1.2s' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-lg">
        {gameState === 'game' && (
          <div className="flex flex-col items-center gap-6">
            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="font-pixel text-valentine-red text-lg">
                💕 Valentine for my Jillian 💕
              </h1>
              <p className="font-quicksand text-valentine-dark text-sm">
                A special game for Charlize Jillian Carta
              </p>
            </div>

            {/* Game */}
            <SnakeGame onGameComplete={handleGameComplete} />

            {/* Hint */}
            <p className="font-quicksand text-valentine-dark/70 text-xs text-center">
              Collect all 5 of us to reveal a surprise!
            </p>
          </div>
        )}

        {gameState === 'question' && (
          <ValentineQuestion onAccept={handleAcceptValentine} />
        )}

        {gameState === 'ticket' && (
          <ValentineTicket />
        )}
      </div>
    </div>
  );
};

export default Index;
