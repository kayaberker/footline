import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export default function HowItWorks({ dict }: Props) {
  const steps = [
    { num: "01", ...dict.howItWorks.step1 },
    { num: "02", ...dict.howItWorks.step2 },
    { num: "03", ...dict.howItWorks.step3 },
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-black text-white text-center mb-12">
        {dict.howItWorks.title}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div key={step.num} className="text-center">
            <div className="text-5xl font-black text-gold-400/30 mb-4">{step.num}</div>
            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
            <p className="text-green-300">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
