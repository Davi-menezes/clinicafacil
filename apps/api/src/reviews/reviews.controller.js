"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.ReviewsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var roles_guard_1 = require("../common/guards/roles.guard");
var roles_decorator_1 = require("../common/decorators/roles.decorator");
var ReviewsController = exports.ReviewsController = function () {
    var _classDecorators = [(0, common_1.Controller)('avaliacoes'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _criar_decorators;
    var _editar_decorators;
    var _deletar_decorators;
    var _responder_decorators;
    var _denunciar_decorators;
    var ReviewsController = _classThis = /** @class */ (function () {
        function ReviewsController_1(reviewsService, prisma) {
            this.reviewsService = (__runInitializers(this, _instanceExtraInitializers), reviewsService);
            this.prisma = prisma;
        }
        ReviewsController_1.prototype.criar = function (body, user) {
            return __awaiter(this, void 0, void 0, function () {
                var paciente;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.paciente.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            paciente = _a.sent();
                            if (!paciente)
                                throw new Error('Perfil de paciente não encontrado');
                            return [2 /*return*/, this.reviewsService.criar(paciente.id, {
                                    profissionalId: body.profissionalId,
                                    agendamentoId: body.agendamentoId,
                                    notaGeral: body.notaGeral,
                                    comentario: body.comentario,
                                    tipoConsulta: body.tipoConsulta,
                                    problemaResolvido: body.problemaResolvido,
                                    recomendaria: body.recomendaria,
                                    notas: body.notas,
                                })];
                    }
                });
            });
        };
        ReviewsController_1.prototype.editar = function (id, body, user) {
            return __awaiter(this, void 0, void 0, function () {
                var paciente;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.paciente.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            paciente = _a.sent();
                            if (!paciente)
                                throw new Error();
                            return [2 /*return*/, this.reviewsService.editar(id, paciente.id, {
                                    notaGeral: body.notaGeral,
                                    comentario: body.comentario,
                                    problemaResolvido: body.problemaResolvido,
                                    recomendaria: body.recomendaria,
                                    notas: body.notas,
                                })];
                    }
                });
            });
        };
        ReviewsController_1.prototype.deletar = function (id, user) {
            return __awaiter(this, void 0, void 0, function () {
                var paciente;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.paciente.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            paciente = _a.sent();
                            if (!paciente)
                                throw new Error();
                            return [2 /*return*/, this.reviewsService.deletar(id, paciente.id)];
                    }
                });
            });
        };
        ReviewsController_1.prototype.responder = function (id, body, user) {
            return __awaiter(this, void 0, void 0, function () {
                var prof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof)
                                throw new Error();
                            return [2 /*return*/, this.reviewsService.responder(id, prof.id, body.resposta)];
                    }
                });
            });
        };
        ReviewsController_1.prototype.denunciar = function (id, body, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reviewsService.denunciar(id, user.sub, body.motivo)];
                });
            });
        };
        return ReviewsController_1;
    }());
    __setFunctionName(_classThis, "ReviewsController");
    (function () {
        _criar_decorators = [(0, common_1.Post)(), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED)];
        _editar_decorators = [(0, common_1.Put)(':id')];
        _deletar_decorators = [(0, common_1.Delete)(':id'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _responder_decorators = [(0, common_1.Post)(':id/resposta'), (0, common_1.UseGuards)(roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('PROFISSIONAL')];
        _denunciar_decorators = [(0, common_1.Post)(':id/denunciar')];
        __esDecorate(_classThis, null, _criar_decorators, { kind: "method", name: "criar", static: false, private: false, access: { has: function (obj) { return "criar" in obj; }, get: function (obj) { return obj.criar; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _editar_decorators, { kind: "method", name: "editar", static: false, private: false, access: { has: function (obj) { return "editar" in obj; }, get: function (obj) { return obj.editar; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deletar_decorators, { kind: "method", name: "deletar", static: false, private: false, access: { has: function (obj) { return "deletar" in obj; }, get: function (obj) { return obj.deletar; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _responder_decorators, { kind: "method", name: "responder", static: false, private: false, access: { has: function (obj) { return "responder" in obj; }, get: function (obj) { return obj.responder; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _denunciar_decorators, { kind: "method", name: "denunciar", static: false, private: false, access: { has: function (obj) { return "denunciar" in obj; }, get: function (obj) { return obj.denunciar; } } }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        ReviewsController = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReviewsController = _classThis;
}();
('pagina');
pagina: string,
    ('tamanhoPagina');
tamanhoPagina: string,
;
{
    return this.reviewsService.listarPorProfissional(slug, Number(pagina) || 1, Number(tamanhoPagina) || 10);
}
