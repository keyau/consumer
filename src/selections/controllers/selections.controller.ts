import {
  Body, Controller, Post
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ActivateSelectionDto } from '../dto/activate-selection.dto';
import { Selection } from '../models/selection.model';
import { SelectionsService } from '../services/selections.service';

@ApiTags('selections')
@Controller('selections')
export class SelectionsController {
  constructor(private service: SelectionsService) { }
  
  @Post()
  @ApiCreatedResponse({
    description: 'The selection has been successfully activated.',
    type: Selection
  })
  async activate(
    @Body() object: ActivateSelectionDto
  ): Promise<Selection> {
    return this.service.activate(object);
  }
}
