
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const produtos = [
  {
    id: '1',
    nome: 'Brownie com Nutella',
    descricao: 'Chocolate intenso e recheio cremoso',
    preco: 12,
    emoji: '🍫',
    categoria: 'Brownies',
  },
  {
    id: '2',
    nome: 'Brownie de Morango',
    descricao: 'Chocolate com toque de morango',
    preco: 14,
    emoji: '🍓',
    categoria: 'Brownies',
  },
  {
    id: '3',
    nome: 'Brownie Tradicional',
    descricao: 'Casquinha crocante e centro macio',
    preco: 8,
    emoji: '🍪',
    categoria: 'Brownies',
  },
  {
    id: '4',
    nome: 'Combo Felicidade',
    descricao: 'Dois brownies para compartilhar',
    preco: 22,
    emoji: '🎁',
    categoria: 'Combos',
  },
  {
    id: '5',
    nome: 'Chocolate Gelado',
    descricao: 'Uma bebida para acompanhar',
    preco: 9,
    emoji: '🥤',
    categoria: 'Bebidas',
  },
  {
    id: '6',
    nome: 'Caixa Presente',
    descricao: 'Uma surpresa doce e especial',
    preco: 30,
    emoji: '🎀',
    categoria: 'Presentes',
  },
];

const marrom = '#65432F';
const fundo = '#FBF5ED';

const dinheiro = (valor) =>
  `R$ ${Number(valor || 0).toFixed(2).replace('.', ',')}`;

export default function Cardapio({
  cart = [],
  setCart,
  onOpenCart,
  onHome,
}) {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  const lista = produtos.filter((produto) =>
    (categoria === 'Todos' || produto.categoria === categoria) &&
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const quantidade = cart.reduce(
    (total, produto) =>
      total + Number(produto.quantidade || 0),
    0
  );

  const subtotal = cart.reduce(
    (total, produto) =>
      total +
      Number(produto.preco || 0) *
      Number(produto.quantidade || 0),
    0
  );

  function adicionar(produto) {
    if (!setCart) return;

    setCart((atual) => {
      const existente = atual.find(
        (item) => item.id === produto.id
      );

      if (existente) {
        return atual.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item
        );
      }

      return [
        ...atual,
        {
          ...produto,
          quantidade: 1,
        },
      ];
    });
  }

  return (
    <View style={styles.tela}>
      <View style={styles.topo}>
        <TouchableOpacity onPress={onHome}>
          <Text style={styles.marca}>✦ OURO DOCE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onOpenCart}
          style={styles.botaoTopoCarrinho}
        >
          <Text style={styles.iconeCarrinho}>
            🛍️ {quantidade}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.rolagem}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.chamada}>
          DOCES MOMENTOS COMEÇAM AQUI
        </Text>

        <Text style={styles.titulo}>
          Nosso cardápio
        </Text>

        <Text style={styles.descricao}>
          Explore à vontade. Você só precisa de uma conta
          para finalizar a compra.
        </Text>

        <TextInput
          style={styles.busca}
          placeholder="Buscar um doce..."
          placeholderTextColor="#927D6C"
          value={busca}
          onChangeText={setBusca}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.listaCategorias}
        >
          {[
            'Todos',
            'Brownies',
            'Combos',
            'Bebidas',
            'Presentes',
          ].map((categoriaItem) => (
            <TouchableOpacity
              key={categoriaItem}
              onPress={() => setCategoria(categoriaItem)}
              style={[
                styles.categoria,
                categoria === categoriaItem &&
                  styles.categoriaAtiva,
              ]}
            >
              <Text
                style={[
                  styles.textoCategoria,
                  categoria === categoriaItem &&
                    styles.textoCategoriaAtiva,
                ]}
              >
                {categoriaItem}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.grade}>
          {lista.map((produto) => (
            <View
              key={produto.id}
              style={styles.produto}
            >
              <View style={styles.imagemProduto}>
                <Text style={styles.emojiGrande}>
                  {produto.emoji}
                </Text>
              </View>

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

                <TouchableOpacity
                  style={styles.botaoAdicionar}
                  onPress={() => adicionar(produto)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.mais}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {lista.length === 0 && (
          <Text style={styles.vazio}>
            Não encontramos produtos com essa busca.
          </Text>
        )}

        <Text style={styles.rodape}>
          OURO DOCE · FEITO COM CARINHO ♡
        </Text>
      </ScrollView>

      {quantidade > 0 && (
        <TouchableOpacity
          style={styles.carrinhoFlutuante}
          onPress={onOpenCart}
          activeOpacity={0.9}
        >
          <Text style={styles.textoBotao}>
            Ver carrinho ({quantidade}) · {dinheiro(subtotal)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    minHeight: 0,
    backgroundColor: fundo,
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
  },

  topo: {
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E9DED2',
    backgroundColor: fundo,
  },

  marca: {
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 2,
    color: marrom,
  },

  botaoTopoCarrinho: {
    padding: 5,
  },

  iconeCarrinho: {
    fontSize: 17,
    color: marrom,
    fontWeight: 'bold',
  },

  rolagem: {
    flex: 1,
    minHeight: 0,
    width: '100%',
  },

  conteudo: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 110,
  },

  chamada: {
    color: '#B77B4B',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: 'bold',
    marginTop: 12,
  },

  titulo: {
    color: '#382419',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 8,
    marginBottom: 10,
  },

  descricao: {
    color: '#927D6C',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    marginBottom: 10,
  },

  busca: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9DED2',
    padding: 14,
    borderRadius: 13,
    marginVertical: 17,
    color: '#382419',
  },

  listaCategorias: {
    flexGrow: 0,
  },

  categoria: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E9DED2',
  },

  categoriaAtiva: {
    backgroundColor: marrom,
    borderColor: marrom,
  },

  textoCategoria: {
    color: marrom,
    fontSize: 12,
  },

  textoCategoriaAtiva: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  produto: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 11,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E9DED2',
  },

  imagemProduto: {
    backgroundColor: '#EAD7C0',
    borderRadius: 12,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  emojiGrande: {
    fontSize: 58,
  },

  nomeProduto: {
    color: '#382419',
    fontSize: 13,
    fontWeight: 'bold',
  },

  descricaoProduto: {
    color: '#927D6C',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5,
    minHeight: 32,
  },

  linhaPreco: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  preco: {
    color: marrom,
    fontWeight: '900',
    fontSize: 14,
  },

  botaoAdicionar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: marrom,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mais: {
    color: '#FFFFFF',
    fontSize: 23,
  },

  carrinhoFlutuante: {
    position: 'absolute',
    bottom: 15,
    left: 18,
    right: 18,
    padding: 16,
    backgroundColor: marrom,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 5,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },

  vazio: {
    color: '#927D6C',
    textAlign: 'center',
    padding: 25,
    lineHeight: 20,
  },

  rodape: {
    textAlign: 'center',
    color: '#927D6C',
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 30,
  },
});
