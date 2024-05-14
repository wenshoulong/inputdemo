import { useState, useMemo, useEffect } from 'react'

interface BasePropData {
  columns: number
}

interface selectItem {
  value: number
  select: boolean
}

const SelectCheckBox: React.FC<BasePropData> = (props) => {
  const containStyle: Object = {
    display: 'flex',
    flexDirection: 'column',
    margin: '50px',
    padding: '20px',
    border: '1px solid',
  }

  const total = 9
  //每列数量
  const columnsNums = useMemo(() => {
    return Math.floor(total / props.columns)
  }, [props.columns])

  const [selectArr, setSelectArr] = useState<selectItem[]>([])

  // 初始数据加载
  useEffect(() => {
    let dataArr: selectItem[] = []
    for (let i = 0; i <= 9; i++) {
      dataArr.push({
        value: i,
        select: false,
      })
    }
    setSelectArr(dataArr)
  }, [])

  //选择所有数据
  const [allValue, setAllValue] = useState('')
  function selectAllFn(e: any) {
    if (allValue === 'all') {
      // 更改select
      _changeSelect(false)

      setSelectedArr([])
      setAllValue('')
    } else {
      // 更改select
      _changeSelect(true)

      let arr = selectArr.map((item) => {
        return item.value
      })
      setSelectedArr(arr)
      setAllValue('all')
    }

    function _changeSelect(bool: boolean) {
      // 更改select
      let tempArr1 = [...selectArr]
      for (let i = 0; i < tempArr1.length; i++) {
        tempArr1[i].select = bool
      }
      setSelectArr(tempArr1)
    }
  }

  // 维护一个已选择的数组，用于输出
  const [selectedArr, setSelectedArr] = useState<Number[]>([])
  function itemChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value)
    // 更改select
    let tempArr1 = [...selectArr]
    for (let i = 0; i < tempArr1.length; i++) {
      if (value === tempArr1[i].value) {
        tempArr1[i].select = !tempArr1[i].select
      }
    }
    setSelectArr(tempArr1)

    //更改选择数组
    let tempArr2 = [...selectedArr]
    if (tempArr2.includes(value)) {
      tempArr2.splice(tempArr2.indexOf(value), 1)
    } else {
      tempArr2.push(value)
    }
    // 如果数量相等，全选
    if (tempArr2.length === selectArr.length) {
      setAllValue('all')
    } else {
      setAllValue('')
    }

    setSelectedArr(tempArr2)
  }

  // 循环数据
  let item = selectArr.map((_item, _index) => {
    return (
      <div style={{ margin: '10px' }} key={_index}>
        <input type="checkbox" id={String(_item)} checked={_item.select} value={_item.value} onChange={itemChange} />
        <label>{_item.value}</label>
      </div>
    )
  })

  let selectItem = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {item}
    </div>
  )

  return (
    <div style={containStyle}>
      <div
        style={{
          margin: '10px',
        }}
      >
        <input type="checkbox" id="selectAll" value={allValue} checked={allValue === 'all'} onChange={selectAllFn} />
        <label>selectAll</label>
      </div>
      {selectItem}
    </div>
  )
}

export default SelectCheckBox
