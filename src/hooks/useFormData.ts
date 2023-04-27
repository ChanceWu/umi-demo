/**
 * 解析form的参数
 */
import { Form } from 'antd';
import { useCallback, useState } from 'react';

/**
 * 预设format参数方法
 * 使用any因为这个hook不确定外部传入的值
 */
const baseFormater: Record<string, (value: any) => any> = {};

export default (
  initialValues: Record<string, any> = {},
  formater: Record<string, (value: any) => any | keyof typeof baseFormater> = {},
) => {
  const [params, setParams] = useState<typeof initialValues>(initialValues);
  const [form] = Form.useForm();

  // form onFinished
  const onFormFinished = useCallback(
    (values: typeof initialValues) => {
      const p: typeof initialValues = {};

      Object.keys(values).forEach((k) => {
        try {
          if (!values[k]) return;
          if (typeof formater[k] === 'function') {
            // 过滤
            const v = formater[k](values[k]);
            if (v) p[k] = v;
          } else if (typeof formater[k] === 'string' && baseFormater[k]) {
            // 预设过滤
            const v = baseFormater[k](values[k]);
            if (v) p[k] = v;
          } else {
            // 不过滤
            p[k] = values[k];
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      });

      setParams(p);
    },
    [formater],
  );

  // resetForm
  const resetForm = useCallback(() => {
    form.resetFields();
    setParams({});
  }, [form]);

  return {
    form,
    resetForm,
    initialValues,
    params,
    onFormFinished,
  };
};
