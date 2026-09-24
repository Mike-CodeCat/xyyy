// 现代版的小工具：用轻提示和弹窗代替原版的 alert()

function toast(message, ms = 2600) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    document.body.append(el);
  }
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), ms);
}

function showDialog(title, text, actions = [{ label: '好的' }]) {
  const dialog = document.createElement('dialog');
  dialog.innerHTML = `
    <div class="dialog-text"><h3></h3><p></p></div>
    <div class="dialog-actions"></div>`;
  dialog.querySelector('h3').textContent = title;
  dialog.querySelector('p').textContent = text;
  const bar = dialog.querySelector('.dialog-actions');
  actions.forEach(({ label, ghost, onClick }) => {
    const btn = document.createElement('button');
    btn.className = ghost ? 'btn ghost' : 'btn';
    btn.textContent = label;
    btn.onclick = () => { dialog.close(); onClick?.(); };
    bar.append(btn);
  });
  dialog.addEventListener('close', () => dialog.remove());
  document.body.append(dialog);
  dialog.showModal();
}
