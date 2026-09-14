const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.platforms = ['ios', 'android', 'native', 'web'];

config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

config.resolver.sourceExts = [...config.resolver.sourceExts, 'web.js', 'web.ts', 'web.tsx'];

const originalResolver = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web') {
    if (moduleName === 'react-native-maps' || 
        moduleName.startsWith('react-native-maps/') ||
        moduleName.includes('codegenNativeCommands') ||
        moduleName.includes('MapMarkerNativeComponent') ||
        moduleName.includes('react-native/Libraries/Utilities/codegenNativeCommands')) {
      return {
        type: 'empty',
      };
    }
    
    const nativeModules = [
      'react-native-vector-icons',
      '@react-native-community/geolocation',
      'react-native-permissions'
    ];
    
    if (nativeModules.some(mod => moduleName.startsWith(mod))) {
      return {
        type: 'empty',
      };
    }
  }
  
  if (originalResolver) {
    return originalResolver(context, moduleName, platform);
  }
  
  return context.resolveRequest(context, moduleName, platform);
};

if (config.transformer) {
  config.transformer.getTransformOptions = async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  });
}

module.exports = config;
