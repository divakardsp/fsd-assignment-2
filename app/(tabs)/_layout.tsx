import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { StoreProvider } from '@/context/store-context';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <StoreProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#111',
          tabBarInactiveTintColor: '#888',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
          },
          tabBarLabelStyle: {
            fontWeight: '600',
            fontSize: 10,
          }
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Shop',
            tabBarIcon: ({ color }) => <Ionicons size={24} name="bag-handle" color={color} />,
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            title: 'Wishlist',
            tabBarIcon: ({ color }) => <Ionicons size={24} name="heart" color={color} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            tabBarIcon: ({ color }) => <Ionicons size={26} name="cart" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <Ionicons size={24} name="person" color={color} />,
          }}
        />
      </Tabs>
    </StoreProvider>
  );
}
