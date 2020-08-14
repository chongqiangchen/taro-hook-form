# Taro-Hook-Form

易于处理 taro 表单的库 - hooks

## 安装

```
  npm install taro-hook-form
```

## 快速开始

```
import {useForm} from 'taro-hook-form';

export function TestInput() {
  const { register, handleSubmit, errors, setValue, getValue } = useForm({
    verifyLazy: true
  });

  useEffect(() => {}, [errors]);

  const onSubmit = e => {
    console.log(e);
  };

  return (
    <View>
      <View>原生Input：</View>
      <Input
        ref={ref => {
          register(ref, {
            required: {
              rule: true,
              error: "请填写Input"
            }
          });
        }}
        name="alias"
        type="text"
      />
      <View>TaroUI AtInput: </View>
      <AtInput
        ref={ref => {
          register(ref, {
            required: {
              rule: true,
              error: "请填写AtInput"
            }
          });
        }}
        name="alias3"
      ></AtInput>
      <Button onClick={handleSubmit(onSubmit)}>提交</Button>
    </View>
  );
}
```

## useForm API

参数：

verifyLazy：boolean - 是否关闭在输入时就校验输入信息

返回：

register:Function - 注册

    参数：
      ref - Ref,
      ops - { required , pattern} （注：可由用户自己定义配置, 见底部VerifyActions API）

setValue:Function - 设置

    参数:
     nameAndValue: {name: value}

getValue:Function - 获取 Value:

    参数:
      name: string

handleSubmit:Function - 处理提交事件:

    参数：
      func - 用户自己的提交事件函数 ，返回内容为当前值绑定的相关值

errors: object - 错误信息

// 待补充
formValues,
isCompleted,

## VerifyActions API

用于自定义相关规则的入口

`add(value, ruleObj = {rule: true, error: ""})` - 增加自定义规则

注： 如若成功必须返回 SUCCESS_FLAG， 失败直接返回指定 error

```
示例：

import { VerifyActions, SUCCESS_FLAG } from "taro-hook-form";

...
   useEffect(() => {
    const required = (value, ruleObj = { rule: true, error: "" }) => {
      console.log(value);
      if (!ruleObj.rule) {
        return SUCCESS_FLAG;
      }

      if (value === undefined || value === null) {
        return ruleObj.error;
      }

      // 针对 仅仅输入空格情况
      if (!value.match(/[^\s]/)) {
        return ruleObj.error;
      }

      return SUCCESS_FLAG;
    };

    VerifyActions.add({ required });
  }, []);
```
