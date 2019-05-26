# Cute  
<p align="center">
  <a href="https://www.npmjs.com/package/@mandlazy/cute"><img src="https://badgen.net/npm/dm/@mandlazy/cute" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@mandlazy/cute"><img src="https://badgen.net/npm/v/@mandlazy/cute" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@mandlazy/cute"><img src="https://badgen.net/npm/license/@mandlazy/cute" alt="License"></a>
 </p>  

基于antd 的简单封装，目的提升开发效率  
借助antd form中的getFieldDecorator可以快捷的实现表单的初始赋值，表单的提交

## Useage  
```
import { FormItem } from '@mandlazy/cute'
const configList = [
  {
    type: 'input',
    label: '收货人',
    key: 'receiver_name',
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
```



