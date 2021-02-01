import React, { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';

const CustomScrollbars = ({props}) => {
  const [top, setTop] = useState(0);

const handleScrollFrame = (values) => {
    // const top = values;
    setTop(values);
}

const renderView = ({ style, ...props }) => {
    const color = top * 255;
    const customStyle = {
        backgroundColor: `rgb(${color}, ${color}, ${color})`
    };
    return (
        <div {...props} style={{ ...style, ...customStyle }}/>
    );
}
  return (
    <Scrollbars
      
      renderView={renderView}
      onScrollFrame={handleScrollFrame}
      {...props}
      />
      
      
      
    //   {props.children}
    // </Scrollbars>
  )
}

export default CustomScrollbars
