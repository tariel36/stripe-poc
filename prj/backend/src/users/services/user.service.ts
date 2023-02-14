import { Injectable } from '@nestjs/common';
import { IUserInventory } from '../models/user-inventory.interface';

@Injectable()
export class UserService {
  private static readonly userInventory: Map<string, IUserInventory> = new Map<
    string,
    IUserInventory
  >();

  public addPremiumCurrency(userId: string, value: number): void {
    const inventory = this.ensureUserInventory(userId);

    inventory.premium += value;

    UserService.userInventory.set(userId, inventory);
  }

  public addFreemiumCurrency(userId: string, value: number): void {
    const inventory = this.ensureUserInventory(userId);

    inventory.freemium += value;

    UserService.userInventory.set(userId, inventory);
  }

  public addSkin(userId: string, skinId: string): void {
    const inventory = this.ensureUserInventory(userId);

    inventory.skins.push(skinId);

    UserService.userInventory.set(userId, inventory);
  }

  public async getUserInventory(userId: string): Promise<IUserInventory> {
    return this.ensureUserInventory(userId);
  }

  private ensureUserInventory(userId: string): IUserInventory {
    if (!UserService.userInventory.has(userId)) {
      UserService.userInventory.set(userId, {
        freemium: 0,
        premium: 0,
        skins: [],
      });
    }

    return UserService.userInventory.get(userId);
  }
}
