import MonsterStatusText from "@/components/MonsterStatusText";
import { getAllMonstersName, getMonsterInfo } from "@/src/api/dungeons.js";
import { Monster, MonsterInfo } from "@/types/MonsterInfo";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Monsters() {
  const [selected, setSelected] = useState<string>("");
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [monsterInfo, setMonsterInfo] = useState<MonsterInfo>();
  const [visivel, setVisivel] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useFocusEffect(
    useCallback(() => {
      const fecthData = async () => {
        setIsLoading(true)
        const monsterAPI = await getAllMonstersName();
        setMonsters(monsterAPI);
        setSelected(monsters[3].name)
      };

      fecthData();
      setIsLoading(false)
    }, [])
  );

  useEffect(() => {
    const preftchData = async () => {
      setMonsterInfo(await getMonsterInfo(returnURL(selected)));
    };

    preftchData();
    setTimeout(() => {
      setIsLoading(false)

    }, 1500);
  }, [selected]);
  return (

    <SafeAreaProvider>
      <SafeAreaView
        style={{ alignItems: 'stretch' }}
      >
        <View
          style={{
            flexDirection: "row",
            margin: 12,
            borderBottomColor: "black",
            borderBottomWidth: 0.5,
            paddingBottom: 10,
          }}
        >
          <Pressable
            onPress={() => {
              setVisivel(true);
            }}
          >
            <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: monsterInfo?.image,
              }}
              resizeMode="stretch"
            />
          </Pressable>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontWeight: 900,
                flexShrink: 1,
                textAlign: "center",
                textAlignVertical: "center",
                paddingTop: 5,
              }}
            >
              {monsterInfo?.name}
            </Text>
            {/* // #region Colunas dos Status */}
            <View
              style={{
                flexDirection: "row",
                marginStart: 12,
                gap: 1,
              }}
            >
              <View
                style={{
                  paddingEnd: 4,
                  borderEndWidth: 0.5,
                  borderEndColor: "black",
                }}
              >
                <MonsterStatusText
                  statusName="Força"
                  statusValue={monsterInfo?.strength}
                />
                <MonsterStatusText
                  statusName="Destreza"
                  statusValue={monsterInfo?.dexterity}
                />
                <MonsterStatusText
                  statusName="Constituição"
                  statusValue={monsterInfo?.constitution}
                />
              </View>
              <View style={{ paddingStart: 3, paddingEnd: 3 }}>
                <MonsterStatusText
                  statusName="Inteligência"
                  statusValue={monsterInfo?.intelligence}
                />
                <MonsterStatusText
                  statusName="Sabedoria"
                  statusValue={monsterInfo?.wisdom}
                />
                <MonsterStatusText
                  statusName="Carisma"
                  statusValue={monsterInfo?.charisma}
                />
              </View>
              {/* // #endregion */}
            </View>
          </View>
        </View>

        <FlatList
          data={monsters.map((m) => m.name)}
          keyExtractor={(dados) => dados}
          windowSize={2}
          renderItem={(item) => (item.index % 2 === 0 ?
            <TouchableOpacity style={styles.monsterList} onPress={() => {
              setIsLoading(true)
              setSelected(item.item)
            }}
            >
              <Text style={styles.fontMonsterList}>{item.item}</Text>
            </TouchableOpacity> : <TouchableOpacity style={[styles.monsterList, styles.monsterListOdd]} onPress={() => {
              setIsLoading(true)
              setSelected(item.item)
            }}
            >
              <Text style={styles.fontMonsterList}>{item.item}</Text>
            </TouchableOpacity>
          )} />
        <Modal visible={visivel} transparent={true} >
          <View style={{
            padding: 20, backgroundColor: 'white'
          }}>
            < Pressable onPress={() => setVisivel(false)}>
              <Image style={styles.image} resizeMode='center' source={{ uri: monsterInfo?.image }} />
            </Pressable>
          </View>
        </Modal>
        {
          isLoading ?

            <Modal
              animationType="fade"
              visible={isLoading} >
              <ActivityIndicator size="large" />
            </Modal>
            : null
        }
      </SafeAreaView >

    </SafeAreaProvider >
  );


  function returnURL(name: string) {
    const findMonster = monsters.find((x) => x.name === name);
    return findMonster?.url;
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  monsterList: {
    borderWidth: 1,
    margin: 0.5,
    backgroundColor: 'purple',
  },
  fontMonsterList: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 600,
    color: 'white'
  },
  monsterListOdd: {
    backgroundColor: 'darkslateblue'
  }
})