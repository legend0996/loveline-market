type SectionHeaderProps = {
  title: string;
  subtitle: string;
};

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <header className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
    </header>
  );
};

export default SectionHeader;
