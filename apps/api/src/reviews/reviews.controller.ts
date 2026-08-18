import { Controller, Post, Put, Delete, Body, Param, Get, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { PrismaService } from '../database/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('avaliacoes')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async criar(@Body() body: any, @CurrentUser() user: any): Promise<any> {    const paciente = await this.prisma.paciente.findUnique({ where: { userId: user.sub } });
    if (!paciente) throw new Error('Perfil de paciente não encontrado');

    return this.reviewsService.criar(paciente.id, {
      profissionalId: body.profissionalId,
      agendamentoId: body.agendamentoId,
      notaGeral: body.notaGeral,
      comentario: body.comentario,
      tipoConsulta: body.tipoConsulta,
      problemaResolvido: body.problemaResolvido,
      recomendaria: body.recomendaria,
      notas: body.notas,
    });
  }

  @Put(':id')
  async editar(@Param('id') id: string, @Body() body: any, @CurrentUser() user: any): Promise<any> {    const paciente = await this.prisma.paciente.findUnique({ where: { userId: user.sub } });
    if (!paciente) throw new Error();

    return this.reviewsService.editar(id, paciente.id, {
      notaGeral: body.notaGeral,
      comentario: body.comentario,
      problemaResolvido: body.problemaResolvido,
      recomendaria: body.recomendaria,
      notas: body.notas,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletar(@Param('id') id: string, @CurrentUser() user: any): Promise<any> {    const paciente = await this.prisma.paciente.findUnique({ where: { userId: user.sub } });
    if (!paciente) throw new Error();

    return this.reviewsService.deletar(id, paciente.id);
  }

  @Post(':id/resposta')
  @UseGuards(RolesGuard)
  @Roles('PROFISSIONAL')
  async responder(@Param('id') id: string, @Body() body: { resposta: string }, @CurrentUser() user: any): Promise<any> {    const prof = await this.prisma.profissional.findUnique({ where: { userId: user.sub } });
    if (!prof) throw new Error();

    return this.reviewsService.responder(id, prof.id, body.resposta);
  }

  @Post(':id/denunciar')
  async denunciar(@Param('id') id: string, @Body() body: { motivo: string }, @CurrentUser() user: any): Promise<any> {    return this.reviewsService.denunciar(id, user.sub, body.motivo);
  }

  @Get('profissional/:slug')
  async listarPorProfissional(
    @Param('slug') slug: string,
    @Query('pagina') pagina?: string,
    @Query('tamanhoPagina') tamanhoPagina?: string,
  ) {
    return this.reviewsService.listarPorProfissional(
      slug,
      Number(pagina) || 1,
      Number(tamanhoPagina) || 10,
    );
  }
}