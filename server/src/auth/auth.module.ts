import { Module } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
        imports: [AccountModule],
        providers: [AuthService]
})

export class AuthModule {}
