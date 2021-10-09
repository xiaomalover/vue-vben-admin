import { defHttp } from '/@/utils/http/axios';

import { CaptchaModel } from './model/captchaModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getCaptcha = '/captcha/getCaptcha',
}

/**
 * @description: init captcha
 */
export function getCaptcha(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<CaptchaModel>(
    {
      url: Api.getCaptcha,
    },
    {
      errorMessageMode: mode,
    },
  );
}
