import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: "org.nativescript.app",
  appPath: "src",
  appResourcesPath:
    "/home/runner/work/SistemaCostos/SistemaCostos/platforms/",
  android: {
    v8Flags: "--expose_gc",
    markingMode: "none",
  },
} as NativeScriptConfig;