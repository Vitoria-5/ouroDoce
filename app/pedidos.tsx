
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";

const marrom = "#603D25";

const etapas = [
  {
    titulo: "Pedido recebido",
    descricao: "Recebemos seu pedido com carinho!",
    emoji: "📝",
  },
  {
    titulo: "Preparando seu brownie",
    descricao: "Nosso time está preparando sua delícia.",
    emoji: "🍫",
  },
  {
    titulo: "Pedido sendo embalado",
    descricao: "Estamos deixando tudo pronto para você.",
    emoji: "🎁",
  },
  {
    titulo: "Saiu para entrega",
    descricao: "Nosso entregador está a caminho!",
    emoji: "🛵",
  },
  {
    titulo: "Pedido entregue",
    descricao: "Agora é só aproveitar cada pedacinho!",
    emoji: "💛",
  },
];

const historicoExemplo = [
  {
    numero: "#OD1024",
    produto: "Brownie com Nutella",
    data: "Hoje, 14:20",
    status: "Em preparo",
    valor: "R$ 17,00",
    etapa: 1,
  },
  {
    numero: "#OD1023",
    produto: "Brownie tradicional",
    data: "Ontem, 18:45",
    status: "Entregue",
    valor: "R$ 13,00",
    etapa: 4,
  },
];

export default function PedidosScreen() {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [pedidoSelecionado, setPedidoSelecionado] = useState("#OD1024");

  const pedidoAtual = historicoExemplo.find(
    (pedido) => pedido.numero === pedidoSelecionado
  )!;

  const etapaVisual = pedidoSelecionado === "#OD1023" ? 4 : etapaAtual;

  function avancarEtapa() {
    if (etapaAtual < 4) {
      setEtapaAtual((atual) => atual + 1);
    } else {
      setEtapaAtual(0);
      setPedidoSelecionado("#OD1024");
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <Text style={styles.miniTitulo}>ESTAMOS CUIDANDO DE TUDO</Text>
        <Text style={styles.titulo}>Meus pedidos 📦</Text>
        <Text style={styles.subtitulo}>
          Acompanhe cada etapa até a primeira mordida.
        </Text>

        <View style={styles.abas}>
          {[
            { id: "#OD1024", texto: "Pedido atual" },
            { id: "#OD1023", texto: "Pedido anterior" },
          ].map((aba) => (
            <Pressable
              key={aba.id}
              onPress={() => setPedidoSelecionado(aba.id)}
              style={[
                styles.aba,
                pedidoSelecionado === aba.id && styles.abaAtiva,
              ]}
            >
              <Text
                style={[
                  styles.abaTexto,
                  pedidoSelecionado === aba.id && styles.abaTextoAtivo,
                ]}
              >
                {aba.texto}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.cartaoPedido}>
          <View style={styles.linhaPedido}>
            <View>
              <Text style={styles.rotulo}>NÚMERO DO PEDIDO</Text>
              <Text style={styles.numeroPedido}>
                {pedidoAtual.numero}
              </Text>
            </View>

            <View
              style={[
                styles.statusPill,
                pedidoSelecionado === "#OD1023" && styles.statusEntregue,
              ]}
            >
              <Text style={styles.statusTexto}>
                {pedidoSelecionado === "#OD1023"
                  ? "✓ Entregue"
                  : "● Em preparo"}
              </Text>
            </View>
          </View>

          <View style={styles.divisor} />

          <View style={styles.linhaProduto}>
            <View style={styles.produtoEmoji}>
              <Text style={styles.emoji}>🍫</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.nomeProduto}>
                {pedidoAtual.produto}
              </Text>
              <Text style={styles.data}>{pedidoAtual.data}</Text>
            </View>

            <Text style={styles.valor}>{pedidoAtual.valor}</Text>
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>
            Acompanhe seu pedido
          </Text>
          <Text style={styles.descricaoSecao}>
            Veja o caminho da sua delícia em tempo real.
          </Text>

          <View style={styles.progressoCard}>
            <View style={styles.progressoCabecalho}>
              <View style={styles.progressoIcone}>
                <Text style={styles.progressoEmoji}>
                  {etapas[etapaVisual].emoji}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.progressoRotulo}>
                  STATUS DO PEDIDO
                </Text>
                <Text style={styles.progressoTitulo}>
                  {etapas[etapaVisual].titulo}
                </Text>
                <Text style={styles.progressoDescricao}>
                  {etapas[etapaVisual].descricao}
                </Text>
              </View>
            </View>

            <View style={styles.linhaTempo}>
              {etapas.map((etapa, indice) => {
                const concluida = indice <= etapaVisual;
                const atual = indice === etapaVisual;

                return (
                  <View key={etapa.titulo} style={styles.etapa}>
                    <View style={styles.trilho}>
                      <View
                        style={[
                          styles.bolinha,
                          concluida && styles.bolinhaConcluida,
                          atual && styles.bolinhaAtual,
                        ]}
                      >
                        <Text
                          style={[
                            styles.bolinhaTexto,
                            concluida && styles.bolinhaTextoAtivo,
                          ]}
                        >
                          {indice < etapaVisual ? "✓" : indice + 1}
                        </Text>
                      </View>

                      {indice < etapas.length - 1 && (
                        <View
                          style={[
                            styles.linha,
                            indice < etapaVisual && styles.linhaConcluida,
                          ]}
                        />
                      )}
                    </View>

                    <View style={styles.etapaTexto}>
                      <Text
                        style={[
                          styles.etapaTitulo,
                          concluida && styles.etapaTituloAtivo,
                        ]}
                      >
                        {etapa.titulo}
                      </Text>
                      <Text style={styles.etapaDescricao}>
                        {etapa.descricao}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {pedidoSelecionado === "#OD1024" && (
              <Pressable
                onPress={avancarEtapa}
                style={styles.botaoSimular}
              >
                <Text style={styles.botaoSimularTexto}>
                  {etapaAtual < 4
                    ? "Simular próxima etapa →"
                    : "Reiniciar demonstração ↻"}
                </Text>
              </Pressable>
            )}

            <Text style={styles.aviso}>
              Demonstração: as etapas são simuladas no aplicativo.
              Não representam um pedido real.
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>
            Acompanhe a entrega 🛵
          </Text>
          <Text style={styles.descricaoSecao}>
            Uma prévia ilustrativa do trajeto do entregador.
          </Text>

          <View style={styles.mapa}>
            <View style={styles.ruaHorizontal} />
            <View style={styles.ruaHorizontal2} />
            <View style={styles.ruaVertical} />
            <View style={styles.ruaVertical2} />

            <View style={styles.parque}>
              <Text style={styles.parqueEmoji}>🌳</Text>
              <Text style={styles.parqueEmoji}>🌳</Text>
            </View>

            <View style={styles.rota}>
              <View style={styles.rotaTrecho1} />
              <View style={styles.rotaTrecho2} />
              <View style={styles.rotaTrecho3} />
            </View>

            <View style={styles.pinoLoja}>
              <Text style={styles.pinoEmoji}>🏪</Text>
            </View>

            <View style={styles.pinoCasa}>
              <Text style={styles.pinoEmoji}>🏠</Text>
            </View>

            <View style={styles.pinoMoto}>
              <Text style={styles.pinoMotoEmoji}>🛵</Text>
            </View>

            <View style={styles.legendaMapa}>
              <Text style={styles.legendaTexto}>
                🏪 Loja
              </Text>
              <Text style={styles.legendaTexto}>
                🛵 Entregador
              </Text>
              <Text style={styles.legendaTexto}>
                🏠 Destino
              </Text>
            </View>
          </View>

          <View style={styles.avisoMapa}>
            <Text style={styles.avisoMapaEmoji}>📍</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.avisoMapaTitulo}>
                Mapa ilustrativo
              </Text>
              <Text style={styles.avisoMapaTexto}>
                A localização e o trajeto reais precisarão ser
                conectados a um serviço de mapas e à localização
                compartilhada pelo entregador.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Seus pedidos anteriores</Text>

          {historicoExemplo.map((pedido) => (
            <Pressable
              key={pedido.numero}
              onPress={() => setPedidoSelecionado(pedido.numero)}
              style={styles.historico}
            >
              <View style={styles.historicoIcone}>
                <Text style={styles.emoji}>🍫</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.historicoNumero}>
                  {pedido.numero}
                </Text>
                <Text style={styles.historicoProduto}>
                  {pedido.produto}
                </Text>
                <Text style={styles.historicoData}>{pedido.data}</Text>
              </View>

              <View style={styles.historicoDireita}>
                <Text style={styles.historicoValor}>
                  {pedido.valor}
                </Text>
                <Text
                  style={[
                    styles.historicoStatus,
                    pedido.status === "Entregue" && styles.textoEntregue,
                  ]}
                >
                  {pedido.status}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.rodape}>
          <Text style={styles.rodapeTitulo}>OURO DOCE ✨</Text>
          <Text style={styles.rodapeTexto}>
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
  },
  conteudo: {
    padding: 20,
    paddingTop: 27,
    paddingBottom: 35,
  },
  miniTitulo: {
    color: "#A47743",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  titulo: {
    color: marrom,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 7,
  },
  subtitulo: {
    color: "#927D6B",
    fontSize: 12,
    marginTop: 6,
  },
  abas: {
    flexDirection: "row",
    backgroundColor: "#F1E4D3",
    borderRadius: 13,
    padding: 4,
    marginTop: 22,
  },
  aba: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 11,
    borderRadius: 10,
  },
  abaAtiva: {
    backgroundColor: "#FFFFFF",
  },
  abaTexto: {
    color: "#927D6B",
    fontSize: 11,
    fontWeight: "700",
  },
  abaTextoAtivo: {
    color: marrom,
  },
  cartaoPedido: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0E5D8",
    borderRadius: 18,
    padding: 16,
    marginTop: 16,
  },
  linhaPedido: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  rotulo: {
    color: "#927D6B",
    fontSize: 9,
    fontWeight: "800",
  },
  numeroPedido: {
    color: marrom,
    fontSize: 19,
    fontWeight: "900",
    marginTop: 5,
  },
  statusPill: {
    backgroundColor: "#F9E9C9",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },
  statusEntregue: {
    backgroundColor: "#E0ECDD",
  },
  statusTexto: {
    color: marrom,
    fontSize: 10,
    fontWeight: "800",
  },
  divisor: {
    height: 1,
    backgroundColor: "#F0E5D8",
    marginVertical: 14,
  },
  linhaProduto: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  produtoEmoji: {
    width: 51,
    height: 51,
    backgroundColor: "#F2E3D0",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 27,
  },
  nomeProduto: {
    color: marrom,
    fontSize: 12,
    fontWeight: "900",
  },
  data: {
    color: "#927D6B",
    fontSize: 10,
    marginTop: 5,
  },
  valor: {
    color: marrom,
    fontWeight: "900",
    fontSize: 12,
  },
  secao: {
    marginTop: 27,
  },
  tituloSecao: {
    color: marrom,
    fontSize: 18,
    fontWeight: "900",
  },
  descricaoSecao: {
    color: "#927D6B",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
    marginBottom: 13,
  },
  progressoCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0E5D8",
    borderRadius: 19,
    padding: 16,
  },
  progressoCabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F8EDDE",
    padding: 13,
    borderRadius: 14,
  },
  progressoIcone: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: "#EAD7B9",
    alignItems: "center",
    justifyContent: "center",
  },
  progressoEmoji: {
    fontSize: 26,
  },
  progressoRotulo: {
    color: "#A47743",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
  },
  progressoTitulo: {
    color: marrom,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 4,
  },
  progressoDescricao: {
    color: "#927D6B",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },
  linhaTempo: {
    marginTop: 23,
  },
  etapa: {
    flexDirection: "row",
    minHeight: 69,
  },
  trilho: {
    width: 35,
    alignItems: "center",
  },
  bolinha: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#DCCBB8",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  bolinhaConcluida: {
    backgroundColor: "#603D25",
    borderColor: "#603D25",
  },
  bolinhaAtual: {
    borderWidth: 3,
    borderColor: "#E9C78D",
  },
  bolinhaTexto: {
    color: "#927D6B",
    fontSize: 10,
    fontWeight: "900",
  },
  bolinhaTextoAtivo: {
    color: "#FFFFFF",
  },
  linha: {
    position: "absolute",
    width: 2,
    height: 43,
    top: 26,
    backgroundColor: "#E8D9C7",
  },
  linhaConcluida: {
    backgroundColor: "#603D25",
  },
  etapaTexto: {
    flex: 1,
    paddingLeft: 8,
    paddingBottom: 17,
  },
  etapaTitulo: {
    color: "#A89582",
    fontSize: 12,
    fontWeight: "700",
  },
  etapaTituloAtivo: {
    color: marrom,
    fontWeight: "900",
  },
  etapaDescricao: {
    color: "#927D6B",
    fontSize: 10,
    marginTop: 4,
    lineHeight: 15,
  },
  botaoSimular: {
    backgroundColor: marrom,
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 7,
  },
  botaoSimularTexto: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },
  aviso: {
    color: "#927D6B",
    fontSize: 9,
    lineHeight: 14,
    textAlign: "center",
    marginTop: 12,
  },
  mapa: {
    height: 230,
    borderRadius: 19,
    backgroundColor: "#EEE8D8",
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#E0D5C3",
  },
  ruaHorizontal: {
    position: "absolute",
    left: -15,
    right: -15,
    top: 66,
    height: 23,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "-13deg" }],
  },
  ruaHorizontal2: {
    position: "absolute",
    left: -15,
    right: -15,
    top: 154,
    height: 22,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "8deg" }],
  },
  ruaVertical: {
    position: "absolute",
    top: -25,
    bottom: -25,
    left: "34%",
    width: 22,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "13deg" }],
  },
  ruaVertical2: {
    position: "absolute",
    top: -25,
    bottom: -25,
    right: "22%",
    width: 20,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "-12deg" }],
  },
  parque: {
    position: "absolute",
    left: 14,
    bottom: 17,
    width: 85,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#D7E2C4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  parqueEmoji: {
    fontSize: 22,
  },
  rota: {
    ...StyleSheet.absoluteFillObject,
  },
  rotaTrecho1: {
    position: "absolute",
    left: "20%",
    top: "28%",
    width: "30%",
    height: 4,
    backgroundColor: "#B57B3C",
    transform: [{ rotate: "17deg" }],
    borderRadius: 3,
  },
  rotaTrecho2: {
    position: "absolute",
    left: "43%",
    top: "30%",
    width: 4,
    height: "36%",
    backgroundColor: "#B57B3C",
    transform: [{ rotate: "-12deg" }],
    borderRadius: 3,
  },
  rotaTrecho3: {
    position: "absolute",
    left: "45%",
    top: "61%",
    width: "31%",
    height: 4,
    backgroundColor: "#B57B3C",
    transform: [{ rotate: "-17deg" }],
    borderRadius: 3,
  },
  pinoLoja: {
    position: "absolute",
    left: "12%",
    top: "18%",
    backgroundColor: "#FFFFFF",
    width: 43,
    height: 43,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  pinoCasa: {
    position: "absolute",
    right: "12%",
    bottom: "18%",
    backgroundColor: "#FFFFFF",
    width: 43,
    height: 43,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  pinoEmoji: {
    fontSize: 23,
  },
  pinoMoto: {
    position: "absolute",
    left: "45%",
    top: "47%",
    backgroundColor: "#603D25",
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  pinoMotoEmoji: {
    fontSize: 22,
  },
  legendaMapa: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 10,
    gap: 5,
  },
  legendaTexto: {
    color: marrom,
    fontSize: 9,
    fontWeight: "800",
  },
  avisoMapa: {
    backgroundColor: "#F2E5D2",
    padding: 14,
    borderRadius: 14,
    marginTop: 12,
    flexDirection: "row",
    gap: 10,
  },
  avisoMapaEmoji: {
    fontSize: 22,
  },
  avisoMapaTitulo: {
    color: marrom,
    fontSize: 12,
    fontWeight: "900",
  },
  avisoMapaTexto: {
    color: "#755840",
    fontSize: 10,
    lineHeight: 16,
    marginTop: 5,
  },
  historico: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0E5D8",
    borderRadius: 16,
    padding: 13,
    marginTop: 11,
  },
  historicoIcone: {
    width: 47,
    height: 47,
    borderRadius: 13,
    backgroundColor: "#F2E3D0",
    alignItems: "center",
    justifyContent: "center",
  },
  historicoNumero: {
    color: marrom,
    fontSize: 12,
    fontWeight: "900",
  },
  historicoProduto: {
    color: "#755840",
    fontSize: 10,
    marginTop: 4,
  },
  historicoData: {
    color: "#927D6B",
    fontSize: 9,
    marginTop: 4,
  },
  historicoDireita: {
    alignItems: "flex-end",
    gap: 7,
  },
  historicoValor: {
    color: marrom,
    fontSize: 11,
    fontWeight: "900",
  },
  historicoStatus: {
    color: "#A47743",
    fontSize: 9,
    fontWeight: "800",
  },
  textoEntregue: {
    color: "#5E8055",
  },
  rodape: {
    alignItems: "center",
    paddingTop: 28,
  },
  rodapeTitulo: {
    color: marrom,
    fontSize: 16,
    fontWeight: "900",
  },
  rodapeTexto: {
    color: "#927D6B",
    fontSize: 10,
    marginTop: 5,
  },
});
