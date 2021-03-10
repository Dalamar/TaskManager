import { TextStyle, ViewStyle } from 'react-native';
import { s, ScaledSheet, vs } from 'react-native-size-matters';

interface Style {
  container: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  error: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}

const styles = ScaledSheet.create<Style>({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: s(16),
  },
  title: {
    fontSize: s(48),
    fontWeight: '300',
    paddingBottom: vs(16),
  },
  subtitle: {
    fontSize: s(32),
    fontWeight: '800',
  },
  error: {
    paddingVertical: vs(16),
  },
  button: {
    backgroundColor: '#2196f3',
    borderRadius: s(50),
    padding: s(16),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;
