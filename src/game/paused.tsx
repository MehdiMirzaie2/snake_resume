import Resume from '../resume/resume';
import './paused.css';

export default function PausedScreen({
  score,
  highScore,
}: {
  score: number;
  highScore: number;
}) {
  return (
	  // <div className="pause-overlay">
	<div className="pause-overlay">
      {/* <div className="resumee"> */}
        <Resume />
		  {/* </div> */}
		  <div className='text-and-controls'>
      <h1 className="game-title">🐍 SNAKE</h1>

      <p className="start-prompt">Press any arrow key to start!</p>
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
    </div>
  );
}











// import Resume from '../resume/resume';
// import './paused.css';

// export default function PausedScreen({
//   score,
//   highScore,
// }: {
//   score: number;
//   highScore: number;
// }) {
//   return (
//     <div className="pause-overlay">
//       {/* <div className="resumee"> */}
//         <Resume />
//       {/* </div> */}
//       <h1 className="game-title">🐍 SNAKE</h1>

//       <p className="start-prompt">Press any arrow key to start!</p>
//       <div className="controls-container">
//         <div className="control-item">
//           <span>🎮 Use</span>
//           <span className="key-highlight">Arrow Keys</span>
//           <span>to move</span>
//         </div>
//         <div className="control-item">
//           <span>⏸️ Press</span>
//           <span className="key-highlight yellow">Space</span>
//           <span>to pause</span>
//         </div>
//         <div className="control-item">
//           <span>🍎 Eat food to grow and score points</span>
//         </div>
//         <div className="control-item">
//           <span>⚠️ Don't hit the walls or yourself!</span>
//         </div>
//       </div>

//       <div className="scores-container">
//         <div className="score-box">
//           <div className="score-label">Current Score</div>
//           <div className="score-value">{score}</div>
//         </div>
//         <div className="score-box">
//           <div className="score-label">High Score</div>
//           <div className="score-value">{highScore}</div>
//         </div>
//       </div>
//     </div>
//   );
// }
