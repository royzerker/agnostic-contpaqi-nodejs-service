import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { stream } from 'exceljs';
import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { PrismaService } from 'src/modules/infrastructure/prisma/prisma.service';

@Injectable()
export class ReportService {
  #_logger = new Logger(ReportService.name);
  #_prismaClient: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prismaClient = prisma;
  }

  async execute(): Promise<void> {
    this.#_logger.log('Executing report service');

    const filePath = join(cwd(), 'temp');
    await this.#_createTempFolder(filePath);

    const filename = this.#_generateTempFilename(filePath);
    const options = {
      filename,
      useStyles: true,
    };

    const workbook = new stream.xlsx.WorkbookWriter(options);
    const worksheet = workbook.addWorksheet('Report');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'FirstName', key: 'firstName', width: 30 },
      { header: 'LastName', key: 'lastName', width: 30 },
      { header: 'First Login At', key: 'firstLoginAt', width: 30 },
      { header: 'Count Logins', key: 'countLogins', width: 30 },
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0070C0' },
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    for await (const user of this.iterate()) {
      worksheet
        .addRow({
          id: user.id?.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user?.lastName,
          firstLoginAt: this.#_formatDate(user.firstLoginAt!),
          countLogins: user.countLogins,
        })
        .commit();
    }

    await workbook.commit();
    this.#_logger.log(`Report generated: ${filename}`);
  }

  async *iterate(): AsyncGenerator<Partial<User>> {
    this.#_logger.log('Iterating report service');

    const results = await this.#_prismaClient.user.findMany({
      where: {
        firstLogin: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        firstLoginAt: true,
        countLogins: true,
      },
      orderBy: {
        firstLoginAt: 'asc',
      },
    });

    for (const user of results) {
      yield {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user?.lastName == 'undefined' ? 'N/A' : user.lastName,
        firstLoginAt: user.firstLoginAt,
        countLogins: user.countLogins,
      };
    }
  }

  #_generateTempFilename(tempFilepath: string): string {
    return `${tempFilepath}/${randomUUID()}.xlsx`;
  }

  async #_createTempFolder(filePath: string): Promise<void> {
    if (!existsSync(filePath)) {
      mkdirSync(filePath);
    }
  }

  #_formatDate(date: Date): string {
    if (!date) return 'N/A';

    const adjustedDate = new Date(date.getTime() - 5 * 60 * 60 * 1000); // Ajuste zona horaria -5
    return adjustedDate.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }
}
