import { useState, useEffect } from "react";
import Snake from "./Snake";
import Food from "./Food";
import Resume from "../resume/resume";

import "./index.css"

enum Direction {
	Up,
	Down,
	Right,
	Left,
}

// helper function to get x, y for a food
const getRandomFood = () => {
	const min = 0;
	const max = 98;
	const x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	const y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	return [x, y];
  };
  

export default function SnakeGame() {
	const [snakeDots, setSnakeDots] = useState<number[][]>([
	  [0, 0],
	  [0, 2],
	]);
  
	const [direction, setDirection] = useState<Direction>(Direction.Right);
	const [melonPos, setMelonPos] = useState<number[]>(getRandomFood());
	const [paused, setPaused] = useState<boolean>(false);
	// const [speed, setSpeed] = useState<number>(100);
	const speed = 100;
	const [score, setScore] = useState<number>(0);
	const [gameOver, setGameOver] = useState<boolean>(false);
  
	useEffect(() => {
	  const control = (e: KeyboardEvent) => {
		console.log(e.key);
		if (e.key === "ArrowUp" && direction !== Direction.Down) {
		  setDirection(Direction.Up);
		  setPaused(false);
		} else if (e.key === "ArrowDown" && direction !== Direction.Up) {
		  setDirection(Direction.Down);
		  setPaused(false);
		} else if (e.key === "ArrowRight" && direction !== Direction.Left) {
		  setDirection(Direction.Right);
		  setPaused(false);
		} else if (e.key === "ArrowLeft" && direction !== Direction.Right) {
		  setDirection(Direction.Left);
		  setPaused(false);
		} else if (e.key === " ") {
		  setPaused(true);
		}
	  };
  
	  function reset() {
		setDirection(Direction.Right);
		setMelonPos(getRandomFood);
		setScore(0);
		setSnakeDots([
		  [0, 0],
		  [0, 2],
		]);
  
		setPaused(true);
		setGameOver(false);
	  }
  
	  const head = snakeDots[snakeDots.length - 1];
	  if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 1) {
		setGameOver(true);
		setTimeout(reset, 1000);
	  }
  
	  const myhead = snakeDots[snakeDots.length - 1];
	  snakeDots.forEach((segment, i) => {
		if (i < snakeDots.length - 1 && segment[0] === myhead[0] && segment[1] == myhead[1]) {
		  setGameOver(true);
		  setTimeout(reset, 1000);
		}
	  });
  
	  function increaseSnake() {
		const newSnake = [...snakeDots];
  
		newSnake.unshift([]);
		setSnakeDots(newSnake);
	  }
  
	  function eatMelon() {
		const head = snakeDots[snakeDots.length - 1];
		const food = melonPos;
  
		if (head[0] == food[0] && head[1] == food[1]) {
		  setMelonPos(getRandomFood);
		  increaseSnake();
		  setScore(score + 1);
		}
	  }
  
	  eatMelon();
	  function moveSnake() {
		const dots = [...snakeDots];
		let head = dots[dots.length - 1];
  
		if (!paused) {
		  switch (direction) {
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
		  dots.push(head);
		  dots.shift();
		  setSnakeDots(dots);
		}
	  }
  
	  const interval = setInterval(() => {
		moveSnake();
	  }, speed);
  
	  document.onkeydown = control;
	  return () => clearInterval(interval);
	}, [speed, paused, direction, snakeDots, melonPos, score]);
  
	return (
  
	  paused ? (
		<Resume />
	  ) : (
		<div className="grid">
		  <div>
			<Snake snakeDots={snakeDots} />
			<Food dot={melonPos} />
			{gameOver ? <h1 className="score">Game over</h1> : <h1 className="score">Score = {score}</h1>}
		  </div>
		</div>
	  )
	);
  }
  