import React from 'react';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from './styles';

const TextEle = ({ variant, style, ...rest }) => {
  const { colors } = useTheme();
  return (
    <Text
      allowFontScaling={false}
      style={[{ color: colors.text }, styles[variant], style]}
      {...rest}
    />
  );
};

TextEle.propTypes = {
  variant: PropTypes.oneOf([
    'header1',
    'header2',
    'title',
    'subTitle1',
    'subTitle2',
    'body1',
    'body2',
    'caption',
    'buttonText',
    'overlineText',
    'error',
  ]),
  style: Text.propTypes.style,
};

TextEle.defaultProps = {
  variant: 'body1',
  style: {},
};

export default TextEle;
