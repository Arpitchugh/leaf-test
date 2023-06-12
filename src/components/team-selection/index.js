import React from 'react';
import PlayerDetail from '../player-info';
import playersList from '../../players.json';

export default function TeamSelection() {
  const [players, setPlayers] = React.useState([...playersList]);
  const [selectedPlayers, setSelectedPlayers] = React.useState([]);
  const [showPlayerDetail, setShowPlayerDetail] = React.useState(false);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = React.useState(null);

  const addPlayer = (index) => {
    const player = players[index];

    if (selectedPlayers.length < 11) {
      const updatedPlayers = [...players];
      updatedPlayers.splice(index, 1);

      setSelectedPlayers([...selectedPlayers, player]);
      setPlayers(updatedPlayers);
    }
  };

  const removePlayer = (index) => {
    const player = selectedPlayers[index];
    const updatedSelectedPlayers = [...selectedPlayers];
    updatedSelectedPlayers.splice(index, 1);

    setSelectedPlayers(updatedSelectedPlayers);
    setPlayers([...players, player]);
  };

  const showPlayerDetailsCard = (index) => {
    setSelectedPlayerIndex(index);
    setShowPlayerDetail(true);
  };

  const closeCard = () => {
    setShowPlayerDetail(false);
  };

  return (
    <div className="mt-50 layout-column justify-content-center align-items-center">
      <div style={{ display: 'flex', width: '80%' }}>
        {showPlayerDetail && (
          <PlayerDetail
            player={selectedPlayers[selectedPlayerIndex]}
            close={closeCard}
            remove={() => removePlayer(selectedPlayerIndex)}
            disabled={true}
          />
        )}
        <div
          className="card outlined mt-0"
          style={{
            width: '50%',
            marginRight: '10px',
            overflow: 'scroll',
            height: '80vh',
          }}
        >
          <div className="card-text">
            <h4 style={{ textAlign: 'center' }}>Available Players</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={index}>
                    <td
                      onClick={() => showPlayerDetailsCard(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      {player.name}
                    </td>
                    <td>{player.type}</td>
                    <td>
                      <button
                        onClick={() => addPlayer(index)}
                        disabled={selectedPlayers.length === 11}
                        className="btn btn-primary text"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="card outlined mt-0"
          style={{
            width: '50%',
            marginRight: '10px',
            overflow: 'scroll',
            height: '80vh',
          }}
        >
          <div className="card-text">
            <h4 style={{ textAlign: 'center' }}>Selected Players</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedPlayers.map((player, index) => (
                  <tr key={index}>
                    <td>{player.name}</td>
                    <td>{player.type}</td>
                    <td>
                      <button
                        onClick={() => removePlayer(index)}
                        className="btn danger text"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
