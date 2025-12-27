import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  MoreVertical,
  Gift,
  CheckCircle,
  Lightbulb,
  Briefcase,
  BookOpen,
  Plus,
} from 'lucide-react-native';
import FilterChip from '@/components/FilterChip';
import AIInsightCard from '@/components/AIInsightCard';
import NoteItem from '@/components/NoteItem';
import MoveToFolderModal from '@/components/MoveToFolderModal';

const iconMap: Record<string, any> = {
  gift: Gift,
  check: CheckCircle,
  lightbulb: Lightbulb,
  briefcase: Briefcase,
  book: BookOpen,
  plus: Plus,
};

const notes = [
  {
    id: '1',
    type: 'voice' as const,
    timestamp: 'Today, 2:34 PM',
    content:
      "Check out the Sony WH-1000XM5 headphones for Mom's birthday. She...",
    isStarred: false,
  },
  {
    id: '2',
    type: 'voice' as const,
    timestamp: 'Dec 20, 10:42 AM',
    content:
      "Look into spa day package at that new wellness center downtown. She's been...",
    isStarred: true,
  },
  {
    id: '3',
    type: 'typed' as const,
    timestamp: 'Dec 18, 3:15 PM',
    content:
      'Kindle Paperwhite - she loves reading but complains about carrying books around. The...',
    isStarred: false,
  },
  {
    id: '4',
    type: 'voice' as const,
    timestamp: 'Dec 15, 8:22 AM',
    content:
      "Maybe a cooking class subscription? She's been watching a lot of cooking...",
    isStarred: false,
  },
  {
    id: '5',
    type: 'typed' as const,
    timestamp: 'Dec 12, 4:50 PM',
    content:
      'Smart plant sensor for her garden. She always forgets to water her plants. Something...',
    isStarred: true,
  },
  {
    id: '6',
    type: 'voice' as const,
    timestamp: 'Dec 10, 11:30 AM',
    content:
      'Photo album with family pictures from this year. Could use Shutterfly or Artifact...',
    isStarred: false,
  },
];

export default function FolderDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');
  const [isMoveModalVisible, setIsMoveModalVisible] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const folderName = (params.name as string) || 'Present Ideas';
  const folderIcon = (params.icon as string) || 'gift';
  const folderColor = (params.color as string) || '#6366F1';

  const IconComponent = iconMap[folderIcon] || Gift;

  const handleMoveNote = (noteId: string) => {
    setSelectedNoteId(noteId);
    setIsMoveModalVisible(true);
  };

  const handleMove = (folderId: string) => {
    Alert.alert('Success', `Note moved to folder ${folderId}`);
    setSelectedNoteId(null);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color="#1F2937" strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={[styles.folderIcon, { backgroundColor: folderColor }]}>
            <IconComponent color="white" size={20} strokeWidth={2} />
          </View>
          <View>
            <Text style={styles.folderName}>{folderName}</Text>
            <Text style={styles.folderStats}>24 Snippets • 5 Voice Notes</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
          <MoreVertical size={24} color="#1F2937" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          <FilterChip
            label="All"
            isActive={activeFilter === 'All'}
            onPress={() => setActiveFilter('All')}
          />
          <FilterChip
            label="🎙 Voice"
            isActive={activeFilter === 'Voice'}
            onPress={() => setActiveFilter('Voice')}
          />
          <FilterChip
            label="✏️ Typed"
            isActive={activeFilter === 'Typed'}
            onPress={() => setActiveFilter('Typed')}
          />
          <FilterChip
            label="⭐ Starred"
            isActive={activeFilter === 'Starred'}
            onPress={() => setActiveFilter('Starred')}
          />
        </ScrollView>

        <AIInsightCard
          insight="You've mentioned 'Sony Headphones' and 'Mom's Birthday' 3 times this month."
        />

        <View style={styles.notesList}>
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              type={note.type}
              timestamp={note.timestamp}
              content={note.content}
              isStarred={note.isStarred}
              onMove={() => handleMoveNote(note.id)}
            />
          ))}
        </View>
      </ScrollView>

      <MoveToFolderModal
        isVisible={isMoveModalVisible}
        onClose={() => setIsMoveModalVisible(false)}
        onMove={handleMove}
      />

      <TouchableOpacity
        style={[styles.fab, { bottom: Math.max(insets.bottom, 20) }]}
        activeOpacity={0.8}
      >
        <Plus size={28} color="white" strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    gap: 12,
  },
  folderIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  folderName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  folderStats: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  notesList: {
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});
