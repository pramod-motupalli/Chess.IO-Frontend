import React, { useEffect } from 'react';
import ChessBoard from './components/ChessBoard';
import GameControls from './components/GameControls';
import MoveList from './components/MoveList';
import { useChessGame } from './hooks/useChessGame';

function App() {
  const {
    boardFen,
    moveLog,
    gameState,
    engineStatus,
    engineComment,
    winner,
    playerColor,
    difficulty,
    legalMoves,
    inCheck,
    persona,
    startNewGame,
    makeMove,
    setDifficulty,
    changePersona,
    triggerSelfPlay
  } = useChessGame();

  useEffect(() => {
    // Start a game on load if not started
    startNewGame('white', 'medium');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white flex flex-col items-center py-8 px-4 font-sans relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header Section */}
      <header className="mb-10 text-center relative z-10">
        <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm">
          <span className="text-blue-300 text-sm font-semibold tracking-wider">AI-POWERED CHESS</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-3 drop-shadow-2xl">
          Chess AI
        </h1>
        <p className="text-gray-300 text-xl font-light tracking-wide">Challenge the Engine. Master the Board.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl relative z-10">
        {/* Left Column: Board */}
        <div className="flex-1 flex flex-col items-center">
          {/* Game Status Bar */}
          <div className="w-full max-w-2xl mb-4 px-6 py-3 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl border border-blue-400/20 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full animate-pulse shadow-lg ${
                  gameState === 'engine_thinking' ? 'bg-yellow-400 shadow-yellow-400/50' : 'bg-green-400 shadow-green-400/50'
                }`}></div>
                <span className="text-sm font-semibold text-gray-200">
                  {gameState === 'player_turn' ? '🎯 Your Turn' : gameState === 'engine_thinking' ? '🤔 Engine Thinking...' : '⚡ Ready'}
                </span>
              </div>
              <div className="text-sm text-gray-300">
                Playing as <span className="font-bold text-white">{playerColor === 'white' ? '⚪ White' : '⚫ Black'}</span>
              </div>
            </div>
          </div>

          {/* Chess Board */}
          <div className="relative shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-2">
            <ChessBoard
              fen={boardFen}
              onMove={makeMove}
              playerColor={playerColor}
              legalMoves={legalMoves}
            />
            
            {/* Game Over Modal */}
            {winner && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-20 backdrop-blur-md">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-blue-400/50 text-white p-10 rounded-3xl shadow-2xl text-center transform scale-110 transition-transform max-w-md mx-4">
                  <div className="text-6xl mb-4 animate-bounce">
                    {winner === playerColor ? '🏆' : winner === 'draw' ? '🤝' : '🤖'}
                  </div>
                  <h2 className="text-5xl font-black mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {winner === 'draw' ? 'Draw!' : 'Game Over!'}
                  </h2>
                  <p className="text-2xl mb-8 font-bold text-gray-200">
                    {winner === playerColor ? 'Victory is Yours!' : winner === 'draw' ? 'Well Played!' : 'Better Luck Next Time!'}
                  </p>
                  <button
                    onClick={() => startNewGame(playerColor, difficulty)}
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 border-2 border-white/20"
                  >
                    ⚔️ Play Again
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Check Alert */}
          {inCheck && !winner && (
            <div className="mt-6 animate-bounce">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-10 py-3 rounded-full font-black text-2xl shadow-2xl border-2 border-red-300 shadow-red-500/50">
                ⚠️ CHECK!
              </div>
            </div>
          )}

          {/* Engine Comment */}
          {engineComment && !winner && (
            <div className="mt-6 max-w-2xl w-full px-6 py-4 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-2xl border border-purple-400/30 backdrop-blur-md shadow-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Engine Analysis</p>
                  <p className="text-gray-200 italic">"{engineComment}"</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Controls & History */}
        <div className="w-full lg:w-96 space-y-6">
          <GameControls
            onNewGame={startNewGame}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            engineStatus={engineStatus}
            engineComment={engineComment}
            persona={persona}
            changePersona={changePersona}
            triggerSelfPlay={triggerSelfPlay}
          />
          <MoveList moves={moveLog} />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm relative z-10">
        <p>Powered by advanced AI algorithms • Built with React & Python</p>
      </footer>
    </div>
  );
}

export default App;