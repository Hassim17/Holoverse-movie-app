export const TMDB_CONFIG = {
	BASE_URL: "https://api.themoviedb.org/3",
	API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
	},
	// LANG: 'en-US',
	// SORT_BY: 'popularity.desc',
	INCLUDE_ADULT: false,
	// INCLUDE_VIDEO: false,
};

export const fetchMovies = async ({ query }: { query: string }) => {
	const endpoint = query
		? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
				query
		  )}&include_adult=${TMDB_CONFIG.INCLUDE_ADULT}&sort_by=popularity.desc`
		: `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=${
				TMDB_CONFIG.INCLUDE_ADULT
		  }&include_video=false&language=en-US&page=1&primary_release_date.gte=2024-01-01&primary_release_date.lte=${
				new Date().toISOString().split("T")[0]
		  }&sort_by=popularity.desc&vote_average.gte=6&vote_average.lte=10&vote_count.gte=${
				Math.floor(Math.random() * 3) * 100
		  }`;
	//   : `${TMDB_CONFIG.BASE_URL}/tv/popular?language=en-US&page=1`;

	const response = await fetch(endpoint, {
		method: "GET",
		headers: TMDB_CONFIG.headers,
	});
	if (!response.ok) {
		// @ts-ignore
		throw new Error("Failed to fetch movies", response.statusText);
	}
	const data = await response.json();
	return data.results;
};

export const fetchMovieDetails = async (
	movieId: string
): Promise<MovieDetails> => {
	try {
		const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`;
		const response = await fetch(endpoint, {
			method: "GET",
			headers: TMDB_CONFIG.headers,
		});
		if (!response.ok) {
			throw new Error("Failed to fetch Movie details");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching trending movies", error);
		throw error;
	}
};

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZGE2MWUzOGM1MDkzNzcyMWNkY2E3ZjA1MDQzOGYxNCIsIm5iZiI6MTc0MjAxODIwOC4zMzUsInN1YiI6IjY3ZDUxNmEwNTc3NjY1YWNlNWYxNTJkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.avupuUuXzUFMPIQ7Zham8Zl7434LOFKgikqU5xshVZ0'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));
