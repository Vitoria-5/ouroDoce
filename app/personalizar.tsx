
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";

const marrom = "#603D25";

const recheios = [
  { nome: "Brigadeiro", emoji: "🍫", preco: 3 },
  { nome: "Nutella", emoji: "🍯", preco: 4 },
  { nome: "Doce de leite", emoji: "🍮", preco: 3 },
  { nome: "Ninho", emoji: "🥛", preco: 3 },
  { nome: "Morango", emoji: "🍓", preco: 2.5 },
  { nome: "Oreo", emoji: "🍪", preco: 2.5 },
];

const coberturas = [
  { nome: "Chocolate", emoji: "🍫", preco: 2 },
  { nome: "Ganache", emoji: "🍫", preco: 3 },
  { nome: "Leite em pó", emoji: "🥛", preco: 1.5 },
  { nome: "Caramelo", emoji: "🍯", preco: 2 },
];

const extras = [
  { nome: "Granulado", emoji: "🍬", preco: 1 },
  { nome: "Confete", emoji: "🌈", preco: 1.5 },
  { nome: "Castanhas", emoji: "🥜", preco: 2 },
  { nome: "Morango extra", emoji: "🍓", preco: 2.5 },
];

type Opcao = {
  nome: string;
  emoji: string;
  preco: number;
};

function formatar(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function PersonalizarScreen() {
  const [massa, setMassa] = useState("Tradicional");
  const [recheio, setRecheio] = useState<string[]>([]);
  const [cobertura, setCobertura] = useState<string[]>([]);
  const [acompanhamentos, setAcompanhamentos] = useState<string[]>([]);

  const precoMassa = massa === "Chocolate intenso" ? 10 : 8;

  function alternar(
    nome: string,
    selecionados: string[],
    atualizar: (valores: string[]) => void,
    limite: number
  ) {
    if (selecionados.includes(nome)) {
      atualizar(selecionados.filter((item) => item !== nome));
      return;
    }

    if (selecionados.length >= limite) {
      Alert.alert(
        "Limite de opções",
        `Você pode escolher até ${limite} opções nesta categoria.`
      );
      return;
    }

    atualizar([...selecionados, nome]);
  }

  function precoOpcoes(
    opcoes: Opcao[],
    selecionados: string[]
  ) {
    return opcoes
      .filter((item) => selecionados.includes(item.nome))
      .reduce((total, item) => total + item.preco, 0);
  }

  const total =
    precoMassa +
    precoOpcoes(recheios, recheio) +
    precoOpcoes(coberturas, cobertura) +
    precoOpcoes(extras, acompanhamentos);

  function adicionarAoPedido() {
    const resumo = [
      `Massa: ${massa}`,
      `Recheios: ${recheio.join(", ") || "Nenhum"}`,
      `Coberturas: ${cobertura.join(", ") || "Nenhuma"}`,
      `Acompanhamentos: ${acompanhamentos.join(", ") || "Nenhum"}`,
      `Total: ${formatar(total)}`,
    ].join("\n");

    Alert.alert(
      "Brownie personalizado! 🍫",
      resumo + "\n\nEsta é uma prévia. Vamos conectar ao carrinho na próxima etapa."
    );
  }

  function secaoOpcoes(
    titulo: string,
    descricao: string,
    opcoes: Opcao[],
    selecionados: string[],
    atualizar: (valores: string[]) => void,
    limite: number
  ) {
    return (
      <View style={styles.secao}>
        <View style={styles.tituloLinha}>
          <Text style={styles.tituloSecao}>{titulo}</Text>
          <Text style={styles.limite}>
            Até {limite}
          </Text>
        </View>

        <Text style={styles.descricaoSecao}>{descricao}</Text>

        <View style={styles.grade}>
          {opcoes.map((item) => {
            const ativo = selecionados.includes(item.nome);

            return (
              <Pressable
                key={item.nome}
                onPress={() =>
                  alternar(item.nome, selecionados, atualizar, limite)
                }
                style={[
                  styles.opcao,
                  ativo && styles.opcaoAtiva,
                ]}
              >
                <Text style={styles.emoji}>{item.emoji}</Text>
                <Text
                  style={[
                    styles.nomeOpcao,
                    ativo && styles.nomeOpcaoAtiva,
                  ]}
                >
                  {item.nome}
                </Text>
                <Text style={styles.precoOpcao}>
                  + {formatar(item.preco)}
                </Text>

                <View
                  style={[
                    styles.seletor,
                    ativo && styles.seletorAtivo,
                  ]}
                >
                  <Text style={styles.check}>
                    {ativo ? "✓" : "+"}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.miniTitulo}>DO SEU JEITINHO</Text>
          <Text style={styles.titulo}>
            Monte seu brownie
          </Text>
          <Text style={styles.subtitulo}>
            Você escolhe. A gente prepara com carinho.
          </Text>
        </View>

        <View style={styles.preview}>
          <View style={styles.previewCirculo}>
            <Text style={styles.previewEmoji}>🍫</Text>
            <Text style={styles.previewExtra}>
              {recheio.length > 0
                ? "COM RECHEIO"
                : "FEITO NA HORA"}
            </Text>
          </View>

          <Text style={styles.previewTitulo}>
            Seu brownie dos sonhos
          </Text>
          <Text style={styles.previewDescricao}>
            Personalize cada detalhe da sua sobremesa.
          </Text>

          <View style={styles.resumoTags}>
            <Text style={styles.tag}>{massa}</Text>
            {recheio.length > 0 && (
              <Text style={styles.tag}>
                {recheio.length} recheio(s)
              </Text>
            )}
            {cobertura.length > 0 && (
              <Text style={styles.tag}>
                {cobertura.length} cobertura(s)
              </Text>
            )}
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>1. Escolha a massa</Text>
          <Text style={styles.descricaoSecao}>
            Qual será a base da sua delícia?
          </Text>

          {[
            {
              nome: "Tradicional",
              descricao: "Clássico, macio e chocolatudo",
              emoji: "🍫",
              preco: 8,
            },
            {
              nome: "Chocolate intenso",
              descricao: "Para quem ama muito chocolate",
              emoji: "🍫",
              preco: 10,
            },
          ].map((item) => {
            const ativo = massa === item.nome;

            return (
              <Pressable
                key={item.nome}
                onPress={() => setMassa(item.nome)}
                style={[
                  styles.massa,
                  ativo && styles.massaAtiva,
                ]}
              >
                <Text style={styles.massaEmoji}>{item.emoji}</Text>
                <View style={styles.massaInfo}>
                  <Text style={styles.nomeMassa}>{item.nome}</Text>
                  <Text style={styles.descricaoMassa}>
                    {item.descricao}
                  </Text>
                  <Text style={styles.precoMassa}>
                    {formatar(item.preco)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.radio,
                    ativo && styles.radioAtivo,
                  ]}
                >
                  {ativo && <View style={styles.radioPonto} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        {secaoOpcoes(
          "2. Escolha os recheios",
          "Até 2 opções para deixar tudo mais gostoso.",
          recheios,
          recheio,
          setRecheio,
          2
        )}

        {secaoOpcoes(
          "3. Escolha a cobertura",
          "Até 2 opções para finalizar seu brownie.",
          coberturas,
          cobertura,
          setCobertura,
          2
        )}

        {secaoOpcoes(
          "4. Adicione acompanhamentos",
          "Até 3 extras para criar sua combinação.",
          extras,
          acompanhamentos,
          setAcompanhamentos,
          3
        )}

        <View style={styles.dica}>
          <Text style={styles.dicaEmoji}>💡</Text>
          <View style={styles.dicaInfo}>
            <Text style={styles.dicaTitulo}>
              Dica Ouro Doce
            </Text>
            <Text style={styles.dicaTexto}>
              Brigadeiro com morango é uma combinação
              deliciosa para quem ama chocolate!
            </Text>
          </View>
        </View>

        <View style={styles.espacoFinal} />
      </ScrollView>

      <View style={styles.barraInferior}>
        <View>
          <Text style={styles.totalLegenda}>TOTAL DO BROWNIE</Text>
          <Text style={styles.total}>{formatar(total)}</Text>
        </View>

        <Pressable
          style={styles.botaoAdicionar}
          onPress={adicionarAoPedido}
        >
          <Text style={styles.botaoTexto}>
            Adicionar ao pedido →
          </Text>
        </Pressable>
      </View>
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
  },
  miniTitulo: {
    color: "#A47743",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },
  titulo: {
    color: "#603D25",
    fontSize: 28,
    fontWeight: "900",
    marginTop: 7,
  },
  subtitulo: {
    color: "#927D6B",
    fontSize: 12,
    marginTop: 7,
  },
  preview: {
    backgroundColor: "#603D25",
    borderRadius: 24,
    padding: 22,
    marginHorizontal: 18,
    alignItems: "center",
  },
  previewCirculo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#F1DFC4",
    alignItems: "center",
    justifyContent: "center",
  },
  previewEmoji: {
    fontSize: 57,
  },
  previewExtra: {
    fontSize: 8,
    color: "#603D25",
    fontWeight: "900",
    marginTop: 2,
  },
  previewTitulo: {
    color: "#FFF7E9",
    fontSize: 19,
    fontWeight: "900",
    marginTop: 15,
  },
  previewDescricao: {
    color: "#E8D6C2",
    fontSize: 11,
    marginTop: 5,
    textAlign: "center",
  },
  resumoTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 7,
    marginTop: 13,
  },
  tag: {
    backgroundColor: "#79583E",
    color: "#FFFFFF",
    overflow: "hidden",
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: 6,
    fontSize: 10,
  },
  secao: {
    marginHorizontal: 20,
    marginTop: 26,
  },
  tituloLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tituloSecao: {
    color: "#603D25",
    fontSize: 18,
    fontWeight: "900",
  },
  limite: {
    color: "#A47743",
    fontSize: 10,
    fontWeight: "800",
  },
  descricaoSecao: {
    color: "#927D6B",
    fontSize: 12,
    marginTop: 6,
    marginBottom: 13,
    lineHeight: 18,
  },
  massa: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8D9C7",
    borderRadius: 16,
    padding: 13,
    marginBottom: 10,
  },
  massaAtiva: {
    borderColor: "#8B5B2E",
    backgroundColor: "#F8EDDE",
  },
  massaEmoji: {
    fontSize: 33,
    marginRight: 12,
  },
  massaInfo: {
    flex: 1,
  },
  nomeMassa: {
    color: "#603D25",
    fontSize: 13,
    fontWeight: "900",
  },
  descricaoMassa: {
    color: "#927D6B",
    fontSize: 10,
    marginTop: 4,
  },
  precoMassa: {
    color: "#8B5B2E",
    fontSize: 13,
    fontWeight: "900",
    marginTop: 5,
  },
  radio: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#C7B39D",
    alignItems: "center",
    justifyContent: "center",
  },
  radioAtivo: {
    borderColor: "#603D25",
  },
  radioPonto: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#603D25",
  },
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  opcao: {
    width: "48.5%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8D9C7",
    borderRadius: 16,
    padding: 12,
    marginBottom: 11,
  },
  opcaoAtiva: {
    borderColor: "#8B5B2E",
    backgroundColor: "#F8EDDE",
  },
  emoji: {
    fontSize: 29,
    marginBottom: 9,
  },
  nomeOpcao: {
    color: "#603D25",
    fontSize: 12,
    fontWeight: "900",
  },
  nomeOpcaoAtiva: {
    color: "#8B5B2E",
  },
  precoOpcao: {
    color: "#927D6B",
    fontSize: 10,
    marginTop: 5,
  },
  seletor: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 23,
    height: 23,
    borderRadius: 8,
    backgroundColor: "#F3E7D8",
    alignItems: "center",
    justifyContent: "center",
  },
  seletorAtivo: {
    backgroundColor: "#603D25",
  },
  check: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
  dica: {
    marginHorizontal: 20,
    marginTop: 25,
    backgroundColor: "#F2E5D2",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 11,
  },
  dicaEmoji: {
    fontSize: 24,
  },
  dicaInfo: {
    flex: 1,
  },
  dicaTitulo: {
    color: "#603D25",
    fontSize: 13,
    fontWeight: "900",
  },
  dicaTexto: {
    color: "#755840",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },
  espacoFinal: {
    height: 25,
  },
  barraInferior: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8D9C7",
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  totalLegenda: {
    color: "#927D6B",
    fontSize: 9,
    fontWeight: "800",
  },
  total: {
    color: "#603D25",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 3,
  },
  botaoAdicionar: {
    flex: 1,
    maxWidth: 220,
    backgroundColor: "#603D25",
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },
});
