import { Text, StyleSheet, TouchableOpacity } from 'react-native';

type FilterChipProps = {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
};

export default function FilterChip({
  label,
  isActive = false,
  onPress,
}: FilterChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, isActive && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, isActive && styles.labelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  labelActive: {
    color: 'white',
  },
});
