import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Gift, CheckCircle, Lightbulb, Briefcase, BookOpen, Plus } from 'lucide-react-native';

type FolderCardProps = {
  name: string;
  description: string;
  itemCount: number;
  color: string;
  icon: 'gift' | 'check' | 'lightbulb' | 'briefcase' | 'book' | 'plus';
  onPress?: () => void;
};

export default function FolderCard({
  name,
  description,
  itemCount,
  color,
  icon,
  onPress,
}: FolderCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'gift':
        return <Gift color="white" size={24} strokeWidth={2} />;
      case 'check':
        return <CheckCircle color="white" size={24} strokeWidth={2} />;
      case 'lightbulb':
        return <Lightbulb color="white" size={24} strokeWidth={2} />;
      case 'briefcase':
        return <Briefcase color="white" size={24} strokeWidth={2} />;
      case 'book':
        return <BookOpen color="white" size={24} strokeWidth={2} />;
      case 'plus':
        return <Plus color="white" size={24} strokeWidth={2} />;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        {getIcon()}
        <Text style={styles.title}>{name}</Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>

      <Text style={styles.itemCount}>{itemCount} items</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    height: 160,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    flexWrap: 'wrap',
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 20,
    flexWrap: 'wrap',
  },
  itemCount: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
  },
});
