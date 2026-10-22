
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

import Cardapio from './Cardapio';

const C = {
  fundo: '#FBF5ED',
  marrom: '#65432F',
  escuro: '#382419',
  caramelo: '#B77B4B',
  bege: '#EAD7C0',
  branco: '#FFFFFF',
  texto: '#806650',
};

export default function App() {
  const [tela, setTela] = useState('inicio');
  const [logado, setLogado] = useState(false);
  const [modoCadastro, setModoCadastro] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Mantém o carrinho guardado ao trocar de tela.
  const [cart, setCart] = useState([]);

  function abrirConta(cadastro) {
    setModoCadastro(cadastro);
    setTela('conta');
  }

  function entrar() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert(
        'Atenção',
        'Preencha seu e-mail e sua senha.'
      );
      return;
    }

    if (modoCadastro && !nome.trim()) {
      Alert.alert(
        'Atenção',
        'Informe seu nome para criar a conta.'
      );
      return;
    }

    // Login e cadastro ainda são demonstrativos.
    setLogado(true);
    setTela('cardapio');

    Alert.alert(
      'Ouro Doce',
      modoCadastro
        ? 'Cadastro demonstrativo concluído!'
        : 'Entrada demonstrativa realizada!'
    );
  }

  // CARDÁPIO
  if (tela === 'cardapio') {
    return (
      <Cardapio
        logado={logado}
        cart={cart}
        setCart={setCart}
        onRequireAuth={() => abrirConta(true)}
        onLogin={() => abrirConta(false)}
        onHome={() => setTela('inicio')}
      />
    );
  }

  // CADASTRO E LOGIN
  if (tela === 'conta') {
    return (
      <ScrollView
        contentContainerStyle={styles.conta}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor={C.fundo}
        />

        <TouchableOpacity
          onPress={() => setTela('cardapio')}
        >
          <Text style={styles.voltar}>
            ← Voltar
          </Text>
        </TouchableOpacity>

        <Text style={styles.simbolo}>✦</Text>
        <Text style={styles.marca}>OURO DOCE</Text>
        <Text style={styles.submarca}>
          DOCERIA ARTESANAL
        </Text>

        <Text style={styles.tituloConta}>
          {modoCadastro
            ? 'Crie sua conta'
            : 'Que bom ter você de volta!'}
        </Text>

        <Text style={styles.descricaoConta}>
          {modoCadastro
            ? 'Cadastre-se para continuar com seu pedido.'
            : 'Entre para continuar sua experiência doce.'}
        </Text>

        {modoCadastro && (
          <TextInput
            style={styles.campo}
            placeholder="Seu nome completo"
            placeholderTextColor="#A79789"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />
        )}

        <TextInput
          style={styles.campo}
          placeholder="Seu e-mail"
          placeholderTextColor="#A79789"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.campo}
          placeholder="Sua senha"
          placeholderTextColor="#A79789"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={entrar}
        >
          <Text style={styles.textoBotao}>
            {modoCadastro
              ? 'Criar minha conta'
              : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModoCadastro(!modoCadastro)}
          style={styles.alternar}
        >
          <Text style={styles.alternarTexto}>
            {modoCadastro
              ? 'Já tem uma conta? Entrar'
              : 'Ainda não tem conta? Cadastre-se'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continuar}
          onPress={() => setTela('cardapio')}
        >
          <Text style={styles.alternarTexto}>
            Voltar ao cardápio sem cadastro
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // TELA INICIAL
  return (
    <ScrollView
      contentContainerStyle={styles.inicio}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={C.fundo}
      />

      <View style={styles.logo}>
        <View style={styles.logoQuadrado}>
          <Text style={styles.simboloLogo}>✦</Text>
        </View>

        <Text style={styles.marca}>OURO DOCE</Text>

        <Text style={styles.submarca}>
          DOCERIA ARTESANAL
        </Text>
      </View>

      <View style={styles.ilustracao}>
        <Text style={styles.brilho}>✦</Text>
        <Text style={styles.brownie}>🍫</Text>

        <View style={styles.selo}>
          <Text style={styles.seloTexto}>FEITO COM</Text>
          <Text style={styles.seloTexto}>AMOR ♡</Text>
        </View>
      </View>

      <Text style={styles.chamadaPequena}>
        UM DOCE MOMENTO ESPERA POR VOCÊ
      </Text>

      <Text style={styles.titulo}>
        A vida fica{'\n'}
        mais doce com{'\n'}
        <Text style={styles.destaque}>
          Ouro Doce.
        </Text>
      </Text>

      <Text style={styles.descricao}>
        Brownies artesanais, sabores irresistíveis e
        pequenos momentos que viram grandes lembranças.
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => setTela('cardapio')}
      >
        <Text style={styles.textoBotao}>
          Ver o site sem cadastro →
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => abrirConta(false)}
      >
        <Text style={styles.textoSecundario}>
          Entrar na minha conta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => abrirConta(true)}
      >
        <Text style={styles.cadastro}>
          Ainda não tem conta?{' '}
          <Text style={styles.cadastroDestaque}>
            Cadastre-se
          </Text>
        </Text>
      </TouchableOpacity>

      <Text style={styles.rodape}>
        FEITO COM CARINHO E CHOCOLATE ♡
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inicio: {
    flexGrow: 1,
    minHeight: '100%',
    backgroundColor: C.fundo,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 35,
  },

  logo: {
    alignItems: 'center',
    marginBottom: 24,
  },

  logoQuadrado: {
    width: 54,
    height: 54,
    backgroundColor: C.marrom,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  simboloLogo: {
    color: '#F8E8D4',
    fontSize: 34,
  },

  simbolo: {
    fontSize: 38,
    color: C.caramelo,
    textAlign: 'center',
  },

  marca: {
    color: C.escuro,
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 4,
    textAlign: 'center',
  },

  submarca: {
    fontSize: 9,
    letterSpacing: 3,
    color: C.texto,
    marginTop: 6,
    textAlign: 'center',
  },

  ilustracao: {
    width: 220,
    height: 180,
    borderRadius: 90,
    backgroundColor: C.bege,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    position: 'relative',
  },

  brownie: {
    fontSize: 94,
  },

  brilho: {
    position: 'absolute',
    top: 12,
    right: 24,
    fontSize: 27,
    color: C.caramelo,
  },

  selo: {
    position: 'absolute',
    bottom: 5,
    right: -10,
    backgroundColor: C.marrom,
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: C.fundo,
    transform: [{ rotate: '8deg' }],
  },

  seloTexto: {
    color: C.branco,
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  chamadaPequena: {
    fontSize: 9,
    letterSpacing: 2,
    color: C.caramelo,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  titulo: {
    fontSize: 37,
    lineHeight: 43,
    color: C.escuro,
    fontWeight: '900',
    textAlign: 'center',
  },

  destaque: {
    color: C.caramelo,
    fontStyle: 'italic',
  },

  descricao: {
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'center',
    color: C.texto,
    marginTop: 16,
    marginBottom: 25,
    maxWidth: 380,
  },

  botao: {
    backgroundColor: C.marrom,
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderRadius: 14,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: 12,
  },

  textoBotao: {
    color: C.branco,
    fontSize: 14,
    fontWeight: 'bold',
  },

  botaoSecundario: {
    borderWidth: 1.5,
    borderColor: C.marrom,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 14,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: 19,
  },

  textoSecundario: {
    color: C.marrom,
    fontWeight: 'bold',
    fontSize: 14,
  },

  cadastro: {
    fontSize: 12,
    color: C.texto,
    textAlign: 'center',
  },

  cadastroDestaque: {
    color: C.marrom,
    fontWeight: 'bold',
  },

  rodape: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#A79789',
    marginTop: 32,
    textAlign: 'center',
  },

  conta: {
    flexGrow: 1,
    minHeight: '100%',
    justifyContent: 'center',
    backgroundColor: C.fundo,
    padding: 28,
  },

  voltar: {
    color: C.marrom,
    fontSize: 15,
    marginBottom: 28,
  },

  tituloConta: {
    fontSize: 27,
    fontWeight: 'bold',
    color: C.escuro,
    marginTop: 35,
    textAlign: 'center',
  },

  descricaoConta: {
    fontSize: 14,
    lineHeight: 21,
    color: C.texto,
    marginTop: 10,
    marginBottom: 25,
    textAlign: 'center',
  },

  campo: {
    backgroundColor: C.branco,
    borderColor: '#E4D6C8',
    borderWidth: 1,
    borderRadius: 13,
    padding: 16,
    fontSize: 14,
    marginBottom: 13,
    color: C.escuro,
  },

  alternar: {
    alignItems: 'center',
    padding: 17,
  },

  alternarTexto: {
    color: C.marrom,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  continuar: {
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
  },
});
