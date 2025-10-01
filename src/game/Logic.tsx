import { useState, useEffect, useCallback, useRef } from 'react';
import Snake from './Snake';
import Food from './Food';
import './index.css';
import Resume from '../resume/resume';

import './paused.css';

enum Direction {
  Up,
  Down,
  Right,
  Left,
}

const getRandomFood = () => {
  const min = 1;
  const max = 97;
  const x =
    Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  const y =
    Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

export default function SnakeGame() {
  const [snakeDots, setSnakeDots] = useState<number[][]>([
    [10, 10],
    [12, 10],
    [14, 10],
  ]);
  const [direction, setDirection] = useState<Direction>(
    Direction.Right
  );
  const [nextDirection, setNextDirection] = useState<Direction>(
    Direction.Right
  );
  const directionQueueRef = useRef<Direction[]>([Direction.Right]);
  const [foodPos, setFoodPos] = useState<number[]>(getRandomFood());
  const [paused, setPaused] = useState<boolean>(true);
  const [speed] = useState<number>(100);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(0);

  const checkCollision = useCallback(
    (head: number[], snakeBody: number[][]) => {
      // Wall collision
      if (
        head[0] >= 100 ||
        head[1] >= 100 ||
        head[0] < 0 ||
        head[1] < 0
      ) {
        return true;
      }
      // Self collision
      for (let i = 0; i < snakeBody.length - 1; i++) {
        if (
          head[0] === snakeBody[i][0] &&
          head[1] === snakeBody[i][1]
        ) {
          return true;
        }
      }
      return false;
    },
    []
  );

  const reset = useCallback(() => {
    setDirection(Direction.Right);
    directionQueueRef.current = [Direction.Right];
    setNextDirection(Direction.Right);
    setFoodPos(getRandomFood());
    if (score > highScore) {
      setHighScore(score);
    }
    setScore(0);
    setSnakeDots([
      [10, 10],
      [12, 10],
      [14, 10],
    ]);
    setPaused(true);
    setGameOver(false);
  }, [score, highScore]);

  const moveSnake = useCallback(() => {
    if (paused || gameOver) return;

    const dots = [...snakeDots];
    let head = [...dots[dots.length - 1]];

    // Apply the next direction

    const nextDirection =
      directionQueueRef.current.length > 0
        ? directionQueueRef.current.shift()!
        : direction;

    setDirection(nextDirection);
    // setDirection(nextDirection);

    switch (nextDirection) {
      case Direction.Right:
        head = [head[0] + 2, head[1]];
        break;
      case Direction.Left:
        head = [head[0] - 2, head[1]];
        break;
      case Direction.Down:
        head = [head[0], head[1] + 2];
        break;
      case Direction.Up:
        head = [head[0], head[1] - 2];
        break;
    }

    // Check collision before updating
    if (checkCollision(head, dots)) {
      setGameOver(true);
      setTimeout(reset, 2000);
      return;
    }

    dots.push(head);

    // Check if food is eaten
    if (head[0] === foodPos[0] && head[1] === foodPos[1]) {
      setFoodPos(getRandomFood());
      setScore((prev) => prev + 1);
    } else {
      dots.shift();
    }

    setSnakeDots(dots);
  }, [
    snakeDots,
    nextDirection,
    foodPos,
    paused,
    gameOver,
    checkCollision,
    reset,
  ]);

  useEffect(() => {
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [moveSnake, speed]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          ' ',
        ].includes(e.key)
      ) {
        e.preventDefault();
      }

      if (e.key === ' ' || e.key === 'Escape') {
        if (gameOver) {
          reset();
        } else {
          setPaused((prev) => !prev);
        }
        return;
      }

      if (paused && !gameOver) {
        setPaused(false);
      }

      // Get the current direction (either from queue or state)
      const currentDir =
        directionQueueRef.current.length > 0
          ? directionQueueRef.current[
              directionQueueRef.current.length - 1
            ]
          : direction;

      let newDirection: Direction | null = null;

      if (e.key === 'ArrowUp' && currentDir !== Direction.Down) {
        newDirection = Direction.Up;
      } else if (
        e.key === 'ArrowDown' &&
        currentDir !== Direction.Up
      ) {
        newDirection = Direction.Down;
      } else if (
        e.key === 'ArrowRight' &&
        currentDir !== Direction.Left
      ) {
        newDirection = Direction.Right;
      } else if (
        e.key === 'ArrowLeft' &&
        currentDir !== Direction.Right
      ) {
        newDirection = Direction.Left;
      }

      // Add to queue if valid and queue isn't too long
      if (
        newDirection !== null &&
        directionQueueRef.current.length < 3
      ) {
        directionQueueRef.current.push(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () =>
      window.removeEventListener('keydown', handleKeyPress);
  }, [direction, paused, gameOver, reset]);

  //   useEffect(() => {
  //     const handleKeyPress = (e: KeyboardEvent) => {
  //       e.preventDefault();

  //       if (e.key === ' ' || e.key === 'Escape') {
  //         if (gameOver) {
  //           reset();
  //         } else {
  //           setPaused((prev) => !prev);
  //         }
  //         return;
  //       }

  //       if (paused && !gameOver) {
  //         setPaused(false);
  //       }

  //       if (e.key === 'ArrowUp' && direction !== Direction.Down) {
  //         setNextDirection(Direction.Up);
  //       } else if (
  //         e.key === 'ArrowDown' &&
  //         direction !== Direction.Up
  //       ) {
  //         setNextDirection(Direction.Down);
  //       } else if (
  //         e.key === 'ArrowRight' &&
  //         direction !== Direction.Left
  //       ) {
  //         setNextDirection(Direction.Right);
  //       } else if (
  //         e.key === 'ArrowLeft' &&
  //         direction !== Direction.Right
  //       ) {
  //         setNextDirection(Direction.Left);
  //       }
  //     };

  //     window.addEventListener('keydown', handleKeyPress);
  //     return () =>
  //       window.removeEventListener('keydown', handleKeyPress);
  //   }, [direction, paused, gameOver, reset]);

  return (
    <div className="root">
      {paused ? (
        <div className="pause-overlay">
          {/* <div> */}
          
          {/* </div> */}
          <div className="resumee">
            <Resume />
          </div>
		<h1 className="game-title">🐍 SNAKE</h1>

          <p className="start-prompt">
            Press any arrow key to start!
          </p>
          <div className="controls-container">
            <div className="control-item">
              <span>🎮 Use</span>
              <span className="key-highlight">Arrow Keys</span>
              <span>to move</span>
            </div>
            <div className="control-item">
              <span>⏸️ Press</span>
              <span className="key-highlight yellow">Space</span>
              <span>to pause</span>
            </div>
            <div className="control-item">
              <span>🍎 Eat food to grow and score points</span>
            </div>
            <div className="control-item">
              <span>⚠️ Don't hit the walls or yourself!</span>
            </div>
          </div>

          <div className="scores-container">
            <div className="score-box">
              <div className="score-label">Current Score</div>
              <div className="score-value">{score}</div>
            </div>
            <div className="score-box">
              <div className="score-label">High Score</div>
              <div className="score-value">{highScore}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid">
          <div>
            <Snake snakeDots={snakeDots} />
            <Food dot={foodPos} />
            {gameOver ? (
              <h1 className="score">Game over</h1>
            ) : (
              <h1 className="score">Score = {score}</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// import { useState, useEffect, useCallback } from 'react';
// import Snake from './Snake';
// import Food from './Food';
// import './index.css';
// import Resume from '../resume/resume';

// enum Direction {
//   Up,
//   Down,
//   Right,
//   Left,
// }

// const getRandomFood = () => {
//   const min = 1;
//   const max = 97;
//   const x =
//     Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
//   const y =
//     Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
//   return [x, y];
// };

// export default function SnakeGame() {
//   const [snakeDots, setSnakeDots] = useState<number[][]>([
//     [10, 10],
//     [12, 10],
//     [14, 10],
//   ]);
//   const [direction, setDirection] = useState<Direction>(
//     Direction.Right
//   );
//   const [nextDirection, setNextDirection] = useState<Direction>(
//     Direction.Right
//   );
//   const [foodPos, setFoodPos] = useState<number[]>(getRandomFood());
//   const [paused, setPaused] = useState<boolean>(true);
//   const [speed] = useState<number>(100);
//   const [score, setScore] = useState<number>(0);
//   const [gameOver, setGameOver] = useState<boolean>(false);
//   const [highScore, setHighScore] = useState<number>(0);

//   const checkCollision = useCallback(
//     (head: number[], snakeBody: number[][]) => {
//       // Wall collision
//       if (
//         head[0] >= 100 ||
//         head[1] >= 100 ||
//         head[0] < 0 ||
//         head[1] < 0
//       ) {
//         return true;
//       }
//       // Self collision
//       for (let i = 0; i < snakeBody.length - 1; i++) {
//         if (
//           head[0] === snakeBody[i][0] &&
//           head[1] === snakeBody[i][1]
//         ) {
//           return true;
//         }
//       }
//       return false;
//     },
//     []
//   );

//   const reset = useCallback(() => {
//     setDirection(Direction.Right);
//     setNextDirection(Direction.Right);
//     setFoodPos(getRandomFood());
//     if (score > highScore) {
//       setHighScore(score);
//     }
//     setScore(0);
//     setSnakeDots([
//       [10, 10],
//       [12, 10],
//       [14, 10],
//     ]);
//     setPaused(true);
//     setGameOver(false);
//   }, [score, highScore]);

//   const moveSnake = useCallback(() => {
//     if (paused || gameOver) return;

//     const dots = [...snakeDots];
//     let head = [...dots[dots.length - 1]];

//     // Apply the next direction
//     setDirection(nextDirection);

//     switch (nextDirection) {
//       case Direction.Right:
//         head = [head[0] + 2, head[1]];
//         break;
//       case Direction.Left:
//         head = [head[0] - 2, head[1]];
//         break;
//       case Direction.Down:
//         head = [head[0], head[1] + 2];
//         break;
//       case Direction.Up:
//         head = [head[0], head[1] - 2];
//         break;
//     }

//     // Check collision before updating
//     if (checkCollision(head, dots)) {
//       setGameOver(true);
//       setTimeout(reset, 2000);
//       return;
//     }

//     dots.push(head);

//     // Check if food is eaten
//     if (head[0] === foodPos[0] && head[1] === foodPos[1]) {
//       setFoodPos(getRandomFood());
//       setScore((prev) => prev + 1);
//     } else {
//       dots.shift();
//     }

//     setSnakeDots(dots);
//   }, [
//     snakeDots,
//     nextDirection,
//     foodPos,
//     paused,
//     gameOver,
//     checkCollision,
//     reset,
//   ]);

//   useEffect(() => {
//     const interval = setInterval(moveSnake, speed);
//     return () => clearInterval(interval);
//   }, [moveSnake, speed]);

//   useEffect(() => {
//     const handleKeyPress = (e: KeyboardEvent) => {
//       e.preventDefault();

//       if (e.key === ' ' || e.key === 'Escape') {
//         if (gameOver) {
//           reset();
//         } else {
//           setPaused((prev) => !prev);
//         }
//         return;
//       }

//       if (paused && !gameOver) {
//         setPaused(false);
//       }

//       if (e.key === 'ArrowUp' && direction !== Direction.Down) {
//         setNextDirection(Direction.Up);
//       } else if (
//         e.key === 'ArrowDown' &&
//         direction !== Direction.Up
//       ) {
//         setNextDirection(Direction.Down);
//       } else if (
//         e.key === 'ArrowRight' &&
//         direction !== Direction.Left
//       ) {
//         setNextDirection(Direction.Right);
//       } else if (
//         e.key === 'ArrowLeft' &&
//         direction !== Direction.Right
//       ) {
//         setNextDirection(Direction.Left);
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () =>
//       window.removeEventListener('keydown', handleKeyPress);
//   }, [direction, paused, gameOver, reset]);

//   return (
//     <div className="root">
//       {paused ? (
//         <div
//           style={{
// 					  display: 'flex',
// 					  flexDirection: 'column',
// 					  alignItems: 'center',
// 					  justifyContent: 'center',
// 					  gap: '50px',
// 					  width: '100%',
// 					  height: '100%',
//           }}
// 			  >
// 				   <div>
//                 🐍 SNAKE
//               </div>
//               <div>
//                 Press any arrow key to start!
//               </div>
//           <Resume />

//           <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-30">
//             <div className="text-center text-white max-w-2xl px-8">

//               <div className="text-lg space-y-3 bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
//                 <div className="text-xl">
//                   🎮 Use{' '}
//                   <strong className="text-green-400">
//                     Arrow Keys
//                   </strong>{' '}
//                   to move
//                 </div>
//                 <div className="text-xl">
//                   ⏸️ Press{' '}
//                   <strong className="text-yellow-400">Space</strong>{' '}
//                   to pause
//                 </div>
//                 <div className="text-xl">
//                   🍎 Eat food to grow and score points
//                 </div>
//                 <div className="text-xl">
//                   ⚠️ Don't hit the walls or yourself!
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="grid">
//           <div>
//             <Snake snakeDots={snakeDots} />
//             <Food dot={foodPos} />
//             {gameOver ? (
//               <h1 className="score">Game over</h1>
//             ) : (
//               <h1 className="score">Score = {score}</h1>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
