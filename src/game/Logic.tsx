import { useState, useEffect, useCallback, useRef } from 'react';
import Snake from './Snake';
import Food from './Food';
import './hello.css';
import PausedScreen from './paused';
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
  const [highScore, setHighScore] = useState<number>(localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')!) : 0);

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
		localStorage.setItem('highScore', score.toString());				
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
		
    //   setTimeout(reset, 2000);
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
		if (gameOver) {
			if (score > highScore)
				localStorage.setItem('highScore', score.toString());				
			setHighScore(score);
			// reset();
			  setTimeout(reset, 2000);
		}
	}, [gameOver, score, highScore]);
	
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

  return (
    <div className="root">
      {paused? (
        <PausedScreen score={score} highScore={highScore} />
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
