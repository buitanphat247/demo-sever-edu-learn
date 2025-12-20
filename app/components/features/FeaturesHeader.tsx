interface FeaturesHeaderProps {
  title: string;
  description: string;
}

export default function FeaturesHeader({ title, description }: FeaturesHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
        {title}
      </h1>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
      <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mt-6"></div>
    </div>
  );
}

