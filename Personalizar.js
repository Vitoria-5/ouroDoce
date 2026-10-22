import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';

import Personalizar from './Personalizar';

const C = {
  fundo: '#FBF5ED',
  branco: '#FFFFFF',
  marrom: '#65432F',
  escuro: '#382419',
  caramelo: '#B77B4B',
  bege: '#EAD7C0',
  texto: '#927D6C',
  borda: '#E9DED2',
};

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

function dinheiro(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

export default function Cardapio({
  logado,
  onRequireAuth,
  onLogin,
  onHome,
  cart,
  setCart,
}) {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const [verCarrinho, setVerCarrinho] = useState(false);
  const [verPersonalizacao, setVerPersonalizacao] = useState(false);

  const quantidade = cart.reduce((s, p) => s + p.quantidade, 0);
  const total = cart.reduce((s, p) => s + p.preco * p.quantidade, 0);

  const lista = produtos.filter((p) => {
    const correspondeCategoria =
      categoria === 'Todos' || p.categoria === categoria;
    const correspondeBusca =
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.descricao.toLowerCase().includes(busca.toLowerCase());

    return correspondeCategoria && correspondeBusca;
  });

  function adicionar(produto) {
    setCart((atual) => {
      const existente = atual.find((p) => p.id === produto.id);

      if (existente) {
        return atual.map((p) =>
          p.id === produto.id
            ? { ...p, quantidade: p.quantidade + 1 }
            : p
        );
      }

      return [...atual, { ...produto, quantidade: 1 }];
    });

    Alert.alert('Adicionado! 🤎', `${produto.nome} foi para o carrinho.`);
  }

  function adicionarPersonalizado(produto) {
    setCart((atual) => [...atual, produto]);
    setVerPersonalizacao(false);
    setVerCarrinho(true);

    Alert.alert(
      'Seu brownie está no carrinho! 🍫',
      'Sua combinação personalizada foi adicionada.'
    );
  }

  function finalizar() {
    if (cart.length === 0) {
      Alert.alert('Carrinho vazio', 'Escolha uma delícia antes de continuar.');
      return;
    }

    if (!logado) {
      Alert.alert(
        'Só falta criar sua conta! ♡',
        'Você pode explorar a loja sem cadastro. Para continuar com a compra, entre ou crie sua conta.',
        [
          { text: 'Continuar explorando', style: 'cancel' },
          { text: 'Criar conta', onPress: onRequireAuth },
          { text: 'Entrar', onPress: onLogin },
        ]
      );
      return;
    }

    Alert.alert(
      'Próxima etapa',
      'Você está conectado nesta demonstração. A próxima etapa será configurar endereço, entrega e pagamento.'
    );
  }

  function alterarQuantidade(id, variacao) {
    setCart((atual) =>
      atual
        .map((p) =>
          p.id === id
            ? { ...p, quantidade: p.quantidade + variacao }
            : p
        )
        .filter((p) => p.quantidade > 0)
    );
  }

  if (verPersonalizacao) {
    return (
      <Personalizar
        onBack={() => setVerPersonalizacao(false)}
        onAdd={adicionarPersonalizado}
      />
    );
  }

  return (
    <View style={s.tela}>
      <StatusBar barStyle="dark-content" backgroundColor={C.fundo} />

      <View style={s.topo}>
        <TouchableOpacity onPress={onHome}>
          <Text style={s.marca}>✦ OURO DOCE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.botaoTopo}
          onPress={() => setVerCarrinho(!verCarrinho)}
        >
          <Text style={s.iconeCarrinho}>🛍️ {quantidade}</Text>
        </TouchableOpacity>
      </View>

      {verCarrinho ? (
        <ScrollView contentContainerStyle={s.conteudo}>
          <TouchableOpacity onPress={() => setVerCarrinho(false)}>
            <Text style={s.voltar}>← Voltar ao cardápio</Text>
          </TouchableOpacity>

          <Text style={s.titulo}>Meu carrinho</Text>
          <Text style={s.subtitulo}>Confira suas escolhas.</Text>

          {cart.length === 0 ? (
            <View style={s.vazio}>
              <Text style={s.emojiVazio}>🛍️</Text>
              <Text style={s.nomeProduto}>Seu carrinho está vazio</Text>
              <Text style={s.descricao}>Vamos escolher algo delicioso?</Text>
              <TouchableOpacity
                style={s.botaoPrincipal}
                onPress={() => setVerCarrinho(false)}
              >
                <Text style={s.textoBotao}>Explorar cardápio</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {cart.map((p) => (
                <View key={p.id} style={s.itemCarrinho}>
                  <Text style={s.emojiItem}>{p.emoji || '🍫'}</Text>

                  <View style={{ flex: 1 }}>
                    <Text style={s.nomeProduto}>{p.nome}</Text>
                    <Text style={s.descricao}>
                      {p.quantidade} × {dinheiro(p.preco)}
                    </Text>

                    {p.personalizado && (
                      <Text style={s.detalhes}>
                        {p.detalhes.join('\n')}
                      </Text>
                    )}
                  </View>

                  <View style={s.quantidadeControles}>
                    <TouchableOpacity
                      style={s.botaoQuantidade}
                      onPress={() => alterarQuantidade(p.id, -1)}
                    >
                      <Text style={s.textoQuantidade}>−</Text>
                    </TouchableOpacity>

                    <Text style={s.quantidadeTexto}>{p.quantidade}</Text>

                    <TouchableOpacity
                      style={s.botaoQuantidade}
                      onPress={() => alterarQuantidade(p.id, 1)}
                    >
                      <Text style={s.textoQuantidade}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              <View style={s.linhaTotal}>
                <Text style={s.totalTexto}>Total parcial</Text>
                <Text style={s.totalValor}>{dinheiro(total)}</Text>
              </View>

              <Text style={s.aviso}>
                A entrega e o pagamento serão calculados na finalização.
              </Text>

              <TouchableOpacity style={s.botaoPrincipal} onPress={finalizar}>
                <Text style={s.textoBotao}>Continuar para a compra →</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={s.botaoSecundario}
                onPress={() => setVerCarrinho(false)}
              >
                <Text style={s.textoSecundario}>Continuar comprando</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={s.conteudo}>
          <Text style={s.chamada}>DOCES MOMENTOS COMEÇAM AQUI</Text>
          <Text style={s.titulo}>Nosso cardápio</Text>
          <Text style={s.subtitulo}>
            Explore à vontade. O cadastro só é necessário para comprar.
          </Text>

          <TextInput
            style={s.busca}
            placeholder="Buscar um doce..."
            placeholderTextColor={C.texto}
            value={busca}
            onChangeText={setBusca}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.categorias}
          >
            {['Todos', 'Brownies', 'Combos', 'Bebidas', 'Presentes'].map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => setCategoria(c)}
                style={[s.categoria, categoria === c && s.categoriaAtiva]}
              >
                <Text
                  style={[
                    s.textoCategoria,
                    categoria === c && s.textoCategoriaAtiva,
                  ]}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={s.banner}
            onPress={() => setVerPersonalizacao(true)}
          >
            <Text style={s.bannerEmoji}>🎨</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.bannerTitulo}>Crie seu brownie perfeito</Text>
              <Text style={s.bannerDescricao}>
                Escolha massa, recheio, cobertura e adicionais.
              </Text>
              <Text style={s.bannerLink}>PERSONALIZAR AGORA →</Text>
            </View>
          </TouchableOpacity>

          <View style={s.tituloProdutos}>
            <Text style={s.tituloSecao}>Nossas delícias</Text>
            <Text style={s.contagem}>{lista.length} produtos</Text>
          </View>

          <View style={s.grade}>
            {lista.map((p) => (
              <View key={p.id} style={s.produto}>
                <View style={s.imagemProduto}>
                  <Text style={s.emojiGrande}>{p.emoji}</Text>
                </View>

                <Text style={s.nomeProduto}>{p.nome}</Text>
                <Text style={s.descricao}>{p.descricao}</Text>

                <View style={s.linhaPreco}>
                  <Text style={s.preco}>{dinheiro(p.preco)}</Text>
                  <TouchableOpacity
                    style={s.botaoAdicionar}
                    onPress={() => adicionar(p)}
                  >
                    <Text style={s.mais}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {lista.length === 0 && (
            <Text style={s.vazioTexto}>
              Não encontramos produtos com essa busca.
            </Text>
          )}

          <Text style={s.rodape}>OURO DOCE · FEITO COM CARINHO ♡</Text>
        </ScrollView>
      )}

      {quantidade > 0 && !verCarrinho && (
        <TouchableOpacity
          style={s.carrinhoFlutuante}
          onPress={() => setVerCarrinho(true)}
        >
          <Text style={s.textoBotao}>
            Ver carrinho ({quantidade}) · {dinheiro(total)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: C.fundo,
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
  },
  topo: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: C.borda,
  },
  marca: { fontSize: 18, fontWeight: '900', letterSpacing: 2, color: C.marrom },
  botaoTopo: {
    backgroundColor: C.branco,
    borderWidth: 1,
    borderColor: C.borda,
    padding: 10,
    borderRadius: 12,
  },
  iconeCarrinho: { fontSize: 15, color: C.marrom },
  conteudo: { padding: 20, paddingBottom: 110 },
  chamada: { color: C.caramelo, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginTop: 8 },
  titulo: { color: C.escuro, fontSize: 28, fontWeight: '900', marginTop: 8 },
  subtitulo: { color: C.texto, fontSize: 12, lineHeight: 19, marginTop: 7, marginBottom: 15 },
  busca: {
    backgroundColor: C.branco,
    borderWidth: 1,
    borderColor: C.borda,
    padding: 14,
    borderRadius: 13,
    marginVertical: 12,
    color: C.escuro,
  },
  categorias: { paddingVertical: 8, gap: 8 },
  categoria: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: C.branco,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.borda,
  },
  categoriaAtiva: { backgroundColor: C.marrom, borderColor: C.marrom },
  textoCategoria: { color: C.marrom, fontSize: 12 },
  textoCategoriaAtiva: { color: C.branco, fontWeight: 'bold' },
  banner: {
    backgroundColor: C.bege,
    borderRadius: 18,
    padding: 17,
    marginTop: 20,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  bannerEmoji: { fontSize: 37 },
  bannerTitulo: { color: C.escuro, fontSize: 15, fontWeight: 'bold' },
  bannerDescricao: { color: C.texto, fontSize: 11, lineHeight: 16, marginTop: 5 },
  bannerLink: { color: C.marrom, fontSize: 10, fontWeight: '900', marginTop: 10, letterSpacing: 0.5 },
  tituloProdutos: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  tituloSecao: { color: C.escuro, fontSize: 19, fontWeight: 'bold' },
  contagem: { color: C.texto, fontSize: 11 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  produto: {
    width: '48%',
    backgroundColor: C.branco,
    borderRadius: 16,
    padding: 11,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: C.borda,
  },
  imagemProduto: {
    backgroundColor: C.bege,
    borderRadius: 12,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  emojiGrande: { fontSize: 58 },
  nomeProduto: { color: C.escuro, fontSize: 13, fontWeight: 'bold' },
  descricao: { color: C.texto, fontSize: 11, lineHeight: 16, marginTop: 5 },
  linhaPreco: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  preco: { color: C.marrom, fontWeight: '900', fontSize: 14 },
  botaoAdicionar: { width: 32, height: 32, borderRadius: 10, backgroundColor: C.marrom, alignItems: 'center', justifyContent: 'center' },
  mais: { color: C.branco, fontSize: 23 },
  vazio: { backgroundColor: C.branco, padding: 24, borderRadius: 15, alignItems: 'center', marginTop: 20 },
  emojiVazio: { fontSize: 42, marginBottom: 12 },
  vazioTexto: { color: C.texto, textAlign: 'center', padding: 20 },
  itemCarrinho: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, backgroundColor: C.branco, borderRadius: 14, marginTop: 10, borderWidth: 1, borderColor: C.borda },
  emojiItem: { fontSize: 30 },
  detalhes: { color: C.texto, fontSize: 10, lineHeight: 15, marginTop: 5 },
  quantidadeControles: { alignItems: 'center', gap: 5 },
  botaoQuantidade: { width: 27, height: 27, borderRadius: 8, backgroundColor: C.bege, alignItems: 'center', justifyContent: 'center' },
  textoQuantidade: { color: C.marrom, fontSize: 13, fontWeight: 'bold' },
  linhaTotal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: C.borda, paddingTop: 18, marginTop: 18 },
  totalTexto: { color: C.escuro, fontSize: 15, fontWeight: 'bold' },
  totalValor: { color: C.marrom, fontSize: 21, fontWeight: '900' },
  aviso: { color: C.texto, fontSize: 11, lineHeight: 17, marginTop: 12 },
  botaoPrincipal: { backgroundColor: C.marrom, padding: 16, borderRadius: 13, alignItems: 'center', marginTop: 18 },
  textoBotao: { color: C.branco, fontWeight: 'bold', fontSize: 13, textAlign: 'center' },
  botaoSecundario: { borderWidth: 1, borderColor: C.marrom, padding: 14, borderRadius: 13, alignItems: 'center', marginTop: 10 },
  textoSecundario: { color: C.marrom, fontWeight: 'bold', fontSize: 13 },
  voltar: { color: C.marrom, marginBottom: 12, fontSize: 13 },
  carrinhoFlutuante: { position: 'absolute', bottom: 12, left: 18, right: 18, padding: 16, backgroundColor: C.marrom, borderRadius: 14, alignItems: 'center' },
  rodape: { textAlign: 'center', color: C.texto, fontSize: 10, letterSpacing: 2, marginTop: 30 },
});