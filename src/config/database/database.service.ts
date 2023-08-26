import * as dotenv from 'dotenv';

export class DatabaseService {
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
      uri: process.env.DATABASE_URL,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
