import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, DollarSign, Percent, Calendar, PieChart, ShieldAlert } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPriceEgp?: number;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ initialPriceEgp = 15000000 }) => {
  const { language, currency, formatPrice, openModal } = useApp();
  const isAr = language === 'ar';

  const [priceEgp, setPriceEgp] = useState<number>(initialPriceEgp);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [loanYears, setLoanYears] = useState<number>(10);

  const calculations = useMemo(() => {
    const downPaymentEgp = (priceEgp * downPaymentPercent) / 100;
    const loanAmountEgp = Math.max(0, priceEgp - downPaymentEgp);
    
    const monthlyInterestRate = (interestRate / 100) / 12;
    const totalMonths = loanYears * 12;

    let monthlyPaymentEgp = 0;
    if (monthlyInterestRate > 0 && totalMonths > 0) {
      monthlyPaymentEgp =
        (loanAmountEgp * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
    } else if (totalMonths > 0) {
      monthlyPaymentEgp = loanAmountEgp / totalMonths;
    }

    const totalPaymentEgp = monthlyPaymentEgp * totalMonths;
    const totalInterestEgp = Math.max(0, totalPaymentEgp - loanAmountEgp);

    const principalPercent = totalPaymentEgp > 0 ? (loanAmountEgp / totalPaymentEgp) * 100 : 50;
    const interestPercent = totalPaymentEgp > 0 ? (totalInterestEgp / totalPaymentEgp) * 100 : 50;

    return {
      downPaymentEgp,
      loanAmountEgp,
      monthlyPaymentEgp,
      totalPaymentEgp,
      totalInterestEgp,
      principalPercent,
      interestPercent,
    };
  }, [priceEgp, downPaymentPercent, interestRate, loanYears]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-serif">
              {isAr ? 'حاسبة التمويل العقاري والأقساط' : 'Mortgage & Installment Calculator'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr ? 'احسب القسط الشهرى وإجمالي الفائدة المتوقعة' : 'Estimate your monthly payment and interest breakdown'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Controls */}
        <div className="space-y-6">
          
          {/* Property Price Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-300 font-medium">
                {isAr ? 'سعر العقار' : 'Property Value'}
              </label>
              <span className="font-bold text-amber-400 font-mono text-sm">
                {formatPrice(priceEgp)}
              </span>
            </div>
            <input
              type="range"
              min={2000000}
              max={100000000}
              step={500000}
              value={priceEgp}
              onChange={(e) => setPriceEgp(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Down Payment % */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-300 font-medium">
                {isAr ? 'المقدم المالي' : 'Down Payment'} ({downPaymentPercent}%)
              </label>
              <span className="font-bold text-amber-400 font-mono text-sm">
                {formatPrice(calculations.downPaymentEgp)}
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={70}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>5%</span>
              <span>25%</span>
              <span>50%</span>
              <span>70%</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-300 font-medium">
                {isAr ? 'نسبة الفائدة السنوية' : 'Annual Interest Rate'}
              </label>
              <span className="font-bold text-amber-400 font-mono text-sm">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={25}
              step={0.5}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Loan Duration */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-300 font-medium">
                {isAr ? 'مدة السداد (سنوات)' : 'Loan Term'}
              </label>
              <span className="font-bold text-amber-400 font-mono text-sm">
                {loanYears} {isAr ? 'سنوات' : 'Years'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              step={1}
              value={loanYears}
              onChange={(e) => setLoanYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

        </div>

        {/* Results Card */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              {isAr ? 'التقدير المالي الشهري' : 'Estimated Monthly Payment'}
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">
              {formatPrice(calculations.monthlyPaymentEgp)}
              <span className="text-xs text-slate-400 font-sans font-normal ml-1">/{isAr ? 'شهر' : 'month'}</span>
            </div>

            {/* Visual Breakdown Bar */}
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${calculations.principalPercent}%` }}
                  className="h-full bg-amber-500 transition-all duration-500"
                  title="Principal"
                />
                <div
                  style={{ width: `${calculations.interestPercent}%` }}
                  className="h-full bg-indigo-500 transition-all duration-500"
                  title="Interest"
                />
              </div>

              <div className="flex justify-between text-xs pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-slate-300">{isAr ? 'أصل القرض:' : 'Principal:'}</span>
                  <span className="font-semibold text-white">{formatPrice(calculations.loanAmountEgp)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-slate-300">{isAr ? 'إجمالي الفائدة:' : 'Total Interest:'}</span>
                  <span className="font-semibold text-white">{formatPrice(calculations.totalInterestEgp)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              {isAr
                ? 'ملاحظة: الحسابات تقريبية لتسهيل التخطيط الاستثماري. تطبق الشروط والأحكام الخاصة بكل بنك ومطور.'
                : 'Note: Values are estimated for illustrative financial planning. Final terms depend on bank approval and developer options.'}
            </span>
          </div>

          <button
            onClick={() => openModal('callback')}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all"
          >
            {isAr ? 'طلب استشارة خطة التمويل' : 'Consult Financial Advisory'}
          </button>

        </div>

      </div>
    </div>
  );
};
