import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  PanResponder,
} from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from 'expo-blur';

interface AppModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  style?: ViewStyle;
}

export default function AppModal({
  isVisible,
  onClose,
  children,
  style,
}: AppModalProps) {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return gestureState.dy > 5;
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 50) {
        onClose();
      }
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      style={styles.modal}
      propagateSwipe={true}
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={300}
      animationInTiming={400}
      animationOutTiming={300}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
    >
      <View style={styles.backdropBlur}>
        <View style={[styles.modalContent, style]} {...panResponder.panHandlers}>
          <View style={styles.swipeIndicator} />
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  backdropBlur: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 32,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
  },
  swipeIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
});
