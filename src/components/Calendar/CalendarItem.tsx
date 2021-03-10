import React from 'react';
import { s } from 'react-native-size-matters';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { getDateAtMidnight, getDateWeekDayLocal } from '../../utils/dateUtils';
import { colors } from '../../design/colors';
import { deviceLocaleLang } from '../../utils/localeUtils';

interface Props {
  testID?: string;
  item: Date;
  dateSelected: number;
  onPress: Function;
}

interface State {}

interface Style {
  containerItem: ViewStyle;
  textItem: TextStyle;
  textBold: TextStyle;
}

export class CalendarItem extends React.PureComponent<Props, State> {
  render() {
    const { testID, item, dateSelected, onPress } = this.props;
    const selectedDate = dateSelected === getDateAtMidnight(item).valueOf();
    const locale = deviceLocaleLang();

    return (
      <TouchableOpacity
        testID={testID}
        onPress={() => onPress(item)}
        style={styles.containerItem}>
        <Text style={[styles.textItem, selectedDate && styles.textBold]}>
          {getDateWeekDayLocal(item, locale)}
        </Text>
        <Text style={[styles.textItem, selectedDate && styles.textBold]}>
          {item.getDate()}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create<Style>({
  containerItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: s(50),
  },
  textItem: {
    fontSize: s(18),
    color: colors.textCalendar,
  },
  textBold: {
    fontWeight: 'bold',
  },
});
