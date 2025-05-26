import MonsterStatusText from "@/components/MonsterStatusText";
import { getAllMonstersName, getMonsterInfo } from "@/src/api/dungeons.js";
import { Monster, MonsterInfo } from "@/types/MonsterInfo";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function Monsters() {
  const [selected, setSelected] = useState<string>("");
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [monsterInfo, setMonsterInfo] = useState<MonsterInfo>();
  const [visivel, setVisivel] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useFocusEffect(
    useCallback(() => {
      const fecthData = async () => {
        const monsterAPI = await getAllMonstersName();
        setMonsters(monsterAPI);
        setSelected(monsters[3].name)
      };

      fecthData();
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
    <SafeAreaView
      style={{ flex: 1, justifyContent: "flex-start", paddingTop: 50 }}
    >
      <Modal visible={visivel} transparent={false}>
        <Pressable onPress={() => setVisivel(false)}>
          <ImageBackground style={styles.image} source={{ uri: monsterInfo?.image }} />
        </Pressable>
      </Modal>
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
      {isLoading ?
        <Modal style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
          animationType="fade"
          visible={isLoading} >
          <ActivityIndicator size={'large'} />
        </Modal> :
        <FlatList data={monsters.map((m) => m.name)}
          renderItem={(item) => (
            <TouchableOpacity onPress={() => {
              setIsLoading(true)
              setSelected(item.item)
            }}>
              <Text>{item.item}</Text>
            </TouchableOpacity>
          )} />
      }
      {/* 
      <SelectList
        data={monsters.map((monster) => monster.name)}
        save="value"
        search={false}
        setSelected={(v: string) => setSelected(v)}
      /> */}
    </SafeAreaView>
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
  }
})