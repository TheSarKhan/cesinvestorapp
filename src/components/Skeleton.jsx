import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

// Yüklənmə skeleti — yumşaq pulse animasiyası.
// width/height/radius prop-ları; className ilə də ölçü vermək olar.
export function Skeleton({ width, height = 16, radius = 8, className = '', style }) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      className={`bg-bg-sunk ${className}`}
      style={[
        { opacity, borderRadius: radius },
        width != null ? { width } : null,
        height != null ? { height } : null,
        style,
      ]}
    />
  );
}

export default Skeleton;
