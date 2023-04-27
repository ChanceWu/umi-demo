import { Request, Response } from 'express';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /comprehensive-assessment-system/login/me': (req: Request, res: Response) => {
    const user = {
      site: '',
      user_id: '123',
      login_name: 'sobeyTest',
      username: 'sobeyTest',
      user_code: '0',
      user_type: 0,
      email: '13@qq.com',
      nick_name: '测试',
      description: '索贝本地测',
      avatar: '',
      phone: '185446',
      password: '465465',
      extend: {
        qq: '',
        gender: '',
        userType: '',
        userApplied: '',
        customizeApp: '',
      },
      roles: [],
      content_privileges: [],
      permissions: [],
      groups: [],
      organizations: [],
      relation_ids: '',
      client_codes: [],
      locked: false,
      disable: false,
      used_login_type: '',
      bound_tpauth_types: [],
      root_user: false,
      parent_code: 0,
      initialized: false,
      site_type: '',
      enabled: false,
      authorities: [],
      account_non_locked: false,
      account_non_expired: false,
      credentials_non_expired: false,
      admin: true,
    };
    res.send(user);
  },
};
