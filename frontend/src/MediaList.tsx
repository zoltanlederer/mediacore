import { useContext } from 'react';
import { Link } from 'react-router-dom'
import MediaContext from './MediaContext';

function MediaList() {
	const context = useContext(MediaContext)
	
	if (!context){
		return null
	}

	return (
		<div className="media-table-wrapper">
			<table className="media-table">
			<thead>
					<tr>
					<th colSpan={2}>TITLE</th>
					<th>GENRE</th>
					<th className="col-year">YEAR</th>
					<th className="col-rating">RATING</th>
					<th>TYPE</th>
					<th className="col-watched">WATCHED</th>
					</tr>
			</thead>
			<tbody>
				{context.data.map(item => (
				<tr key={item.index}>
					<td>
						<img
							className="poster-thumbnail"
							src={item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : "/images/poster-placeholder.png"}
							alt={item.title}
						/>
					</td>
					<td>
						<Link to={`/media/${item.index}`}>{item.title}</Link>
					</td>
					<td>{item.genres}</td>
					<td className="col-year">{item.year}</td>
					<td className="col-rating">{item.imdb_rating}</td>
					<td>{item.type}</td>
					<td className="col-watched">
						<span
							className={`watched-toggle ${item.watched ? 'watched' : 'unwatched'}`}
							onClick={() => context.onWatchedToggle(item.index)}
						>
							{item.watched ? '✓' : '✕'}
						</span>
					</td>
				</tr>
				))}
			</tbody>
			</table>
		</div>
	)
}

export default MediaList;