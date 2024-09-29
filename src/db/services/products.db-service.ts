import { Op, Transaction, WhereOptions } from 'sequelize';
import { literal } from 'sequelize';
import { GlobalSearchLimitConst } from '../../shared/consts/global-search-limit.const.js';
import type { ProductCreationDto } from '../../shared/dto/product.creation-dto.js';
import { ConflictException } from '../../shared/exceptions/conflict.exception.js';
import { NotFoundException } from '../../shared/exceptions/not-found.exception.js';
import { executeTransaction } from '../../shared/utils/execute-transaction.util.js';
import { getLimitAndOffset } from '../../shared/utils/get-limit-and-page.util.js';
import { ProductsEntity } from '../entities/products.entity.js';

export class ProductsDbServiceClass {
  constructor(
    protected readonly dbService: typeof ProductsEntity = ProductsEntity,
  ) {}
  
  async find(dto: any, transaction?: Transaction) {
    const where: WhereOptions<typeof ProductsEntity> = {};
    
    const { limit, offset } = getLimitAndOffset(Math.min(dto.limit, GlobalSearchLimitConst), dto.page);
    
    return this.dbService.findAndCountAll({
      where,
      limit,
      offset,
      
      transaction,
    });
  }
  
  async fetchByIds(ids: number[], transaction?: Transaction) {
    return this.dbService.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      
      transaction,
    });
  }
  
  async create(dto: ProductCreationDto, transaction?: Transaction) {
    return this.dbService.create({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      stock: dto.stock,
    }, { transaction });
  }
  
  async stock(id: number, amount: number, transaction?: Transaction) {
    const [updatedRowsCount] = await this.dbService.update({
      stock: literal(`stock + ${amount}`),
    }, {
      where: { id },
      
      transaction,
    });
    
    if (updatedRowsCount === 0) throw new NotFoundException();
    
    return true;
  }
  
  async sell(id: number, amount: number, transaction?: Transaction) {
    const response: [boolean, number?] = await executeTransaction(async (transaction) => {
      const [updatedRows] = await this.dbService.update({
        stock: literal(`stock - ${amount}`),
      }, {
        where: { id },
        returning: ['stock'],
        
        transaction,
      });
      if (updatedRows === 0) { return [false]; }
      
      const entity = await this.dbService.findByPk(id, { transaction });
      if (!entity) return [false];
      
      if (entity?.stock < 0) {
        throw new ConflictException('InvalidAmount');
      }
      
      return [true];
    }, transaction);
    
    if (!response[0]) throw new NotFoundException();
    
    return response[0];
  }
}
