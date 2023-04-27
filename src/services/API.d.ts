// 公共类型
declare namespace API {
  export interface Authority {
    authority: string;
  }

  export interface CurrentUser {
    site: string;
    userId: string;
    userCode: string;
    username: string;
    nickName: string;
    description?: any;
    avatar?: any;
    phone: string;
    password?: any;
    roles: string[];
    organizations?: any;
    contentPrivileges: string[];
    permissions: string[];
    relationIds?: any;
    extend?: any;
    clientCodes: string[];
    disable: boolean;
    usedLoginType: string;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    enabled: boolean;
    authorities: Authority[];
    accountNonLocked: boolean;
    email: string;
  }

  interface PaginationResult<T> {
    page: number;
    size: number;
    total: number;
    results: T[];
  }

  interface StatusResult {
    code: string;
    msg: string;
  }

  interface PaginationQuery {
    page: number;
    size: number;
  }
}

// 罪犯库类型
declare namespace CrimeStoreTypes {
  export interface CrimyInfo {
    crime_age: string;
    danger: string;
    hjz: string;
    id: string;
    name: string;
    photo: string;
    syn_eva: string;
    danger: string;
    crime_lg: string;
    is_follow: boolean;
  }
}

// 评估类型
declare namespace EvaluationTypes {
  // 基础信息
  export interface AssessInfo {
    birthday: string;
    crime_age: string;
    crime_lg: string;
    crime_name: string;
    id: string;
    id_num: string;
    name: string;
    sex: string;
    xq: string;
    xq_remain: string;
    photo_file: string;
  }

  // 再犯罪评估信息
  export interface Recrime {
    id: string;
    evaluate_date: string;
    probab: string;
    re_crime: number;
  }

  // 再犯罪对比信息
  export interface EvaFactor {
    assess_date: string;
    feature: string;
    num: number;
    values: string;
    shap_value: number;
    id: string;
    primaryId: number;
    type: number;
  }

  // 评估时间+工种分数信息
  export interface ProAssess {
    assess_date: string;
  }

  // 职业技术能力评估，附加基础信息
  export interface ProBaseInfoExt {
    crime_record_count: string;
    cultural_level: string;
    marriage_now: string;
    profession_bq: string;
    special_skill: string;
    danger_level: string;
    change_his: string;
    iq: string;
    left_eye: string;
    right_eye: string;
    color_blind: string;
    inter_organ: string;
    limbs: string;
    height: string;
    weight: string;
    body_type: string;
    disability: string;
    medical_his: string;
    intelligence: string;
    character_feature: string;
    impulse: string;
    violence: string;
    low_esteem: string;
    anxious: string;
    heart_medical_his: string;
    labor_level: string;
    labor_point: string;
    business_his: string;
    labor_reward: string;
    labor_values: string;
    professionalism: string;
  }

  // 职业技术能力评估
  export interface JobChange {
    createdate: string; // 时间
    name: string; // 名称
    change: string; // 变化
  }

  // 劳动完成情况
  export interface LaborFinish {
    createdate: string; // 时间
    per: number; // 百分比
  }

  // 劳动推荐工种
  export interface ProRecommend {
    recommend_work: string; // 推荐工种
    current_work: string; // 当前工作
    other_work: string; // 其他推荐
  }

  // 评估结果管理
  export interface EvaluationResult {
    assess_date: string;
    create_user: string;
    id: string;
    jsh: string;
    name: string;
    primartId: string;
    prison: string;
  }

  // 评估结果管理历史详情
  export interface EvaluationResultHistory {
    sort: number;
    id: string;
    assess_date: string;
    create_user: string;
    exe_result: 'success' | 'fail';
  }
}

// 监区管理
declare namespace PrisonArea {
  // 楼层和宿舍信息
  export interface Room {
    count: number;
    floor: string;
    jsh: string;
  }
  // 宿舍人员信息
  export interface Person {
    cwh: string;
    id: string;
    jsh: string;
    name: string;
    photo: string;
    hjz: string;
    danger_level: string;
  }
  // 基础信息
  export interface Base {
    age_18_30: number;
    age_31_45: number;
    age_46_60: number;
    age_61_80: number;
    age_MIN_18: number;
    age_max_80: number;
    at_large_prison: number;
    exec_out_prison: number;
    in_Hospital: number;
    in_custody: number;
    in_registered: number;
    visit_family_out_prison: number;
  }
}

// 算法因子库
declare namespace AlgorithmFactorType {
  export interface AlgorithmInfo {
    create_date: string;
    create_user: string;
    desc: string;
    id: string;
    name: string;
    type: string;
    update_date: string;
    version: string;
    files: string;
  }

  export interface AlgorithmInfoField {
    algorith_name: string;
    algorithm_id: string;
    code: string;
    desc: string;
    id: number;
    name: string;
    source_database: string;
    source_field: string;
    source_table: string;
    type: string;
    weight: number;
  }

  export interface TableList {
    TABLE_NAME: string;
    COLUMN_NAME: string;
  }
}

// 罪犯档案
declare namespace CrimeFileType {
  export interface Baseinfo {
    birthday: string;
    is_drug: string;
    FYLXNAME: string;
    nation: string;
    is_gun: string;
    sex: string;
    sub_all: string;
    assault_police_record: string;
    photo: string;
    commit_suicide_record: string;
    flee_record: string;
    DQXQQR: string;
    drug_record: string;
    crime_name: string;
    special_skill: string;
    DQXQZR: string;
    name: string;
    xq: string;
    is_underworld: string;
    id: string;
    crime_lg: string;
    is_evil: string;
    character_feature: string;
  }

  export interface RecordInfo {
    ACCUSATIONNAME: string;
    QR: string;
    ZR: string;
    YPXQ: string;
    CFLBNAME: string;
  }

  export interface FamilyInfo {
    CSRQ: string;
    FAMILYADDRESSNAME: string;
    CW: string;
    DH: string;
    XM: string;
    FAMILYCITYNAME: string;
    FAMILYPROVINCENAME: string;
    GXLBNAME: string;
    FAMILYADDRESSDETAIL: string;
  }

  export interface DajlInfo {
    qrq: string;
    dwmx: string;
    zrq: string;
  }

  export interface DiseaseInfo {
    QR: string;
    ZR: string;
    LJJYYY: string;
    JYDD: string;
  }

  export interface VideoInfo {
    bh: string;
    video_path: string;
    name: string;
    id: number;
    create_date: string;
  }

  export interface ResultList {
    baseinfo: Baseinfo;
    recordInfo: RecordInfo[];
    familyInfo: FamilyInfo[];
    dajlInfo: DajlInfo[];
    diseaseInfo: DiseaseInfo[];
    videoInfo: VideoInfo[];
  }

  export interface RootObject {
    page: number;
    pageSize: number;
    resultList: ResultList[];
    size: number;
  }
}

declare namespace CrimeEvaluationType {
  export interface BaseInfo {
    assess_date: string;
    character: { title: string; value: number }[];
    birthday: string;
    xq_remain: string;
    limbs: string;
    disability: string;
    inter_organ: string;
    left_eye: string;
    DQXQQR: string;
    crime_age: string;
    danger_level: string;
    DQXQZR: string;
    special_skill: string;
    communicate_ability: string;
    body_type: string;
    profession_bq: string;
    id: string;
    mood_swing: string;
    mood_swing_list: { date: string; score: number }[];
    calculate_ability: string;
    crime_record_count: number;
    height: string;
    iq: string;
    photo: string;
    weight: string;
    analysis_ability: string;
    cognitive_ability: string;
    marriage_now: string;
    change_his: string;
    body_quality: string;
    crime_name: string;
    cultural_level: string;
    heart_medical_his: string;
    name: string;
    xq: string;
    medical_his: string;
    color_blind: string;
  }

  export interface TimeAxis {
    assess_date: string;
    assess_state: boolean;
  }

  export interface OtherWork {
    recommend_work: string;
    recommend_score: number;
    bh: string;
    id: number;
    create_date: string;
  }

  export interface WorkFinish {
    bh: string;
    match: number;
    createdate: string;
    id: number;
    per: number;
  }

  export interface WorkChange {
    bh: string;
    change: string;
    name: string;
    createdate: string;
    id: number;
  }

  // 职业能力
  export interface Technolog {
    other_work: OtherWork[];
    employment_interest: string;
    special_skill: string;
    work_finish: WorkFinish[];
    employment_view: string;
    current_work: string;
    team_work: string;
    work_change: WorkChange[];
  }

  export interface Abnormal {
    end_date: string;
    conscious_state: string;
    bh: string;
    video_path: string;
    activity_area: string;
    id: number;
    start_date: string;
    expression_discern: string;
  }

  export interface Clock {
    bh: string;
    video_path: string;
    analy_result: string;
    id: number;
    create_date: string;
  }

  export interface VitalSign {
    bh: string;
    temperature: number;
    pulse: number;
    heart_rate: number;
    id: number;
    create_date: string;
  }

  // 个体危险性
  export interface RiskInfo {
    abnormal: Abnormal[];
    bh: string;
    danger_level: string;
    suicidal_tendency: number;
    id: number;
    clock: Clock[];
    danger_value: number;
    create_date: string;
    vital_sign: VitalSign[];
    violent_tendency: number;
  }

  export interface AdaptInfo {
    prison_attitude: number;
    psychosomatic_state: number;
    bh: string;
    dec_conclusion: string;
    conduct_standard: number;
    avg_psychosomatic_state: number;
    avg_conduct_standard: number;
    adapt_value: number;
    employ_ability: number;
    avg_prison_attitude: number;
    avg_employ_ability: number;
    social_support: number;
    avg_social_support: number;
    adapt_level: string;
  }
}
