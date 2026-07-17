const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

  // Add import if not present
  if (!content.includes('import { getJwt }')) {
    // find last import
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const nextLine = content.indexOf('\n', lastImportIndex) + 1;
      content = content.slice(0, nextLine) + 'import { getJwt } from "@/app/actions/getJwt"\n' + content.slice(nextLine);
    }
  }

  // Replace token generation
  // Pattern 1: const token = session?.user?.id ? `user_${session.user.id}` : "anon"
  // Pattern 2: const token = session?.user?.id ? `user_${session?.user?.id}` : "anon"
  // Pattern 3: Bearer user_${session?.user?.id || 'anon'}

  content = content.replace(/const token = session\?\.user\?\.id \? `user_\$\{session\?\.user\?\.id\}` : "anon"/g, 
                            "const token = await getJwt()");
  content = content.replace(/const token = session\?\.user\?\.id \? `user_\$\{session\.user\.id\}` : "anon"/g, 
                            "const token = await getJwt()");

  // In add-car/page.tsx, it's inline
  if (file.includes('add-car')) {
    content = content.replace(/`Bearer user_\$\{session\?\.user\?\.id \|\| 'anon'\}`/g, "`Bearer ${await getJwt()}`");
  }

  fs.writeFileSync(filePath, content);
}
console.log('Done replacing tokens');
