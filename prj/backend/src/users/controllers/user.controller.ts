import { Controller, Get, Param } from '@nestjs/common';
import { IUserInventory } from '../models/user-inventory.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('inventory/:userId')
  public async getUserInventory(
    @Param() userId: string,
  ): Promise<IUserInventory> {
    return await this.userService.getUserInventory(userId);
  }
}
