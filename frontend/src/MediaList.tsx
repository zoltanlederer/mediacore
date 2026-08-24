import type { Media } from './types'

interface MediaListProps {
	data: Media[];
	onWatchedToggle: (selectedIndex: number) => void;
}

function MediaList({data, onWatchedToggle}: MediaListProps) {

	return (
		<>
		<table>
		<thead>
				<tr>
				<th>TITLE</th>
				<th>GENRE</th>
				<th>YEAR</th>
				<th>RATING</th>
				<th>TYPE</th>
				<th>WATCHED</th>
				</tr>
		</thead>
		<tbody>
				{data.map(item => (
				<tr key={item.index}>
						<td>{item.title}</td>
						<td>{item.genres}</td>
						<td>{item.year}</td>
						<td>{item.imdb_rating}</td>
						<td>{item.type}</td>
						<td onClick={() => onWatchedToggle(item.index)}>{item.watched ? '✅' : '❌'}</td>
				</tr>
				))}
		</tbody>
		</table>
		</>
	)
}

export default MediaList;