import { FlatList, Text, View } from "react-native";
import { useUsers } from "../users/queries";

export default function HomeScreen() {
  const { data, isLoading, isFetching, isError } = useUsers();

    if (isFetching) return <Text>Loading...</Text>;
    if (isLoading) return <Text>Loading...</Text>;
    if (isError) return <Text>Error fetching users</Text>;

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(user) => String(user.id)}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}
