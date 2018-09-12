export class Venue {
  public name: string;
  public address: string;
  public description: string;
  public id: number;

  constructor(name: string, address: string, desc: string, id: number) {
    this.name = name;
    this.address = address;
    this.description = desc;
    this.id = id;
  }
}