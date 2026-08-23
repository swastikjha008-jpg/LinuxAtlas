import { slugSchema, searchQuerySchema, distroFilterSchema, compareQuerySchema } from "../lib/validation";

let failures = 0;
function check(label: string, cond: boolean) {
  console.log(`${cond ? "  PASS" : "  FAIL"}  ${label}`);
  if (!cond) failures++;
}

check("valid slug accepted", slugSchema.safeParse("arch-linux").success);
check("valid single-word slug accepted", slugSchema.safeParse("gentoo").success);
check("uppercase slug rejected", !slugSchema.safeParse("Arch-Linux").success);
check("slug with spaces rejected", !slugSchema.safeParse("arch linux").success);
check("slug with underscore rejected", !slugSchema.safeParse("arch_linux").success);
check("empty slug rejected", !slugSchema.safeParse("").success);
check("SQL-injection-shaped slug rejected", !slugSchema.safeParse("'; DROP TABLE Distribution; --").success);

check("normal search query accepted", searchQuerySchema.safeParse("arch linux").success);
check("whitespace-only query rejected", !searchQuerySchema.safeParse("   ").success);
check("oversized query rejected", !searchQuerySchema.safeParse("a".repeat(300)).success);

const filterOk = distroFilterSchema.safeParse({ family: "Arch", difficulty: "advanced" });
check("valid distro filter accepted", filterOk.success);
const filterBad = distroFilterSchema.safeParse({ difficulty: "expert" });
check("invalid difficulty enum rejected", !filterBad.success);

const compareOk = compareQuerySchema.safeParse("arch-linux,ubuntu,fedora");
check("valid compare query parses to array", compareOk.success && JSON.stringify(compareOk.data) === JSON.stringify(["arch-linux", "ubuntu", "fedora"]));
check("single-distro compare rejected (needs >= 2)", !compareQuerySchema.safeParse("arch-linux").success);
check("5-distro compare rejected (max 4)", !compareQuerySchema.safeParse("a,b,c,d,e").success);

console.log(`\n${failures === 0 ? "ALL VALIDATION CHECKS PASSED" : `${failures} CHECK(S) FAILED`}`);
process.exit(failures === 0 ? 0 : 1);
