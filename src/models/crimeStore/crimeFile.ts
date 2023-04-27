import { useState } from 'react';

export default () => {
  // 罪犯信息
  const [baseInfo, setBaseInfo] = useState<CrimeFileType.Baseinfo>();
  const [dajlInfo, setDajlInfo] = useState<CrimeFileType.DajlInfo[]>([]);
  const [diseaseInfo, setDiseaseInfo] = useState<CrimeFileType.DiseaseInfo[]>([]);
  const [familyInfo, setFamilyInfo] = useState<CrimeFileType.FamilyInfo[]>([]);
  const [recordInfo, setRecordInfo] = useState<CrimeFileType.RecordInfo[]>([]);
  const [videoInfo, setVideoInfo] = useState<CrimeFileType.VideoInfo[]>([]);

  return {
    baseInfo,
    setBaseInfo,
    dajlInfo,
    setDajlInfo,
    diseaseInfo,
    setDiseaseInfo,
    familyInfo,
    setFamilyInfo,
    recordInfo,
    setRecordInfo,
    videoInfo,
    setVideoInfo,
  };
};
