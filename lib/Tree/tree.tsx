import React, {ChangeEventHandler, useState} from 'react';
import {scopedClassMaker} from "../untils/classes";
import './tree.scss';

const sc = scopedClassMaker('ui-tree');

export interface SourceDataItem {
  text: string
  value: string
  children?: SourceDataItem[]
}
type A = {
  selected: string[]
  multiple: true
  onChange: (newSelected: string[]) => void
}
type B = {
  selected: string
  multiple?: false
  onChange: (newSelected: string) => void
}
type IProps =  {
  sourceData: SourceDataItem[]
} & (A | B)

const Tree: React.FC<IProps> = props => {
  const renderItem = (item: SourceDataItem, level = 1) => {
    const [expanded, setExpanded] = useState(true);
    const classes = {
      ['level-' + level]: true,
      'item': true
    };
    const checked = props.multiple ?
      props.selected.indexOf(item.value) >= 0 :
      props.selected === item.value;
    
    const onChange:ChangeEventHandler<{checked: boolean}> = (e) => {
      // const checked = (e.target as HTMLInputElement).checked;
      if (props.multiple) {
        if (e.target.checked) {
          props.onChange([...props.selected, item.value])
        } else {
          props.onChange(props.selected.filter(val => val !== item.value))
        }
      } else {
        props.onChange(item.value)
      }
    };
    const collapse = () => {
      setExpanded(false)
    }
    const expand = () => {
      setExpanded(true)
    }
  
    return (
      <div key={item.value} className={sc(classes)}>
        <div className={sc('text')}>
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
          />
          {item.text}
          {item.children &&
            <span onSelect={e => e.preventDefault()}>
              {expanded ? <span onClick={collapse}> - </span> : <span onClick={expand}> + </span>}
            </span>
          }
        </div>
        <div className={sc({children: true, collapsed: !expanded})}>
          {item.children?.map(sub => renderItem(sub,level + 1))}
        </div>
      </div>
    )
  }
  return (
    <div>
      {props.sourceData.map(o => {
        return renderItem(o)
      })}
    </div>
  )
};

export default Tree;