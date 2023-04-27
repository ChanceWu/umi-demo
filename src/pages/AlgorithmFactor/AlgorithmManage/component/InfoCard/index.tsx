import imgAlgorithmIcon from '@/assets/images/algorithm/algorithm_icon.png';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import React from 'react';
import type { Item } from '../..';
import style from './index.less';

interface IProps {
  item: Item;
  showModal: (e: Item) => void;
  showFactor: (name: string) => void;
}

const InfoCard = ({ item, showModal, showFactor }: IProps) => {
  const editAlgorithm = () => {
    if (showModal) showModal(item);
  };
  const toFactor = () => {
    if (showFactor) showFactor(item.name);
  };
  return (
    <Card
      actions={[
        <div onClick={editAlgorithm}>更新算法</div>,
        <div onClick={toFactor}>查看因子</div>,
      ]}
    >
      <div className={style.card_header}>
        <Avatar src={imgAlgorithmIcon} />
        <div className={style.title} title={item.name}>
          {item.name}
        </div>
        <div className={style.version}>版本：{item.version}</div>
      </div>
      <div className={style.card_content}>
        <div className={style.desc}>{item.desc}</div>
        <div className={style.sub_desc}>
          <div>
            <UserOutlined />
            {item.create_user}
          </div>
          <div>
            <ClockCircleOutlined />
            {item.update_date}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InfoCard;
