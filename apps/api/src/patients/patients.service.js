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
exports.PatientsService = void 0;
var common_1 = require("@nestjs/common");
var PatientsService = exports.PatientsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PatientsService = _classThis = /** @class */ (function () {
        function PatientsService_1(prisma) {
            this.prisma = prisma;
        }
        PatientsService_1.prototype.getProfile = function (pacienteId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (pacienteId !== userId)
                        throw new common_1.ForbiddenException();
                    return [2 /*return*/, this.prisma.paciente.findUnique({
                            where: { id: pacienteId },
                            include: {
                                user: { select: { nomeCompleto: true, emailEncrypted: true, verificado: true } },
                                planosUsuario: true,
                                favoritos: {
                                    include: {
                                        profissional: {
                                            include: {
                                                user: { select: { nomeCompleto: true } },
                                                avaliacoes: {
                                                    where: { aprovada: true },
                                                    select: { notaGeral: true },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        })];
                });
            });
        };
        PatientsService_1.prototype.updateProfile = function (pacienteId, userId, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (pacienteId !== userId)
                        throw new common_1.ForbiddenException();
                    return [2 /*return*/, this.prisma.paciente.update({
                            where: { id: pacienteId },
                            data: data,
                        })];
                });
            });
        };
        PatientsService_1.prototype.adicionarFavorito = function (pacienteId, profissionalId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (pacienteId !== userId)
                        throw new common_1.ForbiddenException();
                    return [2 /*return*/, this.prisma.favorito.create({
                            data: { pacienteId: pacienteId, profissionalId: profissionalId },
                        }).catch(function () { return ({ message: 'Já está nos favoritos' }); })];
                });
            });
        };
        PatientsService_1.prototype.removerFavorito = function (pacienteId, profissionalId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (pacienteId !== userId)
                        throw new common_1.ForbiddenException();
                    return [2 /*return*/, this.prisma.favorito.deleteMany({
                            where: { pacienteId: pacienteId, profissionalId: profissionalId },
                        })];
                });
            });
        };
        PatientsService_1.prototype.downloadDados = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var paciente, _a, perfil, agendamentos, avaliacoes;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.paciente.findUnique({ where: { userId: userId } })];
                        case 1:
                            paciente = _b.sent();
                            if (!paciente)
                                throw new common_1.NotFoundException();
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.paciente.findUnique({ where: { id: paciente.id } }),
                                    this.prisma.agendamento.findMany({
                                        where: { pacienteId: paciente.id },
                                        orderBy: { dataHora: 'desc' },
                                    }),
                                    this.prisma.avaliacao.findMany({
                                        where: { pacienteId: paciente.id },
                                        orderBy: { criadoEm: 'desc' },
                                    }),
                                ])];
                        case 2:
                            _a = _b.sent(), perfil = _a[0], agendamentos = _a[1], avaliacoes = _a[2];
                            return [2 /*return*/, { perfil: perfil, agendamentos: agendamentos, avaliacoes: avaliacoes }];
                    }
                });
            });
        };
        PatientsService_1.prototype.deletarConta = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var paciente;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.paciente.findUnique({ where: { userId: userId } })];
                        case 1:
                            paciente = _a.sent();
                            if (!paciente)
                                throw new common_1.NotFoundException();
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: userId },
                                    data: {
                                        emailEncrypted: "deleted_".concat(Date.now(), "@anonymized.local"),
                                        emailHash: "deleted_".concat(Date.now()),
                                        senhaHash: '',
                                        nomeCompleto: 'Usuário Deletado',
                                        verificado: false,
                                    },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Conta anonimizada com sucesso' }];
                    }
                });
            });
        };
        return PatientsService_1;
    }());
    __setFunctionName(_classThis, "PatientsService");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        PatientsService = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PatientsService = _classThis;
}();
