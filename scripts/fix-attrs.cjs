const fs = require("fs");
const path = require("path");
const dir = "f:/huiwebsite/maxim-pharmacy/src/html-port";
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".tsx")) continue;
  const p = path.join(dir, f);
  let s = fs.readFileSync(p, "utf8");
  const before = s;
  s = s.replace(/\brows="(\d+)"/g, " rows={$1}");
  s = s.replace(/\bcols="(\d+)"/g, " cols={$1}");
  s = s.replace(/\btabIndex="(\d+)"/g, " tabIndex={$1}");
  s = s.replace(/\bspan="(\d+)"/g, " span={$1}");
  s = s.replace(/\bcolSpan="(\d+)"/g, " colSpan={$1}");
  s = s.replace(/\browSpan="(\d+)"/g, " rowSpan={$1}");
  s = s.replace(/\bmaxLength="(\d+)"/g, " maxLength={$1}");
  s = s.replace(/\bminLength="(\d+)"/g, " minLength={$1}");
  s = s.replace(/ referrerpolicy=/g, " referrerPolicy=");
  s = s.replace(/ crossorigin=/g, " crossOrigin=");
  s = s.replace(/ autocomplete=/g, " autoComplete=");
  s = s.replace(/ frameborder="(\d+)"/g, " frameBorder={$1}");
  if (s !== before) {
    fs.writeFileSync(p, s);
    console.log("fixed", f);
  }
}
