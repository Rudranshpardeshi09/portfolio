import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('public/tech-logos');

const svg = ({ defs = '', body = '' }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" fill="none" shape-rendering="geometricPrecision">
  <defs>
    ${defs}
  </defs>
  ${body}
</svg>
`;

const logos = {
  'python.svg': svg({
    defs: `
      <linearGradient id="pyBlue" x1="154" y1="132" x2="309" y2="286" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#387EB8"/>
        <stop offset="1" stop-color="#366D9C"/>
      </linearGradient>
      <linearGradient id="pyGold" x1="201" y1="227" x2="357" y2="382" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#FFE36E"/>
        <stop offset="1" stop-color="#FFD343"/>
      </linearGradient>
    `,
    body: `
      <path d="M255.4 92c-91.8 0-86 39.9-86 39.9l.1 41.4h87.5v12.4H135.8S76 179 76 257.5C76 336 128.2 332 128.2 332h31.2v-43.8s-1.7-52.2 51.4-52.2h85.9s48.2.8 48.2-46.5v-77S352 92 269.4 92h-14Zm-48.2 27.7a15.7 15.7 0 1 1 0 31.5 15.7 15.7 0 0 1 0-31.5Z" fill="url(#pyBlue)"/>
      <path d="M257.9 420c91.8 0 86-39.9 86-39.9l-.1-41.4h-87.5v-12.4h121.1s59.8 6.7 59.8-71.8c0-78.5-52.2-74.5-52.2-74.5h-31.2v43.8s1.7 52.2-51.4 52.2h-85.9s-48.2-.8-48.2 46.5v77S161.3 420 243.9 420h14Zm47.2-27.7a15.7 15.7 0 1 1 0-31.5 15.7 15.7 0 0 1 0 31.5Z" fill="url(#pyGold)"/>
    `,
  }),
  'cpp.svg': svg({
    defs: `
      <linearGradient id="cppA" x1="143" y1="127" x2="370" y2="374" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#659AD2"/>
        <stop offset="1" stop-color="#004482"/>
      </linearGradient>
    `,
    body: `
      <path d="M256 83 384.2 157v148L256 379l-128.2-74V157L256 83Z" fill="url(#cppA)"/>
      <path d="M256 114.9 356.7 173v116L256 347.1 155.3 289V173L256 114.9Z" stroke="rgba(255,255,255,.22)" stroke-width="8"/>
      <path d="M231 201.1c-11-12.3-24.5-18.5-40.7-18.5-31 0-54.7 26-54.7 62.8 0 36.3 23.2 62.6 54.7 62.6 17.5 0 32.8-7.4 44.2-21.4l24.2 23.6c-17.7 20.4-42 32.1-69.9 32.1-51.3 0-89.1-40.4-89.1-96.3 0-56.1 39.4-97 91.4-97 28.2 0 51.7 10.9 69 30.6l-29 21.5Z" fill="#fff"/>
      <path d="M286.8 216h18.7v20.3h20.1V255h-20.1v20.3h-18.7V255h-20.1v-18.7h20.1V216Zm51.6 0h18.7v20.3h20.1V255h-20.1v20.3h-18.7V255h-20.1v-18.7h20.1V216Z" fill="#fff"/>
    `,
  }),
  'javascript.svg': svg({
    body: `
      <path d="M120 120h272v272H120V120Z" fill="#F7DF1E"/>
      <text x="256" y="286" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="148" font-weight="900" letter-spacing="-12" fill="#111111">JS</text>
    `,
  }),
  'html5.svg': svg({
    defs: `
      <linearGradient id="htmlA" x1="126" y1="95" x2="301" y2="415" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#F16529"/>
        <stop offset="1" stop-color="#E44D26"/>
      </linearGradient>
    `,
    body: `
      <path d="M111.8 96h288.4l-26.3 294.5L256 424l-117.9-33.5L111.8 96Z" fill="url(#htmlA)"/>
      <path d="M256 399.1V120h118l-22.5 251.4L256 399.1Z" fill="#FF7A45"/>
      <path d="M166.7 156h178.5l-4.9 38.7H209.4l4.5 49.9h121.7l-10.8 102.6L256 366.4l-68.8-19.2-4.7-52.8h33.7l2.4 25.8 37.4 10.2 37.5-10.2 3.9-40.8H183.2L166.7 156Z" fill="#fff"/>
    `,
  }),
  'css3.svg': svg({
    defs: `
      <linearGradient id="cssA" x1="126" y1="96" x2="301" y2="415" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#33A9DC"/>
        <stop offset="1" stop-color="#1572B6"/>
      </linearGradient>
    `,
    body: `
      <path d="M111.8 96h288.4l-26.3 294.5L256 424l-117.9-33.5L111.8 96Z" fill="url(#cssA)"/>
      <path d="M256 399.1V120h118l-22.5 251.4L256 399.1Z" fill="#1B84CC"/>
      <path d="M166.8 156h178.4l-4.9 38.7H209.5l4.5 49.9h121.7l-10.8 102.6L256 366.4l-68.8-19.2-4.7-52.8h33.7l2.4 25.8 37.4 10.2 37.5-10.2 3.9-40.8H183.3L166.8 156Z" fill="#fff"/>
    `,
  }),
  'scikitlearn.svg': svg({
    body: `
      <path d="M123 308c0-55.8 45.2-101 101-101 24.1 0 46.2 8.4 63.8 22.5l-24.2 25.2c-10.8-9-24.5-13.9-39.6-13.9-36.9 0-67.2 30.1-67.2 67.2s30.3 67.2 67.2 67.2c15.1 0 28.8-4.9 39.6-13.9l24.2 25.2c-17.6 14.1-39.7 22.5-63.8 22.5-55.8 0-101-45.2-101-101Z" fill="#3499CD"/>
      <path d="M389 204c0 55.8-45.2 101-101 101-24.1 0-46.2-8.4-63.8-22.5l24.2-25.2c10.8 9 24.5 13.9 39.6 13.9 36.9 0 67.2-30.1 67.2-67.2s-30.3-67.2-67.2-67.2c-15.1 0-28.8 4.9-39.6 13.9l-24.2-25.2c17.6-14.1 39.7-22.5 63.8-22.5 55.8 0 101 45.2 101 101Z" fill="#F89939"/>
      <circle cx="224" cy="308" r="17.5" fill="#3499CD"/>
      <circle cx="288" cy="204" r="17.5" fill="#F89939"/>
    `,
  }),
  'tensorflow.svg': svg({
    body: `
      <path d="M254.1 93.8 363 156v65.6l-43-24.8v153.9L254.1 389V233l-43.1-24.8V389L145 350.7V196.8L102 221.6V156l152.1-62.2Z" fill="#FF6F00"/>
      <path d="M145 156 254.1 93.8v65.1l-54.3 22.5v51.2L145 200.9V156Zm218 0-108.9-62.2v65.1l54.2 22.5v51.2l54.7-31.7V156Z" fill="#FFA000"/>
    `,
  }),
  'opencv.svg': svg({
    body: `
      <circle cx="194" cy="202" r="69" stroke="#FF3B30" stroke-width="34"/>
      <circle cx="318" cy="202" r="69" stroke="#34C759" stroke-width="34"/>
      <circle cx="256" cy="310" r="69" stroke="#0A84FF" stroke-width="34"/>
      <circle cx="194" cy="202" r="15" fill="#FF3B30"/>
      <circle cx="318" cy="202" r="15" fill="#34C759"/>
      <circle cx="256" cy="310" r="15" fill="#0A84FF"/>
    `,
  }),
  'numpy.svg': svg({
    defs: `
      <linearGradient id="numpyA" x1="133" y1="151" x2="317" y2="367" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#4DABCF"/>
        <stop offset="1" stop-color="#2E75B4"/>
      </linearGradient>
    `,
    body: `
      <path d="M163 139h55.6L296 270.1V139h53v233h-55.6L216 240.9V372h-53V139Z" fill="#2E75B4"/>
      <path d="M132 172h55.6L265 304.1V172h53v200h-55.6L185 240.9V372h-53V172Z" fill="url(#numpyA)"/>
    `,
  }),
  'pandas.svg': svg({
    body: `
      <rect x="148" y="114" width="44" height="284" rx="14" fill="#150458"/>
      <rect x="218" y="114" width="44" height="284" rx="14" fill="#E70488"/>
      <rect x="288" y="114" width="44" height="284" rx="14" fill="#150458"/>
      <rect x="358" y="114" width="44" height="284" rx="14" fill="#E70488"/>
      <rect x="148" y="114" width="254" height="284" rx="32" stroke="rgba(21,4,88,.14)" stroke-width="6"/>
    `,
  }),
  'matplotlib.svg': svg({
    body: `
      <path d="M133 334c27.4-74 74.8-112 123-112 49.8 0 96.3 31.5 123 112" stroke="#1F77B4" stroke-width="24" stroke-linecap="round"/>
      <path d="M170 318c17.3-48.4 47.1-73 86-73 40 0 68.7 24.6 86 73" stroke="#FF7F0E" stroke-width="20" stroke-linecap="round"/>
      <path d="M256 121v143" stroke="#E9EEF5" stroke-width="14" stroke-linecap="round"/>
      <circle cx="256" cy="121" r="16" fill="#E9EEF5"/>
      <circle cx="133" cy="334" r="16" fill="#1F77B4"/>
      <circle cx="379" cy="334" r="16" fill="#1F77B4"/>
    `,
  }),
  'langchain.svg': svg({
    body: `
      <path d="M157 157h88v39h-49v60h-39V157Zm110 0h88v39h-49v60h-39V157ZM157 256h39v60h49v39h-88V256Zm149 60v-60h39v99h-88v-39h49Z" fill="#FFF"/>
      <rect x="231" y="231" width="50" height="50" fill="#16A34A"/>
    `,
  }),
  'huggingface.svg': svg({
    body: `
      <circle cx="192" cy="252" r="70" fill="#FFD54F"/>
      <circle cx="320" cy="252" r="70" fill="#FFD54F"/>
      <circle cx="208" cy="237" r="9" fill="#151515"/>
      <circle cx="304" cy="237" r="9" fill="#151515"/>
      <path d="M214 287c24 18.4 60 18.4 84 0" stroke="#151515" stroke-width="12" stroke-linecap="round"/>
      <path d="M152 229c-17.7-9.3-25.1-29-16.4-47.4" stroke="#F59E0B" stroke-width="16" stroke-linecap="round"/>
      <path d="M360 229c17.7-9.3 25.1-29 16.4-47.4" stroke="#F59E0B" stroke-width="16" stroke-linecap="round"/>
      <path d="M194 206c7.4-18.8 25.2-31.1 46.8-31.1 21.7 0 39.5 12.3 46.9 31.1" stroke="#151515" stroke-width="10" stroke-linecap="round"/>
    `,
  }),
  'django.svg': svg({
    body: `
      <rect x="116" y="116" width="280" height="280" rx="52" fill="#0C4B33"/>
      <text x="256" y="286" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="138" font-weight="800" letter-spacing="-10" fill="#FFFFFF">dj</text>
    `,
  }),
  'fastapi.svg': svg({
    body: `
      <path d="M256 107 145 257h68l-24 148 178-211h-72l18-87H256Z" fill="#00C7B7"/>
      <path d="M237 237h38v168h-38V237Z" fill="#0F766E"/>
    `,
  }),
  'react.svg': svg({
    body: `
      <ellipse cx="256" cy="256" rx="125" ry="47" stroke="#61DAFB" stroke-width="16"/>
      <ellipse cx="256" cy="256" rx="125" ry="47" stroke="#61DAFB" stroke-width="16" transform="rotate(60 256 256)"/>
      <ellipse cx="256" cy="256" rx="125" ry="47" stroke="#61DAFB" stroke-width="16" transform="rotate(120 256 256)"/>
      <circle cx="256" cy="256" r="26" fill="#61DAFB"/>
    `,
  }),
  'tailwindcss.svg': svg({
    body: `
      <path d="M161 212c20.6-40.7 51.2-61 91.8-61 61.7 0 69.5 46.2 100.2 54.6 20 5.4 39.9-1.3 59.8-20.2-20.6 40.7-51.2 61-91.8 61-61.7 0-69.5-46.2-100.2-54.6-20-5.4-39.9 1.3-59.8 20.2Zm0 88c20.6-40.7 51.2-61 91.8-61 61.7 0 69.5 46.2 100.2 54.6 20 5.4 39.9-1.3 59.8-20.2-20.6 40.7-51.2 61-91.8 61-61.7 0-69.5-46.2-100.2-54.6-20-5.4-39.9 1.3-59.8 20.2Z" fill="#38BDF8"/>
    `,
  }),
  'vite.svg': svg({
    defs: `
      <linearGradient id="viteA" x1="149" y1="110" x2="324" y2="392" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#A855F7"/>
        <stop offset="1" stop-color="#6366F1"/>
      </linearGradient>
    `,
    body: `
      <path d="M257 92 392 136 294 398l-37 22-137-284L257 92Z" fill="url(#viteA)"/>
      <path d="M257 143.3 347 167.4 280.9 345 257 359 168 167.4l89-24.1Z" fill="#FDBA2D"/>
      <path d="M257 180 303.6 192l-33.7 92.5-12.9 7.6-46.1-100.1L257 180Z" fill="#FFF4CF"/>
    `,
  }),
  'postgresql.svg': svg({
    body: `
      <path d="M256 116c-58.8 0-99.3 38.7-99.3 97.4v72.2c0 29.6 20 54.7 48.5 60.8v47.8c0 11.1 9 20.1 20.1 20.1h12c11.1 0 20.1-9 20.1-20.1v-45.3h23.2v45.3c0 11.1 9 20.1 20.1 20.1h12c11.1 0 20.1-9 20.1-20.1v-47.8c28.5-6.1 48.5-31.2 48.5-60.8v-72.2c0-58.7-40.5-97.4-99.3-97.4Z" fill="#336791"/>
      <path d="M198.7 216.6c0-40.8 23.8-63.3 57.3-63.3s57.3 22.5 57.3 63.3v56.3c0 17-11.1 30.8-26.3 35v-49.9l16.9-18.8-23.9-17.9-24 17.9 16.9 18.8V308c-15.2-4.2-26.3-18-26.3-35v-56.3Zm22.2-17.7a10.2 10.2 0 1 0 0-20.3 10.2 10.2 0 0 0 0 20.3Zm70.2 0a10.2 10.2 0 1 0 0-20.3 10.2 10.2 0 0 0 0 20.3Z" fill="#fff"/>
    `,
  }),
  'mysql.svg': svg({
    body: `
      <path d="M150 299.5c0-56.7 40.6-104.6 97.3-117.6l17.4 30.8c-41.6 11.8-71.7 46.4-77.7 86.8h69.8l-38.5-42.6 24.1-21.8 73 79.7-73 79.7-24.1-21.8 38.5-42.6H150v-30.6Z" fill="#00758F"/>
      <path d="M292.4 183.7c39.9 8 69.1 34 69.1 66.1 0 18.2-10 35.5-28 49l-18.8-25.8c10.1-7.7 15.1-15.6 15.1-23.2 0-15.4-20-29.4-45.9-33.4l8.5-32.7Z" fill="#F29111"/>
      <circle cx="312" cy="167.6" r="11.2" fill="#F29111"/>
    `,
  }),
  'git.svg': svg({
    body: `
      <path d="M256 91 421 256 256 421 91 256 256 91Z" fill="#F05133"/>
      <path d="M220 181.4a24.7 24.7 0 1 1 36.1 21.9v43.9a24.8 24.8 0 0 1 16.7 16.8h39.6a24.8 24.8 0 1 1 0 31.4h-39.6a24.8 24.8 0 1 1-49.6-7.2v-84.7a24.7 24.7 0 0 1-3.2-22.1Z" fill="#fff"/>
    `,
  }),
  'github.svg': svg({
    body: `
      <path d="M256 122c-73 0-132 59.1-132 132 0 58.3 37.8 107.8 90.2 125.2 6.6 1.2 9-2.9 9-6.4v-24.9c-36.7 8-44.5-17.7-44.5-17.7-6-15.3-14.8-19.3-14.8-19.3-12.1-8.3.9-8.1.9-8.1 13.4.9 20.5 13.8 20.5 13.8 11.9 20.4 31.2 14.5 38.8 11.1 1.2-8.6 4.6-14.5 8.4-17.8-29.3-3.4-60.1-14.7-60.1-65.4 0-14.4 5.1-26.1 13.6-35.3-1.4-3.4-5.9-17 .8-35.4 0 0 11.1-3.6 36.4 13.5a125.8 125.8 0 0 1 66.2 0c25.3-17.1 36.4-13.5 36.4-13.5 6.7 18.4 2.2 32 .8 35.4 8.5 9.2 13.6 20.9 13.6 35.3 0 50.8-30.9 61.9-60.4 65.2 4.7 4.1 8.9 12.1 8.9 24.3v36c0 3.6 2.4 7.7 9.1 6.4C350.2 361.8 388 312.3 388 254c0-72.9-59-132-132-132Z" fill="#F8FAFC"/>
    `,
  }),
  'postman.svg': svg({
    body: `
      <circle cx="256" cy="256" r="118" fill="#FF6C37"/>
      <path d="M201 202 336 256 201 310l18.5-54h-61.4v-18h61.4L201 184.1V202Z" fill="#fff"/>
      <circle cx="256" cy="256" r="143" stroke="rgba(255,108,55,.18)" stroke-width="10"/>
    `,
  }),
  'jira.svg': svg({
    body: `
      <path d="M160 167h76l118 177h-76L160 167Z" fill="#2684FF"/>
      <path d="M223 167h76l55 85-37 56-94-141Z" fill="#79B8FF"/>
      <path d="M160 282h76l43 62h-76l-43-62Z" fill="#0052CC"/>
    `,
  }),
  'jupyternotebook.svg': svg({
    body: `
      <circle cx="256" cy="256" r="78" stroke="#F37626" stroke-width="24"/>
      <circle cx="138" cy="232" r="18" fill="#A1A1AA"/>
      <circle cx="374" cy="280" r="18" fill="#A1A1AA"/>
      <path d="M172 176c23.8-20.5 52.6-31 84-31s60.2 10.5 84 31" stroke="#A1A1AA" stroke-width="14" stroke-linecap="round"/>
      <path d="M172 336c23.8 20.5 52.6 31 84 31s60.2-10.5 84-31" stroke="#A1A1AA" stroke-width="14" stroke-linecap="round"/>
    `,
  }),
};

fs.mkdirSync(outDir, { recursive: true });

for (const [fileName, content] of Object.entries(logos)) {
  fs.writeFileSync(path.join(outDir, fileName), content);
}

console.log(`Generated ${Object.keys(logos).length} refined tech logo SVGs in ${outDir}`);
