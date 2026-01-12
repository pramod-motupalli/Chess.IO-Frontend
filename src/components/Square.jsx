import React from 'react';

const pieceImages = {
  p: 'https://raw.githubusercontent.com/ornicar/lila/master/public/piece/merida/bP.svg',
  r: 'https://raw.githubusercontent.com/ornicar/lila/master/public/piece/merida/bR.svg',
  n: 'https://raw.githubusercontent.com/ornicar/lila/master/public/piece/merida/bN.svg',
  b: 'https://raw.githubusercontent.com/ornicar/lila/master/public/piece/merida/bB.svg',
  q: 'https://raw.githubusercontent.com/ornicar/lila/master/public/piece/merida/bQ.svg',
  k: 'https://raw.githubusercontent.com/ornicar/lila/master/public/piece/merida/bK.svg',
  P: 'https://raw.githubusercontent.com/ornicar/lila/master/public/piece/merida/wP.svg',
  R: 'https://raw.githubusercontent.com/ornicar/lila/master/public/piece/merida/wR.svg',
  N: 'https://raw.githubusercontent.com/ornicar/lila/master/public/piece/merida/wN.svg',
  B: 'https://raw.githubusercontent.com/ornicar/lila/master/public/piece/merida/wB.svg',
  Q: 'https://raw.githubusercontent.com/ornicar/lila/master/public/piece/merida/wQ.svg',
  K: 'https://raw.githubusercontent.com/ornicar/lila/master/public/piece/merida/wK.svg',
};

const Square = ({ square, piece, isLight, isSelected, isLegalTarget, onClick }) => {
  const bgColor = isSelected
    ? 'bg-yellow-400'
    : isLight
    ? 'bg-[#f0d9b5]'
    : 'bg-[#b58863]';

  return (
    <div
      className={`w-full h-full flex items-center justify-center cursor-pointer select-none relative ${bgColor}`}
      onClick={() => onClick(square)}
    >
      {piece && (
          <img 
            src={pieceImages[piece]} 
            alt={piece} 
            className="w-4/5 h-4/5 z-10 drop-shadow-md select-none pointer-events-none"
          />
      )}
      
      {isLegalTarget && (
        <div className={`absolute w-4 h-4 rounded-full ${piece ? 'border-4 border-gray-500' : 'bg-gray-500 opacity-50'}`}></div>
      )}
    </div>
  );
};

export default Square;
