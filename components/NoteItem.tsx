import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Mic, Pencil, Star, Share2 } from 'lucide-react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

type NoteItemProps = {
  type: 'voice' | 'typed';
  timestamp: string;
  content: string;
  isStarred?: boolean;
  onPress?: () => void;
  onStar?: () => void;
  onShare?: () => void;
  onMove?: () => void;
};

export default function NoteItem({
  type,
  timestamp,
  content,
  isStarred = false,
  onPress,
  onStar,
  onShare,
  onMove,
}: NoteItemProps) {
  const renderRightActions = () => {
    return (
      <View style={styles.swipeActionsContainer}>
        <TouchableOpacity
          style={styles.moveButton}
          activeOpacity={0.7}
          onPress={onMove}
        >
          <Text style={styles.moveButtonText}>Move</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootRight={false}
      containerStyle={styles.swipeableContainer}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          {type === 'voice' ? (
            <View style={styles.voiceIcon}>
              <Mic size={16} color="#6366F1" strokeWidth={2} />
            </View>
          ) : (
            <View style={styles.typedIcon}>
              <Pencil size={16} color="#8B5CF6" strokeWidth={2} />
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.timestamp}>{timestamp}</Text>
          <Text style={styles.content} numberOfLines={3}>
            {content}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={onStar} style={styles.actionButton}>
            <Star
              size={20}
              color={isStarred ? '#F59E0B' : '#D1D5DB'}
              fill={isStarred ? '#F59E0B' : 'none'}
              strokeWidth={2}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} style={styles.actionButton}>
            <Share2 size={18} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  swipeableContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  voiceIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typedIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    marginRight: 12,
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  content: {
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 22,
  },
  actionsContainer: {
    gap: 8,
    alignItems: 'center',
  },
  actionButton: {
    padding: 4,
  },
  swipeActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moveButton: {
    backgroundColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
    width: 88,
    height: '100%',
    borderRadius: 28,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 88,
    height: '100%',
    borderRadius: 28,
  },
  moveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
