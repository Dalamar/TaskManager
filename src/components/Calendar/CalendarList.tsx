import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  ViewToken,
} from 'react-native';
import {
  getDateMonthLocal,
  getDateWeekDayLocal,
  getNextDate,
  getNextDates,
  getPreviousDates,
} from '../../utils/dateUtils';
import { deviceLocale } from '../../utils/localeUtils';

interface Props {
  testID: string;
  dates: Date[];
  dateSelected: string;
  pageSize: number;
  onSelectDate: Function;
}

interface State {
  xStart: number;
  xEnd: number;
  dates: Date[];
  visibleItem: Date;
  loadPrevious: boolean;
  visibleYear: number;
  visibleMonth: string;
}

interface Style {
  container: ViewStyle;
  containerHeader: ViewStyle;
  textHeader: ViewStyle;
  containerItem: ViewStyle;
  textItem: ViewStyle;
}

export type SelectedDate = Date;

export class CalendarList extends React.PureComponent<Props, State> {
  private readonly viewabilityConfig: {
    viewAreaCoveragePercentThreshold: number;
    waitForInteraction: boolean;
  };

  private locale: string;

  constructor(props: Props) {
    super(props);

    this.locale = deviceLocale.split('_')[0];

    this.state = {
      visibleYear: new Date().getFullYear(),
      visibleMonth: getDateMonthLocal(new Date(), this.locale),
      xStart: 0,
      xEnd: 0,
      dates: props.dates,
      visibleItem: props.dates[0],
      loadPrevious: false,
    };

    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95,
    };
  }

  setDates = (dates: Date[]) => {
    this.setState({ dates });
  };

  setVisibleItem = (visibleItem: Date) => {
    this.setState({ visibleItem });
  };

  setVisibleYear = (visibleYear: number) => {
    this.setState({ visibleYear });
  };

  setVisibleMonth = (visibleMonth: string) => {
    this.setState({ visibleMonth });
  };

  setXStart = (x: number) => {
    this.setState({ xStart: x });
  };

  setXEnd = (x: number) => {
    this.setState({ xEnd: x });
  };

  setLoadPrevious = (loadPrevious: boolean) => {
    this.setState({ loadPrevious });
  };

  renderCalendarItem: ListRenderItem<SelectedDate> = ({ item }) => {
    const { onSelectDate, dateSelected } = this.props;
    const selectedDate = new Date(dateSelected).getDate() === item.getDate();

    return (
      <TouchableOpacity
        testID={item.toString()}
        onPress={() => onSelectDate(item)}
        style={styles.containerItem}>
        <Text
          style={[
            styles.textItem,
            selectedDate && {
              fontWeight: 'bold',
            },
          ]}>
          {getDateWeekDayLocal(item, this.locale)}
        </Text>
        <Text
          style={[
            styles.textItem,
            selectedDate && {
              fontWeight: 'bold',
            },
          ]}>
          {item.getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

  // Handle FlatList visible items change in order to provide year
  // for the visible dates and make decision on whether we need to prepend previous
  // dates on scroll to left
  onViewableItemsChanged = (info: {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>;
  }) => {
    const { viewableItems } = info;
    let date = viewableItems[0].item;
    this.setVisibleItem(date);
    this.setVisibleYear(date.getFullYear());
    this.setVisibleMonth(
      new Intl.DateTimeFormat(this.locale, {
        month: 'long',
      }).format(date),
    );
  };

  render() {
    const { testID, pageSize } = this.props;
    const {
      dates,
      xStart,
      xEnd,
      visibleItem,
      loadPrevious,
      visibleYear,
      visibleMonth,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Text style={styles.textHeader}>{visibleMonth}</Text>
          <Text style={styles.textHeader}>{visibleYear}</Text>
        </View>
        <FlatList
          testID={testID}
          renderItem={this.renderCalendarItem}
          data={dates}
          extraData={visibleItem}
          horizontal={true}
          bounces={true}
          keyExtractor={(item) => item.valueOf().toString()}
          pagingEnabled={true}
          windowSize={pageSize}
          initialNumToRender={pageSize}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          maintainVisibleContentPosition={{
            autoscrollToTopThreshold: null,
            minIndexForVisible: 0,
          }}
          onScrollBeginDrag={(event) => {
            this.setXStart(event.nativeEvent.contentOffset.x);
          }}
          onScrollEndDrag={(event) => {
            this.setXEnd(event.nativeEvent.contentOffset.x);

            if (xStart > event.nativeEvent.contentOffset.x) {
              // Scroll direction is left
              if (dates.indexOf(visibleItem) === 0) {
                // we need to prepend previous dates
                this.setLoadPrevious(true);
              } else {
                // we don't need to prepend previous dates
                this.setLoadPrevious(false);
              }
            }
          }}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          onMomentumScrollEnd={() => {
            if (xStart > xEnd) {
              // Scroll direction is left
              if (loadPrevious) {
                // we need to prepend previous dates
                const nextDates = getPreviousDates(dates[0], pageSize);
                nextDates.concat(dates);
                this.setDates(nextDates);
              }
            } else {
              // Scroll direction is right
              const lastDate = dates[dates.length - 1];
              const nextDates = getNextDates(
                getNextDate(lastDate, 1),
                pageSize,
              );
              dates.push(...nextDates);
              this.setDates(dates);
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create<Style>({
  container: {
    marginHorizontal: 10,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textHeader: {
    fontSize: 24,
  },
  containerItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  textItem: {
    fontSize: 18,
  },
});
