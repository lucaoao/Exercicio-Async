import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import Constants from 'expo-constants';

const Item = ({ id, titulo, descricao, imagem }) => {
  return (
    <View style={estilo.item}>
      <Image
        source={{ uri: imagem }}
        style={{ widht: '100%', height: 150, borderRadius: 8 }}
      />
      <Text> 'ID: {id}' </Text>
      <Text> 'Título: {titulo}' </Text>
      <Text> 'Descrição: {descricao}' </Text>
    </View>
  );
};

export default function App() {
  const [dados, setDados] = React.useState(null);
  React.useEffect(obterDadosApi, []);

  async function obterDadosApi() {
    const resultado = await fetch(
      'https://raw.githubusercontent.com/professorgeorgeoliveira/api-podcast/master/db.json'
    );
    const dadosJson = await resultado.json();
    if (resultado.ok) {
      setDados(dadosJson);
      console.log(dadosJson);
    }
  }

  return (
    <ScrollView style={estilo.container}>
      <View>
        {dados ? (
          <View>
            <Text> {/*JSON.stringify(dados, null, 2)*/} </Text>
            <FlatList
              data={dados.podcasts}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => (
                <Item
                  id={item.id}
                  titulo={item.title}
                  descricao={item.description}
                  imagem={item.img}
                />
              )}
            />
          </View>
        ) : (
          <Text> Carregando dados </Text>
        )}
      </View>
    </ScrollView>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'lightblue',
    padding: 8,
  },
  item: {
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
});
