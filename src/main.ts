import { Xenon } from "./Xenon";

var xenon = new Xenon();
window["xenon"] = xenon;

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
