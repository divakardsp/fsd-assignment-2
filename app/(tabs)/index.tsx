import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Product, useStore } from '@/context/store-context';
import { Ionicons } from '@expo/vector-icons';

// Mock Product Data
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    price: 299.99,
    description: 'Experience premium sound with active noise cancellation.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  },
  {
    id: '2',
    name: 'Minimalist Smartwatch',
    price: 199.50,
    description: 'Track your health and stay connected in style.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
  },
  {
    id: '3',
    name: 'Ergonomic Mechanical Keyboard',
    price: 145.00,
    description: 'Boost your productivity with tactile typing.',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80',
  },
  {
    id: '4',
    name: 'Ultra-Portable Bluetooth Speaker',
    price: 59.99,
    description: 'Take your music anywhere with 24-hour battery life.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
  },
  {
    id: '5',
    name: '4K Action Camera',
    price: 349.00,
    description: 'Capture your extreme adventures in stunning detail.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80',
  },
];

export default function ShopScreen() {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const renderProduct = ({ item }: { item: Product }) => {
    const isWished = isInWishlist(item.id);

    return (
      <View style={styles.productCard}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <TouchableOpacity 
            style={styles.wishlistBtn}
            onPress={() => toggleWishlist(item)}
          >
            <Ionicons 
              name={isWished ? "heart" : "heart-outline"} 
              size={24} 
              color={isWished ? "#ff4444" : "#333"} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.productDesc} numberOfLines={2}>{item.description}</Text>
          
          <View style={styles.bottomRow}>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity 
              style={styles.addToCartBtn}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
  },
  searchBtn: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    backgroundColor: '#f8f8f8',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  productDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  addToCartBtn: {
    backgroundColor: '#111',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
