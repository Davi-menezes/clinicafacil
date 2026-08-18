import {
  Controller, Get, Post, Put, Body, Param, Query, Req,
  UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { PrismaService } from '../database/prisma.service';
import {
  CriarAgendamentoDto, ReagendarDto, CancelarDto, ListarAgendamentosDto,
} from './dto/appointments.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Agendamentos')
@Controller('agendamentos')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar agendamento' })
  async criar(@Body() dto: CriarAgendamentoDto, @CurrentUser() user: any): Promise<any> {
    const paciente = await this.prisma.paciente.findUnique({ where: { userId: user.sub } });
    if (!paciente) throw new Error('Perfil de paciente não encontrado');

    const prof = await this.prisma.profissional.findUnique({ where: { id: dto.profissionalId } });
    if (!prof) throw new Error('Profissional não encontrado');

    return this.appointmentsService.criarAgendamento(paciente.id, dto.profissionalId, {
      dataHora: new Date(dto.dataHora),
      duracaoMinutos: prof.tempConsultaMinutos,
      tipo: dto.tipo,
      valorTotal: Number(prof.preco || prof.precoMin || 0),
      formaPagamento: dto.formaPagamento,
    });
  }

  @Get('profissional')
  @Roles('PROFISSIONAL')
  @ApiOperation({ summary: 'Listar agendamentos do profissional' })
  async listarProfissional(@CurrentUser() user: any, @Query() query: ListarAgendamentosDto): Promise<any> {
    const prof = await this.prisma.profissional.findUnique({ where: { userId: user.sub } });
    if (!prof) throw new Error('Perfil não encontrado');
    return this.appointmentsService.listarAgendamentos(prof.id, query);
  }

  @Get('paciente')
  @Roles('PACIENTE')
  @ApiOperation({ summary: 'Listar agendamentos do paciente' })
  async listarPaciente(@CurrentUser() user: any, @Query('status') status: string): Promise<any> {
    const paciente = await this.prisma.paciente.findUnique({ where: { userId: user.sub } });
    if (!paciente) throw new Error('Perfil não encontrado');
    return this.appointmentsService.listarAgendamentosPaciente(paciente.id, status);
  }

  @Post(':id/reagendar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reagendar consulta' })
  async reagendar(@Param('id') id: string, @Body() dto: ReagendarDto, @CurrentUser() user: any): Promise<any> {
    const paciente = await this.prisma.paciente.findUnique({ where: { userId: user.sub } });
    if (!paciente) throw new Error('Perfil não encontrado');
    return this.appointmentsService.reagendar(id, paciente.id, new Date(dto.novaDataHora));
  }

  @Post(':id/cancelar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancelar agendamento' })
  async cancelar(@Param('id') id: string, @Body() dto: CancelarDto, @CurrentUser() user: any): Promise<any> {
    return this.appointmentsService.cancelarAgendamento(id, user.sub, user.tipo, dto.motivo);
  }

  @Put(':id/noshow')
  @Roles('PROFISSIONAL')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Marcar como não compareceu' })
  async noshow(@Param('id') id: string, @CurrentUser() user: any): Promise<any> {
    const prof = await this.prisma.profissional.findUnique({ where: { userId: user.sub } });
    if (!prof) throw new Error('Perfil não encontrado');
    return this.appointmentsService.marcarNoShow(id, prof.id);
  }

  @Put(':id/concluir')
  @Roles('PROFISSIONAL')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Concluir consulta' })
  async concluir(@Param('id') id: string, @CurrentUser() user: any): Promise<any> {
    const prof = await this.prisma.profissional.findUnique({ where: { userId: user.sub } });
    if (!prof) throw new Error('Perfil não encontrado');
    return this.appointmentsService.concluir(id, prof.id);
  }
}