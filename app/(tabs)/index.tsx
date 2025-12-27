import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mic, Brain, Settings } from 'lucide-react-native';
import FolderCard from '@/components/FolderCard';

const folders = [
  {
    id: '1',
    name: 'Present Ideas',
    description: "Mom's birthday gift - handmade jewelry or",
    itemCount: 3,
    color: '#6366F1',
    icon: 'gift' as const,
  },
  {
    id: '2',
    name: 'Quick To-Do',
    description: 'Call dentist for appointment tomorrow',
    itemCount: 7,
    color: '#EC4899',
    icon: 'check' as const,
  },
  {
    id: '3',
    name: 'Random Thoughts',
    description: 'What if plants could communicate through',
    itemCount: 12,
    color: '#06B6D4',
    icon: 'lightbulb' as const,
  },
  {
    id: '4',
    name: 'Work Notes',
    description: 'Meeting with client about new project',
    itemCount: 5,
    color: '#10B981',
    icon: 'briefcase' as const,
  },
  {
    id: '5',
    name: 'Learning',
    description: 'Spanish vocabulary: mañana means',
    itemCount: 8,
    color: '#F59E0B',
    icon: 'book' as const,
  },
  {
    id: '6',
    name: 'New Folder',
    description: 'Tap to create',
    itemCount: 0,
    color: '#A7F3D0',
    icon: 'plus' as const,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleFolderPress = (folder: typeof folders[0]) => {
    router.push({
      pathname: '/folder/[id]',
      params: {
        id: folder.id,
        name: folder.name,
        icon: folder.icon,
        color: folder.color,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Smart Folders</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            activeOpacity={0.7}
            onPress={() => router.push('/settings')}
          >
            <Settings size={22} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {folders.map((folder) => (
            <View key={folder.id} style={styles.gridItem}>
              <FolderCard
                name={folder.name}
                description={folder.description}
                itemCount={folder.itemCount}
                color={folder.color}
                icon={folder.icon}
                onPress={() => handleFolderPress(folder)}
              />
            </View>
          ))}
        </View>

        <View style={styles.centerSection}>
          <View style={styles.brainContainer}>
            <Brain size={40} color="#D1D5DB" strokeWidth={2} />
          </View>
          <Text style={styles.captureText}>Start capturing your thoughts</Text>
          <Text style={styles.subText}>Speak or type to begin</Text>
        </View>
      </ScrollView>

      <View
        style={[
          styles.inputContainer,
          { paddingBottom: Math.max(insets.bottom, 20) },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Type your thought..."
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity style={styles.micButton} activeOpacity={0.8}>
          <Mic size={24} color="white" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1F2937',
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 16,
  },
  gridItem: {
    width: '47%',
  },
  centerSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  brainContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  captureText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 12,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#F9FAFB',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#1F2937',
  },
  micButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
