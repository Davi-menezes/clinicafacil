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
exports.ProfessionalsService = void 0;
var common_1 = require("@nestjs/common");
var slugify = require("slugify");
var ProfessionalsService = exports.ProfessionalsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProfessionalsService = _classThis = /** @class */ (function () {
        function ProfessionalsService_1(prisma, conselhoService, scoreService) {
            this.prisma = prisma;
            this.conselhoService = conselhoService;
            this.scoreService = scoreService;
            this.logger = new common_1.Logger(ProfessionalsService.name);
        }
        ProfessionalsService_1.prototype.findBySlug = function (slug) {
            return __awaiter(this, void 0, void 0, function () {
                var prof, mediaEstrelas, email;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({
                                where: { slug: slug, ativo: true },
                                include: {
                                    user: { select: { nomeCompleto: true, emailEncrypted: true } },
                                    especialidades: true,
                                    planosAceitos: true,
                                    disponibilidades: true,
                                    excecoes: true,
                                    fotosConsultorio: { orderBy: { ordem: 'asc' } },
                                    avaliacoes: {
                                        where: { aprovada: true, denunciada: false },
                                        include: {
                                            notas: true,
                                            paciente: { include: { user: { select: { nomeCompleto: true } } } },
                                        },
                                        take: 10,
                                        orderBy: { criadoEm: 'desc' },
                                    },
                                    _count: { select: { avaliacoes: true, agendamentos: true } },
                                },
                            })];
                        case 1:
                            prof = _a.sent();
                            if (!prof)
                                throw new common_1.NotFoundException('Profissional não encontrado');
                            mediaEstrelas = prof.avaliacoes.length > 0
                                ? prof.avaliacoes.reduce(function (s, a) { return s + a.notaGeral; }, 0) / prof.avaliacoes.length
                                : 0;
                            email = prof.user.emailEncrypted;
                            return [2 /*return*/, __assign(__assign({}, prof), { mediaEstrelas: Math.round(mediaEstrelas * 10) / 10, totalAvaliacoes: prof._count.avaliacoes, nomeCompleto: prof.user.nomeCompleto })];
                    }
                });
            });
        };
        ProfessionalsService_1.prototype.updateProfile = function (profissionalId, userId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var prof, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { id: profissionalId } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof)
                                throw new common_1.NotFoundException();
                            if (prof.userId !== userId)
                                throw new common_1.ForbiddenException();
                            return [4 /*yield*/, this.prisma.profissional.update({
                                    where: { id: profissionalId },
                                    data: __assign(__assign(__assign(__assign({}, data), (data.preco !== undefined ? { preco: data.preco } : {})), (data.precoMin !== undefined ? { precoMin: data.precoMin } : {})), (data.precoMax !== undefined ? { precoMax: data.precoMax } : {})),
                                })];
                        case 2:
                            updated = _a.sent();
                            return [4 /*yield*/, this.scoreService.recalcularEAtualizar(profissionalId)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        ProfessionalsService_1.prototype.addEspecialidade = function (profissionalId, especialidade, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var prof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { id: profissionalId } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof || prof.userId !== userId)
                                throw new common_1.ForbiddenException();
                            return [2 /*return*/, this.prisma.especialidadeProfissional.create({
                                    data: { profissionalId: profissionalId, especialidade: especialidade },
                                })];
                    }
                });
            });
        };
        ProfessionalsService_1.prototype.removeEspecialidade = function (profissionalId, especialidade, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var prof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { id: profissionalId } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof || prof.userId !== userId)
                                throw new common_1.ForbiddenException();
                            return [2 /*return*/, this.prisma.especialidadeProfissional.deleteMany({
                                    where: { profissionalId: profissionalId, especialidade: especialidade },
                                })];
                    }
                });
            });
        };
        ProfessionalsService_1.prototype.addPlanoSaude = function (profissionalId, plano, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var prof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { id: profissionalId } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof || prof.userId !== userId)
                                throw new common_1.ForbiddenException();
                            return [2 /*return*/, this.prisma.planoSaudeProfissional.create({
                                    data: { profissionalId: profissionalId, planoSaude: plano },
                                })];
                    }
                });
            });
        };
        ProfessionalsService_1.prototype.removePlanoSaude = function (profissionalId, plano, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var prof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { id: profissionalId } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof || prof.userId !== userId)
                                throw new common_1.ForbiddenException();
                            return [2 /*return*/, this.prisma.planoSaudeProfissional.deleteMany({
                                    where: { profissionalId: profissionalId, planoSaude: plano },
                                })];
                    }
                });
            });
        };
        ProfessionalsService_1.prototype.uploadFotoPerfil = function (profissionalId, userId, filename) {
            return __awaiter(this, void 0, void 0, function () {
                var prof, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { id: profissionalId } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof || prof.userId !== userId)
                                throw new common_1.ForbiddenException();
                            return [4 /*yield*/, this.prisma.profissional.update({
                                    where: { id: profissionalId },
                                    data: { fotoPerfil: filename },
                                })];
                        case 2:
                            updated = _a.sent();
                            return [4 /*yield*/, this.scoreService.recalcularEAtualizar(profissionalId)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        ProfessionalsService_1.prototype.uploadFotosConsultorio = function (profissionalId, userId, filenames) {
            return __awaiter(this, void 0, void 0, function () {
                var prof, existing, fotos;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { id: profissionalId } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof || prof.userId !== userId)
                                throw new common_1.ForbiddenException();
                            return [4 /*yield*/, this.prisma.fotoConsultorio.count({ where: { profissionalId: profissionalId } })];
                        case 2:
                            existing = _a.sent();
                            if (existing + filenames.length > 6) {
                                throw new common_1.BadRequestException('Máximo de 6 fotos do consultório');
                            }
                            return [4 /*yield*/, Promise.all(filenames.map(function (url, i) {
                                    return _this.prisma.fotoConsultorio.create({
                                        data: { profissionalId: profissionalId, url: url, ordem: existing + i },
                                    });
                                }))];
                        case 3:
                            fotos = _a.sent();
                            return [4 /*yield*/, this.scoreService.recalcularEAtualizar(profissionalId)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, fotos];
                    }
                });
            });
        };
        ProfessionalsService_1.prototype.getDisponibilidade = function (profissionalId, mes) {
            return __awaiter(this, void 0, void 0, function () {
                var prof, thirtyDaysAgo, fimJanela, _a, disponibilidades, excecoes, agendamentos, resultado, _b, year, month, hoje, mesDate, ultimoDia, current, today, _loop_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { id: profissionalId } })];
                        case 1:
                            prof = _c.sent();
                            if (!prof)
                                throw new common_1.NotFoundException('Profissional não encontrado');
                            thirtyDaysAgo = new Date();
                            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                            fimJanela = new Date();
                            fimJanela.setDate(fimJanela.getDate() + (prof.janelaAgendamentoDias || 30));
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.disponibilidadeSemanal.findMany({ where: { profissionalId: profissionalId } }),
                                    this.prisma.excecaoAgenda.findMany({
                                        where: {
                                            profissionalId: profissionalId,
                                            data: { gte: thirtyDaysAgo, lte: fimJanela },
                                        },
                                    }),
                                    this.prisma.agendamento.findMany({
                                        where: {
                                            profissionalId: profissionalId,
                                            status: { in: ['CONFIRMADO', 'PENDENTE_PAGAMENTO'] },
                                            dataHora: { gte: thirtyDaysAgo, lte: fimJanela },
                                        },
                                    }),
                                ])];
                        case 2:
                            _a = _c.sent(), disponibilidades = _a[0], excecoes = _a[1], agendamentos = _a[2];
                            resultado = {};
                            _b = mes.split('-').map(Number), year = _b[0], month = _b[1];
                            hoje = new Date();
                            hoje.setHours(0, 0, 0, 0);
                            mesDate = new Date(year, month - 1, 1);
                            ultimoDia = new Date(year, month, 0);
                            current = mesDate > today ? mesDate : today;
                            if (current > fimJanela)
                                return [2 /*return*/, resultado];
                            today = new Date();
                            today.setHours(0, 0, 0, 0);
                            _loop_1 = function () {
                                var diaSemana = current.getDay();
                                var disponivelDia = disponibilidades.find(function (d) { return d.diaSemana === diaSemana; });
                                var excecao = excecoes.find(function (e) {
                                    var eDate = new Date(e.data);
                                    return eDate.getFullYear() === current.getFullYear() &&
                                        eDate.getMonth() === current.getMonth() &&
                                        eDate.getDate() === current.getDate();
                                });
                                if ((excecao === null || excecao === void 0 ? void 0 : excecao.tipo) === 'BLOQUEIO') {
                                    current.setDate(current.getDate() + 1);
                                    return "continue";
                                }
                                if (disponivelDia || excecao) {
                                    resultado[current.toISOString().split('T')[0]] = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
                                }
                                current.setDate(current.getDate() + 1);
                            };
                            while (current <= ultimoDia && current <= fimJanela) {
                                _loop_1();
                            }
                            return [2 /*return*/, resultado];
                    }
                });
            });
        };
        ProfessionalsService_1.prototype.getDashboardMetrics = function (profissionalId) {
            return __awaiter(this, void 0, void 0, function () {
                var thirtyDaysAgo, _a, agendamentos, faturamento, ocupacao, recentes, statusCounts;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            thirtyDaysAgo = new Date();
                            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.agendamento.groupBy({
                                        by: ['status'],
                                        where: { profissionalId: profissionalId, criadoEm: { gte: thirtyDaysAgo } },
                                        _count: true,
                                    }),
                                    this.prisma.agendamento.aggregate({
                                        where: { profissionalId: profissionalId, status: 'CONFIRMADO', criadoEm: { gte: thirtyDaysAgo } },
                                        _sum: { valorTotal: true, valorProfissional: true },
                                        _count: true,
                                    }),
                                    this.prisma.agendamento.count({
                                        where: { profissionalId: profissionalId, status: { in: ['CONFIRMADO', 'CONCLUIDO'] }, criadoEm: { gte: thirtyDaysAgo } },
                                    }),
                                    this.prisma.avaliacao.findMany({
                                        where: { profissionalId: profissionalId, aprovada: true },
                                        orderBy: { criadoEm: 'desc' },
                                        take: 5,
                                        include: {
                                            paciente: { include: { user: { select: { nomeCompleto: true } } } },
                                        },
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), agendamentos = _a[0], faturamento = _a[1], ocupacao = _a[2], recentes = _a[3];
                            statusCounts = agendamentos.reduce(function (acc, a) {
                                var _a;
                                return (__assign(__assign({}, acc), (_a = {}, _a[a.status] = a._count, _a)));
                            }, {});
                            return [2 /*return*/, {
                                    agendamentos: statusCounts,
                                    faturamento: {
                                        bruto: Number(faturamento._sum.valorTotal || 0),
                                        liquido: Number(faturamento._sum.valorProfissional || 0),
                                        total: faturamento._count,
                                    },
                                    ocupacao: ocupacao,
                                    avaliacoesRecentes: recentes,
                                }];
                    }
                });
            });
        };
        ProfessionalsService_1.prototype.generateSlug = function (nome, especialidade, estado, conselhoSigla, numero) {
            return slugify.default("".concat(nome, "-").concat(especialidade, "-").concat(estado, "-").concat(conselhoSigla, "-").concat(numero), { lower: true, strict: true });
        };
        return ProfessionalsService_1;
    }());
    __setFunctionName(_classThis, "ProfessionalsService");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        ProfessionalsService = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProfessionalsService = _classThis;
}();
