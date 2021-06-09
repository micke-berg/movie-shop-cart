import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars';

const CustomScrollbars = ({ props, style }) => {

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: "rgba(120, 120, 120, 0.9)"
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  const CustomScrollbars = props => (
    <Scrollbars
      renderThumbVertical={renderThumb}
      {...props}
    />
  );
  return (
    <CustomScrollbars
      >
      {props}
    </CustomScrollbars>
  )
}

export default CustomScrollbars
