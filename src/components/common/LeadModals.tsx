import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, User, Phone, Mail, FileText, Send, Building2, CheckCircle2, Lock } from 'lucide-react';

export const LeadModals: React.FC = () => {
  const { activeModal, modalPayload, closeModal, submitInquiry, loginUser, language, showToast } = useApp();
  const isAr = language === 'ar';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState<'phone' | 'whatsapp' | 'email'>('whatsapp');
  const [viewingDate, setViewingDate] = useState('');
  const [viewingTime, setViewingTime] = useState('14:00');
  const [message, setMessage] = useState('');
  const [propertyType, setPropertyType] = useState('villa');
  const [location, setLocation] = useState('New Cairo');
  const [askingPrice, setAskingPrice] = useState('');
  const [loading, setLoading] = useState(false);

  if (!activeModal) return null;

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      showToast(isAr ? 'برجاء استكمال الحقول المطلوبة' : 'Please fill all required fields', 'error');
      return;
    }

    setLoading(true);
    await submitInquiry({
      fullName,
      email,
      phone,
      preferredContact: contactMethod,
      viewingDate,
      viewingTime,
      message,
      propertyId: modalPayload.propertyId,
      projectId: modalPayload.projectId,
      agentId: modalPayload.agentId,
      type: activeModal === 'viewing' ? 'viewing' : activeModal === 'brochure' ? 'brochure' : 'general',
    });
    setLoading(false);
  };

  const handleListProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !askingPrice) {
      showToast(isAr ? 'برجاء إدخال بيانات العقار والسعر المطلوب' : 'Please enter property details and asking price', 'error');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    showToast(
      isAr
        ? 'تم تقييم وتسجيل عقارك بنجاح! سيتواصل معك مدير المعاينات خلال 24 ساعة.'
        : 'Your property has been listed for review! Our listing agent will contact you within 24h.',
      'success'
    );
    closeModal();
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast(isAr ? 'برجاء كتابة البريد الإلكتروني' : 'Please enter your email', 'error');
      return;
    }
    const name = fullName || email.split('@')[0];
    loginUser(email, name);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#0A192F] space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-[#0A192F] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Headings */}
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-serif text-[#0A192F] flex items-center gap-2">
            {activeModal === 'viewing' && (isAr ? 'حجز معاينة موقع العقار' : 'Schedule Property Viewing')}
            {activeModal === 'brochure' && (isAr ? 'طلب بروشور وخطة الأسعار' : 'Request Official Brochure')}
            {activeModal === 'list-property' && (isAr ? 'عرض عقارك للبيع مع برايم إيستيت' : 'List Your Property For Sale')}
            {activeModal === 'callback' && (isAr ? 'طلب مكالمة استشارية مجانية' : 'Request Expert Callback')}
            {(activeModal === 'login' || activeModal === 'register') && (isAr ? 'تسجيل الدخول / حساب جديد' : 'Sign In / Register')}
          </h3>
          <p className="text-xs text-slate-500">
            {modalPayload.title && <span className="text-[#0A192F] font-semibold block">{modalPayload.title}</span>}
            {isAr ? 'أدخل معلوماتك وسيقوم مستشارنا بالتواصل معك فوراً' : 'Fill in your contact info to receive detailed advisor response'}
          </p>
        </div>

        {/* Viewing / Brochure / Callback Form */}
        {(activeModal === 'viewing' || activeModal === 'brochure' || activeModal === 'callback') && (
          <form onSubmit={handleSubmitInquiry} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">{isAr ? 'الاسم الكامل *' : 'Full Name *'}</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={isAr ? 'مثال: أحمد محمود' : 'e.g. John Smith'}
                  className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">{isAr ? 'الهاتف / واتساب *' : 'Phone / WhatsApp *'}</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+20 100 000 0000"
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">{isAr ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {activeModal === 'viewing' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">{isAr ? 'تاريخ المعاينة المفضلة' : 'Preferred Date'}</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      value={viewingDate}
                      onChange={(e) => setViewingDate(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">{isAr ? 'الوقت المناسب' : 'Preferred Time'}</label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="time"
                      value={viewingTime}
                      onChange={(e) => setViewingTime(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">{isAr ? 'طريقة التواصل المفضلة' : 'Preferred Channel'}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'whatsapp', label: 'WhatsApp' },
                  { id: 'phone', label: isAr ? 'اتصال هاتفى' : 'Phone Call' },
                  { id: 'email', label: isAr ? 'إيميل' : 'Email' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setContactMethod(item.id as any)}
                    className={`py-2 rounded-lg border text-xs font-semibold transition-colors ${
                      contactMethod === item.id
                        ? 'bg-[#0A192F] text-[#D4AF37] border-[#0A192F]'
                        : 'bg-[#F8F9FA] border-slate-200 text-slate-600 hover:text-[#0A192F]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">{isAr ? 'ملاحظات إضافية' : 'Message / Specific Needs'}</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isAr ? 'اكتب أي طلب خاص أو موعد يفضله...' : 'Any specific budget or timing constraints...'}
                className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D4AF37] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-[#0A192F] hover:bg-[#06101E] text-[#D4AF37] font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-pulse">{isAr ? 'جاري الإرسال...' : 'Sending...'}</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'تأكيد وإرسال الطلب' : 'Submit Request'}</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* List Your Property Form */}
        {activeModal === 'list-property' && (
          <form onSubmit={handleListProperty} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">{isAr ? 'الاسم الكامل *' : 'Your Name *'}</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={isAr ? 'اسم مالك العقار' : 'Property owner name'}
                className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">{isAr ? 'الهاتف *' : 'Phone Number *'}</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 100 000 0000"
                  className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">{isAr ? 'نوع العقار' : 'Property Type'}</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="villa">Villa / فيلا</option>
                  <option value="apartment">Apartment / شقة</option>
                  <option value="penthouse">Penthouse / بنتهاوس</option>
                  <option value="chalet">Chalet / شاليه</option>
                  <option value="commercial">Commercial / تجاري</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">{isAr ? 'المنطقة / الكمبوند' : 'Location / District'}</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Fifth Settlement, Golden Square"
                  className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">{isAr ? 'السعر المطلوب (EGP) *' : 'Asking Price (EGP) *'}</label>
                <input
                  type="number"
                  required
                  value={askingPrice}
                  onChange={(e) => setAskingPrice(e.target.value)}
                  placeholder="25000000"
                  className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D4AF37] font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-[#0A192F] hover:bg-[#06101E] text-[#D4AF37] font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
            >
              {loading ? (isAr ? 'جاري المعالجة...' : 'Processing...') : (isAr ? 'تسجيل العقار للتقييم' : 'Submit Property For Review')}
            </button>
          </form>
        )}

        {/* Login / Auth Form */}
        {(activeModal === 'login' || activeModal === 'register') && (
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">{isAr ? 'الاسم' : 'Name'}</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={isAr ? 'اسمك' : 'Your Name'}
                className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">{isAr ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-[#0A192F] hover:bg-[#06101E] text-[#D4AF37] font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
            >
              {isAr ? 'متابعة وتسجيل الدخول' : 'Continue & Sign In'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
