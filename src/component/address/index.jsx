import React, { Component } from 'react'
import { Cascader } from 'antd'
import { addIsLeaf } from '../../util'
import { province } from './data/province'
import { city } from './data/city'
import { country } from './data/country'

/**
 * 地址选择组件
 * @props {String} resultType spec
 * @props {Function} onChange
 * @props {Array} resultMap
 * @props {String} initType
 * @props {Array} defaultValue 
 * @props {String} placeholder
 */
class Address extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: addIsLeaf(province)
    }
  }

  onChange = (value, selectedOptions) => {
    const result = this.props.resultType === 'spec' ? this.setSelectedValues4Spec(selectedOptions, this.props.resultMap) : this.setSelectedValues(selectedOptions)
    // console.log('result', result)
    this.props.onChange(result)
  }

  /**
   * @returns {Array} 省市区对象数组，对象里面包含{id, name}
   */
  setSelectedValues = selectedOptions => {
    return selectedOptions.map(cur => {
      const { id, name } = cur
      return {
        id,
        name
      }
    })
  }

  /**
   * 特殊返回值方法
   */
  setSelectedValues4Spec = (selectedOptions, resultMap) => {
    return selectedOptions.reduce((res, cur, idx) => {
      res[resultMap[idx]] = cur.name
      return res
    }, {})
  }

  getTargetOption = option => {
    return option[option.length - 1]
  }

  getDefaultId = options => {
    return options.map(option => this.getTargetOption(option)['id'] || '')
  }

  /**
   * 兼容异常情况，如果区的名字不匹配，则返回本市默认第一条
   */
  getCompatibleOption = (option, defaultValue) => {
    const compatible = option.filter(cur => cur.name === defaultValue)
    return compatible.length ? compatible : [option[0]]
  }

  loadData = selectedOptions => {
    const targetOption = this.getTargetOption(selectedOptions)
    targetOption.items = !targetOption.hasOwnProperty('province') ? addIsLeaf(city[targetOption.id]) : country[targetOption.id]
    this.setState({
      options: [...this.state.options]
    })
    // 为了方便初始化数据额外增加的返回值
    return targetOption.items
  }

  getValueIdByName = defaultValue => {
    const { options } = this.state
    const provinceOption = options.filter(cur => cur.name === defaultValue['province'])
    const cityOption = this.loadData(provinceOption).filter(cur => [defaultValue['city'], '市辖区'].includes(cur.name) )
    const countryOption = this.getCompatibleOption(this.loadData(cityOption), defaultValue['country'])
    return this.getDefaultId([provinceOption, cityOption, countryOption])
  }

  initDefaultValue = () => {
    const { initType = 'id', defaultValue } = this.props
    if (!defaultValue) return
    this.setState({
      defaultValue: initType === 'name' ? this.getValueIdByName(defaultValue) : defaultValue
    })
  }

  componentWillMount() {
    this.initDefaultValue()
  }

  render() {
    return (
      <Cascader
        style={{ width: 300 }}
        placeholder={this.props.placeholder}
        defaultValue={this.state.defaultValue}
        fieldNames={{ label: 'name', value: 'id', children: 'items' }}
        options={this.state.options}
        loadData={this.loadData}
        onChange={this.onChange}
        changeOnSelect
      />
    )
  }
}

export default Address
