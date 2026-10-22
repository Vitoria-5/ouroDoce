
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const PRODUTOS = [
  {
    id: "1",
    nome: "Brownie de Nutella",
    descricao: "Brownie de chocolate com recheio cremoso de Nutella.",
    preco: 12,
    categoria: "Brownies",
    emoji: "🍫",
  },
  {
    id: "2",
    nome: "Brownie de Morango",
    descricao: "Brownie artesanal com sabor de chocolate e morango.",
    preco: 14,
    categoria: "Brownies",
    emoji: "🍓",
  },
  {
    id: "3",
    nome: "Brownie Tradicional",
    descricao: "Brownie macio com muito chocolate.",
    preco: 8,
    categoria: "Brownies",
    emoji: "🍫",
  },
  {
    id: "4",
    nome: "Combo Felicidade",
    descricao: "Uma seleção especial de doces para adoçar seu dia.",
    preco: 22,
    categoria: "Combos",
    emoji: "🍬",
  },
  {
    id: "5",
    nome: "Chocolate Gelado",
    descricao: "Bebida cremosa de chocolate servida gelada.",
    preco: 9,
    categoria: "Bebidas",
    emoji: "🥤",
  },
  {
    id: "6",
    nome: "Caixa Presente",
    descricao: "Uma caixinha especial de doces para presentear.",
    preco: 30,
    categoria: "Presentes",
    emoji: "🎁",
  },
];

const CATEGORIAS = [
  "Todos",
  "Brownies",
  "Combos",
  "Bebidas",
  "Presentes",
];

const dinheiro = (valor) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function Cardapio({ navigation }) {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [carrinho, setCarrinho] = useState([]);
  const [entrega, setEntrega] = useState("retirada");
  const [distancia, setDistancia] = useState("2");
  const [telaFinalizar, setTelaFinalizar] = useState(false);

  const produtosFiltrados = PRODUTOS.filter((produto) => {
    const combinaCategoria =
      categoria === "Todos" ||
      produto.categoria === categoria;

    const combinaBusca = produto.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    return combinaCategoria && combinaBusca;
  });

  const adicionar = (produto) => {
    setCarrinho((atual) => {
      const existente = atual.find(
        (item) => item.id === produto.id
      );

      if (existente) {
        return atual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...atual, { ...produto, quantidade: 1 }];
    });
  };

  const alterarQuantidade = (id, variacao) => {
    setCarrinho((atual) =>
      atual
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantidade: item.quantidade + variacao,
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const subtotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  // Taxas fictícias para o projeto escolar.
  const km = Number(distancia.replace(",", "."));

  const taxaEntrega =
    entrega === "retirada"
      ? 0
      : km <= 3
      ? 5
      : km <= 7
      ? 8
      : km <= 12
      ? 12
      : null;

  const total =
    subtotal + (taxaEntrega === null ? 0 : taxaEntrega);

  const finalizarPedido = () => {
    if (carrinho.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione algum doce primeiro.");
      return;
    }

    if (
      entrega === "entrega" &&
      (!Number.isFinite(km) || km <= 0 || km > 12)
    ) {
      Alert.alert(
        "Distância inválida",
        "Para este exemplo, a entrega atende distâncias de até 12 km."
      );
      return;
    }

    Alert.alert(
      "Ouro Doce 🍰",
      "Cardápio e pedido preparados! A próxima etapa é integrar o cadastro e a finalização do pedido."
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.logo}>🍰 Ouro Doce</Text>
        <Text style={styles.subtitulo}>
          Pequenos doces, grandes felicidades!
        </Text>
      </View>

      <Text style={styles.titulo}>Nosso Cardápio</Text>

      <TextInput
        style={styles.busca}
        placeholder="🔎 Procurar um doce..."
        value={busca}
        onChangeText={setBusca}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categorias}
      >
        {CATEGORIAS.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.botaoCategoria,
              categoria === item && styles.categoriaAtiva,
            ]}
            onPress={() => setCategoria(item)}
          >
            <Text
              style={[
                styles.textoCategoria,
                categoria === item && styles.textoCategoriaAtiva,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {produtosFiltrados.map((produto) => (
        <View key={produto.id} style={styles.card}>
          <Text style={styles.emoji}>{produto.emoji}</Text>

          <View style={styles.infoProduto}>
            <Text style={styles.nomeProduto}>
              {produto.nome}
            </Text>

            <Text style={styles.descricao}>
              {produto.descricao}
            </Text>

            <Text style={styles.preco}>
              {dinheiro(produto.preco)}
            </Text>

            <TouchableOpacity
              style={styles.botaoAdicionar}
              onPress={() => adicionar(produto)}
            >
              <Text style={styles.textoBotao}>
                + Adicionar ao carrinho
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {produtosFiltrados.length === 0 && (
        <Text style={styles.vazio}>
          Nenhum produto encontrado.
        </Text>
      )}

      <View style={styles.secao}>
        <Text style={styles.titulo}>🛒 Seu carrinho</Text>

        {carrinho.length === 0 ? (
          <Text style={styles.descricao}>
            Seu carrinho está vazio.
          </Text>
        ) : (
          carrinho.map((item) => (
            <View key={item.id} style={styles.itemCarrinho}>
              <View style={{ flex: 1 }}>
                <Text style={styles.nomeProduto}>
                  {item.nome}
                </Text>
                <Text>{dinheiro(item.preco * item.quantidade)}</Text>
              </View>

              <TouchableOpacity
                onPress={() => alterarQuantidade(item.id, -1)}
                style={styles.botaoQtd}
              >
                <Text>−</Text>
              </TouchableOpacity>

              <Text style={styles.quantidade}>
                {item.quantidade}
              </Text>

              <TouchableOpacity
                onPress={() => alterarQuantidade(item.id, 1)}
                style={styles.botaoQtd}
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <Text style={styles.linhaTotal}>
          Subtotal: {dinheiro(subtotal)}
        </Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.titulo}>📦 Entrega ou retirada</Text>

        <TouchableOpacity
          style={[
            styles.opcaoEntrega,
            entrega === "retirada" && styles.opcaoSelecionada,
          ]}
          onPress={() => setEntrega("retirada")}
        >
          <Text>🏪 Retirar no local — grátis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.opcaoEntrega,
            entrega === "entrega" && styles.opcaoSelecionada,
          ]}
          onPress={() => setEntrega("entrega")}
        >
          <Text>🛵 Receber por entrega</Text>
        </TouchableOpacity>

        {entrega === "entrega" && (
          <View>
            <Text style={styles.rotulo}>
              Distância estimada em quilômetros:
            </Text>

            <TextInput
              style={styles.busca}
              value={distancia}
              onChangeText={setDistancia}
              keyboardType="decimal-pad"
              placeholder="Ex.: 2"
            />

            <Text style={styles.descricao}>
              Até 3 km: R$ 5,00
              {"\n"}De 3 a 7 km: R$ 8,00
              {"\n"}De 7 a 12 km: R$ 12,00
            </Text>

            {taxaEntrega === null ? (
              <Text style={styles.erro}>
                Distância fora da área de entrega do exemplo.
              </Text>
            ) : (
              <Text style={styles.linhaTotal}>
                Taxa: {dinheiro(taxaEntrega)}
              </Text>
            )}
          </View>
        )}

        <Text style={styles.total}>
          Total: {dinheiro(total)}
        </Text>

        <TouchableOpacity
          style={styles.botaoFinalizar}
          onPress={finalizarPedido}
        >
          <Text style={styles.textoFinalizar}>
            Continuar para finalizar pedido
          </Text>
        </TouchableOpacity>

        <Text style={styles.aviso}>
          O cadastro ou login será solicitado na etapa de
          finalização do pedido, quando integrado ao aplicativo.
        </Text>
      </View>

      <Text style={styles.rodape}>
        Ouro Doce • Feito com carinho 💛
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F1",
  },
  cabecalho: {
    backgroundColor: "#6B3528",
    padding: 28,
    alignItems: "center",
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF0D2",
  },
  subtitulo: {
    color: "#FFE4BE",
    marginTop: 8,
    textAlign: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6B3528",
    marginBottom: 14,
  },
  busca: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8D3BD",
    borderRadius: 12,
    padding: 13,
    marginVertical: 10,
  },
  categorias: {
    marginVertical: 10,
  },
  botaoCategoria: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#F0E1D2",
    borderRadius: 20,
    marginRight: 8,
  },
  categoriaAtiva: {
    backgroundColor: "#6B3528",
  },
  textoCategoria: {
    color: "#6B3528",
    fontWeight: "600",
  },
  textoCategoriaAtiva: {
    color: "#FFFFFF",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F0E0D0",
  },
  emoji: {
    fontSize: 43,
    marginRight: 14,
    alignSelf: "center",
  },
  infoProduto: {
    flex: 1,
  },
  nomeProduto: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#6B3528",
  },
  descricao: {
    color: "#78675D",
    marginTop: 5,
    lineHeight: 20,
  },
  preco: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#A66A22",
    marginTop: 8,
  },
  botaoAdicionar: {
    backgroundColor: "#6B3528",
    padding: 11,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  secao: {
    backgroundColor: "#FFF0DF",
    marginTop: 22,
    marginHorizontal: 12,
    padding: 16,
    borderRadius: 16,
  },
  itemCarrinho: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E8D3BD",
    gap: 10,
  },
  botaoQtd: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  quantidade: {
    fontWeight: "bold",
  },
  linhaTotal: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 14,
    color: "#6B3528",
  },
  opcaoEntrega: {
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#E8D3BD",
  },
  opcaoSelecionada: {
    borderColor: "#6B3528",
    borderWidth: 2,
  },
  rotulo: {
    marginTop: 12,
    color: "#6B3528",
    fontWeight: "600",
  },
  total: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#6B3528",
    marginTop: 20,
  },
  botaoFinalizar: {
    backgroundColor: "#A66A22",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 14,
  },
  textoFinalizar: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  aviso: {
    color: "#78675D",
    marginTop: 12,
    lineHeight: 19,
  },
  erro: {
    color: "#B42318",
    marginTop: 10,
  },
  vazio: {
    textAlign: "center",
    padding: 20,
    color: "#78675D",
  },
  rodape: {
    textAlign: "center",
    color: "#6B3528",
    padding: 25,
  },
});
