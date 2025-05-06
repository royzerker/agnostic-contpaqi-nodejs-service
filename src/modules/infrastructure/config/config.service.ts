import { Inject, Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { CONFIG_OPTIONS } from './constants/config.constants';
import { EnvConfig } from './interfaces';

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  private readonly envConfig: EnvConfig = {};

  constructor(@Inject(CONFIG_OPTIONS) private options: Record<string, any>) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;

    const envFile = path.resolve(
      `${process.cwd()}/${this.options.folder}`,
      filePath,
    );

    this.logger.log(`Env file path: ${envFile}`);

    this.envConfig = dotenv.parse(fs.readFileSync(envFile));

    this.logger.log(
      `Env variables loaded: ${Object.keys(this.envConfig).length}`,
    );
  }

  get(key: string): string {
    const value = this.envConfig[key];

    return String(value);
  }

  getAndCheck(key: string): string {
    const value = this.get(key).trim();

    if (!value) {
      throw new Error(`Missing env variable: ${key}`);
    }

    return value;
  }

  getNumber(key: string): number {
    const value = this.get(key);

    return Number(value);
  }

  getNumberAndCheck(key: string): number {
    const value = this.getNumber(key);

    if (isNaN(value)) {
      throw new Error(`Invalid number env variable: ${key}`);
    }

    return value;
  }

  getBoolean(key: string): boolean {
    const value = this.get(key);

    return value === 'true' || value === '1';
  }

  getBooleanAndCheck(key: string): boolean {
    const value = this.getBoolean(key);

    if (value !== true && value !== false) {
      throw new Error(`Invalid boolean env variable: ${key}`);
    }

    return value;
  }
}
