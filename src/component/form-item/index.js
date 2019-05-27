import React, { Component } from 'react'
import { Form, Input, Button, DatePicker, Select } from 'antd'
import { Address } from '@mandlazy/cute'
const { RangePicker } = DatePicker
const { TextArea } = Input
const Option = Select.Option

export default class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getItemByType = ({
    type,
    label,
    placeholder,
    rows = 4,
    key,
    defaultValue = '',
    initType = 'id',
    resultMap,
    resultType,
    list = [],
    handleChange = () => {}
  }) => {
    switch (type) {
      case 'input':
        return <Input placeholder={placeholder} />
      case 'textarea':
        return <TextArea rows={rows} placeholder={placeholder} />
      case 'select':
        return (
          <Select
            style={{ width: 120 }}
            onChange={value => handleChange(value, list)}
          >
            {list.map(cur => {
              return <Option value={cur.id}>{cur.name}</Option>
            })}
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
    }
  }

  render() {
    const {
      type,
      label,
      placeholder,
      rows = 4,
      key,
      defaultValue = '',
      list = [],
      handleChange = () => {}
    } = this.props.item

    const getFieldDecorator = this.props.getFieldDecorator

    if (type === 'button') {
      return (
        <Form.Item>
          {list.map(cur => {
            const {
              type,
              className = '',
              icon = '',
              htmlType = '',
              handleChange = () => {},
              label,
              loading
            } = cur
            return (
              <Button
                type={type}
                icon={icon}
                className={className}
                htmlType={htmlType}
                onClick={handleChange}
                loading={loading}
              >
                {label}
              </Button>
            )
          })}
        </Form.Item>
      )
    }

    return (
      <Form.Item label={label} {...this.props.formItemLayout}>
        {getFieldDecorator(key, { initialValue: defaultValue })(
          this.getItemByType(this.props.item)
        )}
      </Form.Item>
    )
  }
}
