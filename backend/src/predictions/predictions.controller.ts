import { Body, Controller, Post, Req } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ExtraPredictions, MatchResult } from '../../constants';

@Controller('predictions')
export class PredictionsController {
  constructor(private userService: UsersService) {}

  @Post()
  async updatePredictions(
    @Body() data: { predictions: { predictions: MatchResult[]; extraPredictions: ExtraPredictions }; groupId: number },
    @Req() req: any,
  ): Promise<any> {
    return await this.userService.updatePredictions(data.predictions, data.groupId, req.user.id);
  }
}
