
import { CarrinhoProvider } from "../context/CarrinhoContext";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const marrom = "#603D25";

export default function Layout() {
  return (
    <CarrinhoProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: marrom,
          tabBarInactiveTintColor: "#A89582",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#EADCCB",
            height: 65,
            paddingTop: 8,
            paddingBottom: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Início",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="cardapio"
          options={{
            title: "Cardápio",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="restaurant-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="personalizar"
          options={{
            title: "Personalizar",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="color-palette-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="carrinho"
          options={{
            title: "Carrinho",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="pedidos"
          options={{
            title: "Pedidos",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="receipt-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen name="entrega" options={{ href: null }} />
        <Tabs.Screen name="finalizacao" options={{ href: null }} />
      </Tabs>
    </CarrinhoProvider>
  );
}
