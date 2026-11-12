
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MapaEntrega({
  coordenadas,
  rota,
  progresso = 0,
  mapaCarregando = false,
}) {
  const posicaoMoto = Math.min(
    8 + progresso * 0.78,
    86
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📍 Acompanhe seu pedido</Text>

      {mapaCarregando && (
        <Text style={styles.aviso}>
          Consultando localização do endereço...
        </Text>
      )}

      <View style={styles.mapa}>
        <View style={styles.ruaHorizontal} />
        <View style={styles.ruaVertical} />
        <View style={styles.ruaDiagonal} />

        <View style={styles.rota}>
          <View
            style={[
              styles.rotaPercorrida,
              { width: `${progresso}%` },
            ]}
          />
        </View>

        <View style={styles.loja}>
          <Text style={styles.emoji}>🏪</Text>
          <Text style={styles.legenda}>Loja</Text>
        </View>

        <View
          style={[
            styles.moto,
            { left: `${posicaoMoto}%` },
          ]}
        >
          <Text style={styles.emoji}>🛵</Text>
        </View>

        <View style={styles.destino}>
          <Text style={styles.emoji}>📍</Text>
          <Text style={styles.legenda}>Destino</Text>
        </View>
      </View>

      <View style={styles.legendaContainer}>
        <Text style={styles.legendaItem}>🏪 Ouro Doce</Text>
        <Text style={styles.legendaItem}>🛵 Entregador</Text>
        <Text style={styles.legendaItem}>📍 Destino</Text>
      </View>

      <Text style={styles.rodape}>
        {coordenadas && rota?.length
          ? 'Localização aproximada do endereço encontrada. Movimentação do entregador simulada.'
          : 'Mapa ilustrativo. A localização real e o trajeto do entregador ainda não estão conectados.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1E9DB',
    borderRadius: 15,
    padding: 12,
    marginTop: 15,
  },

  titulo: {
    color: '#65432F',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  aviso: {
    color: '#806650',
    fontSize: 12,
    marginBottom: 8,
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

  rota: {
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
    backgroundColor: '#477A50',
    borderRadius: 5,
  },

  loja: {
    position: 'absolute',
    left: '5%',
    top: '62%',
    alignItems: 'center',
  },

  moto: {
    position: 'absolute',
    top: '35%',
    alignItems: 'center',
  },

  destino: {
    position: 'absolute',
    right: '4%',
    top: '18%',
    alignItems: 'center',
  },

  emoji: {
    fontSize: 25,
  },

  legenda: {
    color: '#382419',
    fontSize: 10,
    fontWeight: 'bold',
  },

  legendaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    flexWrap: 'wrap',
    gap: 8,
  },

  legendaItem: {
    color: '#65432F',
    fontSize: 11,
    fontWeight: '600',
  },

  rodape: {
    color: '#806650',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 15,
  },
});
