"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
var common_1 = require("@nestjs/common");
var AdminService = exports.AdminService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminService = _classThis = /** @class */ (function () {
        function AdminService_1(prisma) {
            this.prisma = prisma;
        }
        AdminService_1.prototype.listarUsuarios = function (filtros) {
            return __awaiter(this, void 0, void 0, function () {
                var page, pageSize, where, _a, usuarios, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            page = filtros.pagina || 1;
                            pageSize = Math.min(filtros.tamanhoPagina || 20, 50);
                            where = {};
                            if (filtros.tipo)
                                where.tipo = filtros.tipo;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.user.findMany({
                                        where: where,
                                        select: {
                                            id: true,
                                            tipo: true,
                                            nomeCompleto: true,
                                            verificado: true,
                                            criadoEm: true,
                                            _count: { select: { profissional: true, paciente: true } },
                                        },
                                        skip: (page - 1) * pageSize,
                                        take: pageSize,
                                        orderBy: { criadoEm: 'desc' },
                                    }),
                                    this.prisma.user.count({ where: where }),
                                ])];
                        case 1:
                            _a = _b.sent(), usuarios = _a[0], total = _a[1];
                            return [2 /*return*/, { usuarios: usuarios, total: total, paginas: Math.ceil(total / pageSize) }];
                    }
                });
            });
        };
        AdminService_1.prototype.moderarAvaliacao = function (avaliacaoId, acao) {
            return __awaiter(this, void 0, void 0, function () {
                var avaliacao;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.avaliacao.findUnique({ where: { id: avaliacaoId } })];
                        case 1:
                            avaliacao = _a.sent();
                            if (!avaliacao)
                                throw new common_1.NotFoundException('Avaliação não encontrada');
                            return [2 /*return*/, this.prisma.avaliacao.update({
                                    where: { id: avaliacaoId },
                                    data: {
                                        aprovada: acao === 'APROVAR',
                                        denunciada: false,
                                    },
                                })];
                    }
                });
            });
        };
        AdminService_1.prototype.validarConselho = function (usuarioId, valido) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: usuarioId },
                                include: { profissional: true },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!(user === null || user === void 0 ? void 0 : user.profissional))
                                throw new common_1.NotFoundException('Profissional não encontrado');
                            return [2 /*return*/, this.prisma.profissional.update({
                                    where: { id: user.profissional.id },
                                    data: {
                                        conselhoVerificado: valido,
                                        pendenteValidacaoManual: false,
                                    },
                                })];
                    }
                });
            });
        };
        AdminService_1.prototype.resumoFinanceiro = function (mes) {
            return __awaiter(this, void 0, void 0, function () {
                var where, _a, year, month, _b, agendamentos, faturamento, reembolsos, statusCounts;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            where = {};
                            if (mes) {
                                _a = mes.split('-').map(Number), year = _a[0], month = _a[1];
                                where.criadoEm = {
                                    gte: new Date(year, month - 1, 1),
                                    lte: new Date(year, month, 0, 23, 59, 59),
                                };
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.agendamento.groupBy({
                                        by: ['status'],
                                        where: where,
                                        _count: true,
                                    }),
                                    this.prisma.agendamento.aggregate({
                                        where: __assign(__assign({}, where), { status: { in: ['CONFIRMADO', 'CONCLUIDO'] } }),
                                        _sum: { valorPlataforma: true },
                                    }),
                                    this.prisma.agendamento.aggregate({
                                        where: __assign(__assign({}, where), { status: 'CANCELADO', canceladoPor: { not: 'SISTEMA' } }),
                                        _sum: { valorPlataforma: true },
                                    }),
                                ])];
                        case 1:
                            _b = _c.sent(), agendamentos = _b[0], faturamento = _b[1], reembolsos = _b[2];
                            statusCounts = agendamentos.reduce(function (acc, a) {
                                var _a;
                                return (__assign(__assign({}, acc), (_a = {}, _a[a.status] = a._count, _a)));
                            }, {});
                            return [2 /*return*/, {
                                    agendamentos: statusCounts,
                                    receita: Number(faturamento._sum.valorPlataforma || 0),
                                    reembolsos: Number(reembolsos._sum.valorPlataforma || 0),
                                }];
                    }
                });
            });
        };
        AdminService_1.prototype.logsAuditoria = function (pagina, tamanhoPagina) {
            if (pagina === void 0) { pagina = 1; }
            if (tamanhoPagina === void 0) { tamanhoPagina = 50; }
            return __awaiter(this, void 0, void 0, function () {
                var skip, _a, logs, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (pagina - 1) * tamanhoPagina;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.logAuditoria.findMany({
                                        include: { user: { select: { nomeCompleto: true, tipo: true } } },
                                        orderBy: { criadoEm: 'desc' },
                                        skip: skip,
                                        take: tamanhoPagina,
                                    }),
                                    this.prisma.logAuditoria.count(),
                                ])];
                        case 1:
                            _a = _b.sent(), logs = _a[0], total = _a[1];
                            return [2 /*return*/, { logs: logs, total: total, paginas: Math.ceil(total / tamanhoPagina) }];
                    }
                });
            });
        };
        return AdminService_1;
    }());
    __setFunctionName(_classThis, "AdminService");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        AdminService = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminService = _classThis;
}();
