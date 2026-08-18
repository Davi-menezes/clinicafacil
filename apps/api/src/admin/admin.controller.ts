import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { IsString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';

class ModerarAvaliacaoDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['aprovar', 'rejeitar'])
  acao!: 'aprovar' | 'rejeitar';
}

class ValidarConselhoDto {
  @IsString()
  @IsIn(['aprovar', 'rejeitar'])
  valido!: 'aprovar' | 'rejeitar';
}

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('usuarios')
  @ApiOperation({ summary: 'Listar todos os usuários' })
  async listarUsuarios(
    @Query('tipo') tipo?: string,
    @Query('pagina') pagina = '1',
    @Query('tamanhoPagina') tamanhoPagina = '20',
  ): Promise<any> {
    return this.adminService.listarUsuarios({
      tipo,
      pagina: Number(pagina) || 1,
      tamanhoPagina: Number(tamanhoPagina) || 20,
    });
  }

  @Get('financeiro')
  @ApiOperation({ summary: 'Resumo financeiro' })
  async resumoFinanceiro(@Query('mes') mes?: string): Promise<any> {
    return this.adminService.resumoFinanceiro(mes);
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Logs de auditoria' })
  async logsAuditoria(
    @Query('pagina') pagina = '1',
    @Query('tamanhoPagina') tamanhoPagina = '50',
  ): Promise<any> {
    return this.adminService.logsAuditoria(
      Number(pagina) || 1,
      Number(tamanhoPagina) || 50,
    );
  }

  @Post('avaliacoes/:id/moderar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Moderar avaliação (aprovar/rejeitar)' })
  async moderarAvaliacao(
    @Param('id') id: string,
    @Body() dto: ModerarAvaliacaoDto,
  ): Promise<any> {
    return this.adminService.moderarAvaliacao(id, dto.acao);
  }

  @Post('profissionais/:id/validar-conselho')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validação manual de conselho' })
  async validarConselho(
    @Param('id') profissionalId: string,
    @Body() dto: ValidarConselhoDto,
  ): Promise<any> {
    return this.adminService.validarConselho(profissionalId, dto.valido);
  }

  @Get('configuracoes')
  @ApiOperation({ summary: 'Obter configurações do sistema' })
  async getConfiguracoes(): Promise<any> {
    return this.adminService.getConfiguracoes();
  }

  @Put('configuracoes')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar configurações do sistema' })
  async updateConfiguracoes(@Body() data: any): Promise<any> {
    return this.adminService.updateConfiguracoes(data);
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Métricas do painel admin' })
  async getDashboardAdmin(): Promise<any> {
    return this.adminService.getPainelAdmin();
  }
}
