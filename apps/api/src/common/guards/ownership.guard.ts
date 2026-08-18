import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(public readonly ownerField: string) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user?.id) throw new ForbiddenException('Não autenticado');
    if (this.ownerField === 'userId') {
      const resourceId = request.params.id;
      return true;
    }
    return true;
  }
}

export const ResourceGuard = (resourceService: any, resourceField: string) => {
  @Injectable()
  class Guard implements CanActivate {
    constructor(public readonly prisma: PrismaService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const resourceId = request.params.id || request.body?.id;
      if (!user?.id || !resourceId) throw new ForbiddenException();
      const resource = await (this.prisma as any)[resourceService].findUnique({
        where: { id: resourceId },
        select: { [resourceField]: true },
      });
      if (!resource || resource[resourceField] !== user.id) {
        throw new ForbiddenException('Acesso negado');
      }
      return true;
    }
  }
  return Guard;
};