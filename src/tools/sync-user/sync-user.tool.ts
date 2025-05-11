import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'node:fs';
import { cwd } from 'node:process';
import { SyncUserEnum } from 'src/core/enums/sync-user.enum';
import * as XLSX from 'xlsx';
import { SyncQueryDto } from './dtos';
import { SyncUserFactory } from './sync-user.factory';

@Injectable()
export class SyncUserTool {
  #_logger = new Logger(SyncUserTool.name);
  #_filePath: string = SyncUserEnum.getPath(SyncUserEnum.BASE);
  #_factory: SyncUserFactory;

  constructor(syncFactory: SyncUserFactory) {
    this.#_factory = syncFactory;
  }

  async execute({ filePath }: SyncQueryDto): Promise<void> {
    if (!filePath) {
      this.#_filePath = `${cwd?.()}/${filePath}`;
    }

    this.#_logger.verbose(`Ruta del archivo: ${this.#_filePath}`);

    try {
      const buffer = await this.#readFileAsBuffer(this.#_filePath);

      if (!buffer || buffer.length === 0) {
        this.#_logger.error('El buffer está vacío o no se pudo generar.');
        return;
      }

      this.#_logger.log('Buffer leído exitosamente.');

      const workbook = XLSX.read(buffer, { type: 'buffer' });

      /**
       * Se recorren las hojas del archivo.
       */
      this.#_logger.log(`Número de hojas: ${workbook?.SheetNames?.length}`);
      this.#_logger.log(
        `Nombres de las hojas: ${workbook?.SheetNames?.join(', ')}`,
      );
      let count = 0;

      for (const sheetName of workbook?.SheetNames) {
        this.#_logger.log(`Processing sheet: ${sheetName}`);

        try {
          const sheet = workbook.Sheets?.[sheetName];

          if (!sheet) {
            this.#_logger.warn(`La hoja ${sheetName} está vacía o no existe.`);
            continue;
          }

          /**
           * Se omite la primera fila que contiene los nombres de las columnas.
           */
          const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const filteredRows = rows
            .slice(2)
            .filter((row) =>
              (row as any)?.some((cell) => cell !== null && cell !== ''),
            );

          if (filteredRows.length === 0) {
            this.#_logger.warn(`No hay datos válidos en la hoja: ${sheetName}`);
            continue;
          }

          /**
           * Se crea una instancia de la clase SyncFactory y se llama al método create
           */
          await this.#_factory.create(filePath).submit(filteredRows, count);

          this.#_logger.log(`Sheet ${sheetName} processed successfully.`);
          count++;
        } catch (error) {
          this.#_logger.error(
            `Error processing sheet: ${sheetName}. ${error.message}`,
            error.stack,
          );
        }
      }
    } catch (error) {
      this.#_logger.error(`Error: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   *   Lee un archivo y lo convierte en un Buffer
   * @param filePath  Ruta del archivo a leer
   * @returns  Buffer
   */
  async #readFileAsBuffer(filePath: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      const stream = fs.createReadStream(filePath, { encoding: undefined });

      stream.on('data', (chunk) => {
        if (Buffer.isBuffer(chunk)) {
          chunks.push(chunk);
        } else {
          reject(new Error('El stream emitió un dato que no es un Buffer.'));
        }
      });

      stream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });

      stream.on('error', (error) => {
        reject(error);
      });
    });
  }
}
