import { GestureHandlerRootView } from "react-native-gesture-handler";
import FormActivity from "./src/components/FormActivity";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FormActivity />
    </GestureHandlerRootView>
  );
}
