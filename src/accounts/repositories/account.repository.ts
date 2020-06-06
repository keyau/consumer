import { Logger } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { Account } from "../models/account.model";

export class AccountRepository {

  private logger: Logger;
  constructor(@InjectModel(Account) private model: ReturnModelType<typeof Account>) {
    this.logger = new Logger(`${this.model.modelName}Repository`);
  }

  private generateErrorMessage(
    error: any,
    operation: string,
    id?: string,
    data?: any,
  ) {
    const errorMessage = error.message;
    const operationMessage = `${
      this.model.modelName
      } could not be ${operation.toLowerCase()}ed}`;
    const idMessage = id ? `ID: ${id}` : '';
    const dataMessage = data ? JSON.stringify(data) : '';
    return {
      error: operationMessage + errorMessage,
      data: idMessage + dataMessage,
      verbose: `${error.constructor.name} \n
        ${operationMessage} \n
        ${errorMessage} \n
        ${idMessage} \n
        ${dataMessage}`,
    };
  }

  async create(data: any): Promise<void> {
    this.logger.verbose('CREATE');
    console.table(data);
    try {
      await this.model.create(data);
    } catch (error) {
      const message = this.generateErrorMessage(
        error,
        'create',
        data._id,
        data,
      );
      this.logger.verbose(message.verbose);
      throw error;
    }
  }

  /*async findById(id: string): Promise<Person> {
    this.logger.verbose('FIND BY ID');
    console.table({ id });
    try {
      const result = await this.model.findById(id, { __v: 0 });
      if (result == null) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      const message = this.generateErrorMessage(error, 'find', id);
      this.logger.verbose(message.verbose);
      throw error;
    }
  }*/
}
