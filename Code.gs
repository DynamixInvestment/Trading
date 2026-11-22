// Dynamix Investment · Journal de trading : backend Google Sheets
// 1) Change le mot de passe ci-dessous. 2) Déploie en "Application Web" (voir README).
const SECRET = 'DynamixInvestment';

const HEAD = ['id','date','actif','direction','taille','entree','sortie','stop','frais','strategie','emotion','plan','notes'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName('Trades');
  if (!s) {
    s = ss.insertSheet('Trades');
    s.appendRow(HEAD);
    s.setFrozenRows(1);
    s.getRange('A:B').setNumberFormat('@'); // id et date en texte
    s.getRange(1, 1, 1, HEAD.length).setFontWeight('bold').setBackground('#004BAE').setFontColor('#ffffff');
  }
  return s;
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  if (!e.parameter || e.parameter.key !== SECRET) return out_({ error: 'auth' });
  const v = sheet_().getDataRange().getValues().slice(1);
  const trades = v.filter(r => r[0] !== '').map(r => {
    const o = {};
    HEAD.forEach((h, i) => {
      o[h] = r[i] instanceof Date ? Utilities.formatDate(r[i], Session.getScriptTimeZone(), 'yyyy-MM-dd') : r[i];
    });
    return o;
  });
  const cap = Number(PropertiesService.getScriptProperties().getProperty('cap')) || 1000;
  return out_({ trades: trades, cap: cap });
}

function doPost(e) {
  let b;
  try { b = JSON.parse(e.postData.contents); } catch (err) { return out_({ error: 'bad' }); }
  if (b.key !== SECRET) return out_({ error: 'auth' });
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const s = sheet_();
    if (b.action === 'add') {
      const t = b.trade;
      s.appendRow(HEAD.map(h => (t[h] === undefined || t[h] === null) ? '' : t[h]));
    } else if (b.action === 'delete') {
      const ids = s.getRange(1, 1, s.getLastRow(), 1).getValues();
      for (let i = ids.length - 1; i >= 1; i--) {
        if (String(ids[i][0]) === String(b.id)) { s.deleteRow(i + 1); break; }
      }
    } else if (b.action === 'cap') {
      PropertiesService.getScriptProperties().setProperty('cap', String(Number(b.cap) || 0));
    }
    return out_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}
