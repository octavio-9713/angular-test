
export class Brand {

  id: number;
  name: string;
  models: [string];

  constructor(value: any) {
    Object.assign(this, value);
  }
}
