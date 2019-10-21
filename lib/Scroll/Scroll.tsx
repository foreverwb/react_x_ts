import React from 'react';
import './scroll.scss';
import { scopedClassMaker } from '../untils/classes';
import scrollbarWidth from './scrollbar-width';

const sc = scopedClassMaker('ui-scroll');

interface IProps extends React.HTMLAttributes<HTMLDivElement> {

}

const Scroll: React.FunctionComponent<IProps> = (props) => {
  const { children, ...restProps } = props;
  return (
    <div
      className={sc('')}
      {...restProps}
    >
      <div
        style={{ right: -scrollbarWidth() }}
        className={sc('inner')}
      >
        {children}
      </div>
    </div>
  );
};

export default Scroll;