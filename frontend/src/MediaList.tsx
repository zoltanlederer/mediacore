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
				<th colSpan={2}>TITLE</th>
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
				<td><img src={item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : "/images/poster-placeholder.png"} alt={item.title} /></td>
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