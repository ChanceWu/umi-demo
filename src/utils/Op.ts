export const Operation = new Map();
Operation.set('TASK_CREATE_SUBMIT', {
  label: '提交成功',
  type: 'success',
});
Operation.set('TASK_CREATE_CC', {
  label: '抄送',
  type: 'processing',
});
Operation.set('TASK_CREATE_ACTION', {
  label: '待填写',
  type: 'processing',
});
Operation.set('TASK_CREATE_AUDIT', {
  label: '待处理',
  type: 'processing',
});

Operation.set('TASK_AUTO_INVOKE_SUCCESS', {
  label: '数据传至接口成功',
  type: 'success',
});
Operation.set('TASK_AUTO_INVOKE_FAILED', {
  label: '数据传至接口失败',
  type: 'error',
});

Operation.set('TASK_AUTO_ADD_SUCCESS', {
  label: '发起成功',
  type: 'success',
});
Operation.set('TASK_AUTO_ADD_FAILED', {
  label: '发起失败',
  type: 'error',
});

Operation.set('TASK_CC_PASS', {
  label: '已处理',
  type: 'success',
});

Operation.set('TASK_ACTION_PASS', {
  label: '已处理',
  type: 'success',
});

Operation.set('TASK_AUDIT_PASS', {
  label: '已处理',
  type: 'success',
});

Operation.set('TASK_AUDIT_REFUSE', {
  label: '不予处理',
  type: 'error',
});

Operation.set('DOWNLOAD_FORM', {
  label: '表单打印成功',
  type: 'success',
});

Operation.set('DOWNLOAD_ATTACHMENT', {
  label: '附件下载成功',
  type: 'success',
});

Operation.set('TASK_APPLY_DATA', {
  label: '完善申请成功',
  type: 'success',
});

Operation.set('INSTANCE_URGED', {
  label: '催办成功',
  type: 'success',
});

Operation.set('INSTANCE_ROLLBACK', {
  label: '已回退',
  type: 'success',
});
Operation.set('TASK_CREATE_RESUBMIT', {
  label: '重新发起',
  type: 'warning',
});

export const InstanceStatus = new Map();

InstanceStatus.set('CANCELD', '已下线');
InstanceStatus.set('ERROR', '流程出错');
InstanceStatus.set('FINISHED', '已完结');
InstanceStatus.set('REFUSE', '已完结');
