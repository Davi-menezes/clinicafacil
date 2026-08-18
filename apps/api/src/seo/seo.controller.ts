import { Controller, Get, Header, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SeoService } from './seo.service';

@ApiTags('SEO')
@Controller()
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get('sitemap.xml')
  @Header('Content-Type', 'application/xml')
  @ApiOperation({ summary: 'Sitemap XML dinâmico' })
  async sitemap(@Res() res: Response) {
    const origin = process.env.FRONTEND_URL || 'https://clinicafacil.com.br';
    const xml = await this.seoService.generateSitemap(origin);
    res.set('Content-Type', 'application/xml');
    res.send(xml);
  }

  @Get('robots.txt')
  @Header('Content-Type', 'text/plain')
  @ApiOperation({ summary: 'Robots.txt' })
  async robots(@Res() res: Response) {
    const origin = process.env.FRONTEND_URL || 'https://clinicafacil.com.br';
    const txt = await this.seoService.generateRobotsTxt(origin);
    res.set('Content-Type', 'text/plain');
    res.send(txt);
  }

  @Get('api/v1/seo/landing/:slug')
  @ApiOperation({ summary: 'Dados de página de landing SEO' })
  async landingPage(@Param('slug') slug: string) {
    return this.seoService.getLandingPageData(slug);
  }
}