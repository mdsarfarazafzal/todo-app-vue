import { ref } from "vue";

export default {
  install: (app, options) => {
    // app.provide("toast", (msg) => {
    //   const notification = document.createElement("div");
    //   notification.innerHTML = msg;
    //   notification.className =
    //     "fixed top-5 right-5 p-3 bg-gray-800 text-neutral-50 font-semibold shadow-lg text-sm rounded-4xl ";
    //   document.getElementById("app").prepend(notification);
    //   setTimeout(() => {
    //     document.getElementById("app").removeChild(notification);
    //   }, 5000);
    // });

    app.provide("logger", {
      logStyle:
        "font-size:20px; font-weight:bold; background: #000000; padding: 5px; border-radius: 10px; margin: 5px",
      success(msg) {
        console.log(`%c${msg}`, `color:#27F52E; ${this.logStyle}`);
      },
      error(msg) {
        console.log(`%c${msg}`, `color:#E50B0B; ${this.logStyle}`);
      },
      table(obj) {
        console.table(obj);
      },
      info(msg) {
        console.log(`%c${msg}`, `color:#0B78E5; ${this.logStyle}`);
      },
      warn(msg) {
        console.log(`%c${msg}`, `color:#E5E10B; ${this.logStyle}`);
      },
    });
  },
};
