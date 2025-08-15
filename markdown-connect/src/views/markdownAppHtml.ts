export const getMarkdownAppHtml = (markdownText: string) => `
  <div style="width: 100vw; min-height: 100vh; background: white; overflow: hidden; flex-direction: column; align-items: center; display: flex">
    <div style="align-self: stretch; height: 80px; padding: 20px; background: #21203C; overflow: hidden; justify-content: center; align-items: center; display: flex">
      <div style="color: white; font-size: 32px; font-family: Pretendard, sans-serif; font-weight: 500; word-wrap: break-word">Vizard Editor</div>
    </div>
    <div style="flex: 1 1 0; width: 100%; max-width: 1440px; margin: 0 auto; display: flex; align-items: stretch; justify-content: center; background: white;">
      <!-- 에디터 영역 -->
      <div style="flex: 1 1 0; min-width: 0; background: #3D3D3D; display: flex; flex-direction: column; align-items: center;">
        <div style="align-self: stretch; height: 60px; padding-left: 20px; padding-right: 20px; background: white; display: flex; align-items: center; flex-direction: row; justify-content: space-between;">
          <div style="display: flex; flex-direction: column; flex: 1;">
            <div style="color: black; font-size: 20px; font-family: Pretendard Variable; font-weight: 500; align-self: flex-start;">Raw Markdown</div>
            <div style="width: 100%; height: 2px; background: #21203C; margin-top: 8px;"></div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <button id="csv-upload-btn" style="background: #21203C; color: #fff; border: none; border-radius: 6px; padding: 8px 16px; font-size: 15px; font-weight: 500; cursor: pointer;">CSV file upload</button>
            <input type="file" id="csv-upload-input" accept=".csv" style="display:none;" />
          </div>
        </div>
        <div style="flex: 1 1 0; align-self: stretch; padding: 30px; background: #fff; display: flex; flex-direction: column; align-items: center;">
          <textarea id="md-editor" style="width: 100%; height: 100%; min-height: 500px; resize: none; font-size: 16px; font-family: 'Pretendard Variable', Pretendard, monospace; padding: 12px; border-radius: 8px; border: none; outline: none; box-sizing: border-box;">${markdownText}</textarea>
        </div>
      </div>
      <!-- 미리보기 영역 -->
      <div style="flex: 1 1 0; min-width: 0; background: #3D3D3D; display: flex; flex-direction: column; align-items: center; border-left: 1px #3D3D3D solid;">
        <div style="align-self: stretch; height: 60px; padding-left: 20px; padding-right: 20px; background: white; display: flex; align-items: center; flex-direction: column; justify-content: center;">
          <div style="color: black; font-size: 20px; font-family: Pretendard Variable; font-weight: 500; align-self: flex-start;">Preview with Vizard</div>
          <div style="width: 100%; height: 2px; background: #21203C; margin-top: 8px;"></div>
        </div>
        <div id="app-preview" style="flex: 1 1 0; align-self: stretch; padding: 30px; background: white; display: flex; flex-direction: column; align-items: flex-start; overflow: auto;"></div>
      </div>
    </div>
  </div>
`;
