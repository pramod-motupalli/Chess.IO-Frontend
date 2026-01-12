import React, { useState } from 'react';
import Square from './Square';

const ChessBoard = ({ fen, onMove, playerColor, legalMoves = [] }) => {
  const [selectedSquare, setSelectedSquare] = useState(null);

  // Parse FEN to get the board array
  const getBoardFromFen = (fen) => {
    const rows = fen.split(' ')[0].split('/');
    const board = [];
    for (let row of rows) {
      const boardRow = [];
      for (let char of row) {
        if (isNaN(char)) {
          boardRow.push(char);
        } else {
          for (let i = 0; i < parseInt(char); i++) {
            boardRow.push(null);
          }
        }
      }
      board.push(boardRow);
    }
    return board;
  };

  const board = getBoardFromFen(fen);
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const handleSquareClick = (square) => {
    if (selectedSquare === square) {
      setSelectedSquare(null);
    } else if (selectedSquare) {
      // Check if it's a legal move
      const isLegal = legalMoves.some(m => m.from === selectedSquare && m.to === square);
      if (isLegal) {
        onMove(selectedSquare, square);
        setSelectedSquare(null);
      } else {
        // If clicked on another own piece, switch selection
        // For now, just deselect or switch if it's a piece
        // Let's just switch selection if it's a piece
        const fileIdx = files.indexOf(square[0]);
        const rankIdx = ranks.indexOf(square[1]);
        if (board[rankIdx][fileIdx]) {
             setSelectedSquare(square);
        } else {
            setSelectedSquare(null);
        }
      }
    } else {
      const fileIdx = files.indexOf(square[0]);
      const rankIdx = ranks.indexOf(square[1]);
      if (board[rankIdx][fileIdx]) {
         setSelectedSquare(square);
      }
    }
  };

  const renderSquare = (i) => {
    const row = Math.floor(i / 8);
    const col = i % 8;
    const isLight = (row + col) % 2 === 0;
    
    const rankIdx = row;
    const fileIdx = col;
    
    const squareName = `${files[fileIdx]}${ranks[rankIdx]}`;
    const piece = board[rankIdx][fileIdx];
    
    // Check if this square is a legal target for the selected piece
    const isLegalTarget = selectedSquare && legalMoves.some(m => m.from === selectedSquare && m.to === squareName);
    
    return (
      <div key={squareName} className="w-12 h-12 sm:w-16 sm:h-16">
        <Square
          square={squareName}
          piece={piece}
          isLight={isLight}
          isSelected={selectedSquare === squareName}
          isLegalTarget={isLegalTarget}
          onClick={handleSquareClick}
        />
      </div>
    );
  };

  return (
    <div className="grid grid-cols-8 border-4 border-[#b58863] shadow-2xl">
      {Array.from({ length: 64 }).map((_, i) => renderSquare(i))}
    </div>
  );
};

export default ChessBoard;
