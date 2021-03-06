import React from 'react';
import {
  FlatList,
  Text,
  TextStyle,
  View,
  ViewStyle,
  ViewToken,
} from 'react-native';
import { s, ScaledSheet, vs } from 'react-native-size-matters';
import {
  getDateAtMidnight,
  getDateMonthLocal,
  getNextDate,
  getNextDates,
  getPreviousDates,
} from '../../utils/dateUtils';
import { deviceLocaleLang } from '../../utils/localeUtils';
import { colors } from '../../design/colors';
import Button from '../Button';
import { CalendarItem } from './CalendarItem';

interface Props {
  testID: string;
  dates: Date[];
  dateSelected: number;
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
  currentDayIsVisible: boolean;
}

interface Style {
  container: ViewStyle;
  containerList: ViewStyle;
  containerHeader: ViewStyle;
  textHeader: TextStyle;
  containerItem: ViewStyle;
  textItem: TextStyle;
  textBold: TextStyle;
}

export type SelectedDate = Date;

export class CalendarList extends React.PureComponent<Props, State> {
  private readonly viewabilityConfig: {
    viewAreaCoveragePercentThreshold: number;
    waitForInteraction: boolean;
  };

  private readonly locale: string;
  private calendarRef: FlatList<Date> | null;

  constructor(props: Props) {
    super(props);

    this.calendarRef = null;
    this.locale = deviceLocaleLang();

    this.state = {
      visibleYear: new Date().getFullYear(),
      visibleMonth: getDateMonthLocal(new Date(), this.locale),
      xStart: 0,
      xEnd: 0,
      dates: props.dates,
      visibleItem: props.dates[0],
      loadPrevious: false,
      currentDayIsVisible: true,
    };

    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 0,
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

  setCurrentDayIsVisible = (currentDayIsVisible: boolean) => {
    this.setState({ currentDayIsVisible });
  };

  handleListItemPress = (item: Date) => {
    const { onSelectDate } = this.props;
    // Visible items in the FlatList after few scrolls may have slightly offset.
    // onPress then triggers scroll animation of the list items which triggers data load
    // Following line prevents load previous dates in such cases.
    this.setLoadPrevious(false);

    onSelectDate(item);
  };

  // Handle FlatList visible items change in order to provide year and month
  // for the visible dates and data for making the decision on whether we need
  // to prepend previous dates on scroll to the left
  onViewableItemsChanged = (info: {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>;
  }) => {
    const { viewableItems } = info;

    let viewTokens = viewableItems?.filter((viewToken) => viewToken.isViewable);
    let date = viewTokens.length ? viewableItems[0].item : null;

    if (date) {
      this.setVisibleItem(date);
      this.setVisibleYear(date.getFullYear());
      this.setVisibleMonth(
        new Intl.DateTimeFormat(this.locale, {
          month: 'long',
        }).format(date),
      );
    }
  };

  handleBackToToday = () => {
    const { dates } = this.state;
    const { onSelectDate } = this.props;
    let today = getDateAtMidnight(new Date());

    // Serialize dates collection as integer since two Date objects will never be equal
    const index = dates.map(Number).indexOf(+today.valueOf());

    this.setCurrentDayIsVisible(true);

    // Scroll to current date
    if (index !== -1) {
      this.calendarRef?.scrollToIndex({
        animated: false,
        index,
      });
    }

    onSelectDate(today);
  };

  render() {
    const { testID, pageSize, dateSelected } = this.props;
    const {
      dates,
      xStart,
      xEnd,
      visibleItem,
      loadPrevious,
      visibleYear,
      visibleMonth,
      currentDayIsVisible,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Text style={styles.textHeader}>{visibleMonth}</Text>
          <Text style={styles.textHeader}>{visibleYear}</Text>
        </View>
        <FlatList
          ref={(ref) => (this.calendarRef = ref)}
          testID={testID}
          contentContainerStyle={styles.containerList}
          data={dates}
          keyExtractor={(item) => item.valueOf().toString()}
          renderItem={({ item }) => (
            <CalendarItem
              dateSelected={dateSelected}
              onPress={this.handleListItemPress}
              item={item}
            />
          )}
          horizontal={true}
          bounces={true}
          initialNumToRender={pageSize}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          onScrollToIndexFailed={(info) => {
            // scrollToIndex should be used in conjunction with onScrollToIndexFailed
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              this.calendarRef?.scrollToIndex({
                index: info.index,
                animated: false,
              });
            });
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
          onMomentumScrollBegin={() => {
            const isCurrentDayIsVisible =
              visibleItem.toLocaleDateString() ===
              getDateAtMidnight(new Date()).toLocaleDateString();

            if (xStart > xEnd) {
              // Scroll direction is left
              if (loadPrevious) {
                // we need to prepend previous dates
                const nextDates = getPreviousDates(dates[0], pageSize);
                this.setDates(nextDates.concat(dates));

                this.setCurrentDayIsVisible(false);
              } else {
                this.setCurrentDayIsVisible(isCurrentDayIsVisible);
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

              this.setCurrentDayIsVisible(isCurrentDayIsVisible);
            }
          }}
        />
        {!currentDayIsVisible && (
          <Button
            testID="BackTodayButton"
            title="Get back to today"
            onPress={this.handleBackToToday}
          />
        )}
      </View>
    );
  }
}

const styles = ScaledSheet.create<Style>({
  container: {
    marginHorizontal: 0,
    height: vs(180),
  },
  containerList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: vs(24),
    marginHorizontal: s(16),
  },
  textHeader: {
    fontSize: s(24),
    color: colors.textCalendar,
  },
  containerItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: s(59),
  },
  textItem: {
    fontSize: s(18),
    color: colors.textCalendar,
  },
  textBold: {
    fontWeight: 'bold',
  },
});
