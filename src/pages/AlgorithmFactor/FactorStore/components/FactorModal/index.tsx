import { AlgorithmFactorApi } from '@/services';
import { formatParams } from '@/utils/utils';
import { useRequest, useMount, useUpdateEffect } from 'ahooks';
import { Col, Form, Input, message, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';

const { TextArea } = Input;
const { Option } = Select;

type TableList = AlgorithmFactorType.TableList;
interface IProps {
  visible: boolean;
  item: AlgorithmFactorType.AlgorithmInfoField;
  onOk: () => void;
  onCancel: () => void;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const FactorModal = ({ visible, item, onOk, onCancel }: IProps) => {
  const [form] = Form.useForm();
  const [tableOptions, setTableOptions] = useState<TableList[]>([]);
  const [fieldOptions, setFieldOptions] = useState<TableList[]>([]);
  useUpdateEffect(() => {
    form.setFieldsValue({
      ...item,
    });
  }, [item]);
  const updateFactorReq = useRequest(AlgorithmFactorApi.updateAlgorithmInfoField, {
    manual: true,
    onSuccess: (result) => {
      if (result.resultList?.length) {
        message.success('编辑成功');
        if (onOk) onOk();
      }
    },
  });
  // 请求 溯源表/溯源字段options
  const tableOptionsReq = useRequest(AlgorithmFactorApi.queryTableList, {
    manual: true,
    onSuccess: (data) => {
      setTableOptions([...data.resultList]);
    },
  });
  const fieldOptionsReq = useRequest(AlgorithmFactorApi.queryTableList, {
    manual: true,
    onSuccess: (data) => {
      setFieldOptions([...data.resultList]);
    },
  });
  useMount(() => {
    tableOptionsReq.run(formatParams({ type: 'table' }));
  });
  const changeFieldOptions = (value: string) => {
    const values = form.getFieldsValue();
    form.setFieldsValue({ ...values, source_field: undefined });
    fieldOptionsReq.run(formatParams({ type: 'field', table_name: value }));
  };
  useEffect(() => {
    fieldOptionsReq.run(formatParams({ type: 'field', table_name: item.source_table }));
  }, [item.source_table]);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const params = {
        ...item,
        ...values,
      };
      updateFactorReq.run(formatParams(params));
    } catch (error) {
      console.log('Failed:', error);
    }
  };
  const handleCancel = () => {
    form.resetFields();
    if (onCancel) onCancel();
  };
  return (
    <Modal
      title="编辑因子"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      bodyStyle={{
        maxHeight: '70vh',
        overflowY: 'auto',
      }}
      maskClosable={false}
      destroyOnClose
    >
      <Form {...layout} form={form} labelAlign="left">
        <Form.Item label="因子编号">{item.code}</Form.Item>
        <Form.Item label="因子名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="权重" name="weight" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="溯源"
          name="source_field"
          rules={[{ required: true, message: '溯源字段不能为空' }]}
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name="source_table" noStyle>
                <Select showSearch onSelect={changeFieldOptions} placeholder="溯源表">
                  {tableOptions.map((option, index) => (
                    <Option value={option.TABLE_NAME} key={`${option.TABLE_NAME + String(index)}`}>
                      {option.TABLE_NAME}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="source_field" noStyle>
                <Select showSearch placeholder="溯源字段">
                  {fieldOptions.map((option, index) => (
                    <Option
                      value={option.COLUMN_NAME}
                      key={`${option.COLUMN_NAME + String(index)}`}
                    >
                      {option.COLUMN_NAME}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="描述" name="desc">
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FactorModal;
