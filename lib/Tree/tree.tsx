import React from 'react';
import TreeItem from './tree-item';

const Tree: React.FC<TreeProps> = props => {
  const onItemChange = (values: string[] | string) => {
    if (props.multiple) {
      props.onChange(Array.from(new Set(values)) as string[])
    } else {
      props.onChange(values as string)
    }
  }
  return (
    <div>
      {props.sourceData.map(o =>
        <TreeItem
          key={o.value}
          treeProps={props}
          item={o}
          level={1}
          onItemChange={onItemChange}
        />
      )}
    </div>
  )
};

export default Tree;