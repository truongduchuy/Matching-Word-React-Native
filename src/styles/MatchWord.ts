import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    marginTop: 40,
  },
  columnContainer: {
    width: 128,
    alignItems: 'center',
  },
  titleBoxEnglish: {
    backgroundColor: '#337ab7',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  titleBoxFrench: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  wordBoxEnglish: {
    borderColor: '#337ab7',
    borderWidth: 1,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 1,
  },
  wordBoxFrench: {
    borderColor: '#4CAF50',
    borderWidth: 1,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 1,
  },
  wordText: {
    fontSize: 14,
  },
  frenchBox: {
    marginTop: 100,
  },
  button: {
    position: 'absolute',
    right: 25,
    top: 25,
    backgroundColor: '#4CAF50',
    color: 'white',
    paddingBlock: 10,
    paddingInline: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gradeText: {
    position: 'absolute',
    right: 25,
    top: 75,
  },
});
