import { Image, ImageBackground, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { LinearGradient } from "expo-linear-gradient";

const TabIcon = ({
	focused,
	icon,
	label,
}: {
	focused: boolean;
	icon: any;
	label: string;
}) => {
	if (focused) {
		return (
			<LinearGradient
				// Background Linear Gradient
				colors={["#D7FFEC", "#00CC5C"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				className=" w-full px-[30px] rounded-full flex-1 min-w-[112px] flex flex-row min-h-16 mt-4 justify-center items-center overflow-hidden"
				// style={styles.background}
			>
				<Image source={icon} tintColor="#131313" className="size-5" />
				<Text className="text-secondary text-base font-semibold ml-2">
					{label}
				</Text>
			</LinearGradient>
		);
	} else {
		return (
			<View className="size-full flex justify-center items-center mt-4 rounded-full">
				<Image source={icon} tintColor="#A8DBC3" className="size-5" />
			</View>
		);
	}
};

const _layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignContent: "center",
				},
				tabBarStyle: {
					backgroundColor: "#0D2322",
					borderRadius: 100,
					marginHorizontal: 20,
					marginBottom: 36,
					height: 52,
					position: "absolute",
					overflow: "hidden",
					borderWidth: 1,
					borderColor: "#0D2322",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.home}
							label="Home"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.search}
							label="Search"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="saved"
				options={{
					title: "Saved",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.save}
							label="Saved"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.person}
							label="Profile"
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default _layout;
