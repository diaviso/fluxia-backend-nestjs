import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('discussions')
@UseGuards(JwtAuthGuard)
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @Post()
  create(@Body() createDiscussionDto: CreateDiscussionDto, @Req() req: any) {
    const userId = req.user.id;
    return this.discussionService.create(createDiscussionDto, userId);
  }

  @Get('expression/:expressionId')
  findByExpression(@Param('expressionId') expressionId: string, @Req() req: any) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.discussionService.findByExpression(+expressionId, userId, userRole);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.discussionService.remove(+id, userId, userRole);
  }
}
