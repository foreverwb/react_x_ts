import React, {useState} from "react";
import Tree from "../lib/Tree/tree";

const TreeExample: React.FC = props => {
  const [array] = useState([
    {
      text: '1',
      value: '1',
      children: [
        {
          text: '1.1',
          value: '1.1',
          children: [
            {text: '1.1.1', value: '1.1.1'},
            {text: '1.1.2', value: '1.1.2'},
          ]
        },
        {text: '1.2', value: '1.2'},
      ]
    },
    {
      text: '2',
      value: '2',
      children: [
        {text: '2.1', value: '2.1'},
        {text: '2.2', value: '2.2'},
      ]
    }
  ])
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  // const [selectedValue, setSelectedValue] = useState('1')
  return (
    <div>
      <h1>展示数据</h1>
      <Tree
        sourceData={array}
        selected={selectedValues}
        multiple={true}
        onChange={(value:string[]) => setSelectedValues(value)}
      />
    </div>
  )
}

export default TreeExample;