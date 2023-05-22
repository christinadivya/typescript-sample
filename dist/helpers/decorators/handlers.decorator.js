"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patch = exports.Delete = exports.Put = exports.Post = exports.Get = exports.Methods = void 0;
const metadata_keys_1 = require("./metadata.keys");
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
    Methods["PUT"] = "put";
    Methods["DELETE"] = "delete";
    Methods["PATCH"] = "patch";
})(Methods = exports.Methods || (exports.Methods = {}));
const methodDecoratorFactory = (method) => {
    return (path) => {
        return (target, propertyKey) => {
            const serviceClass = target.constructor;
            const routers = Reflect.hasMetadata(metadata_keys_1.MetadataKeys.ROUTERS, serviceClass)
                ? Reflect.getMetadata(metadata_keys_1.MetadataKeys.ROUTERS, serviceClass)
                : [];
            routers.push({
                method,
                path,
                handlerName: propertyKey,
            });
            Reflect.defineMetadata(metadata_keys_1.MetadataKeys.ROUTERS, routers, serviceClass);
        };
    };
};
exports.Get = methodDecoratorFactory(Methods.GET);
exports.Post = methodDecoratorFactory(Methods.POST);
exports.Put = methodDecoratorFactory(Methods.PUT);
exports.Delete = methodDecoratorFactory(Methods.DELETE);
exports.Patch = methodDecoratorFactory(Methods.PATCH);
//# sourceMappingURL=handlers.decorator.js.map