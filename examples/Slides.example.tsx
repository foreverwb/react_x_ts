import React, { useState } from 'react';
import Slides from '../lib/Slides/Slides';

import './slides.example.scss';

export default function () {
  const [current, setCurrent] = useState(1);
  return (
    <div className="SlidesExample">
      <h2>受控组件</h2>
      <div>
        <Slides
          className="slides-demo"
          current={current}
          beforeChange={(val: React.SetStateAction<number>) => setCurrent(val)}
          autoplay={true}
        >
          <div className="card"><h3>One</h3></div>
          <div className="card"><h3>Two</h3></div>
          <div className="card"><h3>Three</h3></div>
        </Slides>
      </div>
      <h2>非受控组件</h2>
      <div>
        <Slides className="slides-demo" defaultCurrent={1}>
          <div className="card"><h3>One</h3></div>
          <div className="card"><h3>Two</h3></div>
          <div className="card"><h3>Three</h3></div>
        </Slides>
      </div>
      <h2>不展示导航条</h2>
      <div>
        <Slides
          className="slides-demo"
          defaultCurrent={1}
          autoplay={true}
          navVisible={false}
        >
          <div className="card"><h3>One</h3></div>
          <div className="card"><h3>Two</h3></div>
          <div className="card"><h3>Three</h3></div>
        </Slides>
      </div>
    </div>
  );
}