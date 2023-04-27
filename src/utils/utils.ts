import XLSX from 'xlsx';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export function redirectLogin() {
  if (process.env.NODE_ENV !== 'development') {
    window.location.href = `/comprehensive-assessment-system/authorize/login?successRedirect=${encodeURIComponent(
      window.location.href,
    )}`;
  }
}

export function setClipboard(value: string) {
  const tempInput = document.createElement('input');
  (tempInput as any).style = 'position: absolute; left: -1000px; top: -1000px';
  tempInput.value = value;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
}

export function delayMS(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

// 将对象转化为后端需要的参数
export function formatParams<V = number | string | undefined>(obj: Record<string, V>) {
  const params: {
    paramCode: string;
    value: V;
  }[] = Object.keys(obj).map((k) => ({
    paramCode: k,
    value: obj[k],
  })).filter(d => d.value !== undefined);

  return {
    parameters: params,
  };
}

// 当数据为空时显示的字段
export function formatValue(value?: string | number) {
  return value === 0 ? value : value || '暂失';
}

// 下载blob
export const downloadBlob = (url: string | Blob, saveName: string) => {
  if (typeof url === 'object' && url instanceof Blob) {
    // eslint-disable-next-line no-param-reassign
    url = URL.createObjectURL(url); // 创建blob地址
  }
  const aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = saveName || '';
  aLink.click();
};

// sheet转blob
export const sheet2blob = (sheet: XLSX.WorkSheet, sheetName: string) => {
  // eslint-disable-next-line no-param-reassign
  sheetName = sheetName || 'sheet1';
  const workbook: XLSX.WorkBook = {
    SheetNames: [sheetName],
    Sheets: {},
  };
  workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

  const wopts: XLSX.WritingOptions = {
    bookType: 'xlsx', // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: 'binary',
  };
  const wbout = XLSX.write(workbook, wopts);
  const blob = new Blob([s2ab(wbout)], {
    type: 'application/octet-stream',
  }); // 字符串转ArrayBuffer
  function s2ab(s: any) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i !== s.length; ++i)
      view[i] =
        // eslint-disable-next-line no-bitwise
        s.charCodeAt(i) & 0xff;
    return buf;
  }

  return blob;
};
