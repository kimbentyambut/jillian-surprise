import React, { useState, useEffect, useCallback, useRef } from 'react';
import heart1 from '@/assets/k.png';
import heart2 from '@/assets/e.png';
import heart3 from '@/assets/v.png';
import heart4 from '@/assets/i.png';
import heart5 from '@/assets/n.png';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

interface Position {
  x: number;
  y: number;
}

const heartImages = [heart1, heart2, heart3, heart4, heart5];

interface SnakeGameProps {
  onGameComplete: () => void;
}

const SnakeGame: React.FC<SnakeGameProps> = ({ onGameComplete }) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [collectedHearts, setCollectedHearts] = useState<string[]>([]);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef(direction);

  const generateFood = useCallback((snakePositions: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snakePositions.some(seg => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection({ x: 1, y: 0 });
    directionRef.current = { x: 1, y: 0 };
    setScore(0);
    setGameOver(false);
    setCollectedHearts([]);
    setGameStarted(true);
  }, [generateFood]);

  const checkCollision = useCallback((head: Position, snakeBody: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Self collision (skip head)
    for (let i = 1; i < snakeBody.length; i++) {
      if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) {
        return true;
      }
    }
    return false;
  }, []);

  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const currentDirection = directionRef.current;
      const head = prevSnake[0];
      const newHead: Position = {
        x: head.x + currentDirection.x,
        y: head.y + currentDirection.y,
      };

      if (checkCollision(newHead, prevSnake)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check if food is eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(prev => {
          const newScore = prev + 1;
          if (newScore >= 5) {
            setTimeout(() => onGameComplete(), 500);
          }
          return newScore;
        });
        setCollectedHearts(prev => [...prev, heartImages[prev.length % 5]]);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, generateFood, checkCollision, onGameComplete]);

  useEffect(() => {
    if (gameStarted && !gameOver && score < 5) {
      gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED);
      return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      };
    }
  }, [gameStarted, gameOver, moveSnake, score]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted && !gameOver) {
        resetGame();
        return;
      }

      const currentDir = directionRef.current;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (currentDir.y !== 1) {
            directionRef.current = { x: 0, y: -1 };
            setDirection({ x: 0, y: -1 });
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (currentDir.y !== -1) {
            directionRef.current = { x: 0, y: 1 };
            setDirection({ x: 0, y: 1 });
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (currentDir.x !== 1) {
            directionRef.current = { x: -1, y: 0 };
            setDirection({ x: -1, y: 0 });
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (currentDir.x !== -1) {
            directionRef.current = { x: 1, y: 0 };
            setDirection({ x: 1, y: 0 });
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameOver, resetGame]);

  // Touch controls
  const handleDirectionClick = (newDir: Position) => {
    if (!gameStarted && !gameOver) {
      resetGame();
      return;
    }
    const currentDir = directionRef.current;
    if (newDir.x !== -currentDir.x || newDir.y !== -currentDir.y) {
      directionRef.current = newDir;
      setDirection(newDir);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Header with hearts/score */}
      <div className="flex items-center gap-2 font-pixel text-sm">
        <span className="text-valentine-red">LOVE</span>
        <span className="text-valentine-dark">-</span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`w-10 h-10  ${i < score ? 'opacity-100' : 'opacity-30'}`}
            >
              <img 
                src={heartImages[i]} 
                alt="heart" 
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Game Board */}
      <div 
        className="relative pixel-border bg-valentine-light-pink"
        style={{ 
          width: GRID_SIZE * CELL_SIZE, 
          height: GRID_SIZE * CELL_SIZE 
        }}
      >
        {/* Food */}
        <div
          className="absolute pulse-love"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        >
          <img 
            src={heartImages[score % 5]} 
            alt="food" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute rounded-sm ${
              index === 0 
                ? 'bg-valentine-red' 
                : 'bg-valentine-pink'
            }`}
            style={{
              left: segment.x * CELL_SIZE + 1,
              top: segment.y * CELL_SIZE + 1,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              boxShadow: index === 0 ? '2px 2px 0 rgba(0,0,0,0.2)' : 'none',
            }}
          />
        ))}

        {/* Start/Game Over Overlay */}
        {(!gameStarted || gameOver) && (
          <div className="absolute inset-0 bg-valentine-cream/90 flex flex-col items-center justify-center gap-4">
            <p className="font-pixel text-valentine-dark text-xs text-center px-4">
              {gameOver ? 'GAME OVER!' : 'Collect my name!'}
            </p>
            <p className="font-pixel text-valentine-red text-[10px]">
              {gameOver ? 'Try again?' : 'Press any key or tap to start'}
            </p>
            <button 
              onClick={resetGame}
              className="pixel-btn text-valentine-dark"
            >
              {gameOver ? 'RETRY' : 'START'}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        <div />
        <button 
          onClick={() => handleDirectionClick({ x: 0, y: -1 })}
          className="pixel-btn !px-4 !py-2"
        >
          ▲
        </button>
        <div />
        <button 
          onClick={() => handleDirectionClick({ x: -1, y: 0 })}
          className="pixel-btn !px-4 !py-2"
        >
          ◄
        </button>
        <div />
        <button 
          onClick={() => handleDirectionClick({ x: 1, y: 0 })}
          className="pixel-btn !px-4 !py-2"
        >
          ►
        </button>
        <div />
        <button 
          onClick={() => handleDirectionClick({ x: 0, y: 1 })}
          className="pixel-btn !px-4 !py-2"
        >
          ▼
        </button>
        <div />
      </div>

      {/* Instructions */}
      <p className="text-valentine-dark font-quicksand text-sm text-center max-w-xs">
        Use <span className="font-pixel text-[10px]">WASD</span> or <span className="font-pixel text-[10px]">Arrow Keys</span> to move
      </p>
    </div>
  );
};

export default SnakeGame;
