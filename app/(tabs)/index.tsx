import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type Goal = {
  id: string;
  text: string;
  isDone: boolean;
};

export default function HomeScreen() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const addOrUpdateGoal = () => {
    if (inputText.trim() === '') return;

    if (editingId) {
      setGoals(
        goals.map((goal) =>
          goal.id === editingId ? { ...goal, text: inputText } : goal
        )
      );
      setEditingId(null);
    } else {
      setGoals([
        ...goals,
        {
          id: Date.now().toString(),
          text: inputText,
          isDone: false,
        },
      ]);
    }
    setInputText('');
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setInputText('');
    }
  };

  const toggleGoalStatus = (id: string) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, isDone: !goal.isDone } : goal
      )
    );
  };

  const startEdit = (goal: Goal) => {
    setEditingId(goal.id);
    setInputText(goal.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setInputText('');
  };

  const renderGoalItem = ({ item }: { item: Goal }) => (
    <View style={styles.goalItem}>
      <TouchableOpacity
        onPress={() => toggleGoalStatus(item.id)}
        style={styles.checkbox}
      >
        {item.isDone ? (
          <Ionicons name="checkmark-circle" size={24} color="#1D3D47" />
        ) : (
          <Ionicons name="ellipse-outline" size={24} color="#888" />
        )}
      </TouchableOpacity>
      
      <Text
        style={[
          styles.goalText,
          item.isDone && styles.goalTextDone,
        ]}
      >
        {item.text}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => startEdit(item)}
          style={styles.actionButton}
        >
          <Ionicons name="pencil-outline" size={20} color="#1D3D47" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteGoal(item.id)}
          style={styles.actionButton}
        >
          <Ionicons name="trash-outline" size={20} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>My Goals</Text>
          <Text style={styles.subtitle}>
            {goals.filter((g) => g.isDone).length} of {goals.length} completed
          </Text>
        </View>

        <FlatList
          data={goals}
          renderItem={renderGoalItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No goals yet. Add one below!</Text>
          }
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="What do you want to achieve?"
            placeholderTextColor="#888"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={addOrUpdateGoal}
          />
          {editingId ? (
            <View style={styles.editButtons}>
               <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelEdit}>
                 <Ionicons name="close" size={24} color="#fff" />
               </TouchableOpacity>
               <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={addOrUpdateGoal}>
                 <Ionicons name="checkmark" size={24} color="#fff" />
               </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={addOrUpdateGoal}>
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1D3D47',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexGrow: 1,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  checkbox: {
    marginRight: 12,
  },
  goalText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  goalTextDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#f0f2f5',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginRight: 12,
    color: '#333',
  },
  editButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#1D3D47',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1D3D47',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  updateButton: {
      backgroundColor: '#4CAF50'
  },
  cancelButton: {
      backgroundColor: '#f44336'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
    fontSize: 16,
  },
});
