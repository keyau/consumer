import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { CreateAccountDto } from '../dto/create-account.dto';

describe('Accounts Controller', () => {
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('read', () => {
    it('should return null', async () => {
      expect(await controller.read('test')).toBeNull();
    });
  });

  describe('add', () => {
    it('should return null', async () => {
      let dto : CreateAccountDto = {
        nbCredits: 10
      };
      expect(await controller.add(dto)).toBeNull();
    });
  });
});
