import { Client, Databases, ID, Query } from "react-native-appwrite";

// import { Client, Account, ID } from 'react-native-appwrite';

// const client = new Client()
//     .setProject('67d843f8002547dbc422')
//     .setPlatform('com.hassim.holoverse');

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
console.log("DATABASE_ID: ", DATABASE_ID);
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
console.log("COLLECTION_ID: ", COLLECTION_ID);

const client = new Client()
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);
console.log(
	"process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID: ",
	process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
	try {
		// Fetch documents that match the searchTerm]
		const result = await database.listDocuments(
			DATABASE_ID,
			COLLECTION_ID,
			[Query.equal("searchTerm", query.trim())]
		);

		const documents = [...result.documents]; // Store response immediately
		// console.log("Existing documents:", documents);

		if (documents.length > 0) {
			const existingMovie = documents[0];

			// Ensure 'count' is a number before updating
			await database.updateDocument(
				DATABASE_ID,
				COLLECTION_ID,
				existingMovie.$id,
				{ count: Number(existingMovie.count) + 1 }
			);
		} else {
			await database.createDocument(
				DATABASE_ID,
				COLLECTION_ID,
				ID.unique(),
				{
					searchTerm: query.trim(),
					movie_id: movie.id,
					title: movie.title,
					count: 1,
					poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
				}
			);

			console.log("New document created successfully");
		}
	} catch (error: any) {
		console.error(
			"Error updating search count:",
			error.message,
			error.response
		);
	}
};

export const getTrendingMovies = async (): Promise<
	TrendingMovie[] | undefined
> => {
	try {
		const result = await database.listDocuments(
			DATABASE_ID,
			COLLECTION_ID,
			[Query.limit(5), Query.orderDesc("count")]
		);

		return result.documents as unknown as TrendingMovie[];
	} catch (error) {
		console.error(error);
		return undefined;
	}
};
