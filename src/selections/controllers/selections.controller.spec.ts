import { Test, TestingModule } from '@nestjs/testing';
import { ActivateSelectionDto } from '../dto/activate-selection.dto';
import { SelectionsService } from '../services/selections.service';
import { SelectionsController } from './selections.controller';

describe('Selections Controller', () => {
  let controller: SelectionsController;
  let selectionsService: SelectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectionsController],
      providers: [{
        provide: SelectionsService,
        useValue: {
          activate: jest.fn()
        }
      }]
    }).compile();

    controller = module.get<SelectionsController>(SelectionsController);
    selectionsService = module.get<SelectionsService>(SelectionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('activate', () => {
    it('should return new selection', async () => {
      const dto: ActivateSelectionDto = {
        accountId: '9ed14b10-7040-4912-95c2-3e3cda328d73'
      };
      const result = { _id: 'selectionId', accountId: dto.accountId };
      jest.spyOn(selectionsService, 'activate').mockResolvedValue(result);
      expect(await controller.activate(dto)).toBe(result);
    });
  });
});
