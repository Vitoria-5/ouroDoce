
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const C = {
  caramelo: '#B77B4B',
  marrom: '#65432F',
};

export default function MapaEntrega({
  coordenadas,
  rota,
  progresso = 0,
  mapaCarregando = false,
}) {
  if (mapaCarregando) {
    return (
      <View style={s.mensagem}>
        <Text style={s.emoji}>🗺️</Text>
        <Text style={s.texto}>Localizando o endereço...</Text>
      </View>
    );
  }

  if (!coordenadas || !rota || rota.length === 0) {
    return (
      <View style={s.mensagem}>
        <Text style={s.emoji}>📍</Text>
        <Text style={s.texto}>Mapa indisponível. Confira o endereço.</Text>
      </View>
    );
  }

  const pontoMoto =
    rota[
      Math.min(
        Math.floor((progresso / 100) * (rota.length - 1)),
        rota.length - 1
      )
    ];

  const regiao = {
    latitude:
      (coordenadas.origem.latitude + coordenadas.destino.latitude) / 2,
    longitude:
      (coordenadas.origem.longitude + coordenadas.destino.longitude) / 2,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  };

  return (
    <View style={s.mapa}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={regiao}
        region={regiao}
      >
        <Marker
          coordinate={coordenadas.origem}
          title="Saída do entregador"
          description="Ponto de partida ilustrativo"
        >
          <Text style={s.emojiMarcador}>🏪</Text>
        </Marker>

        <Marker
          coordinate={coordenadas.destino}
          title="Seu endereço"
        >
          <Text style={s.emojiMarcador}>📍</Text>
        </Marker>

        <Polyline
          coordinates={rota}
          strokeColor={C.caramelo}
          strokeWidth={5}
        />

        <Marker coordinate={pontoMoto} title="Entregador">
          <Text style={s.emojiMarcador}>🛵</Text>
        </Marker>
      </MapView>
    </View>
  );
}

const s = StyleSheet.create({
  mapa: {
    width: '100%',
    height: 280,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 15,
  },
  mensagem: {
    width: '100%',
    minHeight: 180,
    backgroundColor: '#F7EBDD',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    marginTop: 15,
  },
  emoji: {
    fontSize: 42,
  },
  texto: {
    color: C.marrom,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  emojiMarcador: {
    fontSize: 28,
  },
});
