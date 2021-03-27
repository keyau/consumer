import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ActivateSelectionDto } from '../dto/activate-selection.dto';
import { SelectionsService } from './selections.service';

describe('SelectionsService', () => {
  let service: SelectionsService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SelectionsService,
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

    service = module.get<SelectionsService>(SelectionsService);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('activate', () => {
    it('should return new selection', async () => {
      const dto: ActivateSelectionDto = {
        accountId: '9ed14b10-7040-4912-95c2-3e3cda328d73'
      };
      const result = { _id: 'selectionId', accountId: dto.accountId };
      jest.spyOn(commandBus, 'execute');
      expect(await (await service.activate(dto)).accountId).toBe(result.accountId);
    });
  });
});
