import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Platform, View } from 'react-native';

export async function cacheImageFromURL(url, key) {
  const fileUri = `${FileSystem.cacheDirectory}${key}.png`;

  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (fileInfo.exists) return fileUri;

  try {
    const downloaded = await FileSystem.downloadAsync(url, fileUri);
    return downloaded.uri;
  } catch (error) {
    console.error("Image download failed:", error);
    return url; // fallback
  }
}

export default function LocalFileManager({ uri, style, placeholder, ...props }) {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadImage() {
      if (!uri) return;

      setLoading(true);

      if (Platform.OS === 'web') {
        isMounted && setImageUri(uri);
        setLoading(false);
        return;
      }

      const key = uri.split('/').pop().split('?')[0];
      const localUri = await cacheImageFromURL(uri, key);

      if (isMounted) {
        setImageUri(localUri);
        setLoading(false);
      }
    }

    loadImage();

    return () => {
      isMounted = false; // prevent setting state on unmounted component
    };
  }, [uri]);

  if (loading && placeholder) {
    return placeholder; // custom placeholder if provided
  }

  if (loading) {
    return (
      <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: imageUri }}
      style={style}
      {...props}
    />
  );
}