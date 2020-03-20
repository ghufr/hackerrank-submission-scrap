const fs = require("fs").promises;
const neatCsv = require("neat-csv");
const _findIndex = require("lodash/findIndex");

const challenges = {
  150802: "m3",
  151030: "m3",
  151053: "m4",
  151034: "m4",
  151038: "m4"
};
(async () => {
  try {
    const submissions = JSON.parse(
      await fs.readFile("./data/submissions.json", "utf8")
    );
    const results = [];
    submissions.models.map(submission => {
      const { hacker_username, score, challenge_id } = submission;
      const modul = challenges[challenge_id];
      const result_index = _findIndex(results, { hacker_username });
      if (result_index > -1) {
        const result_curr = results[result_index];
        const is_exist = result_curr.challenges.indexOf(challenge_id) > -1;
        results.splice(result_index, 1, {
          ...result_curr,
          [modul]: (result_curr[modul] || 0) + (is_exist ? 0 : score),
          challenges: is_exist
            ? result_curr.challenges
            : [...result_curr.challenges, challenge_id]
        });
      } else {
        results.push({
          hacker_username,
          [modul]: score,
          challenges: [challenge_id]
        });
      }
    });
    const users = await neatCsv(await fs.readFile("./data/users.csv", "utf8"));
    results.map((result_curr, result_index) => {
      const { hacker_username } = result_curr;
      const user_index = _findIndex(users, { hacker_username });
      if (user_index > -1) {
        const { kode_asisten, kelas, nama_lengkap } = users[user_index];
        results.splice(result_index, 1, {
          ...result_curr,
          nama_lengkap,
          kelas,
          kode_asisten
        });
      } else {
        console.log(result_curr);
      }
    });

    await fs.writeFile(
      "./out/results.csv",
      "nama,username,kelas,m3,m4,kode_asisten,\n".concat(
        results
          .map(
            res =>
              `${res.nama_lengkap || "-"},${res.hacker_username},${res.kelas ||
                "-"},${res.m3 || 0},${res.m4 || 0},${res.kode_asisten || "-"}`
          )
          .join(",\n")
      )
    );
  } catch (err) {
    console.log(err);
  }
})();
