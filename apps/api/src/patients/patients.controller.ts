import { Controller, Get, Put, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PrismaService } from '../database/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('paciente')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PACIENTE')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async getProfile(@CurrentUser() user: any): Promise<any> {    const paciente = await this.prisma.paciente.findUnique({ where: { userId: user.sub } });
    if (!paciente) throw new Error('Perfil não encontrado');
    return this.patientsService.getProfile(paciente.id, user.sub);
  }

  @Put()
  async updateProfile(@CurrentUser() user: any, @Body() data: any): Promise<any> {    const paciente = await this.prisma.paciente.findUnique({ where: { userId: user.sub } });
    if (!paciente) throw new Error();
    return this.patientsService.updateProfile(paciente.id, user.sub, data);
  }

  @Post('favoritos/:profissionalId')
  async adicionarFavorito(@CurrentUser() user: any, @Param('profissionalId') profissionalId: string): Promise<any> {    const paciente = await this.prisma.paciente.findUnique({ where: { userId: user.sub } });
    if (!paciente) throw new Error();
    return this.patientsService.adicionarFavorito(paciente.id, profissionalId, user.sub);
  }

  @Delete('favoritos/:profissionalId')
  async removerFavorito(@CurrentUser() user: any, @Param('profissionalId') profissionalId: string): Promise<any> {    const paciente = await this.prisma.paciente.findUnique({ where: { userId: user.sub } });
    if (!paciente) throw new Error();
    return this.patientsService.removerFavorito(paciente.id, profissionalId, user.sub);
  }

  @Get('download-dados')
  async downloadDados(@CurrentUser() user: any): Promise<any> {    return this.patientsService.downloadDados(user.sub);
  }

  @Delete('conta')
  async deletarConta(@CurrentUser() user: any): Promise<any> {    return this.patientsService.deletarConta(user.sub);
  }
}