import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  ViewToken,
} from 'react-native';
import {
  getNextDate,
  getNextDates,
  getPreviousDates,
} from '../../utils/dateUtils';
import { deviceLocale } from '../../utils/localeUtils';

interface Props {
  testID: string;
  dates: Date[];
  pageSize: number;
}

interface State {
  xStart: number;
  xEnd: number;
  dates: Date[];
  visibleItem: Date;
  loadPrevious: boolean;
  visibleYear: number;
}

interface Style {
  container: ViewStyle;
  containerYear: ViewStyle;
  textYear: ViewStyle;
  containerCalendarItem: ViewStyle;
  textCalendarItem: ViewStyle;
}

export class CalendarList extends React.PureComponent<Props, State> {
  private readonly viewabilityConfig: {
    viewAreaCoveragePercentThreshold: number;
    waitForInteraction: boolean;
  };

  private locale: string;

  constructor(props: Props) {
    super(props);

    this.state = {
      visibleYear: new Date().getFullYear(),
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

    this.locale = deviceLocale.split('_')[0];
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

  setXStart = (x: number) => {
    this.setState({ xStart: x });
  };

  setXEnd = (x: number) => {
    this.setState({ xEnd: x });
  };

  setLoadPrevious = (loadPrevious: boolean) => {
    this.setState({ loadPrevious });
  };

  renderCalendarItem: ListRenderItem<any> = ({ item }) => {
    return (
      <View style={styles.containerCalendarItem}>
        <Text style={styles.textCalendarItem}>
          {new Intl.DateTimeFormat(this.locale, {
            month: 'short',
          }).format(item)}
        </Text>
        <Text style={styles.textCalendarItem}>
          {new Intl.DateTimeFormat(this.locale, {
            weekday: 'short',
          }).format(item)}
        </Text>
        <Text style={styles.textCalendarItem}>{item.getDate()}</Text>
      </View>
    );
  };

  onViewableItemsChanged = (info: {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>;
  }) => {
    const { viewableItems } = info;
    this.setVisibleItem(viewableItems[0].item);
    this.setVisibleYear(viewableItems[0].item.getFullYear());
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
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.containerYear}>
          <Text style={styles.textYear}>{visibleYear}</Text>
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
            console.log('onScrollBeginDrag');
            this.setXStart(event.nativeEvent.contentOffset.x);
          }}
          onScrollEndDrag={(event) => {
            console.log('onScrollEndDrag');
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
  containerYear: {
    marginBottom: 10,
  },
  textYear: {
    fontSize: 24,
  },
  containerCalendarItem: {
    flexDirection: 'column',
    marginHorizontal: 12,
  },
  textCalendarItem: {
    fontSize: 16,
  },
});
