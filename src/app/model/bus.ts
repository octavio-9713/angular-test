import {Model} from './model';

export class Bus {
  id: number;
  licensePlate: string;
  model: Model;
  numberOfSeats: string;

  constructor(value: any) {
    Object.assign(this, value);
  }

  public modelName(): string {
    return this.model.name;
  }

  public brandName(): string {
    return this.model.brand.name;
  }

}
