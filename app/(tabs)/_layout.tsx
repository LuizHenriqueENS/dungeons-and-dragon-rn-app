import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function TabLayout() {
    return (
        <Tabs initialRouteName='index'
            screenOptions={{ tabBarActiveTintColor: '#ffd33d', headerShown: false }}>
            <Tabs.Screen name='monsters' options={{
                title: 'Monsters', tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'paw-sharp' : 'paw-outline'} color={color} size={24} />)
            }} />
            <Tabs.Screen name='index' options={{
                title: 'Home', tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />)
            }} />
            <Tabs.Screen name='spells' options={{
                title: 'Spells', tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'color-wand-sharp' : 'color-wand-outline'} color={color} size={24} />)
            }} />
        </Tabs>
    )
}

const styles = StyleSheet.create({})