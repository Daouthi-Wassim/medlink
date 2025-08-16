const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configure resolver to handle platform-specific modules
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Add resolver configuration for web platform
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Configure platform-specific extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, 'web.js', 'web.ts', 'web.tsx'];

// Add custom resolver to handle react-native-maps on web
const originalResolver = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Block react-native-maps and other native-only modules on web
  if (platform === 'web') {
    // Block react-native-maps completely
    if (moduleName === 'react-native-maps' || 
        moduleName.startsWith('react-native-maps/') ||
        moduleName.includes('codegenNativeCommands') ||
        moduleName.includes('MapMarkerNativeComponent') ||
        moduleName.includes('react-native/Libraries/Utilities/codegenNativeCommands')) {
      return {
        type: 'empty',
      };
    }
    
    // Block other native modules that might cause issues
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
  
  // Use the default resolver for everything else
  if (originalResolver) {
    return originalResolver(context, moduleName, platform);
  }
  
  return context.resolveRequest(context, moduleName, platform);
};

// Add additional web-specific configurations
if (config.transformer) {
  config.transformer.getTransformOptions = async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  });
}

module.exports = config;