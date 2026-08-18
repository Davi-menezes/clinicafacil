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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
var common_1 = require("@nestjs/common");
var SearchService = exports.SearchService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SearchService = _classThis = /** @class */ (function () {
        function SearchService_1(prisma, redisService) {
            this.prisma = prisma;
            this.redisService = redisService;
            this.logger = new common_1.Logger(SearchService.name);
        }
        SearchService_1.prototype.buscar = function (params) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var cacheKey, redis, cached, page, pageSize, skip, orderBy, filtrosAtivos, destaquesLimit, _b, destaques, total, profissionais, allProfissionais, profissionaisComAvaliacoes, resultado;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            cacheKey = this.buildCacheKey(params);
                            redis = this.redisService.getClient();
                            return [4 /*yield*/, redis.get(cacheKey)];
                        case 1:
                            cached = _c.sent();
                            if (cached) {
                                return [2 /*return*/, JSON.parse(cached)];
                            }
                            page = params.pagina || 1;
                            pageSize = Math.min(params.tamanhoPagina || 20, 20);
                            skip = (page - 1) * pageSize;
                            orderBy = this.buildOrderBy(params.ordem);
                            filtrosAtivos = [];
                            if ((_a = params.especialidade) === null || _a === void 0 ? void 0 : _a.length)
                                filtrosAtivos.push('especialidade');
                            if (params.estado)
                                filtrosAtivos.push('estado');
                            if (params.cidade)
                                filtrosAtivos.push('cidade');
                            if (params.online !== undefined)
                                filtrosAtivos.push('online');
                            if (params.planoSaude)
                                filtrosAtivos.push('planoSaude');
                            if (params.precoMax)
                                filtrosAtivos.push('precoMax');
                            if (params.notaMinima)
                                filtrosAtivos.push('notaMinima');
                            if (params.q)
                                filtrosAtivos.push('texto');
                            destaquesLimit = 3;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.profissional.findMany({
                                        where: __assign({ ativo: true, planoDestaque: true }, this.buildWhereClause(params)),
                                        include: this.professionalIncludes(),
                                        orderBy: { criadoEm: 'asc' },
                                        take: destaquesLimit,
                                    }),
                                    this.prisma.profissional.count({
                                        where: __assign({ ativo: true, planoDestaque: false }, this.buildWhereClause(params)),
                                    }),
                                    this.prisma.profissional.findMany({
                                        where: __assign({ ativo: true, planoDestaque: false }, this.buildWhereClause(params)),
                                        include: this.professionalIncludes(),
                                        orderBy: orderBy,
                                        skip: skip,
                                        take: pageSize,
                                    }),
                                ])];
                        case 2:
                            _b = _c.sent(), destaques = _b[0], total = _b[1], profissionais = _b[2];
                            allProfissionais = __spreadArray(__spreadArray([], destaques, true), profissionais, true);
                            return [4 /*yield*/, this.enrichWithRatings(allProfissionais)];
                        case 3:
                            profissionaisComAvaliacoes = _c.sent();
                            resultado = {
                                profissionais: profissionaisComAvaliacoes,
                                total: total + destaques.length,
                                paginas: Math.ceil((total + destaques.length) / pageSize),
                                filtrosAtivos: filtrosAtivos,
                            };
                            return [4 /*yield*/, redis.set(cacheKey, JSON.stringify(resultado), 'EX', 180)];
                        case 4:
                            _c.sent();
                            return [2 /*return*/, resultado];
                    }
                });
            });
        };
        SearchService_1.prototype.buildWhereClause = function (params) {
            var _a;
            var where = {};
            if ((_a = params.especialidade) === null || _a === void 0 ? void 0 : _a.length) {
                where.especialidades = {
                    some: { especialidade: { in: params.especialidade } },
                };
            }
            if (params.estado) {
                where.estado = params.estado;
            }
            if (params.cidade) {
                where.cidade = { contains: params.cidade, mode: 'insensitive' };
            }
            if (params.online !== undefined) {
                where.atendeOnline = params.online;
            }
            if (params.planoSaude) {
                where.planosAceitos = {
                    some: { planoSaude: { equals: params.planoSaude } },
                };
            }
            if (params.precoMax) {
                where.OR = [
                    { preco: { lte: params.precoMax } },
                    { precoMax: { lte: params.precoMax } },
                ];
            }
            if (params.q) {
                where.OR = [
                    { nomeCompleto: { contains: params.q, mode: 'insensitive' } },
                    { descricao: { contains: params.q, mode: 'insensitive' } },
                    { cidade: { contains: params.q, mode: 'insensitive' } },
                ];
            }
            return where;
        };
        SearchService_1.prototype.buildOrderBy = function (ordem) {
            switch (ordem) {
                case 'estrelas':
                    return { score: 'desc' };
                case 'preco_asc':
                    return { preco: 'asc' };
                case 'preco_desc':
                    return { preco: 'desc' };
                case 'recente':
                    return { criadoEm: 'desc' };
                default:
                    return { score: 'desc' };
            }
        };
        SearchService_1.prototype.professionalIncludes = function () {
            return {
                user: { select: { nomeCompleto: true } },
                especialidades: true,
                planosAceitos: true,
                avaliacoes: {
                    where: { aprovada: true, denunciada: false },
                    select: { notaGeral: true },
                },
                _count: { select: { avaliacoes: true } },
            };
        };
        SearchService_1.prototype.enrichWithRatings = function (profissionais) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, profissionais.map(function (prof) {
                            var _a, _b, _c;
                            var notas = prof.avaliacoes || [];
                            var mediaEstrelas = notas.length > 0
                                ? notas.reduce(function (s, a) { return s + a.notaGeral; }, 0) / notas.length
                                : 0;
                            return {
                                id: prof.id,
                                slug: prof.slug,
                                nomeCompleto: (_a = prof.user) === null || _a === void 0 ? void 0 : _a.nomeCompleto,
                                fotoPerfil: prof.fotoPerfil,
                                especialidadePrincipal: prof.especialidadePrincipal,
                                estado: prof.estado,
                                cidade: prof.cidade,
                                bairro: prof.bairro,
                                preco: prof.preco,
                                precoMin: prof.precoMin,
                                precoMax: prof.precoMax,
                                atendeOnline: prof.atendeOnline,
                                planoDestaque: prof.planoDestaque,
                                planoStatus: prof.planoStatus,
                                conselhoVerificado: prof.conselhoVerificado,
                                score: prof.score,
                                mediaEstrelas: Math.round(mediaEstrelas * 10) / 10,
                                totalAvaliacoes: ((_b = prof._count) === null || _b === void 0 ? void 0 : _b.avaliacoes) || 0,
                                planoSaudeAceitos: ((_c = prof.planosAceitos) === null || _c === void 0 ? void 0 : _c.map(function (p) { return p.planoSaude; })) || [],
                            };
                        })];
                });
            });
        };
        SearchService_1.prototype.buildCacheKey = function (params) {
            return "search:".concat(JSON.stringify(params));
        };
        SearchService_1.prototype.invalidateCache = function () {
            return __awaiter(this, void 0, void 0, function () {
                var redis, keys;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            redis = this.redisService.getClient();
                            return [4 /*yield*/, redis.keys('search:*')];
                        case 1:
                            keys = _a.sent();
                            if (!(keys.length > 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, redis.del.apply(redis, keys)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return SearchService_1;
    }());
    __setFunctionName(_classThis, "SearchService");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        SearchService = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SearchService = _classThis;
}();
