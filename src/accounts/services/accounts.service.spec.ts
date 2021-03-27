import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('readAll', () => {
    it('should return list of account', async () => {
      let result: any = [
        { _id: 'accountId1', nbCredits: 10 },
        { _id: 'accountId2', nbCredits: 20 }];
      jest.spyOn(queryBus, 'execute').mockReturnValue(result);
      expect(await service.readAll()).toBe(result);
    });
  });

  describe('read', () => {
    it('should return a account', async () => {
      let result: any = { _id: 'accountId', nbCredits: 10 };
      jest.spyOn(queryBus, 'execute').mockReturnValue(result);
      expect(await service.read(result._id)).toBe(result);
    });
  });

  describe('add', () => {
    it('should return new account', async () => {
      let dto: CreateAccountDto = {
        nbCredits: 10
      };
      let result = { _id: 'accountId', nbCredits: dto.nbCredits };
      jest.spyOn(commandBus, 'execute');
      expect(await (await service.add(dto)).nbCredits).toBe(result.nbCredits);
    });
  });
});
