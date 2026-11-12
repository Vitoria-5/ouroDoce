
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CORES = {
  fundo: '#FBF5ED',
  marrom: '#65432F',
  escuro: '#382419',
  caramelo: '#B77B4B',
  bege: '#EAD7C0',
  branco: '#FFFFFF',
  borda: '#E9DED2',
  texto: '#927D6C',
};

const dinheiro = (valor = 0) =>
  `R$ ${Number(valor).toFixed(2).replace('.', ',')}`;

export default function Carrinho({
  cart = [],
  setCart,
  onVoltar,
  onContinuar,
}) {
  const quantidadeTotal = cart.reduce(
    (total, item) => total + Number(item.quantidade || 0),
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.preco || 0) *
      Number(item.quantidade || 0),
    0
  );

  function alterarQuantidade(id, diferenca) {
    if (!setCart) return;

    setCart((atual) =>
      atual
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantidade: Number(item.quantidade || 0) + diferenca,
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function removerItem(id) {
    if (!setCart) return;

    setCart((atual) =>
      atual.filter((item) => item.id !== id)
    );
  }

  return (
    <View style={styles.tela}>
      <View style={styles.topo}>
        <Text style={styles.marca}>✦ OURO DOCE</Text>

        <Text style={styles.contador}>
          🛍️ {quantidadeTotal}
        </Text>
      </View>

      <ScrollView
        style={styles.rolagem}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={onVoltar}
          style={styles.voltarArea}
        >
          <Text style={styles.voltar}>
            ← Voltar ao cardápio
          </Text>
        </TouchableOpacity>

        <Text style={styles.chamada}>
          SEUS DOCES FAVORITOS
        </Text>

        <Text style={styles.titulo}>
          Meu carrinho
        </Text>

        <Text style={styles.descricao}>
          Confira seus produtos e ajuste as quantidades
          antes de continuar.
        </Text>

        {cart.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={styles.vazioEmoji}>🛍️</Text>

            <Text style={styles.vazioTitulo}>
              Seu carrinho está vazio
            </Text>

            <Text style={styles.descricaoVazio}>
              Que tal escolher um brownie delicioso
              no nosso cardápio?
            </Text>

            <TouchableOpacity
              style={styles.botaoPrincipal}
              onPress={onVoltar}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBotao}>
                Ver cardápio
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {cart.map((item) => (
              <View key={item.id} style={styles.item}>
                <View style={styles.iconeProduto}>
                  <Text style={styles.emoji}>
                    {item.emoji || '🍫'}
                  </Text>
                </View>

                <View style={styles.informacoes}>
                  <Text style={styles.nomeProduto}>
                    {item.nome}
                  </Text>

                  <Text style={styles.precoUnitario}>
                    {dinheiro(item.preco)} cada
                  </Text>

                  <Text style={styles.precoItem}>
                    {dinheiro(
                      Number(item.preco || 0) *
                      Number(item.quantidade || 0)
                    )}
                  </Text>
                </View>

                <View style={styles.controles}>
                  <TouchableOpacity
                    style={styles.botaoQuantidade}
                    onPress={() =>
                      alterarQuantidade(item.id, -1)
                    }
                  >
                    <Text style={styles.sinal}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.quantidade}>
                    {item.quantidade}
                  </Text>

                  <TouchableOpacity
                    style={styles.botaoQuantidade}
                    onPress={() =>
                      alterarQuantidade(item.id, 1)
                    }
                  >
                    <Text style={styles.sinal}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => removerItem(item.id)}
                  style={styles.remover}
                >
                  <Text style={styles.textoRemover}>
                    Remover
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.resumo}>
              <View style={styles.linhaResumo}>
                <Text style={styles.rotuloResumo}>
                  Quantidade de itens
                </Text>

                <Text style={styles.valorResumo}>
                  {quantidadeTotal}
                </Text>
              </View>

              <View style={styles.linhaTotal}>
                <Text style={styles.subtotalTexto}>
                  Subtotal
                </Text>

                <Text style={styles.subtotalValor}>
                  {dinheiro(subtotal)}
                </Text>
              </View>

              <Text style={styles.aviso}>
                A taxa de entrega será calculada na
                próxima etapa.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botaoPrincipal}
              onPress={onContinuar}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBotao}>
                Continuar para a entrega →
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoSecundario}
              onPress={onVoltar}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBotaoSecundario}>
                Adicionar mais produtos
              </Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.rodape}>
          OURO DOCE · FEITO COM CARINHO ♡
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    minHeight: 0,
    width: '100%',
    backgroundColor: CORES.fundo,
  },

  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 16,
    backgroundColor: CORES.fundo,
    borderBottomWidth: 1,
    borderColor: CORES.borda,
    flexShrink: 0,
  },

  marca: {
    color: CORES.escuro,
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 3,
  },

  contador: {
    color: CORES.marrom,
    fontWeight: 'bold',
    fontSize: 16,
  },

  rolagem: {
    flex: 1,
    minHeight: 0,
    width: '100%',
  },

  conteudo: {
    flexGrow: 1,
    padding: 22,
    paddingBottom: 36,
  },

  voltarArea: {
    alignSelf: 'flex-start',
    marginBottom: 18,
  },

  voltar: {
    color: CORES.marrom,
    fontSize: 14,
  },

  chamada: {
    color: CORES.caramelo,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 5,
  },

  titulo: {
    color: CORES.escuro,
    fontSize: 29,
    fontWeight: '900',
    marginTop: 8,
    marginBottom: 5,
  },

  descricao: {
    color: CORES.texto,
    fontSize: 12,
    lineHeight: 19,
    marginBottom: 18,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: CORES.branco,
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: CORES.borda,
  },

  iconeProduto: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: CORES.bege,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  emoji: {
    fontSize: 30,
  },

  informacoes: {
    flex: 1,
    minWidth: 100,
  },

  nomeProduto: {
    color: CORES.escuro,
    fontSize: 13,
    fontWeight: 'bold',
  },

  precoUnitario: {
    color: CORES.texto,
    fontSize: 11,
    marginTop: 4,
  },

  precoItem: {
    color: CORES.marrom,
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 5,
  },

  controles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },

  botaoQuantidade: {
    width: 29,
    height: 29,
    borderRadius: 9,
    backgroundColor: CORES.bege,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sinal: {
    color: CORES.marrom,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 23,
  },

  quantidade: {
    color: CORES.escuro,
    fontWeight: 'bold',
    fontSize: 13,
    minWidth: 25,
    textAlign: 'center',
  },

  remover: {
    marginLeft: 69,
    marginTop: 8,
    paddingVertical: 3,
  },

  textoRemover: {
    color: '#A34F3D',
    fontSize: 11,
    fontWeight: '600',
  },

  resumo: {
    backgroundColor: CORES.branco,
    borderRadius: 15,
    padding: 17,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: CORES.borda,
  },

  linhaResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },

  rotuloResumo: {
    color: CORES.texto,
    fontSize: 12,
  },

  valorResumo: {
    color: CORES.escuro,
    fontSize: 12,
    fontWeight: 'bold',
  },

  linhaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: CORES.borda,
    paddingTop: 13,
  },

  subtotalTexto: {
    color: CORES.escuro,
    fontSize: 16,
    fontWeight: 'bold',
  },

  subtotalValor: {
    color: CORES.marrom,
    fontSize: 18,
    fontWeight: '900',
  },

  aviso: {
    color: CORES.texto,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 12,
  },

  botaoPrincipal: {
    width: '100%',
    backgroundColor: CORES.marrom,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 3,
  },

  textoBotao: {
    color: CORES.branco,
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },

  botaoSecundario: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: CORES.marrom,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBotaoSecundario: {
    color: CORES.marrom,
    fontWeight: 'bold',
    fontSize: 13,
  },

  vazio: {
    backgroundColor: CORES.branco,
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: CORES.borda,
  },

  vazioEmoji: {
    fontSize: 54,
    marginBottom: 12,
  },

  vazioTitulo: {
    color: CORES.escuro,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  descricaoVazio: {
    color: CORES.texto,
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 9,
    marginBottom: 18,
  },

  rodape: {
    color: '#A79789',
    fontSize: 9,
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 30,
  },
});
