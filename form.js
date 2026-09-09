function initForm() {
  const form = document.getElementById('regForm');
  const msgBox = document.getElementById('formMsg');
  const successPanel = document.getElementById('successPanel');
  
  if (!form) return;

  function fieldErr(wrap, msg) { wrap.classList.add('err'); const s=wrap.querySelector('.err-txt'); if(s)s.textContent=msg; }
  function fieldOk(wrap) { wrap.classList.remove('err'); const s=wrap.querySelector('.err-txt'); if(s)s.textContent=''; }
  function showMsg(type, txt) { msgBox.textContent=txt; msgBox.className='form-msg show '+type; }
  function hideMsg() { msgBox.className='form-msg'; }
  function genId() { return CONFIG.regIdPrefix + '-' + Math.floor(1000 + Math.random() * 8999); }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let ok = true; hideMsg();

    // Basic Validation
    [['studentName','नाव भरा'], ['school','शाळेचे नाव भरा'], ['studentClass','इयत्ता भरा'], ['parentName','पालकांचे नाव भरा'], ['address','पत्ता भरा']].forEach(([n,m]) => {
      const inp = form.elements[n]; const w = inp.closest('.f-field');
      if (!inp.value.trim()) { fieldErr(w,m); ok=false; } else fieldOk(w);
    });

    // Age validation
    const age=form.elements['age'], aw=age.closest('.f-field'), av=Number(age.value);
    if (!age.value||isNaN(av)||av<2||av>20) { fieldErr(aw,'योग्य वय भरा (२-२०).'); ok=false; } else fieldOk(aw);

    // Gender check
    const gc=form.querySelector('input[name="gender"]:checked'), gw=document.getElementById('genderField');
    if (!gc) { fieldErr(gw,'लिंग निवडा.'); ok=false; } else fieldOk(gw);

    // Phone checks
    const ph=form.elements['phone'], pw=ph.closest('.f-field');
    if (!/^[6-9]\d{9}$/.test(ph.value.trim())) { fieldErr(pw,'वैध १० अंकी क्रमांक भरा.'); ok=false; } else fieldOk(pw);

    // Competition Single Selection Check
    const compChecked = form.querySelector('input[name="competition"]:checked');
    const cw = document.getElementById('compSelectWrap');
    if (!compChecked) { cw.classList.add('err'); showMsg('error','कृपया एक स्पर्धा निवडा.'); ok=false; } else cw.classList.remove('err');

    if (!ok) return;

    // Prevent Duplicate Registration using LocalStorage
    const sName = form.elements['studentName'].value.trim().toLowerCase();
    const registered = JSON.parse(localStorage.getItem('bsf_registered_names') || '[]');
    if (registered.includes(sName)) {
      showMsg('error', 'या नावाने आधीच नोंदणी केलेली आहे.');
      return;
    }

    const btn = document.getElementById('submitBtn');
    btn.disabled = true; btn.textContent = 'पाठवत आहे...';

    const fd = new FormData(form);
    const regId = genId();
    const payload = {
      regId,
      studentName: fd.get('studentName').trim(),
      school: fd.get('school').trim(),
      studentClass: fd.get('studentClass').trim(),
      age: fd.get('age'),
      gender: fd.get('gender'),
      parentName: fd.get('parentName').trim(),
      phone: fd.get('phone').trim(),
      address: fd.get('address').trim(),
      competitions: compChecked.dataset.name,
      timestamp: new Date().toLocaleString('mr-IN')
    };

    const success = await submitToSheet(payload);
    btn.disabled = false; btn.textContent = 'नोंदणी सादर करा';

    if (success) {
      // Save to block duplicates
      registered.push(sName);
      localStorage.setItem('bsf_registered_names', JSON.stringify(registered));

      hideMsg(); form.style.display = 'none'; successPanel.classList.add('show');
      document.getElementById('regIdDisplay').textContent = regId;
      successPanel.scrollIntoView({behavior:'smooth', block:'center'});
    } else {
      showMsg('error', 'नेटवर्क त्रुटी. कृपया पुन्हा प्रयत्न करा.');
    }
  });

  document.getElementById('newRegBtn').addEventListener('click', () => {
    form.reset();
    form.style.display = ''; successPanel.classList.remove('show');
    form.scrollIntoView({behavior:'smooth', block:'start'});
  });
}
