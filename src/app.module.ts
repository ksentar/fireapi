import { Module } from '@nestjs/common';
import { credential } from 'firebase-admin';
import { FireormModule } from 'nestjs-fireorm';

@Module({
  imports: [
    FireormModule.forRoot({
      firestoreSettings: {
        projectId: 'fir-bab30',
        credential: credential.applicationDefault(),
      },
      fireormSettings: { validateModels: true },
    }),
  ],
})
export class AppModule {}
