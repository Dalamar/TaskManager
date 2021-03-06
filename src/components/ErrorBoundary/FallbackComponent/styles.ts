import { StyleSheet, ViewStyle } from 'react-native';

interface Style {
  container: ViewStyle;
  content: ViewStyle;
  title: ViewStyle;
  subtitle: ViewStyle;
  error: ViewStyle;
  button: ViewStyle;
  buttonText: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: '300',
    paddingBottom: 16,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '800',
  },
  error: {
    paddingVertical: 16,
  },
  button: {
    backgroundColor: '#2196f3',
    borderRadius: 50,
    padding: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;
