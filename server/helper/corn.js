// // helpers/cron.js
// const {CronJob} = require("cron")
// const {RentGame} = require("../models")

// const threeHoursInMillisecond = 3 * 60 * 60 * 1000;
// module.exports = () => {
//   const job = new CronJob('0 */3 * * *', async () => {

//     const rentGamesToBeDelete = await RentGame.find({ endTime: { $lte: new Date(Date.now() + threeHoursInMillisecond) } });
//     rentGamesToBeDelete.forEach(rentGame => {
//       setTimeout(() => {
//         // Destroy the item here
//         // rentGame.destroy();
//         rentGame.update({status: false})
//       }, selisihSekarang ke waktu rentnya habis);
//     });
//   });
//   return job;
// }

// // app.js
// const cron = require("./helpers/cron");

// // ... the rest of the codes

// app.listen(port, () => {
//   cron().start();
//   console.log(port, "listening");
// })
