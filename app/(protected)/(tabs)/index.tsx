import ParallaxScrollView from '@/components/ParallaxScrollView';
import FInvestmentsCard from '@/components/organisms/FInvestmentsCard/FInvestmentsCard';
import FSummaryCard from '@/components/organisms/FSummaryCard/FSummaryCard';

import { useAuth } from '@/context/AuthContext';

import { useAccount } from '@/context/AccountContext';

import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export default function HomeScreen() {
  const { user } = useAuth();
  const { account } = useAccount();

  const fadeInSummary = useSharedValue(0);
  const fadeInInvestments = useSharedValue(0);

  const fadeInSummaryStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInSummary.value,
    };
  });

  const fadeInInvestmentsStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInInvestments.value,
    };
  });

  useEffect(() => {
    fadeInSummary.value = withTiming(1, { duration: 1000 });
    fadeInInvestments.value = withDelay(500, withTiming(1, { duration: 1000 }));
  }, []);

  return (
    <ParallaxScrollView>
      <Animated.View style={fadeInSummaryStyle}>
        <FSummaryCard user={user} account={account} />
      </Animated.View>

      <Animated.View style={fadeInInvestmentsStyle}>
        <FInvestmentsCard />
      </Animated.View>
    </ParallaxScrollView>
  );
}
