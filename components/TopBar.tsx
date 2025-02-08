import { View, StyleSheet } from 'react-native';

export default function TopBar() {
  return (
    <View style={styles.container}>
      <View style={{ width: 25, height: 25, borderRadius: 25, backgroundColor: 'black' }} />
      <View style={{ width: 25, height: 25, borderRadius: 25, backgroundColor: 'red' }} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  }
})