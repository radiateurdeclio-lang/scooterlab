const SITE_BASE = "https://radiateurdeclio-lang.github.io/scooterlab";

const PLATFORMS_FALLBACK = [
  {
    id: "windows",
    name: "Windows",
    icon: "assets/platforms/windows.svg",
    description: "Windows 10/11 (64-bit)",
    file: "ScooterLab_0.2.4_x64-setup.exe",
    size: "~4 Mo",
    localUrl: "downloads/ScooterLab_0.2.4_x64-setup.exe",
  },
  {
    id: "macos",
    name: "macOS",
    icon: "assets/platforms/macos.svg",
    description: "Apple Silicon & Intel",
    file: "ScooterLab_0.2.4_aarch64.dmg",
    size: "~6 Mo",
  },
  {
    id: "linux",
    name: "Linux",
    icon: "assets/platforms/linux.svg",
    description: "AppImage (x64)",
    file: "ScooterLab_0.2.4_amd64.AppImage",
    size: "~77 Mo",
  },
  {
    id: "android",
    name: "Android",
    icon: "assets/platforms/android.svg",
    description: "Android 8+ (APK)",
    file: "ScooterLab_0.2.0_android.apk",
    size: "~25 Mo",
  },
  {
    id: "ios",
    name: "iPhone / iPad",
    icon: "assets/platforms/ios.svg",
    description: "iOS 14+",
    file: "ScooterLab_0.2.0_ios.ipa",
    size: "~22 Mo",
    note: "AltStore / Sideloadly",
  },
];

async function loadManifest() {
  try {
    const res = await fetch("downloads/manifest.json");
    if (!res.ok) throw new Error("manifest not found");
    return await res.json();
  } catch {
    return { version: "0.2.4", platforms: PLATFORMS_FALLBACK, releasesUrl: SITE_BASE };
  }
}

async function fetchLatestRelease() {
  return null;
}

async function checkLocalFile(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

function resolvePlatformUrl(platform, release) {
  if (platform.url) return { url: platform.url, available: platform.available !== false };

  if (platform.localUrl) {
    return { url: platform.localUrl, available: null, preferLocal: true };
  }

  if (release?.assets?.length && platform.assetName) {
    const asset = release.assets.find((a) => a.name === platform.assetName || a.name.includes(platform.assetName.replace(".exe", "")));
    if (asset) return { url: asset.browser_download_url, available: true };
  }

  const releasesUrl = platform.releasesUrl || SITE_BASE;
  return { url: releasesUrl, available: false };
}

function renderIcon(icon) {
  if (icon?.includes(".svg") || icon?.includes(".png")) {
    return `<img src="${icon}" alt="" class="platform-logo" width="32" height="32" />`;
  }
  return icon || "◆";
}

function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  if (/mac/.test(ua)) return "macos";
  if (/win/.test(ua)) return "windows";
  if (/linux/.test(ua)) return "linux";
  return null;
}

async function renderPlatforms(manifest) {
  const grid = document.getElementById("platform-grid");
  const versionEl = document.getElementById("version");
  if (versionEl) versionEl.textContent = manifest.version;

  const detected = detectPlatform();
  const release = await fetchLatestRelease();

  const cards = await Promise.all(
    manifest.platforms.map(async (p) => {
      let resolved = resolvePlatformUrl(p, release);

      if (resolved.preferLocal && resolved.available === null) {
        const ok = await checkLocalFile(p.localUrl);
        if (ok) resolved = { url: p.localUrl, available: true };
        else if (release) {
          const gh = resolvePlatformUrl(p, release);
          if (gh.available) resolved = gh;
          else resolved = { url: manifest.releasesUrl || SITE_BASE, available: false };
        } else {
          resolved = { url: manifest.releasesUrl || SITE_BASE, available: false };
        }
      }

      const isRecommended = p.id === detected;
      const noteHtml = p.note ? `<p class="file-info">${p.note}</p>` : "";
      const isExternal = resolved.url.startsWith("http");
      const btnLabel = resolved.available === false ? "Voir les releases" : "Télécharger";
      const btnClass = resolved.available === false ? "btn btn-secondary" : "btn btn-primary";
      const unavailableNote =
        resolved.available === false
          ? `<p class="file-info" style="color:var(--warning)">Build en cours — réessayez dans quelques minutes.</p>`
          : "";

      return `
        <article class="platform-card ${isRecommended ? "recommended" : ""}" data-platform="${p.id}">
          ${isRecommended ? '<span class="recommended-badge">RECOMMANDÉ POUR VOTRE APPAREIL</span>' : ""}
          <div class="platform-card-header">
            <div class="platform-icon">${renderIcon(p.icon)}</div>
            <div>
              <h3>${p.name}</h3>
              <p>${p.description}</p>
            </div>
          </div>
          <p class="file-info">${p.file} · ${p.size}</p>
          ${noteHtml}
          ${unavailableNote}
          <a href="${resolved.url}" class="${btnClass}" ${isExternal ? 'target="_blank" rel="noreferrer"' : resolved.available !== false ? "download" : ""}>
            ${btnLabel}
          </a>
        </article>
      `;
    })
  );

  grid.innerHTML = cards.join("");
}

document.addEventListener("DOMContentLoaded", async () => {
  const manifest = await loadManifest();
  await renderPlatforms(manifest);
});
