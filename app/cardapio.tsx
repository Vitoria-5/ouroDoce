
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";

const categorias = [
  "Todos",
  "Tradicionais",
  "Recheados",
  "Especiais",
  "Bebidas",
];

const produtos = [
  {
    id: "1",
    nome: "Brownie tradicional",
    descricao: "Chocolate intenso e massa macia",
    preco: 8,
    categoria: "Tradicionais",
    emoji: "🍫",
    favorito: true,
  },
  {
    id: "2",
    nome: "Brownie com Nutella",
    descricao: "Recheio cremoso de avelã",
    preco: 12,
    categoria: "Recheados",
    emoji: "🍫",
    favorito: true,
  },
  {
    id: "3",
    nome: "Brownie de morango",
    descricao: "Chocolate, morango e brigadeiro",
    preco: 14,
    categoria: "Especiais",
    emoji: "🍓",
    favorito: false,
  },
  {
    id: "4",
    nome: "Brownie de doce de leite",
    descricao: "Doce de leite cremoso",
    preco: 12,
    categoria: "Recheados",
    emoji: "🍮",
    favorito: false,
  },
  {
    id: "5",
    nome: "Brownie com Oreo",
    descricao: "Chocolate com biscoito crocante",
    preco: 13,
    categoria: "Especiais",
    emoji: "🍪",
    favorito: true,
  },
  {
    id: "6",
    nome: "Chocolate quente",
    descricao: "Bebida cremosa de chocolate",
    preco: 9,
    categoria: "Bebidas",
    emoji: "☕",
    favorito: false,
  },
];

const dinheiro = (valor: number) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function CardapioScreen() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [quantidades, setQuantidades] = useState<
    Record<string, number>
  >({});

  const filtrados = useMemo(() => {
    return produtos.filter((produto) => {
      const correspondeCategoria =
        categoria === "Todos" ||
        produto.categoria === categoria;

      const correspondeBusca =
        produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(busca.toLowerCase());

      return correspondeCategoria && correspondeBusca;
    });
  }, [busca, categoria]);

  const totalItens = Object.values(quantidades).reduce(
    (total, quantidade) => total + quantidade,
    0
  );

  function adicionar(id: string) {
    setQuantidades((atual) => ({
      ...atual,
      [id]: (atual[id] || 0) + 1,
    }));
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.miniTitle}>UMA DOSE DE FELICIDADE</Text>
            <Text style={styles.titulo}>Nosso cardápio</Text>
            <Text style={styles.subtitulo}>
              Encontre seu próximo favorito.
            </Text>
          </View>

          <View style={styles.logo}>
            <Text style={styles.logoText}>OD</Text>
          </View>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>🍫 ✨</Text>
          <Text style={styles.bannerTitulo}>
            Seu desejo merece
            {"\n"}um brownie especial!
          </Text>
          <Text style={styles.bannerTexto}>
            Escolha, combine e aproveite cada pedacinho.
          </Text>
        </View>

        <View style={styles.buscaContainer}>
          <Text style={styles.lupa}>⌕</Text>
          <TextInput
            style={styles.buscaInput}
            placeholder="Buscar brownie, recheio..."
            placeholderTextColor="#9A8878"
            value={busca}
            onChangeText={setBusca}
          />
          {busca.length > 0 && (
            <Pressable onPress={() => setBusca("")}>
              <Text style={styles.limpar}>✕</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Categorias</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listaCategorias}
          >
            {categorias.map((item) => {
              const selecionada = categoria === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => setCategoria(item)}
                  style={[
                    styles.categoria,
                    selecionada && styles.categoriaSelecionada,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoriaTexto,
                      selecionada && styles.categoriaTextoSelecionado,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.secao}>
          <View style={styles.linhaTitulo}>
            <Text style={styles.secaoTitulo}>
              Delícias para você
            </Text>
            <Text style={styles.contagem}>
              {filtrados.length} produtos
            </Text>
          </View>

          <View style={styles.grade}>
            {filtrados.map((produto) => (
              <View key={produto.id} style={styles.produto}>
                <View style={styles.fotoProduto}>
                  {produto.favorito && (
                    <View style={styles.selo}>
                      <Text style={styles.seloTexto}>
                        FAVORITO
                      </Text>
                    </View>
                  )}

                  <Text style={styles.emojiProduto}>
                    {produto.emoji}
                  </Text>

                  <Text style={styles.categoriaPequena}>
                    {produto.categoria}
                  </Text>
                </View>

                <View style={styles.detalhesProduto}>
                  <Text style={styles.nomeProduto}>
                    {produto.nome}
                  </Text>

                  <Text style={styles.descricaoProduto}>
                    {produto.descricao}
                  </Text>

                  <View style={styles.linhaPreco}>
                    <Text style={styles.preco}>
                      {dinheiro(produto.preco)}
                    </Text>

                    <Pressable
                      onPress={() => adicionar(produto.id)}
                      style={styles.botaoAdicionar}
                      accessibilityLabel={`Adicionar ${produto.nome}`}
                    >
                      <Text style={styles.botaoAdicionarTexto}>
                        {quantidades[produto.id]
                          ? `+ ${quantidades[produto.id]}`
                          : "+"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {filtrados.length === 0 && (
            <View style={styles.vazio}>
              <Text style={styles.vazioEmoji}>🍪</Text>
              <Text style={styles.vazioTitulo}>
                Não encontramos essa delícia
              </Text>
              <Text style={styles.vazioTexto}>
                Tente outro nome ou selecione outra categoria.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.rodape}>
          <Text style={styles.rodapeTitulo}>OURO DOCE ✨</Text>
          <Text style={styles.rodapeTexto}>
            Feito para adoçar seus melhores momentos.
          </Text>
        </View>
      </ScrollView>

      {totalItens > 0 && (
        <View style={styles.resumoCarrinho}>
          <View>
            <Text style={styles.resumoQuantidade}>
              {totalItens} {totalItens === 1 ? "item" : "itens"} selecionados
            </Text>
            <Text style={styles.resumoTexto}>
              Seleção desta tela
            </Text>
          </View>

          <Pressable
            style={styles.botaoCarrinho}
            onPress={() =>
              alert(
                "Você selecionou " +
                  totalItens +
                  " itens. Na próxima etapa vamos conectar o carrinho!"
              )
            }
          >
            <Text style={styles.botaoCarrinhoTexto}>
              Ver seleção →
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  miniTitle: {
    color: "#A47743",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.8,
  },
  titulo: {
    color: "#603D25",
    fontSize: 29,
    fontWeight: "900",
    marginTop: 7,
  },
  subtitulo: {
    color: "#927D6B",
    fontSize: 13,
    marginTop: 5,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "#EAD7B9",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#603D25",
    fontSize: 19,
    fontWeight: "900",
  },
  banner: {
    marginHorizontal: 18,
    padding: 22,
    borderRadius: 23,
    backgroundColor: "#603D25",
  },
  bannerEmoji: {
    fontSize: 25,
    marginBottom: 9,
  },
  bannerTitulo: {
    fontSize: 23,
    lineHeight: 29,
    fontWeight: "900",
    color: "#FFF7E9",
  },
  bannerTexto: {
    color: "#E8D6C2",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
  },
  buscaContainer: {
    height: 51,
    marginHorizontal: 22,
    marginTop: 22,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E8D9C7",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
  },
  lupa: {
    fontSize: 27,
    color: "#603D25",
    marginRight: 9,
  },
  buscaInput: {
    flex: 1,
    color: "#603D25",
    fontSize: 13,
    outlineStyle: "none",
  } as any,
  limpar: {
    color: "#603D25",
    fontSize: 18,
    padding: 5,
  },
  secao: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  secaoTitulo: {
    color: "#603D25",
    fontSize: 18,
    fontWeight: "900",
  },
  listaCategorias: {
    paddingTop: 13,
    gap: 9,
    paddingBottom: 2,
  },
  categoria: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8D9C7",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
  },
  categoriaSelecionada: {
    backgroundColor: "#603D25",
    borderColor: "#603D25",
  },
  categoriaTexto: {
    color: "#755840",
    fontSize: 12,
    fontWeight: "700",
  },
  categoriaTextoSelecionado: {
    color: "#FFFFFF",
  },
  linhaTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  contagem: {
    color: "#A47743",
    fontSize: 11,
    fontWeight: "700",
  },
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  produto: {
    width: "48.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#F0E5D8",
  },
  fotoProduto: {
    height: 125,
    backgroundColor: "#F2E3D0",
    justifyContent: "center",
    alignItems: "center",
  },
  selo: {
    position: "absolute",
    top: 9,
    left: 8,
    backgroundColor: "#E9C78D",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  seloTexto: {
    color: "#603D25",
    fontSize: 8,
    fontWeight: "900",
  },
  emojiProduto: {
    fontSize: 48,
  },
  categoriaPequena: {
    fontSize: 9,
    color: "#755840",
    marginTop: 5,
    fontWeight: "700",
  },
  detalhesProduto: {
    padding: 11,
  },
  nomeProduto: {
    color: "#603D25",
    fontSize: 13,
    fontWeight: "900",
    minHeight: 34,
  },
  descricaoProduto: {
    color: "#927D6B",
    fontSize: 10,
    lineHeight: 15,
    minHeight: 30,
    marginTop: 4,
  },
  linhaPreco: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  preco: {
    color: "#8B5B2E",
    fontSize: 14,
    fontWeight: "900",
  },
  botaoAdicionar: {
    width: 32,
    height: 32,
    backgroundColor: "#603D25",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  botaoAdicionarTexto: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
  vazio: {
    alignItems: "center",
    paddingVertical: 35,
  },
  vazioEmoji: {
    fontSize: 38,
  },
  vazioTitulo: {
    color: "#603D25",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 10,
  },
  vazioTexto: {
    color: "#927D6B",
    textAlign: "center",
    fontSize: 12,
    marginTop: 6,
  },
  rodape: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 35,
  },
  rodapeTitulo: {
    color: "#603D25",
    fontSize: 16,
    fontWeight: "900",
  },
  rodapeTexto: {
    color: "#927D6B",
    fontSize: 11,
    marginTop: 5,
  },
  resumoCarrinho: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8D9C7",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resumoQuantidade: {
    color: "#603D25",
    fontWeight: "900",
    fontSize: 13,
  },
  resumoTexto: {
    color: "#927D6B",
    fontSize: 10,
    marginTop: 3,
  },
  botaoCarrinho: {
    backgroundColor: "#603D25",
    paddingHorizontal: 17,
    paddingVertical: 13,
    borderRadius: 12,
  },
  botaoCarrinhoTexto: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 12,
  },
});
