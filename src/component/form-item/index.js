import React, { Component, Fragment } from 'react'
import {
  Form, Input, Button, DatePicker, Select,
} from 'antd'
import Address from '../address'

const { RangePicker } = DatePicker
const { TextArea } = Input
const { Option } = Select

export default class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getItemByType = ({
    type,
    placeholder,
    rows = 4,
    width = 120,
    defaultValue = '',
    initType = 'id',
    resultMap,
    resultType,
    list = [],
    handleChange = () => {},
  }) => {
    switch (type) {
      case 'input':
        return <Input placeholder={placeholder} />
      case 'textarea':
        return <TextArea rows={rows} placeholder={placeholder} />
      case 'select':
        return (
          <Select
            style={{ width }}
            onChange={value => handleChange(value, list)}
          >
            {list.map(cur => <Option key={cur.id} value={cur.id}>{cur.name}</Option>)}
          </Select>
        )
      case 'rangePicker':
        return <RangePicker format="YYYY-MM-DD" onChange={handleChange} />
      case 'address':
        return (
          <Address
            initType={initType}
            defaultValue={defaultValue}
            resultMap={resultMap}
            resultType={resultType}
            placeholder={placeholder}
          />
        )
      default:
        return <Fragment />
    }
  }

  render() {
    const { formItemLayout, item } = this.props
    const {
      type,
      label,
      key,
      defaultValue = '',
      list = [],
    } = item

    const { getFieldDecorator } = this.props

    if (type === 'button') {
      return (
        <Form.Item>
          {list.map((cur) => {
            const {
              type: buttonType,
              buttonKey,
              className = '',
              icon = '',
              htmlType = 'button',
              label: buttonLabel,
              handleChange = () => {},
              loading,
            } = cur
            return (
              <Button
                key={buttonKey}
                type={buttonType}
                icon={icon}
                className={className}
                htmlType={htmlType}
                onClick={handleChange}
                loading={loading}
              >
                {buttonLabel}
              </Button>
            )
          })}
        </Form.Item>
      )
    }

    return (
      <Form.Item key={key} label={label} {...formItemLayout}>
        {getFieldDecorator(key, { initialValue: defaultValue })(
          this.getItemByType(item),
        )}
      </Form.Item>
    )
  }
}
