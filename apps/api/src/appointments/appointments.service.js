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
exports.AppointmentsService = void 0;
var common_1 = require("@nestjs/common");
var date_fns_1 = require("date-fns");
var AppointmentsService = exports.AppointmentsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppointmentsService = _classThis = /** @class */ (function () {
        function AppointmentsService_1(prisma, configService) {
            this.prisma = prisma;
            this.configService = configService;
            this.logger = new common_1.Logger(AppointmentsService.name);
        }
        AppointmentsService_1.prototype.getDisponibilidade = function (profissionalId, mes) {
            return __awaiter(this, void 0, void 0, function () {
                var prof, resultado, hoje, fimJanela, mesDate, ultimoDia, current, _loop_1, this_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({
                                where: { id: profissionalId },
                                include: {
                                    disponibilidades: { orderBy: { diaSemana: 'asc' } },
                                    excecoes: { where: { data: { gte: new Date("".concat(mes, "-01")) } } },
                                    agendamentos: {
                                        where: {
                                            status: { in: ['CONFIRMADO', 'PENDENTE_PAGAMENTO'] },
                                            dataHora: { gte: new Date("".concat(mes, "-01")) },
                                        },
                                    },
                                },
                            })];
                        case 1:
                            prof = _a.sent();
                            if (!prof)
                                throw new common_1.NotFoundException('Profissional não encontrado');
                            resultado = {};
                            hoje = (0, date_fns_1.startOfDay)(new Date());
                            fimJanela = (0, date_fns_1.addDays)(hoje, prof.janelaAgendamentoDias);
                            mesDate = new Date("".concat(mes, "-01"));
                            ultimoDia = new Date(mesDate.getFullYear(), mesDate.getMonth() + 1, 0);
                            current = (0, date_fns_1.startOfDay)(mesDate);
                            if (current < hoje)
                                current = hoje;
                            if (current > fimJanela)
                                return [2 /*return*/, resultado];
                            _loop_1 = function () {
                                var diaSemana = current.getDay();
                                var excecao = prof.excecoes.find(function (e) { return (0, date_fns_1.isSameDay)(new Date(e.data), current); });
                                if ((excecao === null || excecao === void 0 ? void 0 : excecao.tipo) === 'BLOQUEIO') {
                                    current = (0, date_fns_1.addDays)(current, 1);
                                    return "continue";
                                }
                                var horariosExcecao = (excecao === null || excecao === void 0 ? void 0 : excecao.horaInicio) && (excecao === null || excecao === void 0 ? void 0 : excecao.horaFim)
                                    ? this_1.generateTimeSlots(excecao.horaInicio, excecao.horaFim, prof.tempConsultaMinutos + prof.bufferMinutos)
                                    : null;
                                var disponivelDia = prof.disponibilidades.find(function (d) { return d.diaSemana === diaSemana; });
                                if (disponivelDia || horariosExcecao) {
                                    var slots = horariosExcecao || this_1.generateTimeSlots(disponivelDia.horaInicio, disponivelDia.horaFim, prof.tempConsultaMinutos + prof.bufferMinutos);
                                    var agendadosDoDia_1 = prof.agendamentos.filter(function (a) {
                                        return (0, date_fns_1.isSameDay)(new Date(a.dataHora), current);
                                    });
                                    var slotsLivres = slots.filter(function (slot) {
                                        var slotTime = (0, date_fns_1.parseISO)("".concat((0, date_fns_1.format)(current, 'yyyy-MM-dd'), "T").concat(slot, ":00"));
                                        var fimSlot = (0, date_fns_1.addMinutes)(slotTime, prof.tempConsultaMinutos + prof.bufferMinutos);
                                        var agora = new Date();
                                        var antecedencia = (0, date_fns_1.addMinutes)(agora, prof.antecedenciaMinHoras);
                                        if ((0, date_fns_1.isBefore)(slotTime, antecedencia))
                                            return false;
                                        if ((0, date_fns_1.isAfter)(slotTime, fimJanela))
                                            return false;
                                        var conflito = agendadosDoDia_1.some(function (ag) {
                                            var agInicio = new Date(ag.dataHora);
                                            var agFim = (0, date_fns_1.addMinutes)(agInicio, ag.duracaoMinutos);
                                            return ((0, date_fns_1.isBefore)(slotTime, agFim) && (0, date_fns_1.isAfter)(fimSlot, agInicio));
                                        });
                                        return !conflito;
                                    });
                                    if (slotsLivres.length > 0) {
                                        resultado[(0, date_fns_1.format)(current, 'yyyy-MM-dd')] = slotsLivres;
                                    }
                                }
                                current = (0, date_fns_1.addDays)(current, 1);
                            };
                            this_1 = this;
                            while (current <= ultimoDia && current <= fimJanela) {
                                _loop_1();
                            }
                            return [2 /*return*/, resultado];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.generateTimeSlots = function (inicio, fim, duracaoMinutos) {
            var _a = inicio.split(':').map(Number), hIni = _a[0], mIni = _a[1];
            var _b = fim.split(':').map(Number), hFim = _b[0], mFim = _b[1];
            var slots = [];
            var current = (0, date_fns_1.setMinutes)((0, date_fns_1.setHours)(new Date(), hIni), mIni);
            var end = (0, date_fns_1.setMinutes)((0, date_fns_1.setHours)(new Date(), hFim), mFim);
            while ((0, date_fns_1.isBefore)((0, date_fns_1.addMinutes)(current, duracaoMinutos), end) ||
                (0, date_fns_1.addMinutes)(current, duracaoMinutos).getTime() === end.getTime()) {
                slots.push((0, date_fns_1.format)(current, 'HH:mm'));
                current = (0, date_fns_1.addMinutes)(current, duracaoMinutos);
            }
            return slots;
        };
        AppointmentsService_1.prototype.criarAgendamento = function (pacienteId, profissionalId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var prof, pac, taxa, valorPlataforma, valorProfissional, agendamento;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { id: profissionalId } })];
                        case 1:
                            prof = _a.sent();
                            return [4 /*yield*/, this.prisma.paciente.findUnique({ where: { id: pacienteId } })];
                        case 2:
                            pac = _a.sent();
                            if (!prof || !pac)
                                throw new common_1.NotFoundException();
                            taxa = parseFloat(this.configService.get('MP_TAXA_PLATAFORMA_PERCENT') || '5') / 100;
                            valorPlataforma = parseFloat((data.valorTotal * taxa).toFixed(2));
                            valorProfissional = parseFloat((data.valorTotal - valorPlataforma).toFixed(2));
                            return [4 /*yield*/, this.prisma.agendamento.create({
                                    data: {
                                        pacienteId: pacienteId,
                                        profissionalId: profissionalId,
                                        dataHora: data.dataHora,
                                        duracaoMinutos: data.duracaoMinutos,
                                        tipo: data.tipo,
                                        status: data.formaPagamento === 'ONLINE' ? 'PENDENTE_PAGAMENTO' : 'CONFIRMADO',
                                        valorTotal: data.valorTotal,
                                        valorPlataforma: valorPlataforma,
                                        valorProfissional: valorProfissional,
                                        formaPagamento: data.formaPagamento,
                                    },
                                })];
                        case 3:
                            agendamento = _a.sent();
                            return [2 /*return*/, agendamento];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.cancelarAgendamento = function (agendamentoId, userId, userType, motivo) {
            return __awaiter(this, void 0, void 0, function () {
                var ag, horasAntecedencia, reembolso, novoStatus, canceladoPor;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.agendamento.findUnique({
                                where: { id: agendamentoId },
                                include: { profissional: true, paciente: true },
                            })];
                        case 1:
                            ag = _a.sent();
                            if (!ag)
                                throw new common_1.NotFoundException('Agendamento não encontrado');
                            horasAntecedencia = (Date.now() - ag.dataHora.getTime()) / (1000 * 60 * 60);
                            reembolso = 0;
                            if (horasAntecedencia > 24)
                                reembolso = 100;
                            else if (horasAntecedencia >= 2)
                                reembolso = 50;
                            novoStatus = 'CANCELADO';
                            canceladoPor = userType === 'PROFISSIONAL' ? 'PROFISSIONAL' : 'PACIENTE';
                            return [4 /*yield*/, this.prisma.agendamento.update({
                                    where: { id: agendamentoId },
                                    data: {
                                        status: novoStatus,
                                        motivoCancelamento: motivo,
                                        canceladoPor: canceladoPor,
                                    },
                                })];
                        case 2:
                            _a.sent();
                            if (reembolso > 0 && ag.mpPaymentId && ag.formaPagamento === 'ONLINE') {
                                // Dispara job de reembolso via Mercado Pago
                            }
                            return [2 /*return*/, { message: 'Agendamento cancelado', reembolsoPercentual: reembolso }];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.reagendar = function (agendamentoId, pacienteId, novaDataHora) {
            return __awaiter(this, void 0, void 0, function () {
                var ag, horasAntecedencia, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.agendamento.findUnique({
                                where: { id: agendamentoId },
                            })];
                        case 1:
                            ag = _a.sent();
                            if (!ag)
                                throw new common_1.NotFoundException();
                            if (ag.pacienteId !== pacienteId)
                                throw new common_1.ForbiddenException();
                            if (ag.status !== 'CONFIRMADO')
                                throw new common_1.BadRequestException('Apenas agendamentos confirmados podem ser reagendados');
                            horasAntecedencia = (Date.now() - ag.dataHora.getTime()) / (1000 * 60 * 60);
                            if (horasAntecedencia < 24)
                                throw new common_1.BadRequestException('Reagendamento deve ser feito com 24h de antecedência');
                            if (ag.reagendamentos >= 2)
                                throw new common_1.BadRequestException('Limite de reagendamentos atingido');
                            return [4 /*yield*/, this.prisma.agendamento.update({
                                    where: { id: agendamentoId },
                                    data: {
                                        dataHora: novaDataHora,
                                        reagendamentos: { increment: 1 },
                                    },
                                })];
                        case 2:
                            updated = _a.sent();
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.listarAgendamentos = function (profissionalId, filtros) {
            return __awaiter(this, void 0, void 0, function () {
                var where, _a, year, month, inicio, fim;
                return __generator(this, function (_b) {
                    where = { profissionalId: profissionalId };
                    if (filtros === null || filtros === void 0 ? void 0 : filtros.status)
                        where.status = filtros.status;
                    if (filtros === null || filtros === void 0 ? void 0 : filtros.mes) {
                        _a = filtros.mes.split('-').map(Number), year = _a[0], month = _a[1];
                        inicio = new Date(year, month - 1, 1);
                        fim = new Date(year, month, 0, 23, 59, 59);
                        where.dataHora = { gte: inicio, lte: fim };
                    }
                    return [2 /*return*/, this.prisma.agendamento.findMany({
                            where: where,
                            include: {
                                paciente: { include: { user: { select: { nomeCompleto: true, emailEncrypted: true } } } },
                            },
                            orderBy: { dataHora: 'asc' },
                        })];
                });
            });
        };
        AppointmentsService_1.prototype.listarAgendamentosPaciente = function (pacienteId, status) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = { pacienteId: pacienteId };
                    if (status)
                        where.status = status;
                    return [2 /*return*/, this.prisma.agendamento.findMany({
                            where: where,
                            include: {
                                profissional: {
                                    select: {
                                        slug: true,
                                        fotoPerfil: true,
                                        cidade: true,
                                        estado: true,
                                        user: { select: { nomeCompleto: true } },
                                    },
                                },
                            },
                            orderBy: { dataHora: 'desc' },
                        })];
                });
            });
        };
        AppointmentsService_1.prototype.marcarNoShow = function (agendamentoId, profissionalId) {
            return __awaiter(this, void 0, void 0, function () {
                var ag;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.agendamento.findUnique({ where: { id: agendamentoId } })];
                        case 1:
                            ag = _a.sent();
                            if (!ag || ag.profissionalId !== profissionalId)
                                throw new common_1.ForbiddenException();
                            return [2 /*return*/, this.prisma.agendamento.update({
                                    where: { id: agendamentoId },
                                    data: { status: 'NO_SHOW' },
                                })];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.concluir = function (agendamentoId, profissionalId) {
            return __awaiter(this, void 0, void 0, function () {
                var ag;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.agendamento.findUnique({ where: { id: agendamentoId } })];
                        case 1:
                            ag = _a.sent();
                            if (!ag || ag.profissionalId !== profissionalId)
                                throw new common_1.ForbiddenException();
                            return [2 /*return*/, this.prisma.agendamento.update({
                                    where: { id: agendamentoId },
                                    data: { status: 'CONCLUIDO' },
                                })];
                    }
                });
            });
        };
        return AppointmentsService_1;
    }());
    __setFunctionName(_classThis, "AppointmentsService");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        AppointmentsService = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppointmentsService = _classThis;
}();
