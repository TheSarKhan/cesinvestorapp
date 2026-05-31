// ── Login + Forgot password (OTP) ──

function LoginScreen({ onLogin, onForgot }) {
  const [email, setEmail] = React.useState('r.mammadov@invorent.az');
  const [pass, setPass] = React.useState('••••••••');
  const [err, setErr] = React.useState(false);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg }}>
      {/* Brand block */}
      <div style={{
        padding: '64px 28px 30px',
        background: `linear-gradient(165deg, ${C.brand}, ${C.brandDk})`,
        borderBottomLeftRadius: 32, borderBottomRightRadius: 32,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -30, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }}/>
        <div style={{ position: 'absolute', bottom: -60, left: -20, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}/>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 15, background: 'rgba(255,255,255,0.16)',
            border: '1px solid rgba(255,255,255,0.25)',
            display: 'grid', placeItems: 'center', marginBottom: 20,
          }}>
            <Icon.truck size={28} style={{ color: '#fff' }}/>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em' }}>INVORENT</div>
          <div style={{ color: '#fff', fontSize: 25, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 4, lineHeight: 1.2 }}>İnvestor Portalı</div>
          <div style={{ color: 'rgba(255,255,255,0.82)', fontSize: 14, marginTop: 6, lineHeight: 1.45 }}>Aktivləriniz, gəliriniz və ödənişləriniz — bir baxışda.</div>
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em' }}>Daxil ol</h2>
        <p style={{ margin: '0 0 22px', fontSize: 13.5, color: C.muted }}>Hesabınıza daxil olmaq üçün məlumatları daxil edin.</p>

        <Field label="E-poçt" icon={<Icon.mail size={18}/>}>
          <input value={email} onChange={e => { setEmail(e.target.value); setErr(false); }} style={inputStyle} placeholder="ad@sirket.az"/>
        </Field>
        <div style={{ height: 14 }}/>
        <Field label="Şifrə" icon={<Icon.lock size={18}/>} error={err}>
          <input type="password" value={pass} onChange={e => { setPass(e.target.value); setErr(false); }} style={inputStyle} placeholder="Şifrə"/>
        </Field>

        {err && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 10, color: C.red, fontSize: 12.5, fontWeight: 600 }}>
            <Icon.warn size={15}/> E-poçt və ya şifrə yanlışdır.
          </div>
        )}

        <button onClick={onForgot} style={{
          alignSelf: 'flex-end', marginTop: 12, background: 'none', border: 'none',
          color: C.brand, fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', padding: 0,
        }}>Şifrəni unutdunuz?</button>

        <div style={{ flex: 1 }}/>

        <Button full onClick={onLogin} icon={<Icon.arrowR size={18}/>} style={{ flexDirection: 'row-reverse' }}>Daxil ol</Button>
        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 12, color: C.faint }}>
          <Icon.shield size={13} style={{ verticalAlign: -2, marginRight: 4 }}/>
          256-bit şifrələmə ilə qorunur
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, error, children }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: C.ink70, marginBottom: 7 }}>{label}</span>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '13px 14px', borderRadius: 13,
        background: C.card, border: `1.5px solid ${error ? C.red : C.line}`,
      }}>
        {icon && <span style={{ color: error ? C.red : C.faint }}>{icon}</span>}
        {children}
      </div>
    </label>
  );
}

const inputStyle = {
  flex: 1, border: 'none', outline: 'none', background: 'none',
  fontFamily: 'inherit', fontSize: 14.5, color: C.ink, fontWeight: 500,
};

// ── Forgot password — 3 steps: email → OTP → new password → done ──
function ForgotScreen({ onBack, onDone }) {
  const [step, setStep] = React.useState(0);
  const [otp, setOtp] = React.useState(['', '', '', '', '', '']);
  const refs = React.useRef([]);

  const setDigit = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp]; next[i] = v; setOtp(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg }}>
      <ScreenHeader title="Şifrə bərpası" onBack={step === 0 ? onBack : () => setStep(s => s - 1)}/>
      <div style={{ flex: 1, padding: '8px 24px 24px', display: 'flex', flexDirection: 'column' }}>
        {/* Step dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 26 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i <= step ? C.brand : C.bgSunk, transition: 'background 0.3s' }}/>
          ))}
        </div>

        {step === 0 && (
          <>
            <StepTitle icon={<Icon.mail size={26}/>} title="E-poçtunuzu daxil edin" sub="Təsdiq kodu göndərmək üçün hesabınıza bağlı e-poçt ünvanını yazın."/>
            <Field label="E-poçt" icon={<Icon.mail size={18}/>}>
              <input defaultValue="r.mammadov@invorent.az" style={inputStyle}/>
            </Field>
            <div style={{ flex: 1 }}/>
            <Button full onClick={() => setStep(1)}>Kod göndər</Button>
          </>
        )}

        {step === 1 && (
          <>
            <StepTitle icon={<Icon.shield size={26}/>} title="Təsdiq kodu" sub="r.mammadov@invorent.az ünvanına 6 rəqəmli kod göndərdik."/>
            <div style={{ display: 'flex', gap: 9, justifyContent: 'space-between' }}>
              {otp.map((d, i) => (
                <input key={i} ref={el => refs.current[i] = el} value={d}
                  onChange={e => setDigit(i, e.target.value)}
                  inputMode="numeric" maxLength={1}
                  style={{
                    width: 46, height: 56, textAlign: 'center',
                    fontSize: 22, fontWeight: 700, color: C.ink,
                    borderRadius: 13, border: `1.5px solid ${d ? C.brand : C.line}`,
                    background: C.card, outline: 'none', fontFamily: 'inherit',
                    transition: 'border 0.15s',
                  }}/>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: C.muted }}>
              Kod gəlmədi? <span style={{ color: C.brand, fontWeight: 600 }}>Yenidən göndər (0:42)</span>
            </div>
            <div style={{ flex: 1 }}/>
            <Button full onClick={() => setStep(2)}>Təsdiq et</Button>
          </>
        )}

        {step === 2 && (
          <>
            <StepTitle icon={<Icon.lock size={26}/>} title="Yeni şifrə təyin edin" sub="Şifrə ən azı 8 simvol olmalıdır."/>
            <Field label="Yeni şifrə" icon={<Icon.lock size={18}/>}>
              <input type="password" defaultValue="••••••••••" style={inputStyle}/>
            </Field>
            <div style={{ height: 14 }}/>
            <Field label="Şifrəni təkrarlayın" icon={<Icon.lock size={18}/>}>
              <input type="password" defaultValue="••••••••••" style={inputStyle}/>
            </Field>
            <div style={{ flex: 1 }}/>
            <Button full onClick={() => setStep(3)}>Şifrəni yenilə</Button>
          </>
        )}

        {step === 3 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ width: 76, height: 76, borderRadius: '50%', background: C.greenTint, color: C.green, display: 'grid', placeItems: 'center', marginBottom: 20 }}>
              <Icon.check size={40}/>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em' }}>Şifrə yeniləndi</div>
            <div style={{ fontSize: 13.5, color: C.muted, marginTop: 8, maxWidth: 260, lineHeight: 1.5 }}>Yeni şifrənizlə hesabınıza daxil ola bilərsiniz.</div>
            <Button full onClick={onDone} style={{ marginTop: 32 }}>Daxil ol</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepTitle({ icon, title, sub }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ width: 52, height: 52, borderRadius: 15, background: C.brandTint, color: C.brand, display: 'grid', placeItems: 'center', marginBottom: 16 }}>{icon}</div>
      <h2 style={{ margin: '0 0 6px', fontSize: 19, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em' }}>{title}</h2>
      <p style={{ margin: 0, fontSize: 13.5, color: C.muted, lineHeight: 1.5 }}>{sub}</p>
    </div>
  );
}

Object.assign(window, { LoginScreen, ForgotScreen, Field, inputStyle });
