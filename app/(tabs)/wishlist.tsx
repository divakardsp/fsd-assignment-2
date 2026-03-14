import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useStore, Product } from '@/context/store-context';
import { Ionicons } from '@expo/vector-icons';

export default function WishlistScreen() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  const handleMoveToCart = (product: Product) => {
    addToCart(product);
    toggleWishlist(product); // Remove from wishlist after moving
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleMoveToCart(item)} style={styles.cartBtn}>
            <Ionicons name="cart" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleWishlist(item)} style={styles.removeBtn}>
          <Ionicons name="heart-dislike-outline" size={24} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>My Wishlist</Text>
      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No items saved yet.</Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 20,
    color: '#111',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#0066cc',
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartBtn: {
      backgroundColor: '#111',
      padding: 10,
      borderRadius: 20,
  },
  removeBtn: {
    padding: 8,
  },
  emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  emptyText: {
     marginTop: 16,
     fontSize: 18,
     color: '#888'
  }
});
