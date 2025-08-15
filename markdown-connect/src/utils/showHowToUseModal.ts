// src/utils/showHowToUseModal.ts
// Show How to Use Modal utility for Vizard Editor

export function showHowToUseModal() {
  if (document.getElementById('how-to-use-modal')) return;
  const howToUseModal = document.createElement('div');
  howToUseModal.id = 'how-to-use-modal';
  howToUseModal.style.position = 'fixed';
  howToUseModal.style.top = '0';
  howToUseModal.style.left = '0';
  howToUseModal.style.width = '100vw';
  howToUseModal.style.height = '100vh';
  howToUseModal.style.background = 'rgba(0,0,0,0.25)';
  howToUseModal.style.zIndex = '9999';
  howToUseModal.style.display = 'flex';
  howToUseModal.style.alignItems = 'center';
  howToUseModal.style.justifyContent = 'center';
  howToUseModal.innerHTML = `
    <div style="background: #fff; border-radius: 12px; max-width: 440px; width: 95vw; padding: 32px 24px 24px 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.18); position: relative;">
      <div style="font-size: 22px; font-weight: 700; margin-bottom: 18px; color: #232336;">How to use</div>
      <ul style="font-size: 16px; color: #232336; line-height: 1.7; padding-left: 18px;">
        <li>Type or paste <b>Markdown</b> in the left editor. You can use code blocks for CSV data.</li>
        <li>To visualize CSV as a chart, use a code block like:
          <pre style='background:#f4f4f4; border-radius:4px; padding:8px 10px; margin:8px 0; font-size:14px; overflow-x:auto;'>
&#96;&#96;&#96;csv title="My Chart" type="line"
x,y
1,10
2,20
3,30
&#96;&#96;&#96;
          </pre>
          <span style="font-size:13px; color:#666;">type supports 'table', 'line', 'bar'</span>
        </li>
        <li>Click <b>Upload csv file</b> or <b>Upload markdown file</b> to insert files into the editor.</li>
        <li>Click <b>Clear data</b> to reset the editor.</li>
        <li>Preview and charts are shown on the right in real time.</li>
  <li>Click <b>Export</b> to download your work as <b>Markdown</b>, <b>HTML</b>, or <b>JSON</b> file.</li>
      </ul>
      <button id="how-to-use-close" style="position: absolute; top: 12px; right: 18px; background: none; border: none; font-size: 22px; color: #888; cursor: pointer;">&times;</button>
    </div>
  `;
  document.body.appendChild(howToUseModal);
  const closeBtn = document.getElementById('how-to-use-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeHowToUseModal);
  }
  howToUseModal.addEventListener('click', (e) => {
    if (e.target === howToUseModal) closeHowToUseModal();
  });
  function closeHowToUseModal() {
    howToUseModal.remove();
  }
}
