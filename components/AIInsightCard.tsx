import { View, Text, StyleSheet } from 'react-native';
import { Sparkles } from 'lucide-react-native';

type AIInsightCardProps = {
  insight: string;
};

export default function AIInsightCard({ insight }: AIInsightCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Sparkles size={20} color="#8B5CF6" strokeWidth={2} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>AI Insight</Text>
        <Text style={styles.insight} numberOfLines={3}>{insight}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F5F3FF',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  insight: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});
