import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Building2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, submitInquiry, showToast } = useApp();
  const isAr = language === 'ar';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !message) {
      showToast(isAr ? 'برجاء ملء جميع الحقول المطلوبة' : 'Please complete all required fields', 'error');
      return;
    }
    setLoading(true);
    await submitInquiry({
      fullName,
      email,
      phone,
      preferredContact: 'phone',
      message: `[Subject: ${subject}] ${message}`,
      type: 'general',
    });
    setLoading(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent('Hello Prime Estate, I would like to inquire about property advisory services.');
    window.open('https://wa.me/201001234567?text=' + msg, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      <Breadcrumbs items={[{ label: isAr ? 'تواصل معنا' : 'Contact Us' }]} />

      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">
          {isAr ? 'خدمة العملاء على مدار الساعة' : 'Dedicated Client Services'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
          {isAr ? 'يسعدنا تواصلك مع فريق مبيعاتنا' : 'Get In Touch With Our Advisory Team'}
        </h1>
        <p className="text-sm text-slate-300">
          {isAr ? 'سواء كنت تبحث عن شراء بيت أحلامك أو استثمار عقاري واعد، يسعدنا الإجابة على استفساراتك.' : 'Whether purchasing your forever home or evaluating high-yield assets, we are here.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl">
          <h3 className="text-xl font-bold text-white font-serif border-b border-slate-800 pb-4">
            {isAr ? 'إرسال استفسار مباشر' : 'Send An Advisory Inquiry'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">{isAr ? 'الاسم الكامل *' : 'Full Name *'}</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Karim Hassan"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">{isAr ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="karim@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">{isAr ? 'رقم الهاتف / واتساب *' : 'Phone Number *'}</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 100 000 0000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">{isAr ? 'موضوع الاستفسار' : 'Subject'}</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={isAr ? 'استفسار عن فيلا في التجمع...' : 'Villa Inquiry, New Capital...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">{isAr ? 'تفاصيل الرسالة *' : 'Your Message *'}</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isAr ? 'اكتب تفاصيل طلبك والميزانية المحددة...' : 'Tell us about your target location, budget, and requirements...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? (isAr ? 'جاري الإرسال...' : 'Sending...') : (isAr ? 'إرسال الرسالة' : 'Send Message')}</span>
            </button>
          </form>
        </div>

        {/* Office Locations Info */}
        <aside className="space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white font-serif border-b border-slate-800 pb-3">
              {isAr ? 'فروعنا في القاهرة' : 'Branch Headquarters'}
            </h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="space-y-1">
                <span className="font-bold text-amber-400 block text-sm">{isAr ? 'فرع التجمع الخامس (الرئيسي)' : 'New Cairo HQ'}</span>
                <p className="text-slate-400">{isAr ? 'المربع الذهبي، شارع التسعين الجنوبي، القاهرة الجديدة' : 'Golden Square Corridor, South 90th St, New Cairo'}</p>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-800">
                <span className="font-bold text-amber-400 block text-sm">{isAr ? 'فرع الشيخ زايد' : 'Sheikh Zayed Branch'}</span>
                <p className="text-slate-400">{isAr ? 'أركان بلازا، محور 26 يوليو، الشيخ زايد' : 'Arkan Plaza, 26th July Corridor, Sheikh Zayed'}</p>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-800">
                <span className="font-bold text-amber-400 block text-sm">{isAr ? 'فرع العاصمة الإدارية' : 'New Capital Branch'}</span>
                <p className="text-slate-400">{isAr ? 'حي المال والأعمال، البرج الإداري 7' : 'Financial District, Tower 7, New Capital'}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <button
                onClick={handleWhatsApp}
                className="w-full py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat via WhatsApp</span>
              </button>
            </div>
          </div>

        </aside>

      </div>

    </div>
  );
};
