import { GlobalSearchLimitConst } from '../consts/global-search-limit.const.js';

export const getLimitAndOffset = (limit: number = GlobalSearchLimitConst, page: number = 0) => {
  const calculatedLimit = limit > GlobalSearchLimitConst ? GlobalSearchLimitConst : (limit < 1 ? 1 : (limit ?? GlobalSearchLimitConst));
  
  
  return { limit: calculatedLimit, page, offset: page * limit === 0 ? 0 : page * limit };
};
