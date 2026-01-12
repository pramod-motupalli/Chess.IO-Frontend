import React from 'react';

const MoveList = ({ moves }) => {
  // moves is a list of UCI strings like "e2e4", "e7e5"
  // We want to format them nicely.
  // Ideally backend sends SAN, but we have UCI in move_log for now.
  // Let's just display them in pairs.
  
  const movePairs = [];
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      number: Math.floor(i / 2) + 1,
      white: moves[i],
      black: moves[i + 1] || '',
    });
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg h-96 overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">Move History</h3>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="font-bold text-gray-400">#</div>
        <div className="font-bold text-gray-400">White</div>
        <div className="font-bold text-gray-400">Black</div>
        
        {movePairs.map((pair) => (
          <React.Fragment key={pair.number}>
            <div className="text-gray-500">{pair.number}.</div>
            <div className="bg-gray-700 px-2 py-1 rounded">{pair.white}</div>
            <div className="bg-gray-700 px-2 py-1 rounded">{pair.black}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MoveList;
