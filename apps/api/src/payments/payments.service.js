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
exports.PaymentsService = void 0;
var common_1 = require("@nestjs/common");
var PaymentsService = exports.PaymentsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PaymentsService = _classThis = /** @class */ (function () {
        function PaymentsService_1(configService, prisma, emailService) {
            this.configService = configService;
            this.prisma = prisma;
            this.emailService = emailService;
            this.logger = new common_1.Logger(PaymentsService.name);
            try {
                var mercadopago = require('mercadopago');
                mercadopago.configurations.setAccessToken(this.configService.get('MP_ACCESS_TOKEN') || '');
                this.mpClient = mercadopago;
            }
            catch (_a) {
                this.logger.warn('Mercado Pago SDK não disponível — pagamentos desabilitados');
            }
        }
        PaymentsService_1.prototype.criarPreferenciaPagamento = function (agendamentoId, returnUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var ag, preference, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mpClient)
                                throw new common_1.BadRequestException('Pagamentos indisponíveis');
                            return [4 /*yield*/, this.prisma.agendamento.findUnique({
                                    where: { id: agendamentoId },
                                    include: {
                                        profissional: { include: { user: { select: { nomeCompleto: true } } } },
                                        paciente: { include: { user: { select: { nomeCompleto: true, emailEncrypted: true } } } },
                                    },
                                })];
                        case 1:
                            ag = _a.sent();
                            if (!ag)
                                throw new common_1.BadRequestException('Agendamento não encontrado');
                            if (ag.status !== 'PENDENTE_PAGAMENTO')
                                throw new common_1.BadRequestException('Agendamento não pendente de pagamento');
                            preference = {
                                items: [
                                    {
                                        title: "Consulta com ".concat(ag.profissional.user.nomeCompleto),
                                        description: "Consulta ".concat(ag.tipo === 'ONLINE' ? 'Online' : 'Presencial', " em ").concat(ag.profissional.cidade, "/").concat(ag.profissional.estado),
                                        quantity: 1,
                                        unit_price: Number(ag.valorTotal),
                                        currency_id: 'BRL',
                                    },
                                ],
                                payer: {
                                    name: ag.paciente.user.nomeCompleto,
                                },
                                payment_methods: {
                                    excluded_payment_types: [{ id: 'ticket' }],
                                    installments: 1,
                                },
                                notification_url: "".concat(this.configService.get('FRONTEND_URL'), "/webhooks/mercadopago"),
                                external_reference: agendamentoId,
                                back_urls: {
                                    success: "".concat(returnUrl, "?status=success&agendamento=").concat(agendamentoId),
                                    pending: "".concat(returnUrl, "?status=pending&agendamento=").concat(agendamentoId),
                                    failure: "".concat(returnUrl, "?status=failure&agendamento=").concat(agendamentoId),
                                },
                                auto_return: 'approved',
                            };
                            return [4 /*yield*/, this.mpClient.preferences.create(preference)];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, { preferenceId: result.body.id, initPoint: result.body.init_point }];
                    }
                });
            });
        };
        PaymentsService_1.prototype.criarAssinaturaPlano = function (profissionalId, plano) {
            return __awaiter(this, void 0, void 0, function () {
                var prof, valor, planoData, subscription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mpClient)
                                throw new common_1.BadRequestException('Pagamentos indisponíveis');
                            return [4 /*yield*/, this.prisma.profissional.findUnique({
                                    where: { id: profissionalId },
                                    include: { user: true },
                                })];
                        case 1:
                            prof = _a.sent();
                            if (!prof)
                                throw new common_1.BadRequestException('Profissional não encontrado');
                            valor = plano === 'PRO_DESTAQUE'
                                ? parseFloat(this.configService.get('MP_PLANO_DESTAQUE_VALOR') || '39.90')
                                : parseFloat(this.configService.get('MP_PLANO_PRO_VALOR') || '79.90');
                            planoData = plano === 'PRO_DESTAQUE' ? 'PRO_DESTAQUE' : 'PRO';
                            return [4 /*yield*/, this.mpClient.subscriptions.create({
                                    payer: {
                                        email: prof.user.emailEncrypted,
                                    },
                                    frequency: 1,
                                    frequency_unit: 'months',
                                    idempotency: "".concat(profissionalId, "-").concat(plano, "-").concat(Date.now()),
                                    back_url: "".concat(this.configService.get('FRONTEND_URL'), "/dashboard/plano/sucesso"),
                                    reason: plano === 'PRO_DESTAQUE' ? 'Plano Pro + Destaque ClinicaFácil' : 'Plano Pro ClinicaFácil',
                                    external_reference: "".concat(prof.id, "-").concat(plano),
                                    auto_recurring: {
                                        value: valor,
                                        currency_id: 'BRL',
                                        frequency: 1,
                                        frequency_unit: 'month',
                                    },
                                })];
                        case 2:
                            subscription = _a.sent();
                            return [2 /*return*/, { subscriptionId: subscription.body.id, initPoint: subscription.body.init_point }];
                    }
                });
            });
        };
        PaymentsService_1.prototype.processarWebhook = function (payload, signature) {
            return __awaiter(this, void 0, void 0, function () {
                var webhookSecret, expectedSignature, type, data, _a, profId, plano, payment, agId;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            webhookSecret = this.configService.get('MP_WEBHOOK_SECRET');
                            expectedSignature = this.hashSignature(JSON.stringify(payload), webhookSecret || '');
                            if (signature !== expectedSignature && process.env.NODE_ENV === 'production') {
                                this.logger.warn('Assinatura de webhook inválida');
                                return [2 /*return*/];
                            }
                            type = payload.type, data = payload.data;
                            if (!(type === 'subscription_authorized' || type === 'subscription_preapproval')) return [3 /*break*/, 2];
                            _a = (payload.external_reference || '').split('-'), profId = _a[0], plano = _a[1];
                            if (!(profId && plano)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.prisma.profissional.update({
                                    where: { id: profId },
                                    data: {
                                        planoStatus: plano,
                                        planoDestaque: plano === 'PRO_DESTAQUE',
                                        mpSubscriptionId: (data === null || data === void 0 ? void 0 : data.id) || payload.id,
                                    },
                                })];
                        case 1:
                            _b.sent();
                            this.logger.log("Plano ".concat(plano, " ativado para profissional ").concat(profId));
                            _b.label = 2;
                        case 2:
                            if (!(type === 'payment' && (data === null || data === void 0 ? void 0 : data.id))) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.mpClient.payment.findById(data.id)];
                        case 3:
                            payment = _b.sent();
                            agId = payment.body.external_reference;
                            if (!(payment.body.status === 'approved')) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.prisma.agendamento.update({
                                    where: { id: agId },
                                    data: { status: 'CONFIRMADO', mpPaymentId: String(data.id) },
                                })];
                        case 4:
                            _b.sent();
                            this.logger.log("Pagamento aprovado para agendamento ".concat(agId));
                            return [3 /*break*/, 7];
                        case 5:
                            if (!(payment.body.status === 'rejected')) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.prisma.agendamento.update({
                                    where: { id: agId },
                                    data: { status: 'CANCELADO' },
                                })];
                        case 6:
                            _b.sent();
                            this.logger.warn("Pagamento rejeitado para agendamento ".concat(agId));
                            _b.label = 7;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        PaymentsService_1.prototype.reembolsar = function (agendamentoId, valor) {
            return __awaiter(this, void 0, void 0, function () {
                var ag, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mpClient)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.prisma.agendamento.findUnique({ where: { id: agendamentoId } })];
                        case 1:
                            ag = _a.sent();
                            if (!(ag === null || ag === void 0 ? void 0 : ag.mpPaymentId))
                                return [2 /*return*/];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.mpClient.refund.create({
                                    payment_id: Number(ag.mpPaymentId),
                                    amount: valor,
                                })];
                        case 3:
                            _a.sent();
                            this.logger.log("Reembolso de ".concat(valor, " processado para agendamento ").concat(agendamentoId));
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            this.logger.error("Erro ao reembolsar: ".concat(error_1.message));
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        PaymentsService_1.prototype.hashSignature = function (payload, secret) {
            var crypto = require('crypto');
            return crypto.createHmac('sha256', secret).update(payload).digest('hex');
        };
        return PaymentsService_1;
    }());
    __setFunctionName(_classThis, "PaymentsService");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        PaymentsService = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaymentsService = _classThis;
}();
