
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
  Switch,
} from "react-native";

const marrom = "#603D25";

export default function PerfilScreen() {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState("Maria Oliveira");
  const [email, setEmail] = useState("maria@email.com");
  const [telefone, setTelefone] = useState("(11) 99999-9999");
  const [endereco, setEndereco] = useState("Rua das Flores, 123");
  const [notificacoes, setNotificacoes] = useState(true);
  const [promocoes, setPromocoes] = useState(true);

  function salvarPerfil() {
    if (!nome.trim() || !email.trim()) {
      Alert.alert("Atenção", "Preencha seu nome e e-mail.");
      return;
    }

    setEditando(false);
    Alert.alert("Perfil atualizado!", "Seus dados foram atualizados nesta demonstração.");
  }

  function sairDaConta() {
    Alert.alert(
      "Sair da conta",
      "Deseja realmente sair do aplicativo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: () =>
            Alert.alert(
              "Demonstração",
              "A saída real será implementada quando conectarmos a autenticação."
            ),
        },
      ]
    );
  }

  function opcao(
    emoji: string,
    titulo: string,
    descricao: string,
    acao: () => void
  ) {
    return (
      <Pressable style={styles.opcao} onPress={acao} key={titulo}>
        <View style={styles.opcaoIcone}>
          <Text style={styles.opcaoEmoji}>{emoji}</Text>
        </View>

        <View style={styles.opcaoInfo}>
          <Text style={styles.opcaoTitulo}>{titulo}</Text>
          <Text style={styles.opcaoDescricao}>{descricao}</Text>
        </View>

        <Text style={styles.seta}>›</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <Text style={styles.miniTitulo}>SUA CONTA OURO DOCE</Text>
        <Text style={styles.titulo}>Meu perfil 👤</Text>
        <Text style={styles.subtitulo}>
          Seus dados e preferências em um só lugar.
        </Text>

        <View style={styles.cabecalhoPerfil}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👩🏻</Text>
          </View>

          <View style={styles.dadosCabecalho}>
            <Text style={styles.nomeCabecalho}>{nome}</Text>
            <Text style={styles.emailCabecalho}>{email}</Text>
            <View style={styles.clienteTag}>
              <Text style={styles.clienteTagTexto}>
                ✨ Cliente Ouro Doce
              </Text>
            </View>
          </View>

          <Pressable
            style={styles.editarRapido}
            onPress={() => setEditando(!editando)}
          >
            <Text style={styles.editarRapidoTexto}>
              {editando ? "✕" : "✎"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.secao}>
          <View style={styles.tituloLinha}>
            <Text style={styles.tituloSecao}>Dados pessoais</Text>
            <Pressable
              onPress={() => {
                if (editando) {
                  salvarPerfil();
                } else {
                  setEditando(true);
                }
              }}
            >
              <Text style={styles.acaoTexto}>
                {editando ? "Salvar" : "Editar dados"}
              </Text>
            </Pressable>
          </View>

          <View style={styles.cartao}>
            <Text style={styles.rotulo}>Nome completo</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              editable={editando}
              style={[styles.input, !editando && styles.inputBloqueado]}
              placeholder="Seu nome"
              placeholderTextColor="#A89582"
            />

            <Text style={styles.rotulo}>E-mail</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              editable={editando}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.input, !editando && styles.inputBloqueado]}
              placeholder="seu@email.com"
              placeholderTextColor="#A89582"
            />

            <Text style={styles.rotulo}>Telefone</Text>
            <TextInput
              value={telefone}
              onChangeText={setTelefone}
              editable={editando}
              keyboardType="phone-pad"
              style={[styles.input, !editando && styles.inputBloqueado]}
              placeholder="Seu telefone"
              placeholderTextColor="#A89582"
            />
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Meu endereço 📍</Text>

          <View style={styles.cartao}>
            <Text style={styles.rotulo}>Endereço principal</Text>
            <TextInput
              value={endereco}
              onChangeText={setEndereco}
              editable={editando}
              style={[styles.input, !editando && styles.inputBloqueado]}
              placeholder="Rua, número e bairro"
              placeholderTextColor="#A89582"
            />

            <Text style={styles.enderecoNota}>
              Confira seu endereço antes de finalizar uma entrega.
            </Text>

            <Pressable
              style={styles.botaoEndereco}
              onPress={() => {
                setEditando(true);
                Alert.alert(
                  "Editar endereço",
                  "Agora você pode editar o campo de endereço acima."
                );
              }}
            >
              <Text style={styles.botaoEnderecoTexto}>
                ✎  Editar endereço
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Preferências</Text>

          <View style={styles.cartao}>
            <View style={styles.preferencia}>
              <View style={styles.preferenciaInfo}>
                <Text style={styles.preferenciaTitulo}>
                  🔔 Notificações de pedidos
                </Text>
                <Text style={styles.preferenciaDescricao}>
                  Receba atualizações sobre seu brownie.
                </Text>
              </View>
              <Switch
                value={notificacoes}
                onValueChange={setNotificacoes}
                trackColor={{ false: "#D9CDBF", true: "#B9956C" }}
                thumbColor={notificacoes ? marrom : "#F7F0E7"}
              />
            </View>

            <View style={styles.divisor} />

            <View style={styles.preferencia}>
              <View style={styles.preferenciaInfo}>
                <Text style={styles.preferenciaTitulo}>
                  🎁 Promoções e novidades
                </Text>
                <Text style={styles.preferenciaDescricao}>
                  Saiba das ofertas e dos novos sabores.
                </Text>
              </View>
              <Switch
                value={promocoes}
                onValueChange={setPromocoes}
                trackColor={{ false: "#D9CDBF", true: "#B9956C" }}
                thumbColor={promocoes ? marrom : "#F7F0E7"}
              />
            </View>
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Minha conta</Text>

          <View style={styles.listaOpcoes}>
            {opcao(
              "📦",
              "Meus pedidos",
              "Acompanhe suas compras",
              () =>
                Alert.alert(
                  "Meus pedidos",
                  "Use a página Pedidos para consultar o acompanhamento."
                )
            )}

            {opcao(
              "❤️",
              "Meus favoritos",
              "Seus sabores preferidos",
              () =>
                Alert.alert(
                  "Meus favoritos",
                  "A lista de favoritos será implementada em uma próxima etapa."
                )
            )}

            {opcao(
              "🍫",
              "Meu brownie ideal",
              "Descubra sua combinação",
              () =>
                Alert.alert(
                  "Brownie ideal",
                  "Em breve: descubra o brownie que combina com você!"
                )
            )}

            {opcao(
              "🥜",
              "Alergias e restrições",
              "Consulte os ingredientes antes de comprar",
              () =>
                Alert.alert(
                  "Alergias e restrições",
                  "Confira os ingredientes com a loja antes de consumir. Esta opção ainda não salva restrições."
                )
            )}

            {opcao(
              "💬",
              "Ajuda e atendimento",
              "Tire suas dúvidas",
              () =>
                Alert.alert(
                  "Atendimento",
                  "O contato com a loja será configurado posteriormente."
                )
            )}
          </View>
        </View>

        <Pressable style={styles.botaoSair} onPress={sairDaConta}>
          <Text style={styles.botaoSairTexto}>
            ↪  Sair da conta
          </Text>
        </Pressable>

        <Text style={styles.versao}>OURO DOCE · VERSÃO 1.0</Text>
        <Text style={styles.rodape}>
          Feito com carinho e muito chocolate 🍫
        </Text>
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
    paddingBottom: 40,
  },
  miniTitulo: {
    color: "#A47743",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  titulo: {
    color: marrom,
    fontSize: 29,
    fontWeight: "900",
    marginTop: 7,
  },
  subtitulo: {
    color: "#927D6B",
    fontSize: 12,
    marginTop: 6,
  },
  cabecalhoPerfil: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#603D25",
    borderRadius: 20,
    padding: 17,
    marginTop: 23,
    gap: 12,
  },
  avatar: {
    width: 67,
    height: 67,
    borderRadius: 34,
    backgroundColor: "#F1DFC4",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmoji: {
    fontSize: 38,
  },
  dadosCabecalho: {
    flex: 1,
  },
  nomeCabecalho: {
    color: "#FFF9F0",
    fontSize: 15,
    fontWeight: "900",
  },
  emailCabecalho: {
    color: "#E8D6C2",
    fontSize: 10,
    marginTop: 5,
  },
  clienteTag: {
    alignSelf: "flex-start",
    backgroundColor: "#79583E",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginTop: 8,
  },
  clienteTagTexto: {
    color: "#FFF9F0",
    fontSize: 9,
    fontWeight: "800",
  },
  editarRapido: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#79583E",
    alignItems: "center",
    justifyContent: "center",
  },
  editarRapidoTexto: {
    color: "#FFFFFF",
    fontSize: 19,
  },
  secao: {
    marginTop: 27,
  },
  tituloLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  tituloSecao: {
    color: marrom,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 12,
  },
  acaoTexto: {
    color: "#A47743",
    fontSize: 12,
    fontWeight: "900",
  },
  cartao: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0E5D8",
    borderRadius: 17,
    padding: 16,
  },
  rotulo: {
    color: "#755840",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 7,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8D9C7",
    borderRadius: 11,
    padding: 12,
    fontSize: 12,
    color: marrom,
    backgroundColor: "#FFFFFF",
  },
  inputBloqueado: {
    backgroundColor: "#FCF8F2",
  },
  enderecoNota: {
    color: "#927D6B",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 11,
  },
  botaoEndereco: {
    borderWidth: 1,
    borderColor: "#DCC8AE",
    borderRadius: 11,
    padding: 12,
    alignItems: "center",
    marginTop: 14,
  },
  botaoEnderecoTexto: {
    color: marrom,
    fontSize: 12,
    fontWeight: "800",
  },
  preferencia: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 6,
  },
  preferenciaInfo: {
    flex: 1,
  },
  preferenciaTitulo: {
    color: marrom,
    fontSize: 12,
    fontWeight: "800",
  },
  preferenciaDescricao: {
    color: "#927D6B",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 5,
  },
  divisor: {
    height: 1,
    backgroundColor: "#F0E5D8",
    marginVertical: 13,
  },
  listaOpcoes: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0E5D8",
    borderRadius: 17,
    paddingHorizontal: 13,
  },
  opcao: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#F5EDE4",
  },
  opcaoIcone: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#F5E9D9",
    alignItems: "center",
    justifyContent: "center",
  },
  opcaoEmoji: {
    fontSize: 21,
  },
  opcaoInfo: {
    flex: 1,
  },
  opcaoTitulo: {
    color: marrom,
    fontSize: 12,
    fontWeight: "900",
  },
  opcaoDescricao: {
    color: "#927D6B",
    fontSize: 10,
    marginTop: 5,
  },
  seta: {
    color: "#A47743",
    fontSize: 25,
  },
  botaoSair: {
    borderWidth: 1,
    borderColor: "#D9B5A8",
    borderRadius: 14,
    padding: 15,
    alignItems: "center",
    marginTop: 28,
    backgroundColor: "#FFF5F1",
  },
  botaoSairTexto: {
    color: "#A34F3E",
    fontSize: 13,
    fontWeight: "900",
  },
  versao: {
    textAlign: "center",
    color: "#A89582",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginTop: 24,
  },
  rodape: {
    textAlign: "center",
    color: "#927D6B",
    fontSize: 10,
    marginTop: 7,
  },
});
