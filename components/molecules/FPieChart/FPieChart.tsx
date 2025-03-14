import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { Colors } from '@/constants/Colors';

type PieChartData = {
  name: string;
  value: number;
  color: string;
};

interface PieChartComponentProps {
  data: PieChartData[];
}

const screenWidth = Dimensions.get('window').width;

export const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
}) => {
  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const theme = useTheme();
  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="value"
        backgroundColor="transparent"
        center={[80, 10]}
        paddingLeft="15"
        hasLegend={false}
      />
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[styles.legendColorBox, { backgroundColor: item.color }]}
            />
            <Text style={[styles.legendText, { color: theme.colors.primary }]}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  legendContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
  },
});
