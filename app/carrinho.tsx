
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCarrinho, dinheiro } from '../context/CarrinhoContext';

export default function CarrinhoScreen() {
  const router = useRouter();

  const {
    itens,
    alterarQuantidade,
    remover,
    subtotal,
  } = useCarrinho();

  const total = typeof subtotal === 'function' ? subtotal() : subtotal;

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Pressable onPress={() => router.back()} style={styles.voltar}>
          <Text style={styles.voltarTexto}>‹</Text>
        </Pressable>

        <View>
          <Text style={styles.titulo}>Meu carrinho 🛒</Text>
          <Text style={styles.subtitulo}>
            Seus docinhos favoritos
          </Text>
        </View>
      </View>

      {itens.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.emojiVazio}>🍯</Text>
          <Text style={styles.vazioTitulo}>
            Seu carrinho está vazio!
          </Text>
          <Text style={styles.vazioTexto}>
            Que tal escolher algumas delícias do Ouro Doce?
          </Text>

          <Pressable
            style={styles.botaoPrincipal}
            onPress={() => router.push('/')}
          >
            <Text style={styles.botaoPrincipalTexto}>
              Ver cardápio
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.lista}
            contentContainerStyle={styles.listaConteudo}
            showsVerticalScrollIndicator={false}
          >
            {itens.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.emojiCaixa}>
                  <Text style={styles.emoji}>
                    {item.emoji || '🍰'}
                  </Text>
                </View>

                <View style={styles.detalhes}>
                  <Text style={styles.nome}>{item.nome}</Text>

                  {!!item.descricao && (
                    <Text style={styles.descricao}>
                      {item.descricao}
                    </Text>
                  )}

                  <Text style={styles.preco}>
                    {dinheiro(item.preco)}
                  </Text>

                  <View style={styles.acoes}>
                    <View style={styles.quantidade}>
                      <Pressable
                        style={styles.controle}
                        onPress={() => {
                          if (item.quantidade > 1) {
                            alterarQuantidade(
                              item.id,
                              item.quantidade - 1
                            );
                          } else {
                            remover(item.id);
                          }
                        }}
                      >
                        <Text style={styles.controleTexto}>−</Text>
                      </Pressable>

                      <Text style={styles.numero}>
                        {item.quantidade}
                      </Text>

                      <Pressable
                        style={styles.controle}
                        onPress={() =>
                          alterarQuantidade(
                            item.id,
                            item.quantidade + 1
                          )
                        }
                      >
                        <Text style={styles.controleTexto}>+</Text>
                      </Pressable>
                    </View>

                    <Pressable
                      onPress={() =>
                        Alert.alert(
                          'Remover produto',
                          `Deseja remover ${item.nome} do carrinho?`,
                          [
                            {
                              text: 'Cancelar',
                              style: 'cancel',
                            },
                            {
                              text: 'Remover',
                              style: 'destructive',
                              onPress: () => remover(item.id),
                            },
                          ]
                        )
                      }
                    >
                      <Text style={styles.remover}>Remover</Text>
                    </Pressable>
                  </View>
                </View>

                <Text style={styles.totalItem}>
                  {dinheiro(item.preco * item.quantidade)}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.resumo}>
            <View style={styles.linhaResumo}>
              <Text style={styles.resumoLabel}>Subtotal</Text>
              <Text style={styles.resumoValor}>
                {dinheiro(total)}
              </Text>
            </View>

            <Text style={styles.aviso}>
              A entrega será calculada na próxima etapa.
            </Text>

            <Pressable
              style={styles.botaoPrincipal}
              onPress={() => router.push('/entrega')}
            >
              <Text style={styles.botaoPrincipalTexto}>
                Continuar para entrega →
              </Text>
            </Pressable>

            <Pressable
              style={styles.botaoSecundario}
              onPress={() => router.push('/')}
            >
              <Text style={styles.botaoSecundarioTexto}>
                Continuar comprando
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFF1D9',
  },
  voltar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  voltarTexto: {
    fontSize: 34,
    color: '#75421F',
    lineHeight: 38,
  },
  titulo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#75421F',
  },
  subtitulo: {
    marginTop: 3,
    fontSize: 13,
    color: '#99724F',
  },
  lista: {
    flex: 1,
  },
  listaConteudo: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 13,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#F2E1CB',
  },
  emojiCaixa: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#FFF1D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  emoji: {
    fontSize: 28,
  },
  detalhes: {
    flex: 1,
  },
  nome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#60391F',
  },
  descricao: {
    fontSize: 12,
    color: '#9A806B',
    marginTop: 4,
  },
  preco: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B87532',
    marginTop: 6,
  },
  acoes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    flexWrap: 'wrap',
    gap: 8,
  },
  quantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF6E9',
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  controle: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#F5D9B5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controleTexto: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#75421F',
  },
  numero: {
    minWidth: 29,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#60391F',
  },
  remover: {
    color: '#B84D3D',
    fontSize: 12,
    fontWeight: '600',
  },
  totalItem: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#75421F',
    marginLeft: 5,
  },
  resumo: {
    padding: 20,
    paddingBottom: 28,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0DFC9',
  },
  linhaResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resumoLabel: {
    fontSize: 16,
    color: '#75421F',
  },
  resumoValor: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#75421F',
  },
  aviso: {
    fontSize: 12,
    color: '#9A806B',
    marginTop: 8,
    marginBottom: 15,
  },
  botaoPrincipal: {
    backgroundColor: '#A96832',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 4,
  },
  botaoPrincipalTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  botaoSecundario: {
    paddingVertical: 13,
    alignItems: 'center',
  },
  botaoSecundarioTexto: {
    color: '#8B572F',
    fontSize: 14,
    fontWeight: '600',
  },
  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  emojiVazio: {
    fontSize: 65,
    marginBottom: 18,
  },
  vazioTitulo: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#75421F',
    textAlign: 'center',
  },
  vazioTexto: {
    fontSize: 14,
    color: '#99724F',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 21,
  },
});
