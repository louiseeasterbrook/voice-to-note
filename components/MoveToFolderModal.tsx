import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  X,
  Gift,
  CheckCircle,
  Lightbulb,
  Briefcase,
  BookOpen,
  FolderOpen,
  Archive,
  Image as ImageIcon,
  Download,
} from 'lucide-react-native';
import AppModal from './AppModal';

interface Folder {
  id: string;
  name: string;
  itemCount: number;
  color: string;
  icon: string;
}

interface MoveToFolderModalProps {
  isVisible: boolean;
  onClose: () => void;
  onMove: (folderId: string) => void;
}

const iconMap: Record<string, any> = {
  gift: Gift,
  check: CheckCircle,
  lightbulb: Lightbulb,
  briefcase: Briefcase,
  book: BookOpen,
  folder: FolderOpen,
  archive: Archive,
  image: ImageIcon,
  download: Download,
};

const folders: Folder[] = [
  {
    id: '1',
    name: 'Work Documents',
    itemCount: 24,
    color: '#3B82F6',
    icon: 'briefcase',
  },
  {
    id: '2',
    name: 'Personal',
    itemCount: 18,
    color: '#8B5CF6',
    icon: 'folder',
  },
  {
    id: '3',
    name: 'Projects',
    itemCount: 42,
    color: '#10B981',
    icon: 'lightbulb',
  },
  {
    id: '4',
    name: 'Archive',
    itemCount: 156,
    color: '#F59E0B',
    icon: 'archive',
  },
  {
    id: '5',
    name: 'Photos',
    itemCount: 89,
    color: '#EC4899',
    icon: 'image',
  },
  {
    id: '6',
    name: 'Downloads',
    itemCount: 31,
    color: '#6366F1',
    icon: 'download',
  },
];

export default function MoveToFolderModal({
  isVisible,
  onClose,
  onMove,
}: MoveToFolderModalProps) {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const handleMove = () => {
    if (selectedFolder) {
      onMove(selectedFolder);
      onClose();
      setSelectedFolder(null);
    }
  };

  const handleCancel = () => {
    setSelectedFolder(null);
    onClose();
  };

  return (
    <AppModal isVisible={isVisible} onClose={handleCancel}>
      <View style={styles.header}>
        <Text style={styles.title}>Move to Folder</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleCancel}
          activeOpacity={0.7}
        >
          <X size={24} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Select a destination folder</Text>

      <ScrollView
        style={styles.folderList}
        showsVerticalScrollIndicator={false}
      >
        {folders.map((folder) => {
          const IconComponent = iconMap[folder.icon] || FolderOpen;
          const isSelected = selectedFolder === folder.id;

          return (
            <TouchableOpacity
              key={folder.id}
              style={[
                styles.folderItem,
                isSelected && styles.folderItemSelected,
              ]}
              onPress={() => setSelectedFolder(folder.id)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.folderIconContainer,
                  { backgroundColor: folder.color + '20' },
                ]}
              >
                <IconComponent
                  color={folder.color}
                  size={24}
                  strokeWidth={2}
                />
              </View>
              <View style={styles.folderInfo}>
                <Text style={styles.folderName}>{folder.name}</Text>
                <Text style={styles.folderCount}>{folder.itemCount} items</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.moveButton,
            !selectedFolder && styles.moveButtonDisabled,
          ]}
          onPress={handleMove}
          activeOpacity={0.7}
          disabled={!selectedFolder}
        >
          <Text style={styles.moveButtonText}>Move</Text>
        </TouchableOpacity>
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  folderList: {
    maxHeight: 400,
    paddingHorizontal: 20,
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#FAFAFA',
  },
  folderItemSelected: {
    backgroundColor: '#EEF2FF',
    borderWidth: 2,
    borderColor: '#6366F1',
  },
  folderIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  folderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  folderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  folderCount: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  moveButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveButtonDisabled: {
    backgroundColor: '#C7D2FE',
  },
  moveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
