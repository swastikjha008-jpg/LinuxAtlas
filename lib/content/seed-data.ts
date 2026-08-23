// Canonical content dataset — the single source of truth for what ships in
// the database. prisma/seed.ts inserts this via Prisma Client; long-form
// prose for distros/guides lives separately as MDX (see content/) and is
// joined by slug at request time, not duplicated here.
//
// scripts/verify-seed-integrity.ts checks this file directly (no Prisma
// needed) for duplicate slugs and dangling `related` references.

export type DifficultyLiteral = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type ContentTypeLiteral = "DISTRIBUTION" | "COMMAND" | "PACKAGE_MANAGER" | "GUIDE";

export interface SeedRelated {
  targetType: ContentTypeLiteral;
  targetSlug: string;
}

export interface SeedDistribution {
  slug: string;
  name: string;
  description: string;
  family: string;
  basedOn: string | null;
  packageManager: string;
  initSystem: string;
  releaseModel: string;
  architectures: string[];
  desktopEnvironments: string[];
  difficulty: DifficultyLiteral;
  website: string;
  documentationUrl: string;
  logo: string;
  sourceUrl: string;
  sourceName: string;
  commonCommands: { code: string; description: string }[];
  related: SeedRelated[];
}

export const distributions: SeedDistribution[] = [
  {
    slug: "arch-linux", name: "Arch Linux",
    description: "A minimal, do-it-yourself distribution built around the rolling-release model.",
    family: "Arch", basedOn: null, packageManager: "pacman", initSystem: "systemd",
    releaseModel: "Rolling", architectures: ["x86_64"], desktopEnvironments: ["None (user-chosen)"],
    difficulty: "ADVANCED", website: "https://archlinux.org", documentationUrl: "https://wiki.archlinux.org",
    logo: "arch", sourceUrl: "https://wiki.archlinux.org/title/Arch_Linux", sourceName: "Arch Wiki",
    commonCommands: [
      { code: "sudo pacman -Syu", description: "Synchronize repositories and upgrade all packages" },
      { code: "sudo pacman -S <package>", description: "Install a package" },
      { code: "yay -S <package>", description: "Install an AUR package (with a helper like yay)" },
    ],
    related: [{ targetType: "DISTRIBUTION", targetSlug: "cachyos" }, { targetType: "DISTRIBUTION", targetSlug: "blackarch-linux" }, { targetType: "PACKAGE_MANAGER", targetSlug: "pacman" }],
  },
  {
    slug: "ubuntu", name: "Ubuntu",
    description: "The most widely used desktop and server distribution, backed by Canonical.",
    family: "Debian", basedOn: "Debian", packageManager: "apt", initSystem: "systemd",
    releaseModel: "LTS / Stable", architectures: ["x86_64", "ARM64"], desktopEnvironments: ["GNOME"],
    difficulty: "BEGINNER", website: "https://ubuntu.com", documentationUrl: "https://help.ubuntu.com",
    logo: "ubuntu", sourceUrl: "https://ubuntu.com/about", sourceName: "Ubuntu",
    commonCommands: [
      { code: "sudo apt update && sudo apt upgrade", description: "Refresh package lists and upgrade installed packages" },
      { code: "sudo apt install <package>", description: "Install a package" },
      { code: "snap install <package>", description: "Install a sandboxed Snap package" },
    ],
    related: [{ targetType: "DISTRIBUTION", targetSlug: "linux-mint" }, { targetType: "DISTRIBUTION", targetSlug: "pop-os" }, { targetType: "PACKAGE_MANAGER", targetSlug: "apt" }],
  },
  {
    slug: "debian", name: "Debian",
    description: "The stability-first distribution that forms the base of hundreds of others.",
    family: "Debian", basedOn: null, packageManager: "apt", initSystem: "systemd",
    releaseModel: "Stable", architectures: ["x86_64", "ARM", "i386"], desktopEnvironments: ["GNOME", "KDE Plasma", "Xfce"],
    difficulty: "INTERMEDIATE", website: "https://debian.org", documentationUrl: "https://www.debian.org/doc/",
    logo: "debian", sourceUrl: "https://www.debian.org/social_contract", sourceName: "Debian Social Contract",
    commonCommands: [
      { code: "sudo apt update && sudo apt upgrade", description: "Refresh and upgrade packages" },
      { code: "sudo apt install <package>", description: "Install a package" },
      { code: "dpkg -l", description: "List installed packages" },
    ],
    related: [{ targetType: "DISTRIBUTION", targetSlug: "ubuntu" }, { targetType: "DISTRIBUTION", targetSlug: "kali-linux" }, { targetType: "PACKAGE_MANAGER", targetSlug: "apt" }],
  },
  {
    slug: "fedora", name: "Fedora",
    description: "A cutting-edge distribution sponsored by Red Hat, first to ship new upstream tech.",
    family: "RPM", basedOn: null, packageManager: "dnf", initSystem: "systemd",
    releaseModel: "Stable", architectures: ["x86_64", "ARM64"], desktopEnvironments: ["GNOME"],
    difficulty: "INTERMEDIATE", website: "https://fedoraproject.org", documentationUrl: "https://docs.fedoraproject.org",
    logo: "fedora", sourceUrl: "https://docs.fedoraproject.org/en-US/project/", sourceName: "Fedora Docs",
    commonCommands: [
      { code: "sudo dnf upgrade", description: "Upgrade all installed packages" },
      { code: "sudo dnf install <package>", description: "Install a package" },
      { code: "dnf history", description: "View package transaction history" },
    ],
    related: [{ targetType: "DISTRIBUTION", targetSlug: "opensuse" }, { targetType: "PACKAGE_MANAGER", targetSlug: "dnf" }],
  },
  {
    slug: "opensuse", name: "openSUSE",
    description: "A polished distribution known for YaST and the Tumbleweed rolling branch.",
    family: "RPM", basedOn: null, packageManager: "zypper", initSystem: "systemd",
    releaseModel: "Stable / Rolling", architectures: ["x86_64", "ARM64"], desktopEnvironments: ["KDE Plasma", "GNOME"],
    difficulty: "INTERMEDIATE", website: "https://opensuse.org", documentationUrl: "https://doc.opensuse.org",
    logo: "opensuse", sourceUrl: "https://doc.opensuse.org", sourceName: "openSUSE Documentation",
    commonCommands: [
      { code: "sudo zypper update", description: "Update all installed packages" },
      { code: "sudo zypper install <package>", description: "Install a package" },
      { code: "zypper se <term>", description: "Search for a package" },
    ],
    related: [{ targetType: "DISTRIBUTION", targetSlug: "fedora" }, { targetType: "PACKAGE_MANAGER", targetSlug: "zypper" }],
  },
  {
    slug: "alpine-linux", name: "Alpine Linux",
    description: "A security-oriented, musl-based distribution built for minimal footprints.",
    family: "Independent", basedOn: null, packageManager: "apk", initSystem: "OpenRC",
    releaseModel: "Stable", architectures: ["x86_64", "ARM", "ARM64"], desktopEnvironments: [],
    difficulty: "ADVANCED", website: "https://alpinelinux.org", documentationUrl: "https://wiki.alpinelinux.org",
    logo: "alpine", sourceUrl: "https://alpinelinux.org/about/", sourceName: "Alpine Linux",
    commonCommands: [
      { code: "sudo apk update && sudo apk upgrade", description: "Refresh and upgrade packages" },
      { code: "sudo apk add <package>", description: "Install a package" },
      { code: "apk search <term>", description: "Search available packages" },
    ],
    related: [{ targetType: "PACKAGE_MANAGER", targetSlug: "apk" }],
  },
  {
    slug: "kali-linux", name: "Kali Linux",
    description: "A Debian-based distribution purpose-built for penetration testing and security work.",
    family: "Debian", basedOn: "Debian", packageManager: "apt", initSystem: "systemd",
    releaseModel: "Rolling", architectures: ["x86_64", "ARM64"], desktopEnvironments: ["Xfce"],
    difficulty: "ADVANCED", website: "https://kali.org", documentationUrl: "https://www.kali.org/docs/",
    logo: "kali", sourceUrl: "https://www.kali.org/docs/introduction/", sourceName: "Kali Docs",
    commonCommands: [
      { code: "sudo apt update && sudo apt full-upgrade", description: "Refresh and upgrade packages" },
      { code: "sudo apt install <tool-name>", description: "Install a security tool" },
    ],
    related: [{ targetType: "DISTRIBUTION", targetSlug: "blackarch-linux" }, { targetType: "DISTRIBUTION", targetSlug: "debian" }],
  },
  {
    slug: "linux-mint", name: "Linux Mint",
    description: "An Ubuntu-based distribution focused on a familiar, out-of-the-box desktop experience.",
    family: "Debian", basedOn: "Ubuntu", packageManager: "apt", initSystem: "systemd",
    releaseModel: "LTS", architectures: ["x86_64"], desktopEnvironments: ["Cinnamon", "MATE", "Xfce"],
    difficulty: "BEGINNER", website: "https://linuxmint.com", documentationUrl: "https://linuxmint.com/documentation.php",
    logo: "mint", sourceUrl: "https://linuxmint.com/aboutus.php", sourceName: "Linux Mint",
    commonCommands: [
      { code: "sudo apt update && sudo apt upgrade", description: "Refresh and upgrade packages" },
      { code: "sudo apt install <package>", description: "Install a package" },
    ],
    related: [{ targetType: "DISTRIBUTION", targetSlug: "ubuntu" }, { targetType: "DISTRIBUTION", targetSlug: "zorin-os" }],
  },
  {
    slug: "steamos", name: "SteamOS",
    description: "Valve's Arch-based distribution built for gaming, powering the Steam Deck.",
    family: "Arch", basedOn: "Arch Linux", packageManager: "pacman", initSystem: "systemd",
    releaseModel: "Stable (image-based)", architectures: ["x86_64"], desktopEnvironments: ["KDE Plasma (Desktop Mode)"],
    difficulty: "BEGINNER", website: "https://store.steampowered.com/steamos", documentationUrl: "https://help.steampowered.com",
    logo: "steamos", sourceUrl: "https://store.steampowered.com/steamos", sourceName: "Valve",
    commonCommands: [
      { code: "sudo steamos-readonly disable", description: "Temporarily disable the read-only filesystem" },
      { code: "sudo pacman -Syu", description: "Update the base system (Desktop Mode)" },
    ],
    related: [{ targetType: "DISTRIBUTION", targetSlug: "arch-linux" }],
  },
  {
    slug: "blackarch-linux", name: "BlackArch Linux",
    description: "An Arch-based penetration testing distribution with a massive security-tool repository.",
    family: "Arch", basedOn: "Arch Linux", packageManager: "pacman", initSystem: "systemd",
    releaseModel: "Rolling", architectures: ["x86_64"], desktopEnvironments: [],
    difficulty: "ADVANCED", website: "https://blackarch.org", documentationUrl: "https://blackarch.org/guide.html",
    logo: "blackarch", sourceUrl: "https://blackarch.org/guide.html", sourceName: "BlackArch Guide",
    commonCommands: [
      { code: "sudo pacman -Syu", description: "Update the base system" },
      { code: "sudo pacman -S blackarch-webapp", description: "Install a BlackArch tool category" },
    ],
    related: [{ targetType: "DISTRIBUTION", targetSlug: "arch-linux" }, { targetType: "DISTRIBUTION", targetSlug: "kali-linux" }],
  },
  {
    slug: "zorin-os", name: "Zorin OS",
    description: "An Ubuntu-based distribution designed to ease the transition from Windows or macOS.",
    family: "Debian", basedOn: "Ubuntu", packageManager: "apt", initSystem: "systemd",
    releaseModel: "LTS", architectures: ["x86_64"], desktopEnvironments: ["GNOME (Zorin layouts)"],
    difficulty: "BEGINNER", website: "https://zorin.com", documentationUrl: "https://help.zorin.com",
    logo: "zorin", sourceUrl: "https://zorin.com/os/", sourceName: "Zorin OS",
    commonCommands: [
      { code: "sudo apt update && sudo apt upgrade", description: "Refresh and upgrade packages" },
      { code: "sudo apt install <package>", description: "Install a package" },
    ],
    related: [{ targetType: "DISTRIBUTION", targetSlug: "linux-mint" }, { targetType: "DISTRIBUTION", targetSlug: "ubuntu" }],
  },
  {
    slug: "cachyos", name: "CachyOS",
    description: "An Arch-based distribution focused on performance, with CPU-optimized packages.",
    family: "Arch", basedOn: "Arch Linux", packageManager: "pacman", initSystem: "systemd",
    releaseModel: "Rolling", architectures: ["x86_64 (v3/v4 optimized)"], desktopEnvironments: ["KDE Plasma", "GNOME"],
    difficulty: "INTERMEDIATE", website: "https://cachyos.org", documentationUrl: "https://wiki.cachyos.org",
    logo: "cachyos", sourceUrl: "https://wiki.cachyos.org", sourceName: "CachyOS Wiki",
    commonCommands: [
      { code: "sudo pacman -Syu", description: "Synchronize repositories and upgrade all packages" },
      { code: "sudo pacman -S <package>", description: "Install a package" },
    ],
    related: [{ targetType: "DISTRIBUTION", targetSlug: "arch-linux" }],
  },
  {
    slug: "pop-os", name: "Pop!_OS",
    description: "System76's Ubuntu-based distribution, tuned for development and GPU workloads.",
    family: "Debian", basedOn: "Ubuntu", packageManager: "apt", initSystem: "systemd",
    releaseModel: "LTS / Stable", architectures: ["x86_64"], desktopEnvironments: ["COSMIC", "GNOME"],
    difficulty: "BEGINNER", website: "https://pop.system76.com", documentationUrl: "https://support.system76.com",
    logo: "popos", sourceUrl: "https://support.system76.com", sourceName: "System76 Support",
    commonCommands: [
      { code: "sudo apt update && sudo apt upgrade", description: "Refresh and upgrade packages" },
      { code: "sudo apt install <package>", description: "Install a package" },
    ],
    related: [{ targetType: "DISTRIBUTION", targetSlug: "ubuntu" }],
  },
  {
    slug: "gentoo", name: "Gentoo",
    description: "A source-based distribution offering total control over how software is built.",
    family: "Independent", basedOn: null, packageManager: "portage", initSystem: "OpenRC / systemd",
    releaseModel: "Rolling", architectures: ["x86_64", "ARM"], desktopEnvironments: ["None (user-chosen)"],
    difficulty: "ADVANCED", website: "https://gentoo.org", documentationUrl: "https://wiki.gentoo.org",
    logo: "gentoo", sourceUrl: "https://wiki.gentoo.org/wiki/Handbook:Main_Page", sourceName: "Gentoo Handbook",
    commonCommands: [
      { code: "emerge --sync", description: "Sync the Portage tree" },
      { code: "emerge --ask <package>", description: "Build and install a package from source" },
    ],
    related: [{ targetType: "DISTRIBUTION", targetSlug: "arch-linux" }],
  },
  {
    slug: "nixos", name: "NixOS",
    description: "A declarative distribution where the entire system is defined as reproducible config.",
    family: "Independent", basedOn: null, packageManager: "nix", initSystem: "systemd",
    releaseModel: "Stable / Rolling", architectures: ["x86_64", "ARM64"], desktopEnvironments: ["GNOME", "KDE Plasma"],
    difficulty: "ADVANCED", website: "https://nixos.org", documentationUrl: "https://nixos.org/manual/nixos/stable/",
    logo: "nixos", sourceUrl: "https://nixos.org/manual/nixos/stable/", sourceName: "NixOS Manual",
    commonCommands: [
      { code: "sudo nixos-rebuild switch", description: "Rebuild the system from configuration.nix" },
      { code: "nix-env -iA nixpkgs.<package>", description: "Imperatively install a package" },
    ],
    related: [{ targetType: "DISTRIBUTION", targetSlug: "gentoo" }],
  },
];

export interface SeedCommand {
  slug: string; name: string; description: string; syntax: string; category: string;
  examples: { code: string; description: string; distributionSlug?: string }[];
  options: { flag: string; description: string }[];
  related: SeedRelated[];
}

export const commands: SeedCommand[] = [
  { slug: "ls", name: "ls", description: "List directory contents", syntax: "ls [options] [path]", category: "Filesystem",
    examples: [{ code: "ls -la", description: "List all files, including hidden ones, in long format" }, { code: "ls -lh /var/log", description: "List /var/log with human-readable file sizes" }],
    options: [{ flag: "-l", description: "Use long listing format" }, { flag: "-a", description: "Include hidden files (starting with .)" }, { flag: "-h", description: "Print sizes in human-readable form" }],
    related: [{ targetType: "COMMAND", targetSlug: "find" }, { targetType: "GUIDE", targetSlug: "linux-filesystem-explained" }] },
  { slug: "grep", name: "grep", description: "Search text using patterns", syntax: "grep [options] pattern [file...]", category: "Text Processing",
    examples: [{ code: "grep -r \"TODO\" .", description: "Recursively search the current directory for TODO" }, { code: "grep -i error app.log", description: "Case-insensitive search for 'error' in app.log" }],
    options: [{ flag: "-r", description: "Search directories recursively" }, { flag: "-i", description: "Ignore case distinctions" }, { flag: "-n", description: "Print line numbers with matches" }],
    related: [{ targetType: "COMMAND", targetSlug: "find" }] },
  { slug: "chmod", name: "chmod", description: "Change file permissions", syntax: "chmod [options] mode file...", category: "Permissions",
    examples: [{ code: "chmod +x deploy.sh", description: "Make deploy.sh executable" }, { code: "chmod 644 config.yml", description: "Set owner read/write, group and others read-only" }],
    options: [{ flag: "-R", description: "Change permissions recursively" }, { flag: "-v", description: "Print a diagnostic for every file processed" }],
    related: [{ targetType: "COMMAND", targetSlug: "chown" }, { targetType: "GUIDE", targetSlug: "understanding-permissions" }] },
  { slug: "chown", name: "chown", description: "Change file owner and group", syntax: "chown [options] owner[:group] file...", category: "Permissions",
    examples: [{ code: "sudo chown alice:staff report.csv", description: "Change owner to alice and group to staff" }],
    options: [{ flag: "-R", description: "Change ownership recursively" }],
    related: [{ targetType: "COMMAND", targetSlug: "chmod" }, { targetType: "GUIDE", targetSlug: "understanding-permissions" }] },
  { slug: "systemctl", name: "systemctl", description: "Control the systemd system and service manager", syntax: "systemctl [command] [unit]", category: "System",
    examples: [{ code: "sudo systemctl status nginx", description: "Show the current status of the nginx service" }, { code: "sudo systemctl enable --now docker", description: "Enable docker at boot and start it immediately" }],
    options: [{ flag: "--now", description: "Apply the change immediately, not just at next boot" }, { flag: "--user", description: "Operate on the calling user's service manager" }],
    related: [{ targetType: "COMMAND", targetSlug: "journalctl" }, { targetType: "GUIDE", targetSlug: "systemd-basics" }] },
  { slug: "journalctl", name: "journalctl", description: "Query the systemd journal", syntax: "journalctl [options]", category: "System",
    examples: [{ code: "journalctl -u nginx -f", description: "Follow live logs for the nginx unit" }, { code: "journalctl --since \"1 hour ago\"", description: "Show logs from the last hour" }],
    options: [{ flag: "-u", description: "Filter by systemd unit" }, { flag: "-f", description: "Follow the log in real time" }, { flag: "-b", description: "Show only logs from the current boot" }],
    related: [{ targetType: "COMMAND", targetSlug: "systemctl" }] },
  { slug: "ps", name: "ps", description: "Report a snapshot of current processes", syntax: "ps [options]", category: "Process Management",
    examples: [{ code: "ps aux", description: "Show every process on the system" }, { code: "ps -ef | grep nginx", description: "Find running nginx processes" }],
    options: [{ flag: "aux", description: "BSD-style: all processes, user-oriented, extended format" }, { flag: "-ef", description: "Full-format listing of every process" }],
    related: [{ targetType: "COMMAND", targetSlug: "kill" }, { targetType: "GUIDE", targetSlug: "processes-and-signals" }] },
  { slug: "kill", name: "kill", description: "Send a signal to a process", syntax: "kill [-signal] pid", category: "Process Management",
    examples: [{ code: "kill 4821", description: "Send SIGTERM, asking the process to shut down cleanly" }, { code: "kill -9 4821", description: "Send SIGKILL, terminating immediately" }],
    options: [{ flag: "-9", description: "SIGKILL — immediate termination" }, { flag: "-15", description: "SIGTERM — the default, graceful request" }],
    related: [{ targetType: "COMMAND", targetSlug: "ps" }, { targetType: "GUIDE", targetSlug: "processes-and-signals" }] },
  { slug: "find", name: "find", description: "Search for files in a directory hierarchy", syntax: "find [path] [expression]", category: "Filesystem",
    examples: [{ code: "find . -name \"*.log\"", description: "Find all .log files under the current directory" }, { code: "find /var -mtime -1", description: "Find files modified in the last day" }],
    options: [{ flag: "-name", description: "Match by filename pattern" }, { flag: "-type", description: "Filter by type (f = file, d = directory)" }],
    related: [{ targetType: "COMMAND", targetSlug: "ls" }, { targetType: "COMMAND", targetSlug: "grep" }] },
  { slug: "curl", name: "curl", description: "Transfer data from or to a server", syntax: "curl [options] url", category: "Networking",
    examples: [{ code: "curl -I https://example.com", description: "Fetch only the response headers" }, { code: "curl -o file.zip https://example.com/file.zip", description: "Download a file" }],
    options: [{ flag: "-I", description: "Fetch headers only" }, { flag: "-o", description: "Write output to a file" }, { flag: "-L", description: "Follow redirects" }],
    related: [{ targetType: "GUIDE", targetSlug: "networking-fundamentals" }] },
];

export interface SeedPackageManager {
  slug: string; name: string; command: string; distributionFamily: string; description: string;
  installCmd: string; updateCmd: string; searchCmd: string; removeCmd: string; sourceUrl: string; sourceName: string;
  related: SeedRelated[];
}

export const packageManagers: SeedPackageManager[] = [
  { slug: "apt", name: "APT", command: "apt", distributionFamily: "Debian / Ubuntu", description: "The default package manager for Debian-based distributions, handling .deb packages and dependency resolution.", installCmd: "sudo apt install <package>", updateCmd: "sudo apt update && sudo apt upgrade", searchCmd: "apt search <term>", removeCmd: "sudo apt remove <package>", sourceUrl: "https://wiki.debian.org/Apt", sourceName: "Debian Wiki", related: [{ targetType: "DISTRIBUTION", targetSlug: "ubuntu" }, { targetType: "DISTRIBUTION", targetSlug: "debian" }] },
  { slug: "pacman", name: "pacman", command: "pacman", distributionFamily: "Arch Linux", description: "Arch's fast, simple package manager, combining a binary package format with an easy-to-use build system.", installCmd: "sudo pacman -S <package>", updateCmd: "sudo pacman -Syu", searchCmd: "pacman -Ss <term>", removeCmd: "sudo pacman -R <package>", sourceUrl: "https://wiki.archlinux.org/title/Pacman", sourceName: "Arch Wiki", related: [{ targetType: "DISTRIBUTION", targetSlug: "arch-linux" }] },
  { slug: "dnf", name: "DNF", command: "dnf", distributionFamily: "Fedora", description: "The successor to YUM, DNF manages RPM packages with fast dependency resolution on Fedora and RHEL-family systems.", installCmd: "sudo dnf install <package>", updateCmd: "sudo dnf upgrade", searchCmd: "dnf search <term>", removeCmd: "sudo dnf remove <package>", sourceUrl: "https://dnf.readthedocs.io", sourceName: "DNF Docs", related: [{ targetType: "DISTRIBUTION", targetSlug: "fedora" }] },
  { slug: "apk", name: "apk", command: "apk", distributionFamily: "Alpine Linux", description: "Alpine's lightweight package manager, designed for small, fast repositories and container-friendly images.", installCmd: "sudo apk add <package>", updateCmd: "sudo apk update && sudo apk upgrade", searchCmd: "apk search <term>", removeCmd: "sudo apk del <package>", sourceUrl: "https://wiki.alpinelinux.org/wiki/Alpine_Package_Keeper", sourceName: "Alpine Wiki", related: [{ targetType: "DISTRIBUTION", targetSlug: "alpine-linux" }] },
  { slug: "zypper", name: "Zypper", command: "zypper", distributionFamily: "openSUSE", description: "openSUSE's package manager, offering robust dependency resolution and integrated repository management.", installCmd: "sudo zypper install <package>", updateCmd: "sudo zypper update", searchCmd: "zypper se <term>", removeCmd: "sudo zypper remove <package>", sourceUrl: "https://en.opensuse.org/SDB:Zypper_usage", sourceName: "openSUSE Docs", related: [{ targetType: "DISTRIBUTION", targetSlug: "opensuse" }] },
];

export interface SeedGuide {
  slug: string; title: string; description: string; category: string; difficulty: DifficultyLiteral; readMinutes: number;
  related: SeedRelated[];
}

export const guides: SeedGuide[] = [
  { slug: "linux-filesystem-explained", title: "Linux filesystem explained", description: "How the / root hierarchy is organized and why it matters.", category: "Beginner", difficulty: "BEGINNER", readMinutes: 6, related: [{ targetType: "GUIDE", targetSlug: "understanding-permissions" }] },
  { slug: "understanding-permissions", title: "Understanding permissions", description: "Read, write, execute — and how ownership actually works.", category: "Beginner", difficulty: "BEGINNER", readMinutes: 7, related: [{ targetType: "COMMAND", targetSlug: "chmod" }] },
  { slug: "processes-and-signals", title: "Processes and signals", description: "How Linux starts, tracks, and terminates running programs.", category: "System Administration", difficulty: "INTERMEDIATE", readMinutes: 8, related: [{ targetType: "COMMAND", targetSlug: "ps" }] },
  { slug: "systemd-basics", title: "systemd basics", description: "Units, services, and targets — systemd's building blocks.", category: "System Administration", difficulty: "INTERMEDIATE", readMinutes: 9, related: [{ targetType: "COMMAND", targetSlug: "systemctl" }] },
  { slug: "networking-fundamentals", title: "Networking fundamentals", description: "Interfaces, routing, and DNS from a Linux administrator's view.", category: "Networking", difficulty: "INTERMEDIATE", readMinutes: 10, related: [{ targetType: "COMMAND", targetSlug: "curl" }] },
  { slug: "bash-fundamentals", title: "Bash fundamentals", description: "Variables, pipes, and control flow in the shell you already use.", category: "Development", difficulty: "BEGINNER", readMinutes: 8, related: [] },
  { slug: "package-management", title: "Package management", description: "How apt, pacman, dnf, and friends resolve and install software.", category: "Beginner", difficulty: "BEGINNER", readMinutes: 7, related: [{ targetType: "PACKAGE_MANAGER", targetSlug: "apt" }] },
  { slug: "linux-boot-process", title: "Linux boot process", description: "From firmware to login prompt, step by step.", category: "System Administration", difficulty: "ADVANCED", readMinutes: 9, related: [{ targetType: "GUIDE", targetSlug: "systemd-basics" }] },
  { slug: "users-and-groups", title: "Users and groups", description: "Managing accounts, permissions, and sudo access.", category: "Security", difficulty: "BEGINNER", readMinutes: 6, related: [{ targetType: "GUIDE", targetSlug: "understanding-permissions" }] },
  { slug: "ssh-fundamentals", title: "SSH fundamentals", description: "Key-based auth, tunnels, and secure remote access.", category: "Networking", difficulty: "INTERMEDIATE", readMinutes: 8, related: [{ targetType: "GUIDE", targetSlug: "networking-fundamentals" }] },
];
