import { openBrowserAsync } from 'expo-web-browser';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';

type Props = {
  href: string;
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
};

export function ExternalLink({ href, children, style, onPress }: Props) {
  const handlePress = async () => {
    if (onPress) {
      onPress();
    }
    
    if (Platform.OS !== 'web') {
      // Open the link in an in-app browser on native platforms
      await openBrowserAsync(href);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      {children}
    </TouchableOpacity>
  );
}
