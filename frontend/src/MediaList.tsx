import { useContext } from 'react';
import { Link } from 'react-router-dom'
import MediaContext from './MediaContext';

function MediaList() {
	const context = useContext(MediaContext)
	
	if (!context){
		return null
	}

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
				{context.data.map(item => (
				<tr key={item.index}>
						<td>
							<Link to={`/media/${item.index}`}>{item.title}</Link>
						</td>
						<td>{item.genres}</td>
						<td>{item.year}</td>
						<td>{item.imdb_rating}</td>
						<td>{item.type}</td>
						<td onClick={() => context.onWatchedToggle(item.index)}>{item.watched ? '✅' : '❌'}</td>
				</tr>
				))}
		</tbody>
		</table>
		</>
	)
}

export default MediaList;