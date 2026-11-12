
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';

const CORES = {
  fundo: '#FBF5ED',
  marrom: '#65432F',
  escuro: '#382419',
  caramelo: '#B77B4B',
  bege: '#EAD7C0',
  branco: '#FFFFFF',
  texto: '#806650',
  borda: '#E9DED2',
  verde: '#477A50',
};

// COMPONENTE DE CAMPO
function Campo({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  maxLength,
}) {
  return (
    <View style={styles.campoContainer}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A99A8D"
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCorrect={false}
      />
    </View>
  );
}

// BOTÃO
function Botao({ titulo, onPress, secundario = false }) {
  return (
    <TouchableOpacity
      style={[
        styles.botao,
        secundario && styles.botaoSecundario,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.textoBotao,
          secundario && styles.textoBotaoSecundario,
        ]}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

// OPÇÃO DE ESCOLHA
function Opcao({ titulo, descricao, selecionado, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.opcao,
        selecionado && styles.opcaoSelecionada,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.opcaoTitulo}>{titulo}</Text>
        {!!descricao && (
          <Text style={styles.opcaoDescricao}>{descricao}</Text>
        )}
      </View>

      <View
        style={[
          styles.radio,
          selecionado && styles.radioAtivo,
        ]}
      >
        {selecionado && <View style={styles.radioInterno} />}
      </View>
    </TouchableOpacity>
  );
}

export default function Entrega({
  cart = [],
  setCart,
  onBack,
  onFinish,
}) {
  const [etapa, setEtapa] = useState('recebimento');

  // RECEBIMENTO
  const [tipoRecebimento, setTipoRecebimento] = useState('entrega');

  // ENDEREÇO
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [referencia, setReferencia] = useState('');

  const [buscandoCep, setBuscandoCep] = useState(false);

  // ENTREGA
  const [distancia, setDistancia] = useState('2');

  // PAGAMENTO
  const [formaPagamento, setFormaPagamento] = useState('site');
  const [metodoPagamento, setMetodoPagamento] = useState('pix');

  // CARTÃO
  const [nomeCartao, setNomeCartao] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [validadeCartao, setValidadeCartao] = useState('');
  const [cvv, setCvv] = useState('');

  // PEDIDO
  const [codigoPedido, setCodigoPedido] = useState('');
  const [itensConfirmados, setItensConfirmados] = useState([]);
  const [totalConfirmado, setTotalConfirmado] = useState(0);

  // ACOMPANHAMENTO
  const [progresso, setProgresso] = useState(0);

  const cepNumeros = cep.replace(/\D/g, '');
  const distanciaNumero = Number(distancia.replace(',', '.')) || 0;

  function dinheiro(valor) {
    return Number(valor || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function precoItem(item) {
    return Number(item.preco ?? item.valor ?? item.price ?? 0);
  }

  function quantidadeItem(item) {
    return Number(item.quantidade ?? 1);
  }

  const subtotal = cart.reduce((total, item) => {
    return total + precoItem(item) * quantidadeItem(item);
  }, 0);

  const taxaEntrega =
    tipoRecebimento === 'retirada'
      ? 0
      : distanciaNumero <= 3
        ? 5
        : distanciaNumero <= 7
          ? 8
          : distanciaNumero <= 12
            ? 12
            : 0;

  const total = subtotal + taxaEntrega;

  const enderecoCompleto =
    `${rua}, ${numero}${complemento ? ' - ' + complemento : ''}, ${bairro}, ${cidade} - ${estado}`;

  // BUSCA AUTOMÁTICA DO CEP
  useEffect(() => {
    if (cepNumeros.length !== 8) return;

    let ativo = true;

    const temporizador = setTimeout(async () => {
      try {
        setBuscandoCep(true);

        const resposta = await fetch(
          `https://viacep.com.br/ws/${cepNumeros}/json/`
        );

        const dados = await resposta.json();

        if (!ativo) return;

        if (dados.erro) {
          Alert.alert('CEP não encontrado', 'Confira o CEP digitado.');
          return;
        }

        setRua(dados.logradouro || '');
        setBairro(dados.bairro || '');
        setCidade(dados.localidade || '');
        setEstado(dados.uf || '');

      } catch (erro) {
        if (ativo) {
          Alert.alert(
            'Erro ao buscar CEP',
            'Não foi possível consultar o endereço. Você pode preencher os campos manualmente.'
          );
        }
      } finally {
        if (ativo) setBuscandoCep(false);
      }
    }, 500);

    return () => {
      ativo = false;
      clearTimeout(temporizador);
    };
  }, [cepNumeros]);

  function alterarCep(valor) {
    const numeros = valor.replace(/\D/g, '').slice(0, 8);

    if (numeros.length > 5) {
      setCep(numeros.slice(0, 5) + '-' + numeros.slice(5));
    } else {
      setCep(numeros);
    }
  }

  // STATUS DO PEDIDO
  const statusEntrega =
    progresso >= 100
      ? 'Pedido entregue!'
      : progresso >= 65
        ? 'O entregador está chegando!'
        : progresso >= 20
          ? 'Pedido saiu para entrega!'
          : 'Estamos preparando seu pedido!';

  useEffect(() => {
    if (etapa !== 'confirmacao' || tipoRecebimento !== 'entrega') {
      return;
    }

    if (progresso >= 100) return;

    const intervalo = setInterval(() => {
      setProgresso((atual) => Math.min(atual + 2, 100));
    }, 1200);

    return () => clearInterval(intervalo);
  }, [etapa, tipoRecebimento, progresso]);

  // VALIDAR ENDEREÇO
  function validarEndereco() {
    if (cepNumeros.length !== 8) {
      Alert.alert('Atenção', 'Digite um CEP válido.');
      return false;
    }

    if (!rua.trim() || !numero.trim() || !bairro.trim() || !cidade.trim() || !estado.trim()) {
      Alert.alert(
        'Endereço incompleto',
        'Preencha rua, número, bairro, cidade e estado.'
      );
      return false;
    }

    if (distanciaNumero <= 0 || distanciaNumero > 12) {
      Alert.alert(
        'Distância não atendida',
        'A entrega demonstrativa atende até 12 km.'
      );
      return false;
    }

    return true;
  }

  function continuarRecebimento() {
    if (tipoRecebimento === 'entrega' && !validarEndereco()) {
      return;
    }

    setEtapa('pagamento');
  }

  // VALIDAR CARTÃO
  function validarCartao() {
    const numero = numeroCartao.replace(/\D/g, '');

    if (!nomeCartao.trim()) {
      Alert.alert('Atenção', 'Digite o nome do cartão.');
      return false;
    }

    if (numero.length < 13) {
      Alert.alert('Atenção', 'Digite um número de cartão válido.');
      return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(validadeCartao)) {
      Alert.alert('Atenção', 'Digite a validade no formato MM/AA.');
      return false;
    }

    if (cvv.length < 3) {
      Alert.alert('Atenção', 'Digite o CVV do cartão.');
      return false;
    }

    return true;
  }

  function continuarPagamento() {
    if (formaPagamento === 'site' && metodoPagamento === 'cartao') {
      if (!validarCartao()) return;
    }

    setEtapa('revisao');
  }

  // CONFIRMAR PEDIDO
  function confirmarPedido() {
    if (cart.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione produtos antes de confirmar.');
      return;
    }

    const codigo = String(
      Math.floor(100000 + Math.random() * 900000)
    );

    setCodigoPedido(codigo);
    setItensConfirmados([...cart]);
    setTotalConfirmado(total);
    setProgresso(0);
    setEtapa('confirmacao');

    if (setCart) {
      setCart([]);
    }
  }

  function voltarEtapa() {
    if (etapa === 'pagamento') {
      setEtapa('recebimento');
    } else if (etapa === 'revisao') {
      setEtapa('pagamento');
    } else if (onBack) {
      onBack();
    }
  }

  function voltarInicio() {
    if (onFinish) {
      onFinish();
    } else if (onBack) {
      onBack();
    }
  }

  // RESUMO DOS VALORES
  function renderResumo() {
    return (
      <View style={styles.resumo}>
        <View style={styles.linhaResumo}>
          <Text style={styles.textoResumo}>Subtotal</Text>
          <Text style={styles.valorResumo}>{dinheiro(subtotal)}</Text>
        </View>

        <View style={styles.linhaResumo}>
          <Text style={styles.textoResumo}>Taxa de entrega</Text>
          <Text style={styles.valorResumo}>{dinheiro(taxaEntrega)}</Text>
        </View>

        <View style={styles.divisor} />

        <View style={styles.linhaResumo}>
          <Text style={styles.totalTexto}>Total</Text>
          <Text style={styles.totalValor}>{dinheiro(total)}</Text>
        </View>
      </View>
    );
  }

  // MAPA ILUSTRATIVO
  function renderMapa() {
    const posicaoMoto = Math.min(8 + progresso * 0.78, 86);

    return (
      <View style={styles.mapaContainer}>
        <Text style={styles.subtitulo}>📍 Acompanhe seu pedido</Text>

        <View style={styles.mapa}>
          <View style={styles.ruaHorizontal} />
          <View style={styles.ruaVertical} />
          <View style={styles.ruaDiagonal} />

          <View style={styles.linhaRota}>
            <View
              style={[
                styles.rotaPercorrida,
                { width: `${progresso}%` },
              ]}
            />
          </View>

          <View style={styles.mapaLoja}>
            <Text style={styles.mapaEmoji}>🏪</Text>
            <Text style={styles.mapaLegenda}>Loja</Text>
          </View>

          <View
            style={[
              styles.mapaMoto,
              { left: `${posicaoMoto}%` },
            ]}
          >
            <Text style={styles.mapaEmoji}>🛵</Text>
          </View>

          <View style={styles.mapaDestino}>
            <Text style={styles.mapaEmoji}>📍</Text>
            <Text style={styles.mapaLegenda}>Destino</Text>
          </View>
        </View>

        <View style={styles.legendaMapa}>
          <Text style={styles.legendaItem}>🏪 Ouro Doce</Text>
          <Text style={styles.legendaItem}>🛵 Entregador</Text>
          <Text style={styles.legendaItem}>📍 Destino</Text>
        </View>

        <Text style={styles.textoMapa}>
          Mapa ilustrativo. A movimentação do entregador é simulada.
        </Text>
      </View>
    );
  }

  // TELA DE RECEBIMENTO
  function renderRecebimento() {
    return (
      <>
        <Text style={styles.titulo}>Como deseja receber?</Text>
        <Text style={styles.descricao}>
          Escolha entre receber em casa ou retirar na loja.
        </Text>

        <Opcao
          titulo="🚚 Receber por entrega"
          descricao="Receba seu pedido em casa."
          selecionado={tipoRecebimento === 'entrega'}
          onPress={() => setTipoRecebimento('entrega')}
        />

        <Opcao
          titulo="🏪 Retirar no local"
          descricao="Retire diretamente na loja."
          selecionado={tipoRecebimento === 'retirada'}
          onPress={() => setTipoRecebimento('retirada')}
        />

        {tipoRecebimento === 'entrega' && (
          <View style={styles.bloco}>
            <Text style={styles.subtitulo}>Endereço de entrega</Text>
            <Text style={styles.ajuda}>
              Digite seu CEP para preencher o endereço automaticamente.
            </Text>

            <Campo
              label="CEP"
              value={cep}
              onChangeText={alterarCep}
              placeholder="00000-000"
              keyboardType="numeric"
              maxLength={9}
            />

            {buscandoCep && (
              <View style={styles.carregando}>
                <ActivityIndicator color={CORES.marrom} />
                <Text style={styles.ajuda}>Buscando endereço...</Text>
              </View>
            )}

            <Campo
              label="Rua"
              value={rua}
              onChangeText={setRua}
              placeholder="Nome da rua"
            />

            <View style={styles.linhaCampos}>
              <View style={styles.metade}>
                <Campo
                  label="Número"
                  value={numero}
                  onChangeText={setNumero}
                  placeholder="Nº"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.metade}>
                <Campo
                  label="Complemento"
                  value={complemento}
                  onChangeText={setComplemento}
                  placeholder="Apto, casa..."
                />
              </View>
            </View>

            <Campo
              label="Bairro"
              value={bairro}
              onChangeText={setBairro}
              placeholder="Bairro"
            />

            <View style={styles.linhaCampos}>
              <View style={styles.metade}>
                <Campo
                  label="Cidade"
                  value={cidade}
                  onChangeText={setCidade}
                  placeholder="Cidade"
                />
              </View>

              <View style={styles.metade}>
                <Campo
                  label="Estado"
                  value={estado}
                  onChangeText={setEstado}
                  placeholder="UF"
                  maxLength={2}
                />
              </View>
            </View>

            <Campo
              label="Ponto de referência"
              value={referencia}
              onChangeText={setReferencia}
              placeholder="Ex.: casa com portão preto"
            />

            <Text style={styles.subtitulo}>Distância da loja</Text>

            <Campo
              label="Distância em quilômetros"
              value={distancia}
              onChangeText={setDistancia}
              placeholder="Ex.: 2"
              keyboardType="decimal-pad"
            />

            <View style={styles.infoTaxa}>
              <Text style={styles.infoTaxaTexto}>Até 3 km: R$ 5,00</Text>
              <Text style={styles.infoTaxaTexto}>De 3 a 7 km: R$ 8,00</Text>
              <Text style={styles.infoTaxaTexto}>De 7 a 12 km: R$ 12,00</Text>
              <Text style={styles.infoTaxaValor}>
                Sua taxa: {dinheiro(taxaEntrega)}
              </Text>
            </View>
          </View>
        )}

        {tipoRecebimento === 'retirada' && (
          <View style={styles.aviso}>
            <Text style={styles.avisoTexto}>
              🏪 Você poderá retirar seu pedido diretamente na loja.
              Não haverá cobrança de entrega.
            </Text>
          </View>
        )}

        <Botao
          titulo="Continuar para pagamento"
          onPress={continuarRecebimento}
        />
      </>
    );
  }

  // TELA DE PAGAMENTO
  function renderPagamento() {
    return (
      <>
        <Text style={styles.titulo}>Forma de pagamento</Text>
        <Text style={styles.descricao}>
          Escolha como deseja pagar seu pedido.
        </Text>

        <Opcao
          titulo="💳 Pagar pelo aplicativo"
          descricao="Pix ou cartão demonstrativo."
          selecionado={formaPagamento === 'site'}
          onPress={() => setFormaPagamento('site')}
        />

        <Opcao
          titulo="💵 Pagar na entrega ou retirada"
          descricao="Pague diretamente quando receber."
          selecionado={formaPagamento === 'local'}
          onPress={() => setFormaPagamento('local')}
        />

        {formaPagamento === 'site' && (
          <View style={styles.bloco}>
            <Text style={styles.subtitulo}>Método de pagamento</Text>

            <Opcao
              titulo="Pix"
              descricao="Representação demonstrativa."
              selecionado={metodoPagamento === 'pix'}
              onPress={() => setMetodoPagamento('pix')}
            />

            <Opcao
              titulo="Cartão de crédito"
              descricao="Preenchimento demonstrativo."
              selecionado={metodoPagamento === 'cartao'}
              onPress={() => setMetodoPagamento('cartao')}
            />

            {metodoPagamento === 'pix' && (
              <View style={styles.pixContainer}>
                <Text style={styles.subtitulo}>Pagamento via Pix</Text>

                <View style={styles.pixImagem}>
                  <Text style={styles.pixTitulo}>PIX</Text>
                  <Text style={styles.pixSimbolo}>▦</Text>
                  <Text style={styles.pixValor}>{dinheiro(total)}</Text>
                </View>

                <Text style={styles.ajudaCentralizada}>
                  Esta é uma demonstração visual do pagamento.
                  Não é um QR Code válido e não realiza cobrança.
                </Text>
              </View>
            )}

            {metodoPagamento === 'cartao' && (
              <View style={{ marginTop: 12 }}>
                <Campo
                  label="Nome impresso no cartão"
                  value={nomeCartao}
                  onChangeText={setNomeCartao}
                  placeholder="Nome completo"
                />

                <Campo
                  label="Número do cartão"
                  value={numeroCartao}
                  onChangeText={(valor) =>
                    setNumeroCartao(valor.replace(/\D/g, '').slice(0, 16))
                  }
                  placeholder="0000000000000000"
                  keyboardType="numeric"
                  maxLength={16}
                />

                <View style={styles.linhaCampos}>
                  <View style={styles.metade}>
                    <Campo
                      label="Validade"
                      value={validadeCartao}
                      onChangeText={(valor) => {
                        const numeros = valor.replace(/\D/g, '').slice(0, 4);

                        setValidadeCartao(
                          numeros.length > 2
                            ? numeros.slice(0, 2) + '/' + numeros.slice(2)
                            : numeros
                        );
                      }}
                      placeholder="MM/AA"
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>

                  <View style={styles.metade}>
                    <Campo
                      label="CVV"
                      value={cvv}
                      onChangeText={(valor) =>
                        setCvv(valor.replace(/\D/g, '').slice(0, 4))
                      }
                      placeholder="123"
                      keyboardType="numeric"
                      maxLength={4}
                    />
                  </View>
                </View>

                <Text style={styles.ajuda}>
                  Dados demonstrativos. Nenhuma transação real será realizada.
                </Text>
              </View>
            )}
          </View>
        )}

        {renderResumo()}

        <Botao
          titulo="Continuar"
          onPress={continuarPagamento}
        />
      </>
    );
  }

  // TELA DE REVISÃO
  function renderRevisao() {
    return (
      <>
        <Text style={styles.titulo}>Revise seu pedido</Text>
        <Text style={styles.descricao}>
          Confira as informações antes de confirmar.
        </Text>

        <View style={styles.bloco}>
          <Text style={styles.subtitulo}>Seus produtos</Text>

          {cart.map((item, index) => (
            <View
              style={styles.linhaProduto}
              key={item.id ?? `${item.nome}-${index}`}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.produtoNome}>
                  {item.nome || item.name || 'Produto'}
                </Text>
                <Text style={styles.produtoQuantidade}>
                  Quantidade: {quantidadeItem(item)}
                </Text>
              </View>

              <Text style={styles.produtoPreco}>
                {dinheiro(precoItem(item) * quantidadeItem(item))}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.bloco}>
          <Text style={styles.subtitulo}>Recebimento</Text>

          <Text style={styles.textoDetalhe}>
            {tipoRecebimento === 'entrega'
              ? '🚚 Entrega no endereço informado'
              : '🏪 Retirada na loja'}
          </Text>

          {tipoRecebimento === 'entrega' && (
            <>
              <Text style={styles.textoDetalhe}>{enderecoCompleto}</Text>
              {!!referencia && (
                <Text style={styles.textoDetalhe}>
                  Referência: {referencia}
                </Text>
              )}
            </>
          )}
        </View>

        <View style={styles.bloco}>
          <Text style={styles.subtitulo}>Pagamento</Text>

          <Text style={styles.textoDetalhe}>
            {formaPagamento === 'local'
              ? 'Pagamento na entrega ou retirada'
              : metodoPagamento === 'pix'
                ? 'Pix demonstrativo'
                : 'Cartão demonstrativo'}
          </Text>
        </View>

        {renderResumo()}

        <Botao
          titulo="Confirmar pedido"
          onPress={confirmarPedido}
        />

        <Botao
          titulo="Voltar"
          onPress={voltarEtapa}
          secundario
        />
      </>
    );
  }

  // TELA DE CONFIRMAÇÃO
  function renderConfirmacao() {
    return (
      <View>
        <Text style={styles.emojiSucesso}>🎉</Text>

        <Text style={styles.tituloConfirmacao}>
          Pedido confirmado!
        </Text>

        <Text style={styles.descricaoConfirmacao}>
          Obrigado por escolher a Ouro Doce!
          Seu pedido já está em nosso sistema.
        </Text>

        <View style={styles.codigoContainer}>
          <Text style={styles.codigoLabel}>Código do pedido</Text>
          <Text style={styles.codigoNumero}>#{codigoPedido}</Text>
        </View>

        {tipoRecebimento === 'entrega' ? (
          <>
            <View style={styles.bloco}>
              <Text style={styles.subtitulo}>Acompanhe sua entrega</Text>

              <Text style={styles.statusEntrega}>{statusEntrega}</Text>

              <Text style={styles.tempoEntrega}>
                Tempo estimado: 40 a 60 minutos
              </Text>

              <View style={styles.barraFundo}>
                <View
                  style={[
                    styles.barraProgresso,
                    { width: `${progresso}%` },
                  ]}
                />
              </View>

              <Text style={styles.porcentagem}>
                {progresso}% do trajeto simulado
              </Text>

              {renderMapa()}
            </View>

            <View style={styles.codigoSeguranca}>
              <Text style={styles.subtitulo}>
                🔐 Código de confirmação da entrega
              </Text>

              <Text style={styles.codigoSegurancaNumero}>
                {codigoPedido}
              </Text>

              <Text style={styles.ajudaCentralizada}>
                Informe este código ao entregador somente quando
                receber seu pedido.
              </Text>
            </View>

            <View style={styles.bloco}>
              <Text style={styles.subtitulo}>Endereço de entrega</Text>
              <Text style={styles.textoDetalhe}>{enderecoCompleto}</Text>
            </View>
          </>
        ) : (
          <View style={styles.bloco}>
            <Text style={styles.subtitulo}>🏪 Retirada na loja</Text>
            <Text style={styles.tempoEntrega}>
              Tempo estimado: 25 a 35 minutos
            </Text>
            <Text style={styles.textoDetalhe}>
              Seu pedido estará disponível para retirada no local.
            </Text>
          </View>
        )}

        <View style={styles.bloco}>
          <Text style={styles.subtitulo}>Resumo do pedido</Text>

          {itensConfirmados.map((item, index) => (
            <View
              style={styles.linhaProduto}
              key={item.id ?? `${item.nome}-${index}`}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.produtoNome}>
                  {item.nome || item.name || 'Produto'}
                </Text>
                <Text style={styles.produtoQuantidade}>
                  Quantidade: {quantidadeItem(item)}
                </Text>
              </View>

              <Text style={styles.produtoPreco}>
                {dinheiro(precoItem(item) * quantidadeItem(item))}
              </Text>
            </View>
          ))}

          <View style={styles.divisor} />

          <View style={styles.linhaResumo}>
            <Text style={styles.totalTexto}>Total</Text>
            <Text style={styles.totalValor}>
              {dinheiro(totalConfirmado)}
            </Text>
          </View>
        </View>

        <Text style={styles.avisoDemonstracao}>
          Aplicativo demonstrativo. Pagamentos e movimentação do
          entregador são simulados.
        </Text>

        <Botao
          titulo="Voltar ao início"
          onPress={voltarInicio}
        />
      </View>
    );
  }

  return (
    <View style={styles.tela}>
      <StatusBar
        backgroundColor={CORES.fundo}
        barStyle="dark-content"
      />

      <View style={styles.topo}>
        {etapa !== 'confirmacao' && (
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={voltarEtapa}
          >
            <Text style={styles.textoVoltar}>‹ Voltar</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.logo}>Ouro Doce</Text>
        <Text style={styles.subLogo}>Seu momento mais doce!</Text>
      </View>

      {etapa !== 'confirmacao' && (
        <View style={styles.etapas}>
          {[
            { id: 'recebimento', nome: 'Recebimento' },
            { id: 'pagamento', nome: 'Pagamento' },
            { id: 'revisao', nome: 'Revisão' },
          ].map((item, index) => {
            const ordem = ['recebimento', 'pagamento', 'revisao'];
            const atual = ordem.indexOf(etapa);
            const ativo = index <= atual;

            return (
              <View style={styles.etapaItem} key={item.id}>
                <View
                  style={[
                    styles.bolinhaEtapa,
                    ativo && styles.bolinhaAtiva,
                  ]}
                >
                  <Text
                    style={[
                      styles.numeroEtapa,
                      ativo && styles.numeroEtapaAtivo,
                    ]}
                  >
                    {index + 1}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.nomeEtapa,
                    ativo && styles.nomeEtapaAtivo,
                  ]}
                >
                  {item.nome}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      <ScrollView
        style={styles.conteudo}
        contentContainerStyle={styles.conteudoInterno}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {etapa === 'recebimento' && renderRecebimento()}
        {etapa === 'pagamento' && renderPagamento()}
        {etapa === 'revisao' && renderRevisao()}
        {etapa === 'confirmacao' && renderConfirmacao()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },

  topo: {
    backgroundColor: CORES.fundo,
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: CORES.borda,
  },

  botaoVoltar: {
    position: 'absolute',
    left: 18,
    top: 22,
    zIndex: 2,
    padding: 5,
  },

  textoVoltar: {
    color: CORES.marrom,
    fontSize: 16,
    fontWeight: '600',
  },

  logo: {
    color: CORES.marrom,
    fontSize: 27,
    fontWeight: 'bold',
  },

  subLogo: {
    color: CORES.texto,
    fontSize: 12,
    marginTop: 2,
  },

  etapas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: CORES.branco,
    borderBottomWidth: 1,
    borderBottomColor: CORES.borda,
  },

  etapaItem: {
    alignItems: 'center',
  },

  bolinhaEtapa: {
    width: 29,
    height: 29,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: CORES.borda,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bolinhaAtiva: {
    backgroundColor: CORES.marrom,
    borderColor: CORES.marrom,
  },

  numeroEtapa: {
    color: CORES.texto,
    fontWeight: 'bold',
  },

  numeroEtapaAtivo: {
    color: CORES.branco,
  },

  nomeEtapa: {
    fontSize: 11,
    color: CORES.texto,
    marginTop: 5,
  },

  nomeEtapaAtivo: {
    color: CORES.marrom,
    fontWeight: 'bold',
  },

  conteudo: {
    flex: 1,
  },

  conteudoInterno: {
    padding: 18,
    paddingBottom: 40,
  },

  titulo: {
    color: CORES.escuro,
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  descricao: {
    color: CORES.texto,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 17,
  },

  subtitulo: {
    color: CORES.marrom,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  ajuda: {
    color: CORES.texto,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },

  opcao: {
    backgroundColor: CORES.branco,
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 13,
    padding: 15,
    marginBottom: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },

  opcaoSelecionada: {
    borderColor: CORES.marrom,
    borderWidth: 2,
    backgroundColor: '#F8F0E7',
  },

  opcaoTitulo: {
    color: CORES.escuro,
    fontSize: 15,
    fontWeight: 'bold',
  },

  opcaoDescricao: {
    color: CORES.texto,
    fontSize: 12,
    marginTop: 4,
  },

  radio: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: CORES.borda,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  radioAtivo: {
    borderColor: CORES.marrom,
  },

  radioInterno: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: CORES.marrom,
  },

  bloco: {
    backgroundColor: CORES.branco,
    borderRadius: 15,
    padding: 16,
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: CORES.borda,
  },

  campoContainer: {
    marginBottom: 12,
    flex: 1,
  },

  label: {
    color: CORES.marrom,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#FFFCF8',
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: CORES.escuro,
    minHeight: 46,
  },

  linhaCampos: {
    flexDirection: 'row',
    gap: 10,
  },

  metade: {
    flex: 1,
  },

  carregando: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },

  infoTaxa: {
    backgroundColor: '#F8F0E7',
    borderRadius: 10,
    padding: 13,
    marginTop: 5,
  },

  infoTaxaTexto: {
    color: CORES.texto,
    fontSize: 13,
    marginBottom: 5,
  },

  infoTaxaValor: {
    color: CORES.marrom,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 7,
  },

  aviso: {
    backgroundColor: '#F8F0E7',
    borderRadius: 12,
    padding: 15,
    marginVertical: 12,
  },

  avisoTexto: {
    color: CORES.marrom,
    fontSize: 14,
    lineHeight: 21,
  },

  botao: {
    backgroundColor: CORES.marrom,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 8,
  },

  textoBotao: {
    color: CORES.branco,
    fontSize: 15,
    fontWeight: 'bold',
  },

  botaoSecundario: {
    backgroundColor: CORES.branco,
    borderWidth: 1,
    borderColor: CORES.marrom,
  },

  textoBotaoSecundario: {
    color: CORES.marrom,
  },

  resumo: {
    backgroundColor: CORES.branco,
    borderRadius: 14,
    padding: 16,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: CORES.borda,
  },

  linhaResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },

  textoResumo: {
    color: CORES.texto,
    fontSize: 14,
  },

  valorResumo: {
    color: CORES.escuro,
    fontSize: 14,
    fontWeight: '600',
  },

  divisor: {
    height: 1,
    backgroundColor: CORES.borda,
    marginVertical: 10,
  },

  totalTexto: {
    color: CORES.escuro,
    fontSize: 16,
    fontWeight: 'bold',
  },

  totalValor: {
    color: CORES.marrom,
    fontSize: 19,
    fontWeight: 'bold',
  },

  pixContainer: {
    alignItems: 'center',
    marginTop: 18,
  },

  pixImagem: {
    width: 190,
    height: 190,
    backgroundColor: '#F8F0E7',
    borderWidth: 5,
    borderColor: CORES.marrom,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },

  pixTitulo: {
    color: CORES.marrom,
    fontWeight: 'bold',
    fontSize: 18,
  },

  pixSimbolo: {
    color: CORES.marrom,
    fontSize: 75,
    fontWeight: 'bold',
  },

  pixValor: {
    color: CORES.escuro,
    fontWeight: 'bold',
  },

  ajudaCentralizada: {
    color: CORES.texto,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginVertical: 10,
  },

  linhaProduto: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1EAE2',
  },

  produtoNome: {
    color: CORES.escuro,
    fontSize: 14,
    fontWeight: 'bold',
  },

  produtoQuantidade: {
    color: CORES.texto,
    fontSize: 12,
    marginTop: 4,
  },

  produtoPreco: {
    color: CORES.marrom,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
  },

  textoDetalhe: {
    color: CORES.texto,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 5,
  },

  emojiSucesso: {
    fontSize: 55,
    textAlign: 'center',
    marginBottom: 10,
  },

  tituloConfirmacao: {
    color: CORES.marrom,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  descricaoConfirmacao: {
    color: CORES.texto,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 18,
  },

  codigoContainer: {
    backgroundColor: CORES.marrom,
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    marginBottom: 15,
  },

  codigoLabel: {
    color: CORES.bege,
    fontSize: 13,
  },

  codigoNumero: {
    color: CORES.branco,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginTop: 5,
  },

  statusEntrega: {
    color: CORES.verde,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  tempoEntrega: {
    color: CORES.texto,
    fontSize: 14,
    marginBottom: 13,
  },

  barraFundo: {
    width: '100%',
    height: 10,
    borderRadius: 10,
    backgroundColor: '#EDE5DC',
    overflow: 'hidden',
    marginTop: 5,
  },

  barraProgresso: {
    height: '100%',
    backgroundColor: CORES.verde,
    borderRadius: 10,
  },

  porcentagem: {
    color: CORES.texto,
    fontSize: 11,
    textAlign: 'right',
    marginTop: 5,
  },

  mapaContainer: {
    backgroundColor: '#F1E9DB',
    borderRadius: 15,
    padding: 12,
    marginTop: 15,
  },

  mapa: {
    height: 210,
    backgroundColor: '#E5E7D9',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },

  ruaHorizontal: {
    position: 'absolute',
    width: '120%',
    height: 35,
    backgroundColor: '#FFFFFF',
    top: '43%',
    left: '-10%',
  },

  ruaVertical: {
    position: 'absolute',
    width: 35,
    height: '130%',
    backgroundColor: '#FFFFFF',
    left: '43%',
    top: '-15%',
  },

  ruaDiagonal: {
    position: 'absolute',
    width: '120%',
    height: 24,
    backgroundColor: '#FFFFFF',
    top: '15%',
    left: '-10%',
    transform: [{ rotate: '25deg' }],
  },

  linhaRota: {
    position: 'absolute',
    width: '82%',
    height: 5,
    backgroundColor: '#C5B69F',
    left: '8%',
    top: '54%',
    borderRadius: 5,
  },

  rotaPercorrida: {
    height: 5,
    backgroundColor: CORES.verde,
    borderRadius: 5,
  },

  mapaLoja: {
    position: 'absolute',
    left: '5%',
    top: '62%',
    alignItems: 'center',
  },

  mapaMoto: {
    position: 'absolute',
    top: '35%',
    alignItems: 'center',
  },

  mapaDestino: {
    position: 'absolute',
    right: '4%',
    top: '18%',
    alignItems: 'center',
  },

  mapaEmoji: {
    fontSize: 25,
  },

  mapaLegenda: {
    color: CORES.escuro,
    fontSize: 10,
    fontWeight: 'bold',
  },

  legendaMapa: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    flexWrap: 'wrap',
    gap: 8,
  },

  legendaItem: {
    color: CORES.marrom,
    fontSize: 11,
    fontWeight: '600',
  },

  textoMapa: {
    color: CORES.texto,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 15,
  },

  codigoSeguranca: {
    backgroundColor: '#F8F0E7',
    borderWidth: 1,
    borderColor: CORES.bege,
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
    marginBottom: 15,
  },

  codigoSegurancaNumero: {
    color: CORES.marrom,
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 5,
    marginVertical: 5,
  },

  avisoDemonstracao: {
    color: CORES.texto,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginVertical: 12,
  },
});
