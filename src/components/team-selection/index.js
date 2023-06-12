import React from 'react';
import PlayerDetail from '../player-info';
import playersList from '../../players.json';

export default function TeamSelection() {
	const [players, setPlayers] = React.useState([...playersList]);
	const [selectedPlayers, setSelectedPlayers] = React.useState([]);
	const [showPlayerDetail, setShowPlayerDetail] = React.useState(false);
	const [idx, setIdx] = React.useState(null);
	const [welcome, setWelcome] = React.useState(true);
	const [noBat, setNoBat] = React.useState(0);
	const [noBowl, setNoBowl] = React.useState(0);
	const [noAR, setNoAR] = React.useState(0);
	const [noWK, setNoWK] = React.useState(0);

	const addPlayer = index => {
		if (selectedPlayers.length >= 11) {
			return; // Limit reached, prevent further selections
		}

		const player = players[index];
		const updatedPlayers = [...players];
		updatedPlayers[index] = { ...player, selected: true };

		setSelectedPlayers([...selectedPlayers, player]);
		setPlayers(updatedPlayers);
		setIdx(null);
		setNoBat(player.type === 'Batsman' ? noBat + 1 : noBat);
		setNoBowl(player.type === 'Bowler' ? noBowl + 1 : noBowl);
		setNoAR(player.type === 'All-Rounder' ? noAR + 1 : noAR);
		setNoWK(player.type === 'Wicket Keeper' ? noWK + 1 : noWK);
		setShowPlayerDetail(false);
	};

	const removePlayer = index => {
		const player = selectedPlayers[index];
		const updatedSelectedPlayers = [...selectedPlayers];
		updatedSelectedPlayers.splice(index, 1);

		const updatedPlayers = players.map(p =>
			p.name === player.name ? { ...p, selected: false } : p
		);

		setSelectedPlayers(updatedSelectedPlayers);
		setPlayers(updatedPlayers);
		setNoBat(player.type === 'Batsman' ? noBat - 1 : noBat);
		setNoBowl(player.type === 'Bowler' ? noBowl - 1 : noBowl);
		setNoAR(player.type === 'All-Rounder' ? noAR - 1 : noAR);
		setNoWK(player.type === 'Wicket Keeper' ? noWK - 1 : noWK);
	};

	const showplayerDetailsCard = i => {
		setIdx(i);
		setShowPlayerDetail(true);
	};

	const closeCard = () => {
		setShowPlayerDetail(false);
	};

	return (
		<div className='mt-50 layout-column justify-content-center align-items-center'>
			<div style={{ display: 'flex', width: '80%' }}>
				{showPlayerDetail && (
					<PlayerDetail
						selectedPlayers={selectedPlayers}
						i={idx}
						close={() => closeCard()}
						index={1}
						addPlayer={i => addPlayer(i)}
					/>
				)}
				<div
					className='card outlined mt-0'
					style={{
						width: '50%',
						marginRight: '10px',
						overflow: 'scroll',
						height: '80vh',
					}}
				>
					<div className='card-text'>
						<h4 style={{ textAlign: 'center' }}>Available Players</h4>
						<table>
							<thead>
								<tr>
									<th data-testid='available-players-name'>Name</th>
									<th>Role</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody data-testid='available-players-table-body'>
								{players.map((player, index) => (
									<tr
										data-testid={`available-${player.name
											.split(' ')
											.join('-')}-row`}
										key={index}
									>
										<td
											data-testid={`available-${player.name
												.split(' ')
												.join('-')}-name`}
											onClick={() => showplayerDetailsCard(index)}
										>
											{player.name}
										</td>
										<td onClick={() => showplayerDetailsCard(index)}>
											{player.type}
										</td>
										<td>
											<button
												data-testid={`available-${player.name
													.split(' ')
													.join('-')}-select`}
												onClick={() => addPlayer(index)}
												disabled={player.selected} // Disable if already selected
												className='btn btn-primary text'
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
					className='card outlined mt-0'
					style={{
						width: '50%',
						marginRight: '10px',
						overflow: 'scroll',
						height: '80vh',
					}}
				>
					<div className='card-text'>
						<h4 style={{ textAlign: 'center' }}>Selected Players</h4>
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Role</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody data-testid='selected-players-table-body'>
								{selectedPlayers.map((player, index) => (
									<tr
										data-testid={`selected-${player.name
											.split(' ')
											.join('-')}-row`}
										key={index}
									>
										<td>{player.name}</td>
										<td>{player.type}</td>
										<td>
											<button
												data-testid={`selected-${player.name
													.split(' ')
													.join('-')}-remove`}
												onClick={() => removePlayer(index)}
												className='btn danger text'
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
