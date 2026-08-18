import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards,
  UseInterceptors, UploadedFile, UploadedFiles, NotFoundException, HttpCode, HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProfessionalsService } from './professionals.service';
import { PrismaService } from '../database/prisma.service';
import { UpdateProfissionalDto, AddEspecialidadeDto, AddPlanoSaudeDto } from './dto/professional.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('profissionais')
export class ProfessionalsController {
  constructor(
    private readonly professionalsService: ProfessionalsService,
    private readonly prisma: PrismaService,
  ) {}

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string): Promise<any> {    return this.professionalsService.findBySlug(slug);
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROFISSIONAL')
  async updateProfile(@CurrentUser() user: any, @Body() dto: UpdateProfissionalDto): Promise<any> {    const prof = await this.prisma.profissional.findUnique({ where: { userId: user.sub } });
    if (!prof) throw new NotFoundException('Perfil não encontrado');
    return this.professionalsService.updateProfile(prof.id, user.sub, dto);
  }

  @Post('especialidades')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROFISSIONAL')
  @HttpCode(HttpStatus.CREATED)
  async addEspecialidade(@CurrentUser() user: any, @Body() dto: AddEspecialidadeDto): Promise<any> {    const prof = await this.prisma.profissional.findUnique({ where: { userId: user.sub } });
    if (!prof) throw new NotFoundException();
    return this.professionalsService.addEspecialidade(prof.id, dto.especialidade, user.sub);
  }

  @Delete('especialidades/:especialidade')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROFISSIONAL')
  async removeEspecialidade(@CurrentUser() user: any, @Param('especialidade') especialidade: string): Promise<any> {    const prof = await this.prisma.profissional.findUnique({ where: { userId: user.sub } });
    if (!prof) throw new NotFoundException();
    return this.professionalsService.removeEspecialidade(prof.id, especialidade, user.sub);
  }

  @Post('planos-saude')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROFISSIONAL')
  @HttpCode(HttpStatus.CREATED)
  async addPlanoSaude(@CurrentUser() user: any, @Body() dto: AddPlanoSaudeDto): Promise<any> {    const prof = await this.prisma.profissional.findUnique({ where: { userId: user.sub } });
    if (!prof) throw new NotFoundException();
    return this.professionalsService.addPlanoSaude(prof.id, dto.planoSaude, user.sub);
  }

  @Delete('planos-saude/:plano')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROFISSIONAL')
  async removePlanoSaude(@CurrentUser() user: any, @Param('plano') plano: string): Promise<any> {    const prof = await this.prisma.profissional.findUnique({ where: { userId: user.sub } });
    if (!prof) throw new NotFoundException();
    return this.professionalsService.removePlanoSaude(prof.id, plano, user.sub);
  }

  @Post('upload/perfil')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROFISSIONAL')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/perfil',
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, unique);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!/\.(jpe?g|png|webp)$/i.test(file.originalname)) {
          return cb(new Error('Apenas JPEG, PNG ou WebP'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadPerfil(@CurrentUser() user: any, @UploadedFile() file: Express.Multer.File): Promise<any> {    const prof = await this.prisma.profissional.findUnique({ where: { userId: user.sub } });
    if (!prof) throw new NotFoundException();
    return this.professionalsService.uploadFotoPerfil(prof.id, user.sub, file.filename);
  }

  @Post('upload/consultorio')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROFISSIONAL')
  @UseInterceptors(FileInterceptor('files', {
    storage: diskStorage({
      destination: './uploads/consultorio',
      filename: (_req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
        cb(null, unique);
      },
    }),
    limits: { fileSize: 30 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (!/\.(jpe?g|png|webp)$/i.test(file.originalname)) {
        return cb(new Error('Apenas JPEG, PNG ou WebP'), false);
      }
      cb(null, true);
    },
  }))
  async uploadFotosConsultorio(@CurrentUser() user: any, @UploadedFiles() files: Express.Multer.File[]): Promise<any> {    const prof = await this.prisma.profissional.findUnique({ where: { userId: user.sub } });
    if (!prof) throw new NotFoundException();
    const filenames = files.map((f) => f.filename);
    return this.professionalsService.uploadFotosConsultorio(prof.id, user.sub, filenames);
  }

  @Get(':id/disponibilidade')
  async getDisponibilidade(@Param('id') id: string, @Query('mes') mes: string): Promise<any> {    return this.professionalsService.getDisponibilidade(id, mes);
  }

  @Get('dashboard/metrics')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROFISSIONAL')
  async getDashboard(@CurrentUser() user: any): Promise<any> {    const prof = await this.prisma.profissional.findUnique({ where: { userId: user.sub } });
    if (!prof) throw new NotFoundException();
    return this.professionalsService.getDashboardMetrics(prof.id);
  }
}