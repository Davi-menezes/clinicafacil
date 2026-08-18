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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
var common_1 = require("@nestjs/common");
var crypto = require("crypto");
var EncryptionService = exports.EncryptionService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EncryptionService = _classThis = /** @class */ (function () {
        function EncryptionService_1() {
            this.logger = new common_1.Logger(EncryptionService.name);
            this.algorithm = 'aes-256-gcm';
            var keyHex = process.env.ENCRYPTION_KEY || 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6';
            this.key = Buffer.from(keyHex, 'hex');
        }
        EncryptionService_1.prototype.encrypt = function (text) {
            var iv = crypto.randomBytes(16);
            var cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
            var encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            var authTag = cipher.getAuthTag();
            var combined = "".concat(iv.toString('hex'), ":").concat(authTag.toString('hex'), ":").concat(encrypted);
            return combined;
        };
        EncryptionService_1.prototype.decrypt = function (text) {
            var _a = text.split(':'), ivHex = _a[0], authTagHex = _a[1], encrypted = _a[2];
            var iv = Buffer.from(ivHex, 'hex');
            var authTag = Buffer.from(authTagHex, 'hex');
            var decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
            decipher.setAuthTag(authTag);
            var decrypted = decipher.update(encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        };
        EncryptionService_1.prototype.hash = function (input) {
            return crypto.createHash('sha256').update(input.toLowerCase().trim()).digest('hex');
        };
        EncryptionService_1.prototype.generateToken = function (length) {
            if (length === void 0) { length = 32; }
            return crypto.randomBytes(length).toString('hex');
        };
        return EncryptionService_1;
    }());
    __setFunctionName(_classThis, "EncryptionService");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        EncryptionService = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EncryptionService = _classThis;
}();
