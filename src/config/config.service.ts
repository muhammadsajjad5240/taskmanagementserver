import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  constructor() {
    const result = dotenv.config();

    if (result.error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = result.parsed;
    }
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public async getPortConfig() {
    return this.get('PORT');
  }

  public async getMongoConfig() {
    return {
      uri: process.env.DATA_BASE_URL,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
  get jwtSecret(): string {
    return this.envConfig.JWT_SECRET_KEY;
  }

  get jwtExpiresIn(): string | undefined {
    if (this.envConfig.JWT_EXPIRES_IN) {
      return this.envConfig.JWT_EXPIRES_IN;
    }
    return undefined;
  }

  get jwtRefreshExpiresIn(): string | undefined {
    if (this.envConfig.JWT_Refresh_Token_Expiry) {
      return this.envConfig.JWT_Refresh_Token_Expiry;
    }
    return undefined;
  }
}
