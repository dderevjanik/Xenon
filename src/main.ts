import { Xenon } from "./Xenon";

var xenon = new Xenon();
(window as any).xenon = xenon; // for debug

xenon.Run();

// require(["Xenon.js"], function (someModule) {

//     var xenon = new someModule();
//     xenon.Run();
// });

// require.config({
//     baseUrl: "/",
//     paths: {
//         "some": "JetPac"
//     },
//     waitSeconds: 15,
// });
