import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8000';

export const useChessGame = () => {
  const [gameId, setGameId] = useState(null);
  const [boardFen, setBoardFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [moveLog, setMoveLog] = useState([]);
  const [gameState, setGameState] = useState('ongoing');
  const [engineStatus, setEngineStatus] = useState('Idle');
  const [engineComment, setEngineComment] = useState('');
  const [winner, setWinner] = useState(null);
  const [playerColor, setPlayerColor] = useState('white');
  const [difficulty, setDifficulty] = useState('medium');
  const [legalMoves, setLegalMoves] = useState([]);
  const [inCheck, setInCheck] = useState(false);

  const [persona, setPersona] = useState('teacher');

  const startNewGame = async (color = 'white', diff = 'medium') => {
    try {
      setEngineStatus('Starting new game...');
      const response = await fetch(`${API_BASE_URL}/new-game`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ engine_color: color === 'white' ? 'black' : 'white', difficulty: diff }),
      });
      const data = await response.json();
      setGameId(data.game_id);
      setBoardFen(data.board_fen);
      setMoveLog([]);
      setGameState('ongoing');
      setWinner(null);
      setPlayerColor(color);
      setDifficulty(diff);
      setEngineComment(data.message || '');
      setLegalMoves(data.legal_moves || []);
      setInCheck(false);
      setEngineStatus('Your turn');
      
      // Set initial persona
      await setPersonaBackend(data.game_id, persona);
    } catch (error) {
      console.error('Error starting game:', error);
      setEngineStatus('Error starting game');
    }
  };

  const setPersonaBackend = async (gid, p) => {
      try {
        await fetch(`${API_BASE_URL}/set-persona`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ game_id: gid, persona: p }),
        });
      } catch (e) {
          console.error("Failed to set persona", e);
      }
  };

  const changePersona = async (newPersona) => {
      setPersona(newPersona);
      if (gameId) {
          await setPersonaBackend(gameId, newPersona);
      }
  };

  const triggerSelfPlay = async () => {
      if (!gameId || gameState !== 'ongoing') return;
      
      try {
          setEngineStatus(`AI vs AI (${persona})...`);
          const response = await fetch(`${API_BASE_URL}/self-play`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ game_id: gameId, persona: persona }),
          });
          const data = await response.json();
          
          if (data.status === 'ok') {
              setBoardFen(data.board_fen);
              setMoveLog(data.move_log);
              setGameState(data.game_state);
              setWinner(data.winner);
              setEngineComment(data.engine_comment || '');
              setLegalMoves(data.legal_moves || []);
              
              const lastMove = data.move_log[data.move_log.length - 1];
              setInCheck(lastMove && lastMove.includes('+'));

              if (data.game_state !== 'ongoing') {
                setEngineStatus(`Game Over: ${data.game_state}`);
              } else {
                setEngineStatus('AI moved');
              }
          }
      } catch (e) {
          console.error("Self play error", e);
      }
  };

  const makeMove = async (fromSquare, toSquare) => {
    if (!gameId || gameState !== 'ongoing') return;

    try {
      setEngineStatus('Thinking...');
      const response = await fetch(`${API_BASE_URL}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: gameId,
          from_square: fromSquare,
          to_square: toSquare,
        }),
      });
      const data = await response.json();

      if (data.status === 'illegal_move') {
        setEngineStatus('Illegal move');
        setTimeout(() => setEngineStatus('Your turn'), 2000);
        return;
      }

      if (data.engine_move) {
         await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setBoardFen(data.board_fen);
      setMoveLog(data.move_log);
      setGameState(data.game_state);
      setWinner(data.winner);
      setEngineComment(data.engine_comment || '');
      setLegalMoves(data.legal_moves || []);
      
      const lastMove = data.move_log[data.move_log.length - 1];
      setInCheck(lastMove && lastMove.includes('+'));

      if (data.game_state !== 'ongoing') {
        setEngineStatus(`Game Over: ${data.game_state}`);
      } else {
        setEngineStatus('Your turn');
      }
    } catch (error) {
      console.error('Error making move:', error);
      setEngineStatus('Error making move');
    }
  };

  return {
    gameId,
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
  };
};
