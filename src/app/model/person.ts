export class Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;

  constructor(value: any) {
    Object.assign(this, value);
  }

  public showName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  public isAdult(): boolean {
    return this.age >= 18;
  }

  public identificador(): number {
    return this.id;
  }

  public nombre(): string {
    return this.firstName;
  }

  public cambiarNombre(firstName: string): void {
    this.firstName = firstName;
  }

  public apellido(): string {
    return this.lastName;
  }

  public cambiarApellido(lastName: string): void {
    this.lastName = lastName;
  }

  public edad(): number {
    return this.age;
  }

  public cambiarEdad(age: number) {
    this.age = age;
  }

}
