# Taro-Hook-Form

易于处理 taro 表单的库 - hooks

## 安装

```
  npm install taro-hook-form
```

## 快速开始

```
import useForm from 'taro-hook-form';

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

## useForm Api

参数：

verifyLazy：boolean 是否不要在输入时就校验输入是否错误

返回：

register: 注册

    参数：
      ref - Ref,
      ops - { required , pattern, max（待开发）, min(待开发)} （注：之后可由用户自己定义配置）

setValue: 设置

    参数:
     nameAndValue: {name: value}

getValue: 获取 Value:

    参数:
      name: string

// 待补充
handleSubmit ,
formValues,
isCompleted,
errors,
