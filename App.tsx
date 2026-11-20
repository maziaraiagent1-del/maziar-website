import React, { useEffect, useState } from 'react';
import './style.css';
import { ArrowUpLeft, Camera, Send, Mail, Phone, Menu, X, Trophy, Code2, Sparkles, ExternalLink, Compass, Lightbulb, ArrowDown, Quote, ArrowUp, Clock3 } from 'lucide-react';

const profile = {
  name: 'مازیار سعیدی', age: '۱۸ ساله', location: 'کاشمر، خراسان رضوی',
  intro: 'آدمی اجتماعی، خوش‌صحبت و کنجکاو؛ علاقه‌مند به شناخت دنیا، ساختن ارتباط‌های تازه و تجربه‌کردن مسیرهای جدید.',
  about: 'گرم و خوش‌صحبتم و از آشناشدن با آدم‌های جدید انرژی می‌گیرم. شاید گاهی کم‌حوصله باشم، اما کنجکاوی‌ام برای یادگرفتن و تجربه‌کردن همیشه همراهم است. فلسفه، ادیان، تاریخ، ورزش، اقتصاد و سیاست از موضوعاتی‌اند که دوست دارم بیشتر درباره‌شان بدانم.',
  skills: [
    ['توسعه فرانت‌اند', 'در مسیر یادگیری و ساخت تجربه‌های وب', Code2],
    ['تولید محتوای هوش مصنوعی', 'ساخت محتوای ویدیویی و خلاقانه', Sparkles],
    ['محتوای موسیقی با AI', 'آزمایش ایده‌ها و ساخت محتوای صوتی', Sparkles],
    ['معامله‌گری', 'علاقه‌مند و فعال در بازارها', Trophy],
  ] as [string, string, React.ComponentType<any>][],
  achievements: [['مقام دوم شطرنج', 'رقابت شطرنج'], ['۲ مدال دوومیدانی', 'دستاورد ورزشی'], ['فوتبال', 'فوتبالیست با تجربه حرفه‌ای']],
  interests: ['فلسفه', 'ادیان', 'تاریخ', 'ورزش', 'اقتصاد', 'سیاست', 'شطرنج', 'فوتبال'],
  principles: [
    { title: 'کنجکاوی', text: 'همیشه برای دیدن دنیا از زاویه‌ای تازه آماده‌ام.', Icon: Compass, number: '01' },
    { title: 'یادگیری', text: 'هر تجربه می‌تواند شروع یک مهارت یا نگاه تازه باشد.', Icon: Lightbulb, number: '02' },
    { title: 'ارتباط', text: 'گفت‌وگو و آشنایی با آدم‌های تازه به من انرژی می‌دهد.', Icon: Quote, number: '03' },
  ],
};

const particlePositions = [
  [5,12],[12,35],[18,78],[24,18],[31,58],[38,8],[44,88],[51,31],[58,69],[64,13],
  [70,48],[76,83],[82,23],[88,62],[94,12],[9,91],[28,92],[47,52],[67,93],[91,38]
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminNote, setAdminNote] = useState('پنل مدیریت آنلاین در مرحله بعد با احراز هویت امن و دیتابیس متصل می‌شود.');
  const [iranTime, setIranTime] = useState('');
  const [showTop, setShowTop] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [cursorActive, setCursorActive] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 1250);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('fa-IR', {
      timeZone: 'Asia/Tehran', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
    const updateClock = () => setIranTime(formatter.format(new Date()));
    updateClock();
    const interval = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    const onMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
    };
    const onPointer = () => setCursorActive(true);
    const onLeave = () => setCursorActive(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseenter', onPointer);
    document.addEventListener('mouseleave', onLeave);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseenter', onPointer);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const handlePortraitMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth <= 800) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${-y * 5}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${x * 5}deg`);
  };
  const resetPortraitTilt = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const progress = document.querySelector('.scroll-progress');
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (progress) (progress as HTMLElement).style.transform = `scaleX(${amount})`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    const revealTargets = document.querySelectorAll('.content-section, .intro-strip, .contact-inner, footer, .skill-card, .achievement, .interest, .principle-card, .signature-section');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach((element) => element.classList.add('is-visible'));
      return () => {
        window.removeEventListener('scroll', updateProgress);
        window.removeEventListener('resize', updateProgress);
      };
    }
    revealTargets.forEach((element, index) => {
      element.classList.add('scroll-reveal');
      if (element.matches('.skill-card, .achievement, .interest, .principle-card')) element.setAttribute('style', `--reveal-delay:${(index % 4) * 65}ms`);
    });
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const links = [
    ['خانه', '#home'], ['درباره من', '#about'], ['مهارت‌ها', '#skills'],
    ['دستاوردها', '#achievements'], ['علایق', '#interests'], ['نگاه من', '#principles'], ['ارتباط', '#contact']
  ];

  return <main>
    {introVisible && <div className="intro-loader" aria-label="در حال بارگذاری"><div className="loader-mark">M<span>.</span></div><div className="loader-name">MAZIAR</div><div className="loader-line"><i /></div></div>}
    <div className="ambient-glow" aria-hidden="true" />
    <div className={`custom-cursor ${cursorActive ? 'is-active' : ''}`} aria-hidden="true"><span /></div>
    <div className="gold-particles" aria-hidden="true">{particlePositions.map(([left, top], index) => <i key={index} style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${(index % 7) * -1.1}s`, animationDuration: `${5 + (index % 5)}s` }} />)}</div>
    <div className="scroll-progress" aria-hidden="true" />

    <header className="topbar">
      <a className="brand" href="#home"><span className="brand-mark">M</span><span>MAZIAR<span className="gold">.</span></span></a>
      <nav className={menuOpen ? 'nav open' : 'nav'}>{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      <button className="menu-btn" aria-label={menuOpen ? 'بستن منو' : 'بازکردن منو'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <a className="admin-link" href="#admin" onClick={(e) => {e.preventDefault(); setShowAdmin(true)}}>مدیریت سایت <ArrowUpLeft size={15}/></a>
    </header>

    <section className="hero section" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse"/> پروفایل شخصی <span className="hero-live">MAZIAR / DIGITAL PROFILE</span></div>
        <p className="overline">سلام، من هستم</p>
        <h1>{profile.name}<span className="gold">.</span></h1>
        <p className="hero-lead">{profile.intro}</p>
        <div className="hero-meta"><span>{profile.age}</span><i/> <span>{profile.location}</span></div>
        <div className="iran-clock"><Clock3 size={15}/><span>ساعت ایران</span><b dir="ltr">{iranTime || '—:—:—'}</b><small>تهران</small></div>
        <div className="hero-actions"><a className="btn primary" href="#about">بیشتر درباره من <ArrowUpLeft size={17}/></a><a className="text-link" href="#contact">ارتباط با من <ArrowUpLeft size={16}/></a></div>
      </div>
      <div className="portrait-wrap" onMouseMove={handlePortraitMove} onMouseLeave={resetPortraitTilt}>
        <div className="portrait-frame"><div className="portrait-placeholder"><img className="portrait-photo" src="/maziar-portrait.jpg" alt="تصویر مازیار سعیدی" fetchPriority="high" /></div><div className="frame-corner top-right"/><div className="frame-corner bottom-left"/></div>
        <div className="portrait-caption"><span className="gold">01</span><span>PERSONAL IDENTITY</span></div>
      </div>
      <div className="hero-index">18 / 01</div><a className="scroll-cue" href="#about" aria-label="رفتن به بخش درباره من"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a>
    </section>

    <section className="intro-strip"><span className="strip-label">درباره این صفحه</span><p>اینجا گوشه‌ای از دنیای من است؛ از چیزهایی که دوست دارم تا مهارت‌ها و تجربه‌هایی که در حال ساختنشان هستم.</p></section>
    <section className="snapshot section" aria-label="نگاهی کوتاه">
      <div className="snapshot-item"><span className="snapshot-value">۱۸</span><span className="snapshot-label">سال زندگی و تجربه</span></div>
      <div className="snapshot-item"><span className="snapshot-value">۰۲</span><span className="snapshot-label">مدال دوومیدانی</span></div>
      <div className="snapshot-item"><span className="snapshot-value">۰۲</span><span className="snapshot-label">مقام شطرنج</span></div>
      <div className="snapshot-note"><span className="pulse"/><span>در مسیر یادگیری و تجربه‌های تازه</span></div>
    </section>

    <section className="section content-section" id="about"><div className="section-heading"><span className="section-no">01 / ABOUT</span><h2>کمی درباره <em>من</em></h2></div><div className="about-grid"><div className="quote-wrap"><span className="quote-mark">“</span><p className="big-quote">«ارتباط‌های تازه، تجربه‌های تازه و نگاه‌کردن به دنیا از زاویه‌های متفاوت.»</p><span className="quote-caption">A PERSONAL POINT OF VIEW</span></div><div className="about-text"><p>{profile.about}</p><div className="fact-row"><span>نام</span><b>{profile.name}</b></div><div className="fact-row"><span>سن</span><b>{profile.age}</b></div><div className="fact-row"><span>موقعیت</span><b>{profile.location}</b></div></div></div></section>
    <section className="section content-section" id="skills"><div className="section-heading"><span className="section-no">02 / WHAT I DO</span><h2>مهارت‌ها و <em>فعالیت‌ها</em></h2><p>چیزهایی که انجام می‌دهم و مسیرهایی که در آن‌ها رشد می‌کنم.</p></div><div className="skill-grid">{profile.skills.map(([title, desc, Icon], i) => <article className="skill-card" key={String(title)}><div className="card-top"><span>0{i+1}</span><Icon size={21}/></div><h3>{String(title)}</h3><p>{String(desc)}</p></article>)}</div><p className="note">در حال یادگیری زبان انگلیسی هستم و این مسیر را هم به‌مرور به پروفایلم اضافه می‌کنم.</p></section>
    <section className="section content-section" id="achievements"><div className="section-heading"><span className="section-no">03 / HIGHLIGHTS</span><h2>دستاوردها و <em>تجربه‌ها</em></h2></div><div className="achievement-list">{profile.achievements.map(([title, desc], i) => <div className="achievement" key={String(title)}><span className="achievement-num">0{i+1}</span><div><h3>{String(title)}</h3><p>{String(desc)}</p></div><Trophy size={19}/></div>)}</div></section>
    <section className="section content-section" id="interests"><div className="section-heading"><span className="section-no">04 / CURIOSITY</span><h2>چیزهایی که <em>دوست دارم</em></h2></div><div className="interest-cloud">{profile.interests.map((item, i) => <span key={item} className={i===0?'interest featured':'interest'}>{item}</span>)}</div></section>
    <section className="section content-section principles-section" id="principles"><div className="section-heading"><span className="section-no">05 / MY APPROACH</span><h2>سه چیز که <em>برایم مهم‌اند</em></h2><p>نگاهی کوتاه به چیزهایی که مسیر و انتخاب‌هایم را شکل می‌دهند.</p></div><div className="principle-grid">{profile.principles.map(({ title, text, Icon, number }) => <article className="principle-card" key={number}><div className="principle-top"><span>{number}</span><Icon size={22}/></div><h3>{title}</h3><p>{text}</p><span className="principle-line"/></article>)}</div></section>

    <div className="closing-marquee" aria-hidden="true"><div className="marquee-track"><span>CURIOUS BY NATURE</span><i>✳</i><span>ALWAYS LEARNING</span><i>✳</i><span>OPEN TO NEW EXPERIENCES</span><i>✳</i><span>CURIOUS BY NATURE</span><i>✳</i><span>ALWAYS LEARNING</span><i>✳</i></div></div>
    <section className="contact-section" id="contact"><div className="section contact-inner"><div><span className="section-no">06 / SAY HELLO</span><h2>ارتباط‌های خوب<br/><em>از یک سلام شروع می‌شوند.</em></h2><p>برای گفت‌وگو، همکاری یا آشنایی بیشتر خوشحال می‌شوم در ارتباط باشیم.</p></div><div className="contact-links">
      <a href="mailto:your-email@example.com"><Mail/> ایمیل <ExternalLink size={14}/></a><a href="https://t.me/your_username" target="_blank" rel="noreferrer"><Send/> تلگرام <ExternalLink size={14}/></a><a href="https://instagram.com/your_username" target="_blank" rel="noreferrer"><Camera/> اینستاگرام <ExternalLink size={14}/></a><a href="tel:+980000000000"><Phone/> تماس تلفنی <ExternalLink size={14}/></a>
    </div></div></section>

    <section className="signature-section" aria-label="امضای مازیار"><span className="signature-kicker">A PERSONAL SIGNATURE</span><div className="signature-word">MAZIAR<span>.</span></div><p>با کنجکاوی ادامه می‌دهم؛ با تجربه، رشد می‌کنم.</p><div className="signature-rule" /></section>
    <footer><a className="brand" href="#home"><span className="brand-mark">M</span><span>MAZIAR<span className="gold">.</span></span></a><span>طراحی‌شده برای معرفی یک مسیر، نه فقط یک رزومه. <b className="footer-year">© {new Date().getFullYear()}</b></span><a href="#home" className="back-top">بازگشت به بالا ↑</a></footer>

    <button className={`floating-top ${showTop ? 'visible' : ''}`} type="button" aria-label="بازگشت به بالای صفحه" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={19}/></button>
    {showAdmin && <div className="modal-backdrop" onClick={() => setShowAdmin(false)}><div className="admin-modal" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setShowAdmin(false)} aria-label="بستن"><X/></button><span className="section-no">ADMIN / PREVIEW</span><h2>پنل مدیریت</h2><p>{adminNote}</p><label>یادداشت مدیر (پیش‌نمایش محلی)</label><textarea value={adminNote} onChange={e => setAdminNote(e.target.value)}/><small>این بخش فعلاً نمایشی است؛ برای انتشار عمومی باید ورود امن و ذخیره‌سازی سمت سرور راه‌اندازی شود.</small></div></div>}
  </main>;
}
export default App;
