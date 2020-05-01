import React from 'react';
import TreeItem from './tree-item';

const Tree: React.FC<TreeProps> = props => {
  return (
    <div>
      {props.sourceData.map(o =>
        <TreeItem
          key={o.value}
          treeProps={props}
          item={o}
          level={1}
        />
      )}
    </div>
  )
};

export default Tree;