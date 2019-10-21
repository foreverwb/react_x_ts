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
        >
          <div className="card"><h3>1</h3></div>
          <div className="card"><h3>2</h3></div>
          <div className="card"><h3>3</h3></div>
        </Slides>
      </div>
    </div>
  );
}