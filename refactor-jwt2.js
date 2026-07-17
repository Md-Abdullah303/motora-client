const fs = require('fs');
const path = require('path');

const files = [
  "app/payment/success/page.tsx",
  "app/lib/cart.ts",
  "app/dashboard/listings/page.tsx",
  "app/dashboard/profile/page.tsx",
  "app/dashboard/payments/page.tsx",
  "app/dashboard/page.tsx",
  "app/dashboard/profile/edit/page.tsx",
  "app/dashboard/add-car/page.tsx",
  "app/cars/[id]/page.tsx"
];

for (const file of files) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace any token assignment that uses user_
  content = content.replace(/const token = `user_\$\{.*?\}`/g, "const token = await getJwt()");
  content = content.replace(/const token = session\?\.user\?\.id \? `user_\$\{.*?\}` : 'anon'/g, "const token = await getJwt()");
  content = content.replace(/const token = session\?\.user\?\.id \? `user_\$\{.*?\}` : 'anon';/g, "const token = await getJwt();");

  fs.writeFileSync(filePath, content);
}
console.log('Done replacing tokens strictly');
