import {Brand} from './brand';

export class Model {

  id: number;
  name: string;
  brand: Brand;

  constructor(value: any) {
    Object.assign(this, value);
  }
}
