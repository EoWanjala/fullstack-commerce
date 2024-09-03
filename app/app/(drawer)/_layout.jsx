import { Drawer } from "expo-router/drawer";

const _layout = () => {
  return (
    <Drawer>
      <Drawer.Screen name='(tabs)' options={{ headerShown: false }} />
    </Drawer>
  );
};

export default _layout;
