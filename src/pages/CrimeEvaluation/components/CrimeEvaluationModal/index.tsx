import useMenu2Content from '@/hooks/useMenu2Content';
import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import React from 'react';
import type { CrimeEvaluationProps } from '../..';
import CrimeEvaluation from '../..';
import styles from './index.less';

const CrimeEvaluationModal: React.FunctionComponent<CrimeEvaluationProps & ModalProps> = ({
  id,
  assess_date,
  ...props
}) => {
  const { setScrollRef } = useMenu2Content();

  return (
    <Modal
      wrapClassName={styles.modalWrapClass}
      bodyStyle={{ padding: 0 }}
      width={'90%'}
      centered
      {...props}
      footer={null}
      destroyOnClose
    >
      <div
        ref={(dom) => {
          if (dom) {
            setScrollRef(dom);
          }
        }}
        className={styles.crimeModalWrap}
      >
        <CrimeEvaluation id={id} assess_date={assess_date} />
      </div>
    </Modal>
  );
};

export default CrimeEvaluationModal;
