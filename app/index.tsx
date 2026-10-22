
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { useCarrinho } from "../context/CarrinhoContext";

const categorias = ["Todos", "Brownies", "Recheados", "Bebidas"];

const produtos = [
  {
    nome: "Brownie tradicional",
    descricao: "Chocolate intenso e massa macia",
    preco: "R$ 8,00",
    emoji: "🍫",
  },
  {
    nome: "Brownie com Nutella",
    descricao: "Muito chocolate e cremosidade",
    preco: "R$ 12,00",
    emoji: "🍫",
  },
  {
    nome: "Brownie com morango",
    descricao: "Chocolate com um toque de fruta",
    preco: "R$ 14,00",
    emoji: "🍓",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { adicionar, itens } = useCarrinho();

  const quantidadeCarrinho = itens.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoIcon}>♨</Text>
          </View>

          <View>
            <Text style={styles.brand}>OURO DOCE</Text>
            <Text style={styles.subtitle}>
              Seu momento mais doce
            </Text>
          </View>

          <Pressable
            style={styles.cart}
            onPress={() => router.push("/carrinho")}
          >
            <Text style={styles.cartText}>
              🛒 {quantidadeCarrinho}
            </Text>
          </Pressable>
        </View>

        <View style={styles.welcome}>
          <Text style={styles.eyebrow}>FEITO PARA VOCÊ</Text>
          <Text style={styles.title}>
            Seu brownie,{"\n"}
            do seu jeito.
          </Text>
          <Text style={styles.description}>
            Escolha seus sabores favoritos e crie
            uma combinação irresistível.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push("/personalizar")}
          >
            <Text style={styles.primaryButtonText}>
              Personalizar meu brownie →
            </Text>
          </Pressable>
        </View>

        <View style={styles.search}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            placeholder="Buscar brownies e recheios..."
            placeholderTextColor="#927D6B"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Explore nosso cardápio
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {categorias.map((categoria, index) => (
              <Pressable
                key={categoria}
                style={[
                  styles.category,
                  index === 0 && styles.categoryActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    index === 0 && styles.categoryTextActive,
                  ]}
                >
                  {categoria}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Os queridinhos 🍫
            </Text>
            <Text style={styles.seeAll}>Ver todos</Text>
          </View>

          {produtos.map((produto) => (
            <View key={produto.nome} style={styles.product}>
              <View style={styles.productImage}>
                <Text style={styles.productEmoji}>
                  {produto.emoji}
                </Text>
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productName}>
                  {produto.nome}
                </Text>
                <Text style={styles.productDescription}>
                  {produto.descricao}
                </Text>
                <Text style={styles.price}>
                  {produto.preco}
                </Text>
              </View>

              <Pressable
                style={styles.addButton}
                onPress={() => adicionar(produto)}
              >
                <Text style={styles.addText}>+</Text>
              </Pressable>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            Ouro Doce ✨
          </Text>
          <Text style={styles.footerText}>
            Cada pedacinho, uma felicidade.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
    paddingTop: 45,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingBottom: 22,
    gap: 12,
  },
  logo: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: "#EAD7B9",
    alignItems: "center",
    justifyContent: "center",
  },
  logoIcon: {
    fontSize: 27,
    color: "#603D25",
  },
  brand: {
    color: "#603D25",
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 11,
    color: "#927D6B",
    marginTop: 3,
  },
  cart: {
    marginLeft: "auto",
    minWidth: 43,
    height: 43,
    paddingHorizontal: 8,
    borderRadius: 14,
    backgroundColor: "#F2E6D5",
    alignItems: "center",
    justifyContent: "center",
  },
  cartText: {
    fontSize: 18,
  },
  welcome: {
    marginHorizontal: 18,
    backgroundColor: "#603D25",
    borderRadius: 25,
    padding: 25,
    overflow: "hidden",
  },
  eyebrow: {
    color: "#E9C78D",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFF6E8",
    marginTop: 12,
    lineHeight: 40,
  },
  description: {
    color: "#E9D8C7",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
    maxWidth: 280,
  },
  primaryButton: {
    backgroundColor: "#E9C78D",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 13,
    alignSelf: "flex-start",
    marginTop: 22,
  },
  primaryButtonText: {
    color: "#603D25",
    fontSize: 13,
    fontWeight: "800",
  },
  search: {
    marginHorizontal: 22,
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8D9C7",
    borderRadius: 14,
    paddingHorizontal: 13,
    backgroundColor: "#FFFFFF",
    height: 52,
  },
  searchIcon: {
    fontSize: 26,
    color: "#603D25",
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#603D25",
    fontSize: 13,
  },
  section: {
    marginTop: 27,
    paddingHorizontal: 22,
  },
  sectionTitle: {
    fontSize: 19,
    color: "#603D25",
    fontWeight: "800",
  },
  categories: {
    gap: 10,
    paddingTop: 15,
  },
  category: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E8D9C7",
    backgroundColor: "#FFFFFF",
  },
  categoryActive: {
    backgroundColor: "#603D25",
    borderColor: "#603D25",
  },
  categoryText: {
    color: "#755840",
    fontSize: 12,
    fontWeight: "600",
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  seeAll: {
    color: "#946A3E",
    fontWeight: "700",
    fontSize: 12,
  },
  product: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#F0E5D8",
  },
  productImage: {
    width: 83,
    height: 88,
    borderRadius: 14,
    backgroundColor: "#F5E7D4",
    alignItems: "center",
    justifyContent: "center",
  },
  productEmoji: {
    fontSize: 38,
  },
  productInfo: {
    flex: 1,
    marginLeft: 13,
    gap: 5,
  },
  productName: {
    color: "#603D25",
    fontSize: 14,
    fontWeight: "800",
  },
  productDescription: {
    color: "#927D6B",
    fontSize: 11,
  },
  price: {
    color: "#8B5B2E",
    fontSize: 15,
    fontWeight: "900",
  },
  addButton: {
    backgroundColor: "#603D25",
    width: 33,
    height: 33,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    color: "#FFFFFF",
    fontSize: 23,
    lineHeight: 27,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#603D25",
  },
  footerText: {
    color: "#927D6B",
    marginTop: 5,
    fontSize: 12,
  },
});
