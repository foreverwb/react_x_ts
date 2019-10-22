import React, { ReactElement } from 'react';
import { scopedClassMaker } from '../untils/classes';
import './slides.scss';

const sc = scopedClassMaker('ui-slides');

interface IProps {
  current?: number;
  defaultCurrent?: number;
  vertical?: boolean;
  autoplay?: boolean;
  className?: string;
  navVisible?: boolean;
  children: Array<ReactElement<any>>
  beforeChange?: (current: number) => void
  afterChange?: (current: number, prev: number) => void
}

interface IState {
  current?: number;
  width?: number;
}

class Slides extends React.Component<IProps, IState> {
  private readonly refSlides: React.RefObject<HTMLDivElement>;
  private readonly refSlidesInner: React.RefObject<HTMLDivElement>;
  private prev: number;
  private autoplayTimerId: number;

  static defaultProps = {
    navVisible: true
  };

  constructor(props: IProps) {
    super(props);

    this.refSlides = React.createRef();
    this.refSlidesInner = React.createRef();

    if ('defaultCurrent' in this.props) {
      this.state = {
        current: this.props.defaultCurrent,
        width: 0
      };
    } else {
      this.state = {
        width: 0
      };
    }
  }

  componentDidMount(): void {
    const width = this.refSlides.current!.offsetWidth;
    this.refSlidesInner.current!.addEventListener('transitionend', this.afterChange.bind(this));
    const { autoplay, children } = this.props;
    if (autoplay) {
      this.autoplayTimerId = window.setInterval(() => {
        if (this.current === children.length) {
          this.current = 1;
        } else {
          this.current += 1;
        }
      }, 2000);
    }

    this.setState({ width }, () => {
      this.current = this.current;
      this.refSlidesInner.current!.style.transition = 'transform 1s';
    });
  }

  componentWillUnmount(): void {
    this.refSlidesInner.current!.removeEventListener('transitionend', this.afterChange.bind(this));
    window.clearInterval(this.autoplayTimerId);
  }

  afterChange(): void {
    const { afterChange } = this.props;
    afterChange && afterChange(this.current, this.prev);
  }

  get current() {
    return ('defaultCurrent' in this.props ? this.state.current : this.props.current) || 1;
  }

  set current(value: number) {
    const { beforeChange } = this.props;
    this.prev = this.current;
    beforeChange && beforeChange(value);
    if ('defaultCurrent' in this.props) {
      this.setState({
        current: value
      });
    }
    this.jumpTo(value);
  }

  jumpTo(value: number): void {
    this.refSlidesInner.current!.style.transform = `translateX(-${(this.state.width || 0) * (value - 1)}px)`;
  }

  renderNav() {
    const { children } = this.props;
    return (
      <div className={sc('nav')}>
        {
          children.map((entry: ReactElement<any>, idx) => {
            const active: string = this.current === idx + 1 ? 'active' : '';
            return <span className={active} key={idx} onClick={e => this.current = idx + 1}/>;
          })
        }
      </div>
    );
  }

  renderChildren() {
    const { width } = this.state;
    const { children } = this.props;
    return (
      <div
        className={sc('inner')}
        ref={this.refSlidesInner}
        style={{ width: (width || 0) * children.length }}
      >
        {
          this.props.children.map((entry, idx) => {
            return <div key={idx} className={sc('slide')}>{entry}</div>;
          })
        }
      </div>
    );
  }

  render() {
    const { className, navVisible } = this.props;
    return (
      <div className={`${sc('')} ${className}`} ref={this.refSlides}>
        {this.renderChildren()}
        {navVisible && this.renderNav()}
      </div>
    );
  }
}

export default Slides;