import { useModel } from 'umi';
import { AlgorithmFactorApi } from '@/services';
import { InboxOutlined } from '@ant-design/icons';
import { useRequest, useUpdateEffect } from 'ahooks';
import { Form, Input, message, Modal, Upload } from 'antd';
import type { UploadProps } from 'antd/lib/upload';
import type { UploadFile } from 'antd/lib/upload/interface';
import React from 'react';
import type { Item } from '../..';
import { formatParams } from '@/utils/utils';

const { Dragger } = Upload;
const { TextArea } = Input;

interface IProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  item: Item;
}
export interface FileItem {
  uid: string;
  name: string;
  status: string;
  response: string; // custom error message to show
  url: string;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const customRequest: UploadProps['customRequest'] = async (opt) => {
  if (opt.file instanceof File) {
    if (typeof opt.onSuccess === 'function') {
      opt.onSuccess('', new XMLHttpRequest());
    }
  }
};
const AlgorithmInfoModal = ({ visible, item, onOk, onCancel }: IProps) => {
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  useUpdateEffect(() => {
    const files = item.files ? JSON.parse(item.files) : [];
    form.setFieldsValue({
      ...item,
      files,
    });
  }, [item]);
  const updateAlgorithmInfoReq = useRequest(AlgorithmFactorApi.updateAlgorithmInfo, {
    manual: true,
    onSuccess: (result) => {
      if (result.resultList?.length) {
        message.success('编辑成功');
        if (onOk) onOk();
      }
    },
  });
  const getFiles = (e: any): UploadFile[] => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const files = values.files
        ? JSON.stringify(
            values.files
              // .filter((file: UploadFile) => file.response)
              .map(
                (file: UploadFile): FileItem => ({
                  uid: file.uid,
                  name: file.name,
                  status: 'done',
                  response: file.response || '', // custom error message to show
                  url: file.response || '',
                }),
              ),
          )
        : '[]';
      const params = {
        ...item,
        ...values,
        files,
        user_code: (initialState?.currentUser as any).user_code || '',
      };
      updateAlgorithmInfoReq.run(formatParams(params));
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
      title="更新算法"
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
        <Form.Item
          label="上传算法"
          name="files"
          valuePropName="fileList"
          getValueFromEvent={getFiles}
          rules={[{ required: true, message: '请先上传算法文件' }]}
        >
          <Dragger name="file" maxCount={1} action="" customRequest={customRequest}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
            <p className="ant-upload-hint">(上传后即替换历史算法文件)</p>
          </Dragger>
        </Form.Item>
        <Form.Item label="历史算法版本">{item.version}</Form.Item>
        <Form.Item label="算法名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="desc" rules={[{ required: true }]}>
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AlgorithmInfoModal;
