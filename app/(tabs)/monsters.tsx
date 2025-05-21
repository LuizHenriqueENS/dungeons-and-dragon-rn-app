import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, Image, SafeAreaView, Text } from 'react-native'
import { getBeast, getAllMonstersName as monstersName } from '../../src/api/dungeons'

export default function Monsters() {
  const [beastImg, setBeastImg] = useState<String>()
  const [beastName, setBeastName] = useState<String>()
  const [beastImgUrl, setBeastImgUrl] = useState<String>()
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    setLoading(true)
    const fecthData = async () => {
      const imgUrl = await getBeast(beastImgUrl)
      setBeastImg(imgUrl)
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }

    fecthData()
  }, [beastName])


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title='+' onPress={async () => {
        const randomN = Math.ceil(Math.random() * 200)
        setBeastImgUrl((await monstersName(randomN)).url)
        setBeastName((await monstersName(randomN)).name)
      }} />
      {loading ?
        <ActivityIndicator size='large' color='#00ff00' /> :
        <Image source={{
          uri: loading ? "https://i.imgur.com/aeStzjo.jpeg" : beastImg?.toString(),
          height: 300,
          width: 250,
        }} />
      }
      <Text>{loading ? `` : beastName}</Text>
    </SafeAreaView>
  )
}