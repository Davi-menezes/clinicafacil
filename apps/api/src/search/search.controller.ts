import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { OptionalJwtGuard } from '../auth/guards/jwt-auth.guard';

@Controller('busca')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('profissionais')
  @UseGuards(OptionalJwtGuard)
  async buscarProfissionais(@Query() query: any): Promise<any> {    return this.searchService.buscar({
      especialidade: query.especialidade ? query.especialidade.split(',') : undefined,
      estado: query.estado,
      cidade: query.cidade,
      bairro: query.bairro,
      online: query.online === 'true' ? true : query.online === 'false' ? false : undefined,
      planoSaude: query.planoSaude,
      precoMax: query.precoMax ? Number(query.precoMax) : undefined,
      notaMinima: query.notaMinima ? Number(query.notaMinima) : undefined,
      ordem: query.ordem || 'relevancia',
      pagina: Number(query.pagina) || 1,
      tamanhoPagina: Number(query.tamanhoPagina) || 20,
      q: query.q,
    });
  }
}