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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisponibilidadeQueryDto = exports.ListarAgendamentosDto = exports.CancelarDto = exports.ReagendarDto = exports.CriarAgendamentoDto = void 0;
var class_validator_1 = require("class-validator");
var CriarAgendamentoDto = exports.CriarAgendamentoDto = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _profissionalId_decorators;
    var _profissionalId_initializers = [];
    var _dataHora_decorators;
    var _dataHora_initializers = [];
    var _tipo_decorators;
    var _tipo_initializers = [];
    var _formaPagamento_decorators;
    var _formaPagamento_initializers = [];
    return _a = /** @class */ (function () {
            function CriarAgendamentoDto() {
                this.profissionalId = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _profissionalId_initializers, void 0));
                this.dataHora = __runInitializers(this, _dataHora_initializers, void 0);
                this.tipo = __runInitializers(this, _tipo_initializers, void 0);
                this.formaPagamento = __runInitializers(this, _formaPagamento_initializers, void 0);
            }
            return CriarAgendamentoDto;
        }()),
        (function () {
            _profissionalId_decorators = [(0, class_validator_1.IsString)()];
            _dataHora_decorators = [(0, class_validator_1.IsDateString)()];
            _tipo_decorators = [(0, class_validator_1.IsString)()];
            _formaPagamento_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _profissionalId_decorators, { kind: "field", name: "profissionalId", static: false, private: false, access: { has: function (obj) { return "profissionalId" in obj; }, get: function (obj) { return obj.profissionalId; }, set: function (obj, value) { obj.profissionalId = value; } } }, _profissionalId_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _dataHora_decorators, { kind: "field", name: "dataHora", static: false, private: false, access: { has: function (obj) { return "dataHora" in obj; }, get: function (obj) { return obj.dataHora; }, set: function (obj, value) { obj.dataHora = value; } } }, _dataHora_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _tipo_decorators, { kind: "field", name: "tipo", static: false, private: false, access: { has: function (obj) { return "tipo" in obj; }, get: function (obj) { return obj.tipo; }, set: function (obj, value) { obj.tipo = value; } } }, _tipo_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _formaPagamento_decorators, { kind: "field", name: "formaPagamento", static: false, private: false, access: { has: function (obj) { return "formaPagamento" in obj; }, get: function (obj) { return obj.formaPagamento; }, set: function (obj, value) { obj.formaPagamento = value; } } }, _formaPagamento_initializers, _instanceExtraInitializers);
        })(),
        _a;
}();
var ReagendarDto = exports.ReagendarDto = function () {
    var _a;
    var _instanceExtraInitializers_1 = [];
    var _novaDataHora_decorators;
    var _novaDataHora_initializers = [];
    return _a = /** @class */ (function () {
            function ReagendarDto() {
                this.novaDataHora = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _novaDataHora_initializers, void 0));
            }
            return ReagendarDto;
        }()),
        (function () {
            _novaDataHora_decorators = [(0, class_validator_1.IsDateString)()];
            __esDecorate(null, null, _novaDataHora_decorators, { kind: "field", name: "novaDataHora", static: false, private: false, access: { has: function (obj) { return "novaDataHora" in obj; }, get: function (obj) { return obj.novaDataHora; }, set: function (obj, value) { obj.novaDataHora = value; } } }, _novaDataHora_initializers, _instanceExtraInitializers_1);
        })(),
        _a;
}();
var CancelarDto = exports.CancelarDto = function () {
    var _a;
    var _instanceExtraInitializers_2 = [];
    var _motivo_decorators;
    var _motivo_initializers = [];
    return _a = /** @class */ (function () {
            function CancelarDto() {
                this.motivo = (__runInitializers(this, _instanceExtraInitializers_2), __runInitializers(this, _motivo_initializers, void 0));
            }
            return CancelarDto;
        }()),
        (function () {
            _motivo_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _motivo_decorators, { kind: "field", name: "motivo", static: false, private: false, access: { has: function (obj) { return "motivo" in obj; }, get: function (obj) { return obj.motivo; }, set: function (obj, value) { obj.motivo = value; } } }, _motivo_initializers, _instanceExtraInitializers_2);
        })(),
        _a;
}();
var ListarAgendamentosDto = exports.ListarAgendamentosDto = function () {
    var _a;
    var _instanceExtraInitializers_3 = [];
    var _status_decorators;
    var _status_initializers = [];
    var _mes_decorators;
    var _mes_initializers = [];
    return _a = /** @class */ (function () {
            function ListarAgendamentosDto() {
                this.status = (__runInitializers(this, _instanceExtraInitializers_3), __runInitializers(this, _status_initializers, void 0));
                this.mes = __runInitializers(this, _mes_initializers, void 0);
            }
            return ListarAgendamentosDto;
        }()),
        (function () {
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _mes_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } } }, _status_initializers, _instanceExtraInitializers_3);
            __esDecorate(null, null, _mes_decorators, { kind: "field", name: "mes", static: false, private: false, access: { has: function (obj) { return "mes" in obj; }, get: function (obj) { return obj.mes; }, set: function (obj, value) { obj.mes = value; } } }, _mes_initializers, _instanceExtraInitializers_3);
        })(),
        _a;
}();
var DisponibilidadeQueryDto = exports.DisponibilidadeQueryDto = function () {
    var _a;
    var _instanceExtraInitializers_4 = [];
    var _mes_decorators;
    var _mes_initializers = [];
    return _a = /** @class */ (function () {
            function DisponibilidadeQueryDto() {
                this.mes = (__runInitializers(this, _instanceExtraInitializers_4), __runInitializers(this, _mes_initializers, void 0));
            }
            return DisponibilidadeQueryDto;
        }()),
        (function () {
            _mes_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _mes_decorators, { kind: "field", name: "mes", static: false, private: false, access: { has: function (obj) { return "mes" in obj; }, get: function (obj) { return obj.mes; }, set: function (obj, value) { obj.mes = value; } } }, _mes_initializers, _instanceExtraInitializers_4);
        })(),
        _a;
}();
