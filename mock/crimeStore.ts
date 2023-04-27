import { Request, Response } from 'express';

// 罪犯库列表
const getCrimyInfo = (req: Request, res: Response) => {
  const resultList: Partial<CrimeStoreTypes.CrimyInfo>[] = [
    {
      birthday: '1971/07/03 00:00:00',
      enter_data: '2016/12/23 00:00:00',
      xq_remain: '0年0月0日',
      nation: '汉族',
      crime_team: '单独犯罪',
      sub_all: '0年0月0日',
      evaluate_re_crime: '无风险',
      crime_age: '50岁',
      id: '5110066256',
      leave_data: '2019/10/08 00:00:00',
      crime_lg: '无',
      det_unit: '邑州监狱',
      crime_record_count: 0,
      sen_year: '2-5年',
      preson_area: '九监区',
      sex: '男',
      marriage_now: '离婚',
      xq_add: '罚款8000.00元',
      crime_name: '贩卖毒品,容留他人吸毒',
      hasEvaluation: 1,
      cultural_level: '大专',
      id_num: '51012819710703001X',
      name: '胡尚伟',
      xq: '3年2月0日',
      xq_now: '3年2月0日',
      five_his: '涉毒,吸毒史',
    },
    {
      birthday: '1981/12/25 00:00:00',
      enter_data: '2016/12/23 00:00:00',
      xq_remain: '0年0月0日',
      nation: '汉族',
      crime_team: '单独犯罪',
      sub_all: '0年0月0日',
      evaluate_re_crime: '有风险',
      crime_age: '39岁',
      id: '5110066257',
      leave_data: '2017/07/10 00:00:00',
      crime_lg: '惯犯',
      det_unit: '邑州监狱',
      crime_record_count: 1,
      sen_year: '1年以下',
      preson_area: '三监区',
      sex: '男',
      marriage_now: '已婚',
      xq_add: '罚款3000.00元',
      crime_name: '容留他人吸毒',
      hasEvaluation: 1,
      cultural_level: '初中',
      id_num: '510184198112250012',
      name: '杨勇',
      xq: '0年11月0日',
      xq_now: '0年11月0日',
      five_his: '涉毒,吸毒史',
      photo_file: '5110075491_11.jpg',
    },
  ];
  res.json({ resultList });
};

export default {
  'POST /comprehensive-assessment-system/ficus/v1/viewPortQuery/S1/yizhou/queryCrimyInfo':
    getCrimyInfo,
};
