import { Injectable } from '@nestjs/common';

type FiltersType = Record<string, any>;
type FiltersMapperType = Record<string, (value: any) => any>;

@Injectable()
export class HelperService {
  mapQueryFilters(filters: FiltersType, mapper: FiltersMapperType) {
    const filterKeys = Object.keys(filters);
    const result = filterKeys.reduce((res, key) => {
      const value = filters[key];
      if (!value) return res;
      const mapperCb = mapper[key];
      const valueProcessed = mapperCb ? mapperCb(value) : undefined;
      if (!valueProcessed) return res;
      res.push(valueProcessed);
      return res;
    }, []);
    return result.length ? result : undefined;
  }
}
