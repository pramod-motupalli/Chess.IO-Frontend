import React from 'react';

const GameControls = ({ onNewGame, difficulty, setDifficulty, engineStatus, engineComment, persona, changePersona, triggerSelfPlay }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg space-y-6 shadow-xl border border-gray-700">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Controls</h2>
        <span className={`px-4 py-1 rounded-full text-sm font-bold animate-pulse ${
          engineStatus.includes('Thinking') || engineStatus.includes('AI') ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'
        }`}>
          {engineStatus}
        </span>
      </div>

      <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Agent Persona</label>
            <select
              value={persona}
              onChange={(e) => changePersona(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              <option value="teacher">Teacher (Helpful)</option>
              <option value="trashtalker">Trash Talker (Aggressive)</option>
              <option value="grandmaster">Grandmaster (Serious)</option>
            </select>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onNewGame('white', difficulty)}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 px-4 rounded transition shadow-lg transform hover:scale-105"
        >
          New Game (White)
        </button>
        <button
          onClick={() => onNewGame('black', difficulty)}
          className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-2 px-4 rounded transition shadow-lg transform hover:scale-105"
        >
          New Game (Black)
        </button>
      </div>
    </div>
  );
};

export default GameControls;
