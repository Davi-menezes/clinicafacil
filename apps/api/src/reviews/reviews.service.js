"use strict";
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
exports.ReviewsService = void 0;
var common_1 = require("@nestjs/common");
var ReviewsService = exports.ReviewsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ReviewsService = _classThis = /** @class */ (function () {
        function ReviewsService_1(prisma, scoreService) {
            this.prisma = prisma;
            this.scoreService = scoreService;
        }
        ReviewsService_1.prototype.criar = function (pacienteId, data) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var agendamento, existing, avaliacao;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.agendamento.findUnique({
                                where: { id: data.agendamentoId },
                            })];
                        case 1:
                            agendamento = _b.sent();
                            if (!agendamento || agendamento.pacienteId !== pacienteId) {
                                throw new common_1.ForbiddenException('Agendamento não pertence a este paciente');
                            }
                            if (agendamento.status !== 'CONCLUIDO') {
                                throw new common_1.BadRequestException('Apenas consultas concluídas podem ser avaliadas');
                            }
                            return [4 /*yield*/, this.prisma.avaliacao.findUnique({
                                    where: { pacienteId_profissionalId: { pacienteId: pacienteId, profissionalId: data.profissionalId } },
                                })];
                        case 2:
                            existing = _b.sent();
                            if (existing) {
                                throw new common_1.BadRequestException('Você já avaliou este profissional');
                            }
                            return [4 /*yield*/, this.prisma.avaliacao.create({
                                    data: {
                                        pacienteId: pacienteId,
                                        profissionalId: data.profissionalId,
                                        agendamentoId: data.agendamentoId,
                                        notaGeral: data.notaGeral,
                                        comentario: data.comentario,
                                        tipoConsulta: data.tipoConsulta,
                                        problemaResolvido: data.problemaResolvido,
                                        recomendaria: data.recomendaria,
                                        notas: {
                                            create: ((_a = data.notas) === null || _a === void 0 ? void 0 : _a.map(function (n) { return ({ categoria: n.categoria, nota: n.nota }); })) || [],
                                        },
                                    },
                                })];
                        case 3:
                            avaliacao = _b.sent();
                            return [4 /*yield*/, this.scoreService.recalcularEAtualizar(data.profissionalId)];
                        case 4:
                            _b.sent();
                            return [2 /*return*/, avaliacao];
                    }
                });
            });
        };
        ReviewsService_1.prototype.editar = function (avaliacaoId, pacienteId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var avaliacao, diasCriacao, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.avaliacao.findUnique({ where: { id: avaliacaoId } })];
                        case 1:
                            avaliacao = _a.sent();
                            if (!avaliacao)
                                throw new common_1.NotFoundException('Avaliação não encontrada');
                            if (avaliacao.pacienteId !== pacienteId)
                                throw new common_1.ForbiddenException();
                            diasCriacao = (Date.now() - avaliacao.criadoEm.getTime()) / (1000 * 60 * 60 * 24);
                            if (diasCriacao > 30)
                                throw new common_1.BadRequestException('Edição permitida apenas em até 30 dias');
                            return [4 /*yield*/, this.prisma.avaliacao.update({
                                    where: { id: avaliacaoId },
                                    data: {
                                        notaGeral: data.notaGeral,
                                        comentario: data.comentario,
                                        problemaResolvido: data.problemaResolvido,
                                        recomendaria: data.recomendaria,
                                    },
                                })];
                        case 2:
                            updated = _a.sent();
                            if (!data.notas) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.prisma.notaCategoria.deleteMany({ where: { avaliacaoId: avaliacaoId } })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.notaCategoria.createMany({
                                    data: data.notas.map(function (n) { return ({ avaliacaoId: avaliacaoId, categoria: n.categoria, nota: n.nota }); }),
                                })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [4 /*yield*/, this.scoreService.recalcularEAtualizar(avaliacao.profissionalId)];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        ReviewsService_1.prototype.deletar = function (avaliacaoId, pacienteId) {
            return __awaiter(this, void 0, void 0, function () {
                var avaliacao, diasCriacao, profissionalId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.avaliacao.findUnique({ where: { id: avaliacaoId } })];
                        case 1:
                            avaliacao = _a.sent();
                            if (!avaliacao)
                                throw new common_1.NotFoundException();
                            if (avaliacao.pacienteId !== pacienteId)
                                throw new common_1.ForbiddenException();
                            diasCriacao = (Date.now() - avaliacao.criadoEm.getTime()) / (1000 * 60 * 60 * 24);
                            if (diasCriacao > 30)
                                throw new common_1.BadRequestException('Exclusão permitida apenas em até 30 dias');
                            profissionalId = avaliacao.profissionalId;
                            return [4 /*yield*/, this.prisma.avaliacao.delete({ where: { id: avaliacaoId } })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.scoreService.recalcularEAtualizar(profissionalId)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ReviewsService_1.prototype.responder = function (avaliacaoId, profissionalId, resposta) {
            return __awaiter(this, void 0, void 0, function () {
                var avaliacao;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.avaliacao.findUnique({ where: { id: avaliacaoId } })];
                        case 1:
                            avaliacao = _a.sent();
                            if (!avaliacao)
                                throw new common_1.NotFoundException();
                            if (avaliacao.profissionalId !== profissionalId)
                                throw new common_1.ForbiddenException();
                            return [2 /*return*/, this.prisma.avaliacao.update({
                                    where: { id: avaliacaoId },
                                    data: { resposta: resposta, respostaEditadaEm: new Date() },
                                })];
                    }
                });
            });
        };
        ReviewsService_1.prototype.denunciar = function (avaliacaoId, usuarioId, motivo) {
            return __awaiter(this, void 0, void 0, function () {
                var avaliacao;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.avaliacao.findUnique({ where: { id: avaliacaoId } })];
                        case 1:
                            avaliacao = _a.sent();
                            if (!avaliacao)
                                throw new common_1.NotFoundException();
                            return [4 /*yield*/, this.prisma.avaliacao.update({
                                    where: { id: avaliacaoId },
                                    data: { denunciada: true },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Denúncia enviada para análise' }];
                    }
                });
            });
        };
        ReviewsService_1.prototype.listarPorProfissional = function (slug, pagina, tamanhoPagina) {
            if (pagina === void 0) { pagina = 1; }
            if (tamanhoPagina === void 0) { tamanhoPagina = 10; }
            return __awaiter(this, void 0, void 0, function () {
                var prof, skip, _a, avaliacoes, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { slug: slug } })];
                        case 1:
                            prof = _b.sent();
                            if (!prof)
                                throw new common_1.NotFoundException();
                            skip = (pagina - 1) * tamanhoPagina;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.avaliacao.findMany({
                                        where: { profissionalId: prof.id, aprovada: true, denunciada: false },
                                        include: {
                                            paciente: { include: { user: { select: { nomeCompleto: true } } } },
                                            notas: true,
                                        },
                                        orderBy: { criadoEm: 'desc' },
                                        skip: skip,
                                        take: tamanhoPagina,
                                    }),
                                    this.prisma.avaliacao.count({
                                        where: { profissionalId: prof.id, aprovada: true, denunciada: false },
                                    }),
                                ])];
                        case 2:
                            _a = _b.sent(), avaliacoes = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    avaliacoes: avaliacoes,
                                    total: total,
                                    paginas: Math.ceil(total / tamanhoPagina),
                                    pagina: pagina,
                                }];
                    }
                });
            });
        };
        return ReviewsService_1;
    }());
    __setFunctionName(_classThis, "ReviewsService");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        ReviewsService = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReviewsService = _classThis;
}();
