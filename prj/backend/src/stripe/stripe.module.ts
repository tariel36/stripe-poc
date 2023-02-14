import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { StripeController } from './controllers/stripe.controller';
import { StripeService } from './services/stripe.service';

@Module({
  imports: [UsersModule],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
