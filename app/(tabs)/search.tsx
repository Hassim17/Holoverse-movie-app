import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";

const search = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const {
		data: movies = [],
		loading: moviesLoading,
		error: moviesError,
		refetch: refetchMovies,
		reset,
	} = useFetch(
		() =>
			fetchMovies({
				query: searchQuery,
			}),
		false
	);

	const handleSearch = (text: string) => {
		setSearchQuery(text);
	};

	useEffect(() => {
		const timeoutId = setTimeout(async () => {
			if (searchQuery.trim()) {
				console.log("SEARCHING FOR MOVIES");
				await refetchMovies();
			} else {
				reset();
			}
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, [searchQuery]);

	useEffect(() => {
		if (movies?.length! > 0 && movies?.[0]) {
			updateSearchCount(searchQuery, movies[0]);
		}
	}, [movies]);

	return (
		<View className="flex-1 bg-primary">
			<Image source={images.bg} className="absolute w-full z-0" />

			<FlatList
				data={movies}
				renderItem={({ item }) => <MovieCard {...item} />}
				keyExtractor={(item) => item.id.toString()}
				className="px-5"
				numColumns={3}
				columnWrapperStyle={{
					justifyContent: "flex-start",
					gap: 16,
					marginVertical: 16,
				}}
				contentContainerStyle={{ paddingBottom: 100 }}
				ListHeaderComponent={
					<>
						<View className="w-full flex-row justify-center items-center">
							<Image
								source={icons.logo1}
								className="w-32 h-12 mt-20 mb-5 mx-auto "
							/>
						</View>

						<View className="my-5">
							<SearchBar
								placeholder="Search for a movie"
								value={searchQuery}
								onChangeText={handleSearch}
							/>
						</View>

						{moviesLoading && (
							<ActivityIndicator
								size="large"
								color="#0000ff"
								className="my-3"
							/>
						)}
						{moviesError && (
							<Text className="text-red-500 px-5 my-3">
								Error: {moviesError?.message}
							</Text>
						)}

						{!moviesLoading &&
							!moviesError &&
							searchQuery.trim() &&
							movies?.length > 0 && (
								<Text className="text-xl text-white font-bold">
									Search Results for{" "}
									<Text className="text-accent">
										{searchQuery}
									</Text>
								</Text>
							)}
					</>
				}
				ListEmptyComponent={
					!moviesLoading && !moviesError ? (
						<View className="mt-10 px-5">
							<Text className="text-center text-gray-500">
								{searchQuery.trim()
									? "No movies found"
									: "Search for a Movie"}
							</Text>
						</View>
					) : null
				}
			/>
		</View>
	);
};

export default search;
