# Cute
<p align="center">
  <a href="https://www.npmjs.com/package/@mandlazy/cute"><img src="https://badgen.net/npm/dm/@mandlazy/cute" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@mandlazy/cute"><img src="https://badgen.net/npm/v/@mandlazy/cute" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@mandlazy/cute"><img src="https://badgen.net/npm/license/@mandlazy/cute" alt="License"></a>
 </p>

> 基于antd 的简单封装，目的提升开发效率

借助antd form中的getFieldDecorator可以快捷的实现表单的初始赋值，表单的提交
地区组件基于antd Cascader，数据封装在组件里面，暂时未做通过接口获取省市区数据，组件体积较大

## 安装
npm
```sh
npm i @mandlazy/cute
```

yarn
```sh
yarn add @mandlazy/cute
```
## 使用方式
```
import { FormItem } from '@mandlazy/cute'
const configList = [
  {
    type: 'input',
    label: '收货人',
    key: 'receiverName',
    placeholder: '收货人'
  },
  {
    type: 'input',
    label: '手机号',
    key: 'phone',
    placeholder: '手机号'
  },
  {
    type: 'address',
    label: '地区',
    key: 'addressInfo',
    placeholder: '地区'
  }
]

...
const { getFieldDecorator } = this.props.form
return (
  <Form layout="horizontal" className="info-form">
    {this.state.itemList.map(item => (
      <FormItem
        formItemLayout={formItemLayout}
        getFieldDecorator={getFieldDecorator}
        item={item}
      />
    ))}
  </Form>
)

...
formValues = this.props.form.getFieldsValue()
```

## 属性
### Address 组件
|  参数  |  类型  |  可选值  |  默认值  |  说明  |
|  :--:  |  :--:  |  :--:  |  :--:  |  :--:  |
| initType | String |  id/name | id | 初始化默认值的方式 |
| defaultValue | Array | - | '' | 设置默认值['北京市', '北京市', '朝阳区'] or ['1000', '1100', '1110'] |
| resultType | String | spec | '' | 如果设置spec，则返回{'province': '北京市', 'city': ...} |
| resultMap | Array | - | [] | 如果resultType=spec,则返回对象的key可以用resultMap做映射 |
| placeholder | String | - | '' | placeholder |
| onChange | Function | - | () => {} | 选择项改变时的回调 |





