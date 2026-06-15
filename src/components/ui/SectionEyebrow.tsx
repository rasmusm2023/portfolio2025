export default function SectionEyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="home-section-eyebrow font-bricolage-grotesque text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] mb-2">
      {children}
    </p>
  );
}
