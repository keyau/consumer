import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AccountsService } from '../services/accounts.service';

describe('Accounts Controller', () => {
  let controller: AccountsController;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [{
        provide: AccountsService,
        useValue: {
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
