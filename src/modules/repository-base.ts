import Knex from 'knex';

export default abstract class Repository<T> {
  constructor(private table: string, protected db: Knex) {}

  public async store(params: Partial<T>) {
    const [result] = await this.db<T>(this.table)
      .insert(params as any)
      .returning('*');

    return result;
  }

  public async find(where: Partial<T>) {
    const product = await this.db<T>(this.table).select('*').where(where);

    return product;
  }

  public async findOne(where: Partial<T>) {
    const result = await this.db<T>(this.table)
      .select('*')
      .where(where)
      .first();

    return result;
  }

  public async update(where: Partial<T>, params: Partial<T>, returning = true) {
    await this.db(this.table)
      .update({ ...params })
      .where({ ...where });

    if (returning) return this.findOne({ ...where });

    return true;
  }
}
