import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AccountsService } from '../services/accounts.service';
import { AccountsController } from './accounts.controller';

describe('Accounts Controller', () => {
  let controller: AccountsController;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [{
        provide: AccountsService,
        useValue: {
          readAll: jest.fn(),
          read: jest.fn(),
          add: jest.fn()
        }
      }]
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
    accountsService = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('readAll', () => {
    it('should return list of account', async () => {
      let result = [
        { _id: 'accountId1', nbCredits: 10 },
        { _id: 'accountId2', nbCredits: 20 }];
      jest.spyOn(accountsService, 'readAll').mockResolvedValue(result);
      expect(await controller.readAll()).toBe(result);
    });
  });

  describe('read', () => {
    it('should return a account', async () => {
      let result = { _id: 'accountId', nbCredits: 10 };
      jest.spyOn(accountsService, 'read').mockResolvedValue(result);
      expect(await controller.read(result._id)).toBe(result);
    });
  });

  describe('add', () => {
    it('should return new account', async () => {
      let dto: CreateAccountDto = {
        nbCredits: 10
      };
      let result = { _id: 'accountId', nbCredits: dto.nbCredits };
      jest.spyOn(accountsService, 'add').mockResolvedValue(result);
      expect(await controller.add(dto)).toBe(result);
    });
  });
});
