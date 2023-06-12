import React, { useState } from 'react';
import players1 from '../../players.json';

export default function PlayerDetail({ close, i, addPlayer, selectedPlayers }) {
	const [players] = useState([...players1]);
	const [player, setPlayer] = useState(players[i]);

	// Update the player details when the index changes
	React.useEffect(() => {
		setPlayer(players[i]);
	}, [i, players]);

	return (
		<div
			className='card outlined mt-0'
			style={{
				position: 'fixed',
				left: '50%',
				transform: 'translateX(-50%)',
				padding: '20px',
				width: '500px',
				top: '30%',
			}}
			data-testid={`player-${player.name.split(' ').join('-')}-details`}
		>
			<h1 className='card-title' style={{ textAlign: 'center' }}>
				Player Detail
			</h1>
			<p>
				<strong>Name:</strong>{' '}
				<span
					data-testid={`player-detail-${player.name.split(' ').join('-')}-name`}
				>
					{player.name}
				</span>
			</p>
			<p>
				<strong>Type:</strong>{' '}
				<span
					data-testid={`player-detail-${player.name.split(' ').join('-')}-type`}
				>
					{player.type}
				</span>
			</p>
			<p>
				<strong>Batting:</strong>{' '}
				<span
					data-testid={`player-detail-${player.name
						.split(' ')
						.join('-')}-batting`}
				>
					{player.batting}
				</span>
			</p>
			<p>
				<strong>Bowling:</strong>{' '}
				<span
					data-testid={`player-detail-${player.name
						.split(' ')
						.join('-')}-bowling`}
				>
					{player.bowling}
				</span>
			</p>
			<button
				disabled={false}
				onClick={() => addPlayer(i)}
				data-testid={`player-detail-${player.name.split(' ').join('-')}-add`}
			>
				Select
			</button>
			<button
				onClick={close}
				className='danger'
				data-testid={`player-detail-${player.name.split(' ').join('-')}-close`}
			>
				Close
			</button>
		</div>
	);
}
